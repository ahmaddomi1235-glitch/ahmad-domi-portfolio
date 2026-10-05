/**
 * Content quality rules. Used by `npm run validate` and by the site loader (a failing rule fails the build),
 * so programmatic or imported content cannot silently become spam, leak paid material or link to nothing.
 */
import {
  AUTHOR_ID,
  FILLER_OPENINGS,
  type ConceptNode,
  type GlossaryNode,
  type Issue,
  type KbNode,
  type NodeBase,
  type ProductNode,
  type UnitNode,
  type VideoNode,
} from "./types.ts";
import { normalizeArabic } from "./normalize.ts";

/** Phrases that signal ready-to-submit / paid material. A PUBLIC or PUBLIC_SUMMARY node containing one fails. */
export const PAID_MARKERS = [
  "ready-to-submit",
  "answer pack",
  "جاهز للتسليم",
  "حل جاهز",
  "حلول جاهزة",
  "نموذج إجابة كامل",
  "اجابة الواجب كاملة",
  "إجابة الواجب كاملة",
  "انسخ الإجابة",
  "قالب التقرير الكامل",
];

export const LINK_PATTERN = /\[\[([a-z0-9][a-z0-9-]*)(?:\|([^\]]+))?\]\]/g;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function collectStrings(value: unknown, out: string[] = []): string[] {
  if (typeof value === "string") out.push(value);
  else if (Array.isArray(value)) for (const v of value) collectStrings(v, out);
  else if (value && typeof value === "object") for (const v of Object.values(value)) collectStrings(v, out);
  return out;
}

export function inlineLinkTargets(text: string): string[] {
  return [...text.matchAll(LINK_PATTERN)].map((m) => m[1]);
}

function wordCount(strings: string[]): number {
  return strings.join(" ").split(/\s+/).filter(Boolean).length;
}

function sentenceCount(text: string): number {
  return text.split(/[.!؟?]+/).map((s) => s.trim()).filter(Boolean).length;
}

