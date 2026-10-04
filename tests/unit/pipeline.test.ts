import { test } from "node:test";
import assert from "node:assert/strict";
import { buildIdf, generateDraft, matchGlossary } from "../../scripts/content/generate-content-draft.ts";
import { validateNodes } from "../../src/lib/kb/validate.ts";
import type { ConceptNode, GlossaryNode, KbNode, UnitNode } from "../../src/lib/kb/types.ts";
import type { CleanTranscript } from "../../scripts/content/normalize-transcript.ts";

const base = {
  learningAim: null,
  criterion: null,
  concepts: [],
  questions: [],
  sourceType: "ahmad-booklet" as const,
  sourceReferences: [{ kind: "pdf" as const, label: "b" }],
  youtubeId: null,
  author: "ahmad-domi",
  lastReviewed: "2026-10-04",
  visibility: "PUBLIC" as const,
  related: [],
  officialSource: null,
  status: "published" as const,
};

const unit = { ...base, id: "cyber", type: "Unit", title_ar: "الأمن السيبراني", title_en: "Cyber", slug: "cyber", summary: "x".repeat(60), unit: null, order: 1, description: "", axes: [], axesSource: "", intro: [], resourceIds: [], cardId: null, comingSoon: [] } as UnitNode;
const concept = { ...base, id: "tvr", type: "Comparison", title_ar: "الفرق بين التهديد والثغرة", title_en: "TVR", slug: "tvr", summary: "x".repeat(60), unit: "cyber", order: 1, shortAnswer: "a", whyBtec: "", terminology: [], questionsAnswered: [], body: [], videos: [], cardCta: false } as ConceptNode;
const term = (id: string, ar: string, en: string): GlossaryNode =>
  ({ ...base, id, type: "GlossaryTerm", term_ar: ar, term_en: en, title_ar: ar, title_en: en, slug: id, summary: "d".repeat(60), definition_ar: "d".repeat(60), unit: "cyber", conceptId: "tvr" }) as GlossaryNode;

const nodes: KbNode[] = [unit, concept, term("t1", "الثغرة الأمنية", "Vulnerability"), term("t2", "برامج الفدية", "Ransomware"), term("t3", "البيانات", "Data")];

const transcript: CleanTranscript = {
  id: "abc",
  language: "ar",
  source: "youtube-auto-captions",
  wordCount: 30,
  paragraphs: [
    { start: 0, text: "اليوم نتكلم عن الثغره الامنيه وكيف ينجح الهجوم البيانات البيانات البيانات" },
    { start: 100, text: "وبرامج الفديه مثال والثغره الامنيه تتكرر" },
  ],
};

test("multi-word terms match through captions that drop hamza/ta-marbuta and insert the article", () => {
  const m = matchGlossary(transcript.paragraphs.map((p) => p.text).join(" "), nodes.filter((n): n is GlossaryNode => n.type === "GlossaryTerm"));
  const ids = m.map((x) => x.g.id);
  assert.ok(ids.includes("t1"), "الثغره الامنيه should match الثغرة الأمنية");
  assert.ok(ids.includes("t2"), "برامج الفديه should match برامج الفدية");
});

test("IDF weighting down-weights a term that appears in every document", () => {
  const gl = nodes.filter((n): n is GlossaryNode => n.type === "GlossaryTerm");
  const idf = buildIdf(gl, ["البيانات الثغره الامنيه", "البيانات", "البيانات برامج الفديه"]);
  assert.ok((idf.get("t3") ?? 0) < (idf.get("t1") ?? 0));
});

test("generated drafts are always draft, never assert a learning aim, and never copy raw transcript text", async () => {
  const d = await generateDraft({ videoId: "abc", nodes, transcript, corpus: [transcript.paragraphs.map((p) => p.text).join(" ")], now: new Date("2026-10-04") });
  assert.equal(d.status, "draft");
  assert.equal(d.needsVerification, true);
  assert.equal(d.possibleLearningAim, null);
  assert.ok(d.suggestedConcepts.some((c) => c.id === "tvr"));
  assert.ok(d.$generated.warning.includes("MACHINE-GENERATED"));
  const serialized = JSON.stringify(d);
  assert.ok(!serialized.includes("اليوم نتكلم عن"), "raw transcript sentences must not be copied into the draft");
});

test("weak evidence yields no unit and no concepts (no false confidence)", async () => {
  const empty: CleanTranscript = { ...transcript, paragraphs: [{ start: 0, text: "اهلا وسهلا بكم في القناة" }] };
  const d = await generateDraft({ videoId: "zzz", nodes, transcript: empty, corpus: ["اهلا وسهلا"] });
  assert.equal(d.possibleUnit.id, null);
  assert.deepEqual(d.suggestedConcepts, []);
});

test("a draft is not routable: drafts fail the PAID/publication gates only when promoted incorrectly", () => {
  // Promoting a node requires every validator gate; a node with an unverified general-knowledge source stays blocked.
  const promoted = { ...concept, id: "promoted", slug: "promoted", sourceType: "general-knowledge" as const };
  const errors = validateNodes([unit, promoted]).filter((i) => i.level === "error");
  assert.ok(errors.some((e) => e.message.includes("general-knowledge")));
});
