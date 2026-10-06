import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { loadAllNodes } from "../../src/lib/kb/load.ts";

type Entry = { title: string; metaDescription: string; primaryQuery: string; intent: string; funnel: string; kind: string; h1: string };
const map = JSON.parse(readFileSync("data/seo-intent-map.json", "utf8")) as { pages: Record<string, Entry> };
const pages = Object.entries(map.pages);

const { nodes } = loadAllNodes();
const published = nodes.filter((n) => n.status === "published");

test("every published concept and unit has an SEO entry (add scripts/seo/seo_copy.py + rebuild the map for new pages)", () => {
  const units = new Map(published.filter((n) => n.type === "Unit").map((u) => [u.id, u.slug as string]));
  for (const n of published) {
    if (n.type === "Unit") assert.ok(map.pages[`/btec-it/${n.slug}`], `unit ${n.slug} missing`);
    if (n.type === "Concept" || n.type === "Comparison") {
      const u = units.get((n as { unit: string }).unit);
      assert.ok(map.pages[`/btec-it/${u}/${n.slug}`], `concept ${n.slug} missing`);
    }
  }
});

test("titles are unique, intent-first and within the length budget", () => {
  const seen = new Set<string>();
  for (const [p, e] of pages) {
    assert.ok(e.title.length >= 25 && e.title.length <= 80, `${p} title length ${e.title.length}`);
    assert.ok(e.title.endsWith("أحمد دومي") || e.title.includes("Ahmad Domi"), `${p} title lacks the brand suffix`);
    assert.ok(!seen.has(e.title), `${p} duplicate title`);
    seen.add(e.title);
  }
});

test("meta descriptions are unique and 70-160 characters", () => {
  const seen = new Set<string>();
  for (const [p, e] of pages) {
    assert.ok(e.metaDescription.length >= 70 && e.metaDescription.length <= 160, `${p} meta length ${e.metaDescription.length}`);
    assert.ok(!seen.has(e.metaDescription), `${p} duplicate meta`);
    seen.add(e.metaDescription);
  }
});

test("concept pages carry BTEC context and a real primary query", () => {
  for (const [p, e] of pages.filter(([, e]) => e.kind === "concept")) {
    assert.ok(/BTEC/.test(e.title + e.metaDescription), `${p} has no BTEC context`);
    assert.ok(e.primaryQuery.length > 6, `${p} primary query`);
    assert.ok(["INFORMATIONAL", "COMPARISON", "ASSESSMENT"].includes(e.intent), `${p} intent ${e.intent}`);
  }
});

test("no unsupported claims in titles or descriptions", () => {
  for (const [p, e] of pages) {
    assert.ok(!/(رسمي من Pearson|معتمد من|أفضل (مدرس|شرح|موقع|منصة)|الأول في|رقم 1|مضمون|100%)/.test(e.title + e.metaDescription), `${p} contains a superlative/official claim`);
  }
});
