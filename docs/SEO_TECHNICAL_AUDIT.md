# SEO technical audit — `https://ahmaddomiedu.com`

Audit date 2026-10-06 (Phase 4). Method: `scripts/seo/crawl.mjs` fetched every sitemap URL plus every internal link it found (233 URLs) from production, recorded status, redirect hops, head tags, headings, JSON-LD, links and script weight; `scripts/seo/analyze.mjs` computed duplicates, click depth and inbound links. Lighthouse 12 (mobile, default throttling) was run on production for four representative pages. The same crawl was repeated after the fixes (local build first, then production).

Rerun any time: `node scripts/seo/crawl.mjs && node scripts/seo/analyze.mjs`.

## Result in one table

| Check | Before | After |
|---|---|---|
| Sitemap URLs / all return 200 | 232 / yes | 228 / yes |
| Pages in sitemap that redirect, are noindex, or have a mismatched canonical | 0 | 0 |
| Duplicate titles / meta descriptions / H1 (within one language) | 0 / 0 / 0 | 0 / 0 / 0 |
| Concept titles: median, max, over 70 characters | 116, 159, 191 of 196 | **54, 75, 7 of 196** |
| Concept descriptions: median, max, over 160 characters | 197, 307, 169 of 196 | **129, 145, 0 of 196** |
| Pages with exactly one H1 | all | all |
| Invalid JSON-LD | 0 | 0 |
| Broken internal links / links that hit a redirect | 0 / 0 | 0 / 0 |
| Maximum click depth from the home page | 2 | 2 (21 pages at depth 1, 206 at depth 2) |
| Orphan pages (no link from main content) | 0 | 0 (fewest inbound links to any concept page: 4) |
| Images without alt | 26 (`/videos` thumbnails) | 0 |
| Thin stub pages in the sitemap (< 25 words) | 4 (2 projects × 2 languages) | 0 (now `noindex`, out of the sitemap) |
| Lighthouse mobile (4 pages) | — | performance 93–95, accessibility 100, best practices 100, SEO 100 |

## Findings

### CRITICAL
None. Every sitemap URL returns 200, every page has one self-referencing canonical on the apex host, `robots.txt` allows all crawling and lists the sitemap, `www` and `http` redirect with 308 to the apex, the three Phase 2C merges redirect with 308, there are no redirect chains, soft 404s or noindex pages in the sitemap, and nothing from the private source folders is reachable (`/sources/*` returns 404 or redirects to a 404).

### HIGH (fixed)
1. **Title tags were far too long** (concept titles median 116, up to 159 characters; formed as *H1 + English title + site suffix*) so Google would truncate them mid-phrase and the English term and BTEC context at the end would be lost. **Fix:** every indexable page now has a hand-written, intent-first title (median 54, max 75) from `data/seo-intent-map.json`; pattern in `docs/SEO_INTENT_MAP.md`.
2. **Meta descriptions were the page summary** (up to 307 characters, 169 pages over 160). **Fix:** hand-written descriptions of 70–145 characters, answer first, Arabic + English terms, BTEC context.
3. **Two portfolio projects were indexable stubs** (`securemonitor`, `digital-immune-system-iot`: 15 and 20 words, English and Arabic = 4 URLs) while a third, the Asas calculator write-up, shared its name with the real tool page `/btec-calculator`. **Fix:** projects without a case study are `noindex, follow` and removed from the sitemap; the calculator write-up is titled «دراسة حالة مشروع: حاسبة معدل أساس BTEC» so the tool page owns «حاسبة معدل BTEC».
4. **Hub pages were weak authority pages** (`/btec-it` 415 words; `website-development` 483 words; the others mostly lists). **Fix:** every unit hub now adds a reading order, real student questions, the unit's glossary terms and links to the assessment-writing pages; `/btec-it` gained «من أين أبدأ؟» with question-style anchors. Hub word counts rose (cyber-security 2,823 → 3,034; `/btec-it` 415 → 716).

