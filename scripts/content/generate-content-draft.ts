/**
 * generate-content-draft.ts
 *
 * Turns (video id + cleaned transcript + optional unit / official references) into a STRUCTURED DRAFT that a human
 * then reviews and promotes. It is deliberately conservative:
 *
 *   - no external AI service is required (an optional EnrichmentProvider hook is provided, default = none);
 *   - it never publishes: output is always `status: "draft"` under content/_drafts/ (git-ignored, never routed);
 *   - it never asserts a Learning Aim / criterion: `learningAim` stays null and `needsVerification` is true;
 *   - the Arabic summary is a template built only from facts it can prove (matched concepts), not from guesses;
 *   - raw transcript text is never copied into the draft — only timestamps and matched terms as *evidence*.
 *
 * Usage:
 *   node scripts/content/normalize-transcript.ts            # make sources/transcripts/clean/*.json first
 *   node scripts/content/generate-content-draft.ts <videoId> [--unit cyber-security] [--ref "Label|https://…"]
 *
 * Workflow: draft → (human edits, checks against the video and official source) → content/… with status "reviewed"
 * → "published" → `npm run validate` is the gate.
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { loadAllNodes } from "../../src/lib/kb/load.ts";
import { normalizeArabic, stemToken } from "../../src/lib/kb/normalize.ts";
import { type ConceptNode, type GlossaryNode, type KbNode, type SourceRef, type UnitNode, type VideoNode } from "../../src/lib/kb/types.ts";
import type { CleanTranscript } from "./normalize-transcript.ts";

/** Hook for optional AI enrichment. Plug a provider in here later; the default does nothing. */
export interface EnrichmentProvider {
  name: string;
  enrich(draft: Draft, transcript: CleanTranscript): Promise<Partial<Draft>>;
}
export const NoopProvider: EnrichmentProvider = { name: "none", enrich: async () => ({}) };

export type Draft = {
  $generated: { by: string; at: string; provider: string; warning: string };
  id: string;
  type: "Video";
  status: "draft";
  visibility: "PUBLIC";
  needsVerification: true;
  canonicalTitle_ar: string;
  slug: string;
  possibleUnit: { id: string | null; confidence: number; basis: string };
  possibleLearningAim: null;
  suggestedConcepts: { id: string; title_ar: string; score: number }[];
  glossaryMatches: { id: string; term_ar: string; term_en: string; hits: number }[];
  englishTerminology: string[];
  questionsAnswered: string[];
  summary_ar: string;
  summary_note: string;
  metaDescription: string;
  chapters: { t: number; title: string; evidence: string[] }[];
  evidence: { t: number; matched: string[] }[];
  suggestedInternalLinks: { url: string; label: string }[];
  sourceReferences: SourceRef[];
  structuredData: Record<string, unknown>;
  transcript: { words: number; paragraphs: number; source: string };
};

