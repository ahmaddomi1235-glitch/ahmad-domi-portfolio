# SEO measurement

Search Console and Bing are brand new for this site, so most numbers below are **not available yet**. Nothing here is estimated; empty cells are empty because the data does not exist yet. Re-fill the baseline table at day 7, 14, 30.

## Baseline (recorded 2026-10-06, read from the signed-in consoles)

| Metric | Google Search Console (`sc-domain:ahmaddomiedu.com`) | Bing Webmaster Tools |
|---|---|---|
| Property status | Verified (Domain property) | Site added; verified through the Search Console import |
| Sitemap | `https://ahmaddomiedu.com/sitemap.xml` — read 05/10/2026, «تم الإجراء بنجاح», **232 pages discovered**, 0 videos discovered. The sitemap now holds **228** URLs (4 stub pages left it) — Google re-reads it on its own schedule | Submitted 06/10/2026, status **Processing**, URLs discovered: not shown yet |
| Indexed URLs | Not available — the Pages report says the data is being processed, re-check in about a day | Not available |
| Excluded URLs | Not available | — |
| Impressions / clicks / CTR / average position | **No data** — the Performance report says «لا تتوفر أي بيانات» | Reports take up to ~48 hours |
| URL Inspection baseline | — | `/`: **Discovered but not crawled** (discovered 06 Oct 2026). `/btec-it`: **Discovered but not crawled**. `/btec-it/cyber-security/threat-vulnerability-risk`: **Not discovered** (before the IndexNow submission was processed) |
| IndexNow | n/a | 232-URL initial submission (HTTP 200) on 2026-10-06; 232 more after the SEO rewrite (HTTP 200). State in `scripts/indexnow-state.json` |

Site-side baseline (from `scripts/seo/crawl.mjs` against production, after the Phase 4 deploy): 228 sitemap URLs, all 200; 0 duplicate titles/descriptions/H1s; every page has one canonical and valid JSON-LD; maximum click depth 2; no broken or redirecting internal links; titles median 54 characters.

## Metrics to track

**Coverage**: indexed URLs; excluded URLs by reason (Google «الصفحات» report; Bing Site Explorer); sitemap discovered vs indexed; crawl errors.

**Performance (Google Performance report, Search type = Web)**
- Impressions, clicks, CTR, average position — site total and per page.
- **Branded**: queries matching `أحمد دومي|احمد دومي|ahmad domi|ahmaddomi|domiedu` (use *Query → matches regex*).
- **Non-branded**: the same filter with *doesn't match regex*.
- **Informational**: queries matching `ما هو|ما هي|شرح|الفرق بين|كيف|what is|vs|difference`.
- **Commercial / local**: queries matching `مدرس|معلم|خصوصي|بطاقة|الأردن|إربد|jordan|teacher|tutor|card`.
- **BTEC-technical mixed**: queries containing Latin characters *and* Arabic (regex `[a-z].*[ء-ي]|[ء-ي].*[a-z]`).
- **Striking distance**: queries with average position 4–20 (sort by impressions) — improve those pages first.
- **Impressions without clicks**: pages with impressions ≥ 100 and CTR < 1% → rewrite title/description from `scripts/seo/seo_copy.py`.
- **Falling pages**: compare last 28 days with the previous 28 per page; investigate any −30% impressions.
- **New queries**: queries first seen in the last 28 days (compare exports) — feed the intent map's secondary queries and the FAQ-style sections.

**Quality of the page set**: monthly run of `node scripts/seo/crawl.mjs && node scripts/seo/analyze.mjs` (duplicates, depth, orphans, broken links); `npm run test:unit` gates titles/descriptions.

## Cadence

| When | Do |
|---|---|
| Day 2–3 | Confirm Bing sitemap «URLs discovered» and the three URL Inspection baselines; confirm Google Pages report has populated |
| Day 7 | Record indexed/excluded counts in both consoles. Investigate «Discovered – currently not indexed» (usually patience, then internal links) |
| Day 14 | First Performance read: branded vs non-branded; first queries; check hub pages and the top 5 HIGH-priority concepts |
| Day 30 | Full review (below), then update `data/seo-intent-map.json` titles for pages with impressions but low CTR |
| After any material page change | `npm run indexnow` (dry run) then `-- --send`. Do **not** mass-use «Request indexing» in Google |

## What to watch in the first 30 days

1. **Indexing speed of the 196 concept pages** — if fewer than half are indexed by day 30, strengthen internal links from the hubs and the most-linked pages before publishing anything new.
2. **The head terms** — rank/impressions for «شرح BTEC IT بالعربي» (hub), «الفرق بين التهديد والثغرة والمخاطرة», «الفرق بين AI وMachine Learning وDeep Learning», «Pass Merit Distinction», «حاسبة معدل BTEC».
3. **Cannibalisation pairs** — the MEDIUM families in `docs/SEO_INTENT_MAP.md`: if two URLs of a family trade places for the same query, sharpen the weaker page's title or fold it into the stronger one.
4. **Commercial/local** — any impression for «مدرس BTEC IT» queries; if none appear by day 30, the missing piece is the service page (R2 in `docs/SEO_COMPETITOR_GAPS.md`), not more concept pages.
5. **Stub project pages** now `noindex` — confirm they drop out of the index.
