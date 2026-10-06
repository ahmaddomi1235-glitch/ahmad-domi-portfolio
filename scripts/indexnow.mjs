#!/usr/bin/env node
/**
 * IndexNow notifier (https://www.indexnow.org/documentation).
 *
 * Reads the PRODUCTION sitemap (the single list of canonical, indexable, published URLs — drafts, noindex and PAID
 * pages are never in it) and compares each <loc>/<lastmod> with scripts/indexnow-state.json. Only URLs that are new
 * or whose lastmod changed are submitted, plus URLs that left the sitemap (deleted/redirected, so engines recrawl).
 * Nothing is sent when nothing changed, so it never re-submits unchanged pages.
 *
 *   node scripts/indexnow.mjs               # dry run: prints what WOULD be sent
 *   node scripts/indexnow.mjs --send        # send the diff, then update the state file
 *   node scripts/indexnow.mjs --send --all  # initial/full submission of every sitemap URL (once)
 *   node scripts/indexnow.mjs --send --all --also=https://ahmaddomiedu.com/x,...  # also notify URLs that just left the sitemap (e.g. new noindex)
 *
 * Run it AFTER a production deploy (the key file and the new pages must be live). Commit the updated state file.
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

export const HOST = "ahmaddomiedu.com";
export const ORIGIN = `https://${HOST}`;
export const ENDPOINT = "https://api.indexnow.org/indexnow";
export const MAX_PER_REQUEST = 10000;

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATE = join(root, "scripts", "indexnow-state.json");

export function parseSitemap(xml) {
  const out = {};
  for (const m of xml.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
    const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1]?.trim();
    if (!loc) continue;
    out[loc] = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]?.trim() ?? "";
  }
  return out;
}

/** Only canonical URLs on the production host are ever submitted. */
export function canonicalOnly(urls) {
  return urls.filter((u) => u.startsWith(`${ORIGIN}/`) || u === ORIGIN);
}

export function diffState(prev, next, all = false) {
  const nextUrls = Object.keys(next);
  const changed = all ? nextUrls : nextUrls.filter((u) => prev[u] !== next[u]);
  const removed = all ? [] : Object.keys(prev).filter((u) => !(u in next));
  return { changed: canonicalOnly(changed), removed: canonicalOnly(removed) };
}

export function findKey() {
  const f = readdirSync(join(root, "public")).filter((n) => /^[a-f0-9]{32}\.txt$/.test(n));
  if (f.length !== 1) throw new Error(`expected exactly one IndexNow key file in public/, found ${f.length}`);
  const key = f[0].replace(".txt", "");
  if (readFileSync(join(root, "public", f[0]), "utf8").trim() !== key) throw new Error("key file content != file name");
  return key;
}

async function main() {
  const send = process.argv.includes("--send");
  const all = process.argv.includes("--all");
  const key = findKey();
  const keyLocation = `${ORIGIN}/${key}.txt`;

  const live = await fetch(keyLocation);
  if (!live.ok || (await live.text()).trim() !== key) throw new Error(`key file not live at ${keyLocation} (HTTP ${live.status}) — deploy first`);

  const res = await fetch(`${ORIGIN}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap HTTP ${res.status}`);
  const next = parseSitemap(await res.text());
  const prev = existsSync(STATE) ? JSON.parse(readFileSync(STATE, "utf8")) : {};
  const { changed, removed } = diffState(prev, next, all);
  const also = (process.argv.find((a) => a.startsWith("--also=")) ?? "").slice(7).split(",").filter(Boolean);
  const urlList = [...new Set([...changed, ...removed, ...canonicalOnly(also)])];

  console.log(`sitemap URLs: ${Object.keys(next).length}; new/changed: ${changed.length}; removed: ${removed.length}`);
  if (!urlList.length) return console.log("nothing to submit");
  if (!send) return console.log("dry run (pass --send). First 10:\n" + urlList.slice(0, 10).join("\n"));

  for (let i = 0; i < urlList.length; i += MAX_PER_REQUEST) {
    const batch = urlList.slice(i, i + MAX_PER_REQUEST);
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "content-type": "application/json; charset=utf-8" },
      body: JSON.stringify({ host: HOST, key, keyLocation, urlList: batch }),
    });
    console.log(`IndexNow ${r.status} ${r.statusText} (${batch.length} URLs)`);
    if (r.status !== 200 && r.status !== 202) throw new Error(`IndexNow rejected: ${r.status} ${await r.text()}`);
  }
  writeFileSync(STATE, JSON.stringify(next, null, 2) + "\n");
  console.log("state updated: scripts/indexnow-state.json (commit it)");
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