const NOISE = [/الاستاذ احمد دومي/g, /الأستاذ أحمد دومي/g, /\|\|/g, /منصة اساس التعليمية/g, /منصة أساس التعليمية/g, /\s{2,}/g];
function cleanTitle(t: string): string {
  return NOISE.reduce((s, re) => s.replace(re, " "), t).replace(/[-–—|]+\s*$/g, "").trim();
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function countOccurrences(hay: string, needle: string): number {
  if (!needle) return 0;
  let n = 0;
  let i = hay.indexOf(needle);
  while (i !== -1) {
    n++;
    i = hay.indexOf(needle, i + needle.length);
  }
  return n;
}

const needleOf = (g: GlossaryNode) =>
  normalizeArabic(g.term_ar)
    .split(/\s+/)
    .map(stemToken)
    .join(" ");

/** Inverse document frequency of each glossary term across all available transcripts (generic words get ~0 weight). */
/** Normalise + stem every token so "برامج الفديه" in a caption matches the glossary term "برامج الفدية". */
const stemmed = (text: string) =>
  normalizeArabic(text)
    .split(/[^\p{L}\p{N}]+/u)
    .filter(Boolean)
    .map(stemToken)
    .join(" ");

export function buildIdf(glossary: GlossaryNode[], corpus: string[]): Map<string, number> {
  const docs = corpus.map(stemmed);
  const idf = new Map<string, number>();
  for (const g of glossary) {
    const needle = needleOf(g);
    const df = docs.filter((d) => d.includes(needle)).length;
    idf.set(g.id, Math.log(1 + docs.length / Math.max(df, 1)));
  }
  return idf;
}

export function matchGlossary(text: string, glossary: GlossaryNode[], idf?: Map<string, number>) {
  const hay = stemmed(text);
  const out: { g: GlossaryNode; hits: number; score: number }[] = [];
  for (const g of glossary) {
    const needle = needleOf(g);
    const hits = countOccurrences(hay, needle) + countOccurrences(hay, g.term_en.toLowerCase());
    // very short single tokens (≤3 chars) are too ambiguous in noisy auto-captions
    // sub-linear term frequency × IDF: a generic word repeated 150 times must not outweigh a specific term said 5 times
    if (hits >= 1 && needle.length > 3) out.push({ g, hits, score: (1 + Math.log(hits)) * (idf?.get(g.id) ?? 1) });
  }
  return out.sort((a, b) => b.score - a.score);
}

export async function generateDraft(opts: {
  videoId: string;
  unitId?: string | null;
  refs?: SourceRef[];
  nodes: KbNode[];
  transcript: CleanTranscript;
  /** Full texts of all available transcripts, used for IDF weighting. */
  corpus?: string[];
  provider?: EnrichmentProvider;
  now?: Date;
}): Promise<Draft> {
  const { videoId, nodes, transcript } = opts;
  const provider = opts.provider ?? NoopProvider;
  const published = nodes.filter((n) => n.status === "published");
  const glossary = published.filter((n): n is GlossaryNode => n.type === "GlossaryTerm");
  const concepts = published.filter((n): n is ConceptNode => n.type === "Concept" || n.type === "Comparison");
  const units = published.filter((n): n is UnitNode => n.type === "Unit");
  const known = nodes.find((n): n is VideoNode => n.type === "Video" && n.youtubeId === videoId);

  const fullText = transcript.paragraphs.map((p) => p.text).join(" ");
  const idf = buildIdf(glossary, opts.corpus ?? [fullText]);
  const matches = matchGlossary(fullText, glossary, idf);

  // concepts: sum of IDF-weighted glossary scores that point at them; weak evidence is dropped
  const MIN_CONCEPT_SCORE = 3;
  const byConcept = new Map<string, number>();
  for (const m of matches) if (m.g.conceptId) byConcept.set(m.g.conceptId, (byConcept.get(m.g.conceptId) ?? 0) + m.score);
  const suggestedConcepts = [...byConcept.entries()]
    .filter(([, score]) => score >= MIN_CONCEPT_SCORE)
    .map(([id, score]) => ({ id, score: Number(score.toFixed(1)), title_ar: concepts.find((c) => c.id === id)?.title_ar ?? id }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  // unit: explicit > curated video record > weighted majority of matched terms (only with enough evidence)
  const unitVotes = new Map<string, number>();
  for (const m of matches) if (m.g.unit) unitVotes.set(m.g.unit, (unitVotes.get(m.g.unit) ?? 0) + m.score);
  const total = [...unitVotes.values()].reduce((a, b) => a + b, 0);
  const top = [...unitVotes.entries()].sort((a, b) => b[1] - a[1])[0];
  const enough = !!top && total >= MIN_CONCEPT_SCORE && top[1] / total >= 0.5;
  const possibleUnit = opts.unitId
    ? { id: opts.unitId, confidence: 1, basis: "provided by the editor" }
    : known?.unitId
      ? { id: known.unitId, confidence: 0.9, basis: "existing curated video record" }
      : enough
        ? { id: top[0], confidence: Number((top[1] / total).toFixed(2)), basis: "IDF-weighted share of matched glossary terms (unverified)" }
        : { id: null, confidence: 0, basis: "insufficient evidence — set the unit manually" };

  // chapters: ~90s windows labelled by the most frequent matched term in that window
  const WINDOW = 90;
  const chapters: Draft["chapters"] = [];
  let start = transcript.paragraphs[0]?.start ?? 0;
  let bucket: string[] = [];
  const flush = (end: number) => {
    const win = matchGlossary(bucket.join(" "), glossary, idf);
    const label = win[0]?.g.term_ar;
    chapters.push({ t: Math.floor(start), title: label ? `يتناول: ${label}` : "مراجعة يدوية مطلوبة", evidence: win.slice(0, 3).map((w) => w.g.term_en) });
    void end;
  };
  for (const p of transcript.paragraphs) {
    if (p.start - start >= WINDOW && bucket.length) {
      flush(p.start);
      start = p.start;
      bucket = [];
    }
    bucket.push(p.text);
  }
  if (bucket.length) flush(start + WINDOW);

  const evidence = transcript.paragraphs
    .map((p) => ({ t: Math.floor(p.start), matched: matchGlossary(p.text, glossary, idf).slice(0, 4).map((m) => m.g.term_ar) }))
    .filter((e) => e.matched.length)
    .slice(0, 40);

  const originalTitle = known?.originalTitle ?? videoId;
  const canonicalTitle_ar = known?.conceptTitle_ar ?? cleanTitle(originalTitle);
  const names = suggestedConcepts.slice(0, 3).map((c) => c.title_ar);
  const unitTitle = units.find((u) => u.id === possibleUnit.id)?.title_ar;
  const summary_ar = names.length
    ? `درس من قناة أحمد دومي${unitTitle ? ` في وحدة ${unitTitle}` : ""} يتناول: ${names.join("، ")}.`
    : `درس من قناة أحمد دومي${unitTitle ? ` في وحدة ${unitTitle}` : ""}. لم تُطابق المصطلحات المعروفة أي مفهوم منشور، فيلزم تحديد الموضوع يدويًا.`;
  const topConcept = suggestedConcepts[0] ? concepts.find((c) => c.id === suggestedConcepts[0].id) : undefined;

  const englishTerminology = [...new Set([...matches.slice(0, 12).map((m) => m.g.term_en), ...(originalTitle.match(/[A-Za-z][A-Za-z ]{2,}/g) ?? []).map((s) => s.trim())])];
  const links = suggestedConcepts
    .map((c) => concepts.find((x) => x.id === c.id))
    .filter((c): c is ConceptNode => !!c)
    .map((c) => ({ url: `/btec-it/${units.find((u) => u.id === c.unit)?.slug ?? ""}/${c.slug}`, label: c.title_ar }));

  const draft: Draft = {
    $generated: {
      by: "scripts/content/generate-content-draft.ts",
      at: (opts.now ?? new Date()).toISOString(),
      provider: provider.name,
      warning: "MACHINE-GENERATED DRAFT. Verify against the video and the official source before any publication. Never publish learning-aim mappings from this file.",
    },
    id: `video-${slugify(videoId)}-draft`,
    type: "Video",
    status: "draft",
    visibility: "PUBLIC",
    needsVerification: true,
    canonicalTitle_ar,
    slug: topConcept?.slug ?? `video-${slugify(videoId)}`,
    possibleUnit,
    possibleLearningAim: null,
    suggestedConcepts,
    glossaryMatches: matches.slice(0, 15).map((m) => ({ id: m.g.id, term_ar: m.g.term_ar, term_en: m.g.term_en, hits: m.hits })),
    englishTerminology,
    questionsAnswered: topConcept?.questionsAnswered ?? [],
    summary_ar,
    summary_note: "Template built only from matched concepts. A human must write the real explanation (short answer first, then the explanation) in their own words.",
    metaDescription: summary_ar.slice(0, 155),
    chapters,
    evidence,
    suggestedInternalLinks: links,
    sourceReferences: [
      { kind: "video", label: originalTitle, url: `https://www.youtube.com/watch?v=${videoId}` },
      ...(opts.refs ?? []),
    ],
    structuredData: {
      "@type": "VideoObject",
      name: canonicalTitle_ar,
      description: summary_ar,
      thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${videoId}`,
      contentUrl: `https://www.youtube.com/watch?v=${videoId}`,
      uploadDate: known?.uploadDate ?? null,
      hasPart: chapters.map((c) => ({ "@type": "Clip", name: c.title, startOffset: c.t })),
    },
    transcript: { words: transcript.wordCount, paragraphs: transcript.paragraphs.length, source: transcript.source },
  };
  const extra = await provider.enrich(draft, transcript);
  return { ...draft, ...extra };
}

async function main() {
  const args = process.argv.slice(2);
  const videoId = args.find((a) => !a.startsWith("--"));
  if (!videoId) {
    console.error('Usage: node scripts/content/generate-content-draft.ts <videoId> [--unit <unitId>] [--ref "Label|https://…"]');
    process.exit(1);
  }
  const flag = (name: string) => {
    const i = args.indexOf(`--${name}`);
    return i >= 0 ? args[i + 1] : undefined;
  };
  const refs: SourceRef[] = args
    .map((a, i) => (a === "--ref" ? args[i + 1] : null))
    .filter((v): v is string => !!v)
    .map((v) => {
      const [label, url] = v.split("|");
      return { kind: "web" as const, label, url };
    });

  const file = join(process.cwd(), "sources", "transcripts", "clean", `${videoId}.json`);
  if (!existsSync(file)) {
    console.error(`No cleaned transcript at ${file}. Run: node scripts/content/normalize-transcript.ts ${videoId}`);
    process.exit(1);
  }
  const transcript = JSON.parse(readFileSync(file, "utf8")) as CleanTranscript;
  const { nodes } = loadAllNodes();
  const cleanDir = join(process.cwd(), "sources", "transcripts", "clean");
  const corpus = readdirSync(cleanDir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => (JSON.parse(readFileSync(join(cleanDir, f), "utf8")) as CleanTranscript).paragraphs.map((p) => p.text).join(" "));
  const draft = await generateDraft({ videoId, unitId: flag("unit") ?? null, refs, nodes, transcript, corpus });

  const dir = join(process.cwd(), "content", "_drafts");
  mkdirSync(dir, { recursive: true });
  const out = join(dir, `${videoId}.draft.json`);
  writeFileSync(out, JSON.stringify(draft, null, 2), "utf8");
  console.log(`Draft written → ${out.replace(process.cwd(), ".")}`);
  console.log(`  title:     ${draft.canonicalTitle_ar}`);
  console.log(`  unit:      ${draft.possibleUnit.id} (confidence ${draft.possibleUnit.confidence}, ${draft.possibleUnit.basis})`);
  console.log(`  concepts:  ${draft.suggestedConcepts.map((c) => `${c.id}(${c.score})`).join(", ") || "—"}`);
  console.log(`  chapters:  ${draft.chapters.length}   glossary matches: ${draft.glossaryMatches.length}`);
  console.log("  status:    draft — nothing is published; a human must review and promote it.");
}

const invokedDirectly = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/").split("/").pop() ?? "");
if (invokedDirectly) await main();
