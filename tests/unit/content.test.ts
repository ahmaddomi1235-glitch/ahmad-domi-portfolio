/**
 * Unit tests for the content pipeline. Run with:  npm run test:unit   (node --test, no extra dependencies)
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { validateNodes } from "../../src/lib/kb/validate.ts";
import { expandQuery, normalizeArabic, stemToken, tokenize } from "../../src/lib/kb/normalize.ts";
import { parseVtt, toParagraphs, formatTime } from "../../scripts/content/normalize-transcript.ts";
import type { ConceptNode, KbNode, UnitNode } from "../../src/lib/kb/types.ts";

const base = {
  learningAim: null,
  criterion: null,
  concepts: [],
  questions: [],
  sourceType: "ahmad-booklet" as const,
  sourceReferences: [{ kind: "pdf" as const, label: "booklet" }],
  youtubeId: null,
  author: "ahmad-domi",
  lastReviewed: "2026-10-04",
  visibility: "PUBLIC" as const,
  related: [],
  officialSource: null,
  status: "published" as const,
};

const unit: UnitNode = {
  ...base,
  id: "u1",
  type: "Unit",
  title_ar: "وحدة",
  title_en: "Unit",
  slug: "u1",
  summary: "ملخص وحدة اختبار يتجاوز الحد الأدنى للطول المطلوب في قواعد التحقق من المحتوى.",
  unit: null,
  order: 1,
  description: "d",
  axes: [],
  axesSource: "",
  intro: [],
  resourceIds: [],
  cardId: null,
  comingSoon: [],
};

const words = (n: number) => Array.from({ length: n }, (_, i) => `كلمة${i}`).join(" ");

function concept(over: Partial<ConceptNode> = {}): ConceptNode {
  return {
    ...base,
    id: "c1",
    type: "Concept",
    title_ar: "مفهوم",
    title_en: "Concept",
    slug: "c1",
    summary: "ملخص مفهوم اختبار يتجاوز الحد الأدنى للطول المطلوب في قواعد التحقق من المحتوى.",
    unit: "u1",
    order: 1,
    shortAnswer: "جواب قصير مباشر. جملة ثانية.",
    whyBtec: "لماذا",
    terminology: [],
    questionsAnswered: ["سؤال اختبار أول؟"],
    body: [
      { t: "h2", text: "عنوان" },
      { t: "p", text: words(60) },
      { t: "p", text: words(60) },
      { t: "p", text: words(60) },
    ],
    videos: [],
    cardCta: false,
    ...over,
  };
}

const errors = (nodes: KbNode[]) => validateNodes(nodes).filter((i) => i.level === "error").map((i) => i.message);

test("a well-formed unit + concept validates cleanly", () => {
  assert.deepEqual(errors([unit, concept()]), []);
});

test("PAID nodes can never be published", () => {
  const out = errors([unit, concept({ visibility: "PAID" })]);
  assert.ok(out.some((m) => m.includes("PAID nodes can never be published")));
});

test("PUBLIC content containing a paid-material marker is rejected", () => {
  const c = concept({ body: [{ t: "p", text: `${words(150)} هذا حل جاهز لانسخ` }, { t: "p", text: "a" }, { t: "p", text: "b" }, { t: "p", text: "c" }] });
  assert.ok(errors([unit, c]).some((m) => m.includes("paid-material marker")));
});

test("inline links to unknown or unpublished nodes fail", () => {
  const unknown = concept({ body: [{ t: "p", text: `${words(150)} [[nope]]` }, { t: "p", text: "a" }, { t: "p", text: "b" }, { t: "p", text: "c" }] });
  assert.ok(errors([unit, unknown]).some((m) => m.includes("[[nope]]")));
  const draft = concept({ id: "c2", slug: "c2", status: "draft", questionsAnswered: ["سؤال آخر؟"] });
  const linking = concept({ related: ["c2"] });
  assert.ok(errors([unit, draft, linking]).some((m) => m.includes("unpublished")));
});

test("duplicate slugs and duplicate question intents are rejected", () => {
  const a = concept();
  const b = concept({ id: "c2" }); // same slug, same question
  const out = errors([unit, a, b]);
  assert.ok(out.some((m) => m.includes("duplicate slug")));
  assert.ok(out.some((m) => m.includes("duplicates an intent")));
});

test("general-knowledge content cannot be published without human verification", () => {
  assert.ok(errors([unit, concept({ sourceType: "general-knowledge" })]).some((m) => m.includes("general-knowledge")));
  assert.deepEqual(errors([unit, concept({ sourceType: "general-knowledge", needsVerification: false })]), []);
});

test("learningAim / criterion require an official source", () => {
  assert.ok(errors([unit, concept({ learningAim: "A" })]).some((m) => m.includes("officialSource")));
});

test("thin bodies and generic-filler openings are rejected", () => {
  assert.ok(errors([unit, concept({ body: [{ t: "p", text: "قصير" }] })]).some((m) => m.includes("thin")));
  assert.ok(errors([unit, concept({ shortAnswer: "في عالم التكنولوجيا المتسارع نجد أن الأمر مهم." })]).some((m) => m.includes("filler")));
});

test("missing author is rejected", () => {
  assert.ok(errors([unit, concept({ author: "" })]).some((m) => m.includes("author")));
});

test("Arabic normalisation unifies alef/ya/ta-marbuta/diacritics and strips the article", () => {
  assert.equal(normalizeArabic("الأَمْنُ"), "الامن");
  assert.equal(normalizeArabic("المخاطرة"), normalizeArabic("المخاطره"));
  assert.equal(stemToken("المخاطره"), "مخاطره");
  assert.deepEqual(tokenize("المخاطرة Risk"), ["مخاطره", "risk"]);
});

test("query expansion maps common BTEC abbreviations", () => {
  const out = expandQuery(["pmd"]);
  assert.ok(out.includes("pass") && out.includes("merit") && out.includes("distinction"));
});

test("VTT parser keeps one copy of each caption line and chunks paragraphs", () => {
  const vtt = `WEBVTT\n\n00:00:01.000 --> 00:00:03.000\n \nمرحبا<00:00:01.500><c> بكم</c><00:00:02.000><c> اليوم</c>\n\n00:00:03.000 --> 00:00:03.010\nمرحبا بكم اليوم\n \n\n00:00:03.010 --> 00:00:05.000\nمرحبا بكم اليوم\nدرس<00:00:03.500><c> جديد</c>\n`;
  const segs = parseVtt(vtt);
  assert.equal(segs.length, 2);
  assert.equal(segs[0].text, "مرحبا بكم اليوم");
  assert.equal(segs[1].text, "درس جديد");
  assert.equal(toParagraphs(segs, 30).length, 1);
  assert.equal(formatTime(754), "12:34");
});
