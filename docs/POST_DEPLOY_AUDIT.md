# Post-deploy audit — `https://ahmaddomiedu.com`

Audited **2026-10-04** against Vercel production deployment `ahmaddomiporfolio-…` (aliased to `ahmaddomiedu.com`, state READY).

**Overall: the application is deployed and verified; the domain is not live to the public yet.** Cloudflare has no DNS records for it, so `https://ahmaddomiedu.com` cannot resolve until the two A records in `docs/DOMAIN_AND_DEPLOYMENT.md` exist. Everything that does not depend on DNS passed.

## How this audit was done (and its limits)

DNS is empty and, on the machine that ran this audit, TLS to every `*.vercel.app` host is reset by the network (the card platform's README mentions the same blocking on some Jordanian networks). So the live site was audited **through Vercel's edge**: HTTP to `76.76.21.21` with `Host: ahmaddomiedu.com` (the same edge, routing and deployment that the domain will use). Anything needing real HTTPS/DNS is marked accordingly instead of being assumed.

Local verification used the identical production build: `npm run verify` (lint, typecheck, content validation, 17 unit tests, build), 36 Playwright e2e tests, axe-core (WCAG 2.1 A/AA) and Lighthouse.

## Results

| # | Criterion | Result | Evidence |
| --- | --- | --- | --- |
| 1 | **HTTPS** | ❌ **FAIL (pending DNS)** | TLS handshake to the domain fails: Vercel cannot issue the certificate until the domain resolves to it. HTTP→HTTPS redirect and HSTS will be added by Vercel once the certificate exists. |
| 2 | **DNS** | ❌ **FAIL (pending Cloudflare access)** | Nameservers are Cloudflare's (`aitana`, `dion`); no A/AAAA records. Required records read from Vercel: `A @ 76.76.21.21`, `A www 76.76.21.21`, DNS-only. Domain is attached to the Vercel project (apex + www). |
| 3 | **Canonical** | ✅ PASS | 54 crawled pages → 54 canonical tags, all `https://ahmaddomiedu.com…`, each equal to its own URL, none duplicated. Constant in `src/config/site.ts`, so preview URLs canonicalise to production too. |
| 4 | **Redirects** | ⚠️ PARTIAL | ✅ `/ar → /` 308 (live). ✅ `www.ahmaddomiedu.com → https://ahmaddomiedu.com/…` 308 (e2e, local; cannot be exercised live until `www` resolves). ⏳ `ahmaddomiporfolio.vercel.app → apex` intentionally **not enabled** (it would break the working site before DNS); activation steps are in the deployment doc. Old portfolio URLs (`/en`, `/projects/*`, `/en/projects/*`) are unchanged and 200. |
| 5 | **Title** | ✅ PASS | 54/54 unique, descriptive titles (e.g. `أحمد دومي \| Ahmad Domi — مدرّس BTEC IT في الأردن`). English project pages fixed during the audit (they duplicated Arabic titles). |
| 6 | **Visible Arabic text in HTML** | ✅ PASS | Every page is statically generated; `<html lang="ar" dir="rtl">`; the home page text, concept short answers and Q&A are in the initial HTML (e2e fetches raw HTML without JS). The only client JS is the portfolio menu/animations, search and calculator. |
| 7 | **Schema (JSON-LD)** | ✅ PASS | 35 blocks on 54 pages, all valid JSON with `@context` and typed nodes: `WebSite`+`Person` (home), `ProfilePage`, `TechArticle`+`BreadcrumbList`+`VideoObject`(+`Clip` chapters), `DefinedTermSet`, `WebApplication`, `CollectionPage`, `WebPage` (card). Breadcrumb names asserted by e2e. No reviews/ratings/FAQPage; Product/Offer correctly **absent** (price unconfirmed). Not yet run through Google's Rich Results Test (needs public HTTPS). |
| 8 | **Sitemap** | ✅ PASS | `/sitemap.xml` lists 53 canonical URLs on the production host (no `/search`, no drafts), unique, `lastModified` from content dates. |
| 9 | **robots.txt** | ✅ PASS | `User-Agent: * / Allow: /` + sitemap line; no accidental blocks; no noindex on indexable pages (only `/search` is `noindex`). |
| 10 | **Page source** | ✅ PASS | One `<h1>` per page, semantic landmarks, skip link, breadcrumbs as `<nav><ol>`, `rel="author"`/`rel="me"` links, security headers (`nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`), `X-Powered-By` removed, edge cache `HIT`. |
| 11 | **Mobile** | ✅ PASS (local) | No horizontal overflow at 320 px on 7 knowledge pages + the English portfolio (e2e); axe clean at 375 px on all pages. Live mobile rendering can't be exercised until DNS. |
| 12 | **Performance** | ⚠️ PASS with notes | Lighthouse mobile, devtools throttling (1.6 Mbps, 4× CPU) on the production build: **CLS 0 on all pages**; performance **84** home, **78** concept page, **86** calculator, **64** `/about` (legacy portfolio with heavy imagery and animation — not optimised in this milestone). Accessibility, best-practices and SEO scores are **100** on every page measured. First paint ≈ 2.7–3.3 s is the lab's harsh throttle (React/Next runtime ≈ 230 KB); real-user figures on Vercel's CDN need measuring after DNS (Search Console Core Web Vitals, or `docs/ANALYTICS.md`). |
| 13 | **Internal links** | ✅ PASS | Crawled from the sitemap through all links: 54 distinct paths, 1,832 internal link references, **0 broken** (every path 200; deliberate unknown path 404). |
| 14 | **Card page** | ✅ PASS | `/btec-it-card` 200; states what the card is, who it is for, which units, how to obtain it (free first video → WhatsApp booking); price hidden (`showPrice:false`) and no Product/Offer schema; does not publish card content or claim assignment answers (e2e asserts this). |
| 15 | **BTEC hub** | ✅ PASS | `/btec-it` 200; lists 6 units with real concept/video counts; honest "قيد الإعداد" list; JSON-LD `CollectionPage` + breadcrumbs. |
| 16 | Accessibility basics | ✅ PASS | axe-core WCAG 2.1 A/AA: **0 violations** on 14 pages × desktop+mobile (after fixing list/definition-list semantics, counter roles, gold-text contrast and a scrollable table in the legacy/new components). |
| 17 | 404 | ✅ PASS | Unknown paths return a real HTTP 404 with a useful page (search, hub, unit links). |
| 18 | Paid-content boundary | ✅ PASS | No `PAID` node exists in the public content; validator forbids publishing one and rejects paid-material markers; private `sources/` is git-ignored and not uploaded. |

## What changes the ❌/⚠️ rows

1. Add the two DNS records (2 minutes) → certificate issues automatically → rows 1, 2 pass.
2. Re-run: `nslookup`, `curl -I https://ahmaddomiedu.com`, `curl -I https://www.ahmaddomiedu.com` (see `docs/DOMAIN_AND_DEPLOYMENT.md`), then enable the `vercel.app` redirect → row 4 passes.
3. Submit the sitemap in Search Console / Bing (`docs/SEARCH_ENGINE_SETUP.md`) and run the Rich Results Test on the concept page → row 7 fully confirmed.
4. After a week of traffic, read Core Web Vitals in Search Console → row 12 on real users.