### MEDIUM
1. `/videos` said «العنوان الأصلي» but the YouTube titles were rewritten in the previous phase, so the page showed outdated titles. **Fixed:** the 26 titles in `content/videos/videos.json` were refreshed from YouTube's public oEmbed endpoint and the label now reads «على YouTube».
2. `/videos` thumbnails had empty alt text (26). **Fixed:** descriptive alt per lesson.
3. Hub `CollectionPage` schema declared the **author** as the page topic (`about`). **Fixed:** `about` is now the unit/BTEC IT topic.
4. **Not changed — decision recorded:** the full `Person` node is repeated inside the JSON-LD graph of 201 pages (about 1 KB each) and every `TechArticle.image` is the author photo. The repetition is valid (same `@id`) and keeps the entity complete on each page; the image should become a per-page social image when one is designed. No fake or unsupported properties were added (no reviews, ratings, FAQ, Course or Product markup).
5. **Not changed:** the 14 project pages have no JSON-LD; they are portfolio pages, not part of the BTEC knowledge graph.

### LOW
- Eight concept titles are 71–75 characters and nine non-concept descriptions (portfolio, `/en`) exceed 170; acceptable, truncation there does not hide the intent.
- `TechArticle` carries `dateModified` (from `lastReviewed`) but no `datePublished`; the publish date is unknown and was deliberately not invented.
- The sitemap emits `lastModified` from each page's `lastReviewed`, so IndexNow's diff does not see title-only edits; `scripts/indexnow.mjs --send --all` is used after bulk SEO edits.

## Structured data audit

Types in use across the 228 pages: `WebSite` (+`SearchAction`), `Person` (+`PostalAddress`, `CollegeOrUniversity` as `alumniOf`, `Organization` as `affiliation`), `ProfilePage` (about, /en), `TechArticle` (196) with `DefinedTerm` as `about`, `BreadcrumbList` (211), `CollectionPage` + `ItemList` (hubs), `DefinedTermSet` (glossary), `VideoObject` (19 pages) with `Clip` chapters on the 11 videos that have verified chapters, `WebApplication` with a free `Offer` (calculator). `Product`/`Offer` for the card is emitted **only** when a confirmed price is switched on (currently hidden), so there is none today. No errors in any parsed block. Nothing in the markup claims reviews, ratings, FAQ, or an unsupported `Course`.

## Performance

Lighthouse 12, mobile profile, production, 2026-10-06:

| Page | Perf | A11y | Best practices | SEO | LCP | TBT | CLS |
|---|---|---|---|---|---|---|---|
| `/` | 94 | 100 | 100 | 100 | 2.9 s | 100 ms | 0 |
| `/btec-it` | 95 | 100 | 100 | 100 | 2.8 s | 70 ms | 0 |
| `/btec-it/cyber-security` | 93 | 100 | 100 | 100 | 2.9 s | 160 ms | 0 |
| `/btec-it/cyber-security/threat-vulnerability-risk` | 95 | 100 | 100 | 100 | 2.8 s | 50 ms | 0 |

Raw reports are kept privately in `sources/audit/lh/`. The earlier 70–85 range no longer applies: scores are 93–95 with **zero layout shift**. JavaScript is about 190 KB compressed per page (10 chunks), the single stylesheet is about 10 KB, the Arabic font uses `display: optional` and is preloaded, the YouTube iframe is `loading="lazy"` and privacy-enhanced, and there is no client-only content (all text is in the server HTML). The LCP element is the short-answer paragraph; the lab LCP of ~2.8 s is dominated by simulated 4G time-to-first-byte (~1 s) plus one render-blocking stylesheet. No change was made: every option (inlining CSS, dropping the font) trades Arabic typography or HTML size for a few Lighthouse points.

## Mobile and accessibility

Lighthouse accessibility is 100 on all measured pages; the Playwright suite exercises a mobile viewport (counters, layout); headings are hierarchical, tables have captions, tap targets are ≥ 44 px, and the new hub sections use the same components.

## Internal links

All 196 concept pages are within two clicks of the home page and have at least four inbound links from main content (median 7). Eighteen curated links were added where a real semantic relationship was missing (for example Threat/Vulnerability/Risk → risk-management, system vulnerabilities and the threat-analysis writing page; AI vs ML vs DL → types of AI, supervised/unsupervised, neural networks; the Explain → Analyse → Evaluate writing chain; Pass/Merit/Distinction → the three writing pages). Anchors are descriptive (the page's own title or the question it answers); there are no «اقرأ المزيد» / «هنا» anchors and no empty anchors.
