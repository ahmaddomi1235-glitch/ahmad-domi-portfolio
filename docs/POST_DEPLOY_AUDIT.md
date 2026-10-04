# Post-deploy audit — `https://ahmaddomiedu.com`

**Final live-domain audit: 2026-10-04, after DNS, certificate and redirects went live.** (An earlier pre-DNS pass audited the same deployment through Vercel's edge; its findings are superseded by this one.)

**Overall: live, HTTPS-enforced, canonical on the apex, 53 indexable pages, 0 crawl problems.** Items still needing the owner are listed at the end.

## Method

- DNS: `nslookup` against 1.1.1.1 and the local resolver; `vercel domains inspect`; `vercel certs ls`.
- Certificate: Vercel issued it on request (`vercel certs issue ahmaddomiedu.com www.ahmaddomiedu.com`, 90 days, auto-renew).
- **Public HTTPS crawl** (`fetch` over `https://ahmaddomiedu.com`, redirects not followed): started from the home page and the sitemap, followed every internal link, then HEAD-checked every linked asset (PDFs, images, fonts, CSS/JS).
- Independent vantage check: the home page was fetched by an external fetcher (not this machine) and returned the expected Arabic title and content.
- Quality tooling on the same build: `npm run verify`, 37 Playwright e2e tests, axe-core (WCAG 2.1 A/AA), Lighthouse against the **live** domain.

## Results

| # | Criterion | Result | Evidence |
| --- | --- | --- | --- |
| 1 | **DNS** | ✅ PASS | `ahmaddomiedu.com` and `www` → `76.76.21.21` (1.1.1.1 and the local resolver agree); Cloudflare stays authoritative (`aitana`/`dion`), DNS-only records. Vercel lists both domains on project `ahmaddomiporfolio`. |
| 2 | **HTTPS / certificate** | ✅ PASS | Valid certificate covering apex + `www` (`cert_YnlSEO…`, 90 days, auto-renew). `Strict-Transport-Security: max-age=63072000` on every response. |
| 3 | **HTTP → HTTPS** | ✅ PASS | `http://ahmaddomiedu.com/btec-it` → 308 → `https://ahmaddomiedu.com/btec-it`. |
| 4 | **www → apex (canonical host)** | ✅ PASS | `https://www.ahmaddomiedu.com/btec-it/cyber-security` → 308 → `https://ahmaddomiedu.com/btec-it/cyber-security`. `http://www…` → 308 → `https://www…` → 308 → apex (two hops, both permanent). |
| 5 | **Old Vercel URL → canonical** | ✅ ENABLED, ⚠️ not observable live from here | Rule deployed (`ahmaddomiporfolio.vercel.app` → `https://ahmaddomiedu.com/:path*`, 308, exact host only so preview URLs are unaffected); e2e test asserts the 308 and exact destination; the latest production deployment holds that alias. Both this machine and the external fetcher get a TLS reset from every `*.vercel.app` host, so the live hop itself could not be watched — check once from a normal browser. |
| 6 | **Canonical tags** | ✅ PASS | 59/59 crawled pages: canonical equals the page's own apex URL, all unique. |
| 7 | **Titles / descriptions / H1** | ✅ PASS | 59 unique titles, descriptions present, exactly one `<h1>` per page, `lang="ar" dir="rtl"`. |
| 8 | **Visible Arabic text in HTML** | ✅ PASS | Statically generated; text present in the raw HTML (e2e fetches without JS). |
| 9 | **Structured data** | ✅ PASS | 35 JSON-LD blocks, all valid with `@context` and typed nodes: WebSite 1 · Person 24 · ProfilePage 2 · CollectionPage 10 · BreadcrumbList 32 · TechArticle 19 · VideoObject 18 · DefinedTermSet 1 · WebApplication 1 · WebPage 1. No review/rating/FAQ schema; Product/Offer absent by design. Google's Rich Results Test not yet run (owner login not needed, but it is a manual web tool). |
| 10 | **sitemap.xml** | ✅ PASS | 53 URLs, all https apex, all 200, unique; `/search` (noindex) correctly excluded; `lastModified` from content dates. |
| 11 | **robots.txt** | ✅ PASS | `User-Agent: * / Allow: /` + `Sitemap: https://ahmaddomiedu.com/sitemap.xml`. No accidental blocks; only `/search` carries `noindex`. |
| 12 | **llms.txt** | ✅ PASS | 200 `text/plain`, lists all 19 concept URLs; documented as a convenience, not a ranking mechanism. |
| 13 | **Pages crawled** | ✅ PASS | 59 crawled (58 indexable + `/search`): home, `/btec-it`, 7 unit hubs, 23 concept pages, questions, glossary, calculator, card, videos, resources, about, `/en`, 9 project pages × 2 languages. All 200. |
| 14 | **Internal links & assets** | ✅ PASS | 2,730 internal link references; **0 broken pages**; 31 assets (PDFs, images, fonts, CSS/JS) HEAD-checked, **0 failures**. |
| 15 | **404 behaviour** | ✅ PASS | Unknown path, unknown concept and unknown unit all return a real HTTP 404 with a useful page (search, hub, unit links). `/ar` → 308 → `/`. |
| 16 | **BTEC IT Card page** | ✅ PASS | 200; what it is, who for, units, how to obtain; price hidden; no Product/Offer schema; no card content published (e2e asserts). |
| 17 | **BTEC hub / unit hubs** | ✅ PASS | `/btec-it` and all 6 unit hubs 200, with concept/video counts, "قيد الإعداد" list and CollectionPage + breadcrumb schema. |
| 18 | **Mobile** | ✅ PASS | No horizontal overflow at 320 px (7 knowledge pages + English portfolio); axe clean at 375 px. |
| 19 | **Accessibility** | ✅ PASS | axe-core WCAG 2.1 A/AA: 0 violations on 14 pages × desktop/mobile; Lighthouse accessibility 100 on the live domain. |
| 20 | **Security headers** | ✅ PASS | `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS; `X-Powered-By` removed. |
| 21 | **Performance (live, Lighthouse mobile, simulated slow-4G + 4× CPU)** | ⚠️ PASS with improvements queued | CLS **0** everywhere. Performance: home **84**, `/btec-it` **83**, calculator **85**, concept page **70** (FCP 4.6 s — the heaviest template), `/about` **67** (legacy portfolio). Accessibility, best-practices and SEO are **100** on all five. TBT 70–300 ms. See the next-phase list for fixes. |
| 22 | **Paid-content boundary** | ✅ PASS | No `PAID` node is published; validator forbids it; private `sources/` is git-ignored and never uploaded. |

## Still requiring the owner

1. **Search Console + Bing** — verify the domain (DNS TXT in Cloudflare) and submit `sitemap.xml` (`docs/SEARCH_ENGINE_SETUP.md`). Nothing can be indexed-checked until then.
2. **Account edits** — YouTube, Instagram, LinkedIn/GitHub link-backs, Asas profile URL (`docs/YOUTUBE_GEO_MIGRATION.md`, `docs/SOCIAL_ENTITY_CHANGES.md`).
3. **Confirmations** — concept-page review, calculator rule source, card price/report-review decisions (`docs/OWNER_ACTIONS.md`).
4. One browser check that `https://ahmaddomiporfolio.vercel.app` now lands on `ahmaddomiedu.com` (from a network that is not resetting `vercel.app`).

## Phase 2A re-check (safe publication)

Re-run on the live HTTPS domain after deploying commit `bcc9612`:

- Sitemap **58** URLs (was 53); 59 pages crawled (58 indexable + `/search`), all 200, 59 unique titles and canonicals, **0 problems**.
- New: 3 project-management concept pages, the `assessment` unit and its general report-writing summary; `data-quality` expanded; official Unit 11 structure (aim titles + criterion codes only) on the cyber-security hub.
- JSON-LD: 23 TechArticle, 40 blocks, no review/rating/FAQ types. 404s, redirects, robots, llms.txt (23 concepts) and HSTS unchanged. No asset failures.
- Gates: validate 0 errors, lint and typecheck clean, 17 unit tests, 41 e2e tests, build OK.
