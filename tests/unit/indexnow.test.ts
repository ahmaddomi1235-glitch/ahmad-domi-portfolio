import { test } from "node:test";
import assert from "node:assert/strict";
import { parseSitemap, diffState, canonicalOnly, findKey } from "../../scripts/indexnow.mjs";

const xml = `<urlset><url><loc>https://ahmaddomiedu.com/a</loc><lastmod>2026-10-01</lastmod></url><url><loc>https://ahmaddomiedu.com/b</loc></url></urlset>`;

test("parseSitemap reads loc and lastmod", () => {
  assert.deepEqual(parseSitemap(xml), { "https://ahmaddomiedu.com/a": "2026-10-01", "https://ahmaddomiedu.com/b": "" });
});

test("diffState submits only new/changed and removed URLs", () => {
  const prev = { "https://ahmaddomiedu.com/a": "2026-09-01", "https://ahmaddomiedu.com/b": "", "https://ahmaddomiedu.com/gone": "x" };
  const next = parseSitemap(xml);
  const d = diffState(prev, next);
  assert.deepEqual(d.changed, ["https://ahmaddomiedu.com/a"]);
  assert.deepEqual(d.removed, ["https://ahmaddomiedu.com/gone"]);
  assert.deepEqual(diffState(next, next), { changed: [], removed: [] });
});

test("canonicalOnly drops other hosts", () => {
  assert.deepEqual(canonicalOnly(["https://x.vercel.app/a", "https://ahmaddomiedu.com/a"]), ["https://ahmaddomiedu.com/a"]);
});

test("exactly one valid IndexNow key file exists", () => {
  assert.match(findKey(), /^[a-f0-9]{32}$/);
});
