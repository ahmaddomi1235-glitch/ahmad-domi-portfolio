#!/usr/bin/env node
/**
 * SEO crawler: fetches every sitemap URL (production by default, or BASE=http://localhost:3000) and records
 * status, redirect hops, title, meta description, canonical, robots, H1s, headings, JSON-LD types, word count,
 * internal links (with anchor text), images without alt, and script weight. Output: sources/audit/seo_crawl.json
 * (private, git-ignored) — docs summarise it.
 */
import { writeFileSync, mkdirSync } from "node:fs";
const BASE = process.env.BASE ?? "https://ahmaddomiedu.com";
const ORIGIN = "https://ahmaddomiedu.com";
const dec = (s) => s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");
const strip = (s) => dec(s.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<style[\s\S]*?<\/style>/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const norm = (u) => { try { const x = new URL(u, ORIGIN); if (x.origin !== ORIGIN) return null; x.hash = ""; let p = x.pathname.replace(/\/+$/, "") || "/"; return ORIGIN + (p === "/" ? "/" : p) + x.search; } catch { return null; } };

async function get(url, hops = []) {
  const r = await fetch(url.replace(ORIGIN, BASE), { redirect: "manual" });
  if (r.status >= 300 && r.status < 400) {
    const loc = new URL(r.headers.get("location"), url).toString().replace(BASE, ORIGIN);
    if (hops.length > 5) return { status: r.status, hops, final: loc, html: "" };
    return get(loc, [...hops, { status: r.status, to: loc }]);
  }
  return { status: r.status, hops, final: url, html: r.status === 200 && /text\/html/.test(r.headers.get("content-type") ?? "") ? await r.text() : "" };
}

function parse(html) {
  const head = html.match(/<head[\s\S]*?<\/head>/)?.[0] ?? "";
  const title = dec(head.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? "");
  const meta = (n) => dec(head.match(new RegExp(`<meta[^>]+name="${n}"[^>]+content="([^"]*)"`))?.[1] ?? head.match(new RegExp(`<meta[^>]+content="([^"]*)"[^>]+name="${n}"`))?.[1] ?? "");
  const canonical = head.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/)?.[1] ?? "";
  const hreflang = [...head.matchAll(/<link[^>]+rel="alternate"[^>]+hreflang="([^"]+)"[^>]+href="([^"]+)"/g)].map((m) => [m[1], m[2]]);
  const body = html.slice(html.indexOf("</head>"));
  const h1 = [...body.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => strip(m[1]));
  const h2 = [...body.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]));
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return { __error: true }; } });
  const types = []; const walk = (o) => { if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === "object") { if (o["@type"]) types.push(...[].concat(o["@type"])); Object.values(o).forEach(walk); } }; walk(ld);
  const main = body.match(/<main[\s\S]*?<\/main>/)?.[0] ?? body;
  const text = strip(main);
  const links = [...main.matchAll(/<a\s[^>]*href="([^"#][^"]*)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: dec(m[1]), text: strip(m[2]) }));
  const allLinks = [...body.matchAll(/<a\s[^>]*href="([^"#][^"]*)"/g)].map((m) => dec(m[1]));
  const imgs = [...body.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
  return {
    title, description: meta("description"), robots: meta("robots"), canonical, hreflang, h1, h2count: h2.length, h2: h2.slice(0, 40),
    ldTypes: [...new Set(types)], ldErrors: ld.filter((x) => x.__error).length, words: text.split(/\s+/).filter(Boolean).length,
    links, allLinks, imgCount: imgs.length, imgNoAlt: imgs.filter((i) => !/\salt="[^"]+"/.test(i)).length,
    scripts: [...html.matchAll(/<script[^>]+src="([^"]+)"/g)].map((m) => m[1]), lang: html.match(/<html[^>]+lang="([^"]+)"/)?.[1] ?? "",
    htmlBytes: Buffer.byteLength(html),
  };
}

const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const sitemap = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => norm(m[1]));
const queue = [...sitemap]; const seen = new Set(queue); const pages = {};
let active = 0;
await new Promise((resolve) => {
  const pump = () => {
    while (active < 8 && queue.length) {
      const u = queue.shift(); active++;
      get(u).then((r) => {
        pages[u] = { status: r.status, hops: r.hops, final: r.final, inSitemap: sitemap.includes(u), ...(r.html ? parse(r.html) : {}) };
        for (const l of pages[u].allLinks ?? []) { const n = norm(l); if (n && !seen.has(n) && !/\.(png|jpg|jpeg|webp|svg|ico|pdf|txt|xml|json|css|js|mp4)(\?|$)/i.test(n) && !n.includes("/_next/") && !n.includes("/documents/")) { seen.add(n); queue.push(n); } }
      }).catch((e) => { pages[u] = { status: 0, error: String(e) }; }).finally(() => { active--; if (!queue.length && !active) resolve(); else pump(); });
    }
  };
  pump();
});
mkdirSync("sources/audit", { recursive: true });
writeFileSync("sources/audit/seo_crawl.json", JSON.stringify({ base: BASE, at: new Date().toISOString(), sitemap, pages }, null, 1));
console.log(`crawled ${Object.keys(pages).length} URLs (${sitemap.length} in sitemap)`);