export function validateNodes(nodes: KbNode[]): Issue[] {
  const issues: Issue[] = [];
  const err = (n: NodeBase, message: string) => issues.push({ level: "error", id: n.id, message });
  const warn = (n: NodeBase, message: string) => issues.push({ level: "warn", id: n.id, message });

  const byId = new Map<string, KbNode>();
  for (const n of nodes) {
    if (byId.has(n.id)) err(n, `duplicate id "${n.id}"`);
    byId.set(n.id, n);
  }

  const published = (id: string) => byId.get(id)?.status === "published";
  const slugSeen = new Map<string, string>();
  const questionSeen = new Map<string, string>();
  const termSeen = new Map<string, string>();

  for (const n of nodes) {
    // ── structural fields ────────────────────────────────────────────────────────────────────
    if (!ID.test(n.id)) err(n, `id must be lowercase-kebab-case`);
    if (!SLUG.test(n.slug)) err(n, `slug "${n.slug}" must be lowercase-kebab-case English`);
    if (!n.title_ar?.trim() || !n.title_en?.trim()) err(n, "title_ar and title_en are required");
    if (n.author !== AUTHOR_ID) err(n, `missing/unknown author (expected "${AUTHOR_ID}")`);
    if (!ISO_DATE.test(n.lastReviewed ?? "")) err(n, "lastReviewed must be YYYY-MM-DD");
    if (!["PUBLIC", "PUBLIC_SUMMARY", "PAID"].includes(n.visibility)) err(n, `invalid visibility "${n.visibility}"`);
    if (!["draft", "reviewed", "published"].includes(n.status)) err(n, `invalid status "${n.status}"`);

    const slugKey = `${n.type === "Comparison" ? "Concept" : n.type}:${n.unit ?? "-"}:${n.slug}`;
    if (slugSeen.has(slugKey)) err(n, `duplicate slug "${n.slug}" (also used by ${slugSeen.get(slugKey)})`);
    slugSeen.set(slugKey, n.id);

    const isPublished = n.status === "published";
    const strings = collectStrings(n);

    // ── publication gates ────────────────────────────────────────────────────────────────────
    if (n.visibility === "PAID" && isPublished) err(n, "PAID nodes can never be published");

    if (isPublished) {
      if (n.visibility !== "PAID") {
        const hay = strings.join(" ");
        for (const marker of PAID_MARKERS) {
          if (hay.includes(marker)) err(n, `PUBLIC content contains paid-material marker "${marker}"`);
        }
      }
      if (!n.sourceReferences?.length) err(n, "published nodes must cite at least one source reference");
      if (n.sourceType === "general-knowledge" && n.needsVerification !== false)
        err(n, "general-knowledge content cannot be published until a human sets needsVerification:false");
      if (n.sourceType === "official-pearson" && !n.officialSource) err(n, "official-pearson content requires officialSource");
      if ((n.learningAim || n.criterion) && !n.officialSource)
        err(n, "learningAim/criterion may only be published with an officialSource (never from memory or a booklet alone)");
      if ("officialStructure" in n && n.officialStructure && !n.officialSource)
        err(n, "officialStructure requires an officialSource");
      if (n.summary.length < 40 || n.summary.length > 320) err(n, `summary length ${n.summary.length} outside 40–320`);
      for (const s of FILLER_OPENINGS) {
        if (n.summary.startsWith(s)) err(n, `summary starts with generic filler "${s}"`);
      }
    }

    // ── references ───────────────────────────────────────────────────────────────────────────
    const refs: [string, string[]][] = [
      ["related", n.related ?? []],
      ["concepts", n.concepts ?? []],
      ["questions", n.questions ?? []],
    ];
    for (const [field, ids] of refs) {
      for (const id of ids) {
        const target = byId.get(id);
        if (!target) err(n, `${field} references unknown id "${id}"`);
        else if (isPublished && target.status !== "published") err(n, `published node links ${field} → unpublished "${id}"`);
      }
    }
    if (n.unit) {
      const u = byId.get(n.unit);
      if (!u || u.type !== "Unit") err(n, `unit "${n.unit}" is not a Unit node`);
      else if (isPublished && u.status !== "published") err(n, `unit "${n.unit}" is not published`);
    }
    for (const text of strings) {
      for (const target of inlineLinkTargets(text)) {
        if (!byId.has(target)) err(n, `inline link [[${target}]] points to unknown id`);
        else if (isPublished && !published(target)) err(n, `inline link [[${target}]] points to an unpublished node`);
      }
      for (const m of text.matchAll(/https?:\/\/[^\s"')\]]+/g)) {
        const url = m[0];
        if (url.startsWith("http://")) err(n, `insecure URL ${url}`);
        try {
          new URL(url);
        } catch {
          err(n, `invalid URL ${url}`);
        }
      }
    }

    // ── per-type rules ───────────────────────────────────────────────────────────────────────
    if (n.type === "Concept" || n.type === "Comparison") {
      const c = n as ConceptNode;
      if (!c.shortAnswer?.trim()) err(c, "shortAnswer is required");
      else {
        if (sentenceCount(c.shortAnswer) > 5) warn(c, "shortAnswer should be 2–4 sentences");
        for (const s of FILLER_OPENINGS) if (c.shortAnswer.startsWith(s)) err(c, `shortAnswer starts with generic filler "${s}"`);
      }
      if (!c.unit) err(c, "concepts must belong to a unit");
      if (!c.questionsAnswered?.length) warn(c, "no questionsAnswered — page is harder to retrieve");
      const words = wordCount(collectStrings(c.body));
      // Thin-content gate. A long body passes outright; a compact, table-led explainer passes only if the whole visible page
      // (short answer + why + body + terminology + questions) is still substantial and the body itself is not a stub.
      const visibleWords = wordCount([c.shortAnswer ?? "", c.whyBtec ?? "", ...collectStrings(c.body), ...collectStrings(c.terminology ?? []), ...(c.questionsAnswered ?? [])]);
      if (isPublished && (c.body?.length ?? 0) < 3) err(c, "published concept body is too thin (<3 blocks)");
      if (isPublished && !(words >= 140 || (words >= 80 && visibleWords >= 230)))
        err(c, `published concept is too thin (body ${words} words, visible page ${visibleWords}; need body ≥140, or body ≥80 and visible page ≥230)`);
      for (const q of c.questionsAnswered ?? []) {
        const key = normalizeArabic(q).replace(/[^\p{L}\p{N}]+/gu, " ").trim();
        const prev = questionSeen.get(key);
        if (prev && prev !== c.id) err(c, `question "${q}" duplicates an intent already answered by ${prev}`);
        questionSeen.set(key, c.id);
      }
      for (const v of c.videos ?? []) {
        const vn = byId.get(v);
        if (!vn || vn.type !== "Video") err(c, `videos references unknown video "${v}"`);
        else if (isPublished && (vn as VideoNode).availability !== "public") err(c, `video "${v}" is unavailable`);
      }
      if (isPublished && c.visibility === "PUBLIC" && !c.whyBtec?.trim()) warn(c, "missing whyBtec");
    }

    if (n.type === "Unit") {
      const u = n as UnitNode;
      if (u.axes?.length && !u.axesSource) err(u, "axes require axesSource (they are Ahmad's overview, not official Learning Aims)");
      for (const r of u.resourceIds ?? []) if (!byId.has(r)) err(u, `resourceIds references unknown id "${r}"`);
    }

    if (n.type === "GlossaryTerm") {
      const g = n as GlossaryNode;
      if (!g.term_ar?.trim() || !g.term_en?.trim() || !g.definition_ar?.trim()) err(g, "glossary term needs term_ar, term_en and definition_ar");
      if (g.conceptId) {
        const target = byId.get(g.conceptId);
        if (!target) err(g, `conceptId "${g.conceptId}" does not exist`);
        else if (isPublished && target.status !== "published") err(g, `conceptId "${g.conceptId}" is not published`);
      }
      const key = `${normalizeArabic(g.term_en)}`;
      const prev = termSeen.get(key);
      if (prev && prev !== g.id) err(g, `duplicate glossary term "${g.term_en}" (also ${prev})`);
      termSeen.set(key, g.id);
    }

    if (n.type === "Video") {
      const v = n as VideoNode;
      if (!/^[A-Za-z0-9_-]{11}$/.test(v.youtubeId ?? "")) err(v, "invalid youtubeId");
      for (const ch of v.chapters ?? []) if (ch.t < 0 || ch.t > v.duration) err(v, `chapter at ${ch.t}s is outside the video duration`);
    }

    if (n.type === "Product") {
      const p = n as ProductNode;
      if (p.showPrice && p.includes.some((i) => i.priceJOD == null)) err(p, "showPrice is true but a price is missing");
      for (const h of p.howToGet ?? []) if (!h.url.startsWith("https://")) err(p, `howToGet URL must be https: ${h.url}`);
    }
  }

  return issues;
}

export function summarize(issues: Issue[]): { errors: number; warnings: number } {
  return {
    errors: issues.filter((i) => i.level === "error").length,
    warnings: issues.filter((i) => i.level === "warn").length,
  };
}
