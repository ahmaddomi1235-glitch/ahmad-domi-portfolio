import { readFileSync } from "node:fs";
const C = JSON.parse(readFileSync("sources/audit/seo_crawl.json", "utf8"));
const P = C.pages; const urls = Object.keys(P); const sm = new Set(C.sitemap);
const out = {};
const idx = urls.filter((u) => sm.has(u));
out.nonSitemapCrawled = urls.filter((u) => !sm.has(u)).map((u) => [u, P[u].status, P[u].final]);
out.non200 = idx.filter((u) => P[u].status !== 200).map((u) => [u, P[u].status]);
out.redirectsInSitemap = idx.filter((u) => P[u].hops?.length).map((u) => [u, P[u].hops]);
out.canonicalMismatch = idx.filter((u) => P[u].canonical && P[u].canonical.replace(/\/$/, "") !== u.replace(/\/$/, "")).map((u) => [u, P[u].canonical]);
out.noindexInSitemap = idx.filter((u) => /noindex/.test(P[u].robots || "")).map((u) => u);
const dup = (key) => { const m = {}; idx.forEach((u) => { const v = (P[u][key] || "").trim(); if (v) (m[v] ||= []).push(u); }); return Object.entries(m).filter(([, a]) => a.length > 1); };
out.dupTitles = dup("title"); out.dupDesc = dup("description");
out.dupH1 = (() => { const m = {}; idx.forEach((u) => { const v = (P[u].h1 || []).join("|"); if (v) (m[v] ||= []).push(u); }); return Object.entries(m).filter(([, a]) => a.length > 1); })();
out.h1Count = idx.filter((u) => (P[u].h1 || []).length !== 1).map((u) => [u, (P[u].h1 || []).length]);
out.missingTitle = idx.filter((u) => !P[u].title); out.missingDesc = idx.filter((u) => !P[u].description);
const L = (s) => s.length;
out.titleLen = { long: idx.filter((u) => L(P[u].title || "") > 70).map((u) => [u, L(P[u].title)]).slice(0, 400), short: idx.filter((u) => L(P[u].title || "") < 25).map((u) => [u, P[u].title]) };
out.descLen = { long: idx.filter((u) => L(P[u].description || "") > 170).length, short: idx.filter((u) => L(P[u].description || "") < 70).map((u) => [u, L(P[u].description || "")]) };
out.thin = idx.filter((u) => P[u].words < 300).map((u) => [u, P[u].words]);
out.noLd = idx.filter((u) => !(P[u].ldTypes || []).length).map((u) => u); out.ldErr = idx.filter((u) => P[u].ldErrors).map((u) => u);
out.noAlt = idx.filter((u) => P[u].imgNoAlt).map((u) => [u, P[u].imgNoAlt, P[u].imgCount]);
// graph
const inb = {}; const adj = {};
for (const u of urls) { adj[u] = new Set(); for (const l of P[u].links || []) { const x = new URL(l.href, "https://ahmaddomiedu.com"); if (x.origin !== "https://ahmaddomiedu.com") continue; let p = x.pathname.replace(/\/+$/, "") || "/"; const n = "https://ahmaddomiedu.com" + (p === "/" ? "/" : p); if (n !== u) { adj[u].add(n); (inb[n] ||= new Set()).add(u); } } }
// also nav/footer links count for depth (all links)
const adjAll = {}; for (const u of urls) { adjAll[u] = new Set(); for (const l of P[u].allLinks || []) { try { const x = new URL(l, "https://ahmaddomiedu.com"); if (x.origin !== "https://ahmaddomiedu.com") continue; let p = x.pathname.replace(/\/+$/, "") || "/"; adjAll[u].add("https://ahmaddomiedu.com" + (p === "/" ? "/" : p)); } catch {} } }
const depth = { "https://ahmaddomiedu.com/": 0 }; const q = ["https://ahmaddomiedu.com/"];
while (q.length) { const u = q.shift(); for (const n of adjAll[u] || []) if (!(n in depth) && P[n]) { depth[n] = depth[u] + 1; q.push(n); } }
out.depthHist = {}; idx.forEach((u) => { const d = depth[u] ?? "unreachable"; out.depthHist[d] = (out.depthHist[d] || 0) + 1; });
out.unreachable = idx.filter((u) => !(u in depth));
const mainIn = (u) => (inb[u] ? inb[u].size : 0);
out.inboundMainContent = { zero: idx.filter((u) => mainIn(u) === 0).map((u) => u), lowest: idx.map((u) => [u, mainIn(u)]).sort((a, b) => a[1] - b[1]).slice(0, 40), top: idx.map((u) => [u, mainIn(u)]).sort((a, b) => b[1] - a[1]).slice(0, 15) };
const brokenInternal = []; for (const u of urls) for (const n of adjAll[u]) if (P[n] && P[n].status !== 200 && !P[n].hops?.length) brokenInternal.push([u, n, P[n].status]); out.brokenInternal = brokenInternal.slice(0, 50);
const redirLinks = []; for (const u of urls) for (const n of adjAll[u]) if (P[n]?.hops?.length) redirLinks.push([u, n]); out.linksToRedirects = redirLinks.slice(0, 50);
out.genericAnchors = {}; for (const u of idx) for (const l of P[u].links || []) if (/^(المزيد|اقرأ المزيد|هنا|اضغط هنا|click here|more|read more)$/i.test(l.text)) out.genericAnchors[l.text] = (out.genericAnchors[l.text] || 0) + 1;
out.emptyAnchor = idx.reduce((a, u) => a + (P[u].links || []).filter((l) => !l.text).length, 0);
out.scripts = {}; idx.slice(0, 3).forEach((u) => (out.scripts[u] = P[u].scripts.length));
out.hreflang = idx.filter((u) => P[u].hreflang?.length).map((u) => [u, P[u].hreflang]);
out.ldByType = {}; idx.forEach((u) => (P[u].ldTypes || []).forEach((t) => (out.ldByType[t] = (out.ldByType[t] || 0) + 1)));
out.lang = {}; idx.forEach((u) => (out.lang[P[u].lang] = (out.lang[P[u].lang] || 0) + 1));
out.wordStats = (() => { const w = idx.map((u) => P[u].words).sort((a, b) => a - b); return { min: w[0], median: w[w.length >> 1], max: w.at(-1) }; })();
console.log(JSON.stringify(out, null, 1));
