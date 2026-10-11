# Phase 7 — Live SEO & GEO progress — Ahmad Domi | أحمد دومي (BTEC IT)

Measured 2026-10-10, about 24 h after the last optimization (HEAD `bda115d`, "Remove all public pricing; keep and promote the card and private lessons"). **Read-only:** nothing was changed, deployed, published, or submitted for indexing. No "Request indexing" was clicked.
Everything below is a measurement from today unless it is labelled "Oct 6" or "Oct 8". Historical numbers are only used as baselines.

## Verdict

| Question | Answer |
|---|---|
| 1. Are more BTEC pages indexed? | **Yes, sharply.** 14 of the 15 priority URLs are on Google (Oct 6: 1 of 15). Only `/private-lessons` is not. |
| 2. Are students finding Ahmad without his name? | **Partly.** In a logged-out Jordan view he ranks for 7 of 14 unbranded queries (3 of them are head terms for his hub). The commercial/local head terms «BTEC IT» and «BTEC IT الأردن» and the calculator query do not show him. Search Console cannot confirm it yet (its Performance data stops at 6 Oct: 1 click, 21 impressions). |
| 3. Do the AI engines recommend him more? | **Gemini: yes, clearly. Google AI Mode: no. Perplexity and ChatGPT: not measurable today.** Gemini names him in 7 of 30 prompts (Oct 8: 0 of 18). AI Mode names him in 0 of 23 completed (Oct 8: 1 of 30). |
| 4. Is the BTEC IT Card discoverable on its own, without a price? | **Yes.** Google shows the card page at #4 for its query, a private-lessons query at #3 is cached with the old title, and Gemini named the card unprompted (P097). No price appears on the live site, llms.txt or the search index. |
| 5. Highest-impact next action | See "Top 10 next actions", item 1: get Google to recrawl `/private-lessons` and the pages whose cached titles are still the old ones, then re-measure AI Mode. |

## 1. Version under test

Latest production deploy matches `master` at `bda115d`. Phase 6 content (confirmed commercial facts, service pages, pricing removal) is live. The production crawl on 2026-10-10 covered 229 sitemap URLs. Private copies: `sources/audit/seo_crawl.json`, `seo_an_1010.json`.

## 2. Google Search Console (read-only)

| Item | Oct 6 | Oct 10 |
|---|---:|---:|
| Priority URLs indexed (of 15) | 1 | **14** |
| Not on Google | 14 | 1 (`/private-lessons`) |
| Page Indexing report | no data | **stale** (last updated 3 Oct), do not use it for counts |
| Performance | no data | data only through 6 Oct: **1 click, 21 impressions** |

Caveat: the URL Inspection results are the live truth; the aggregate reports lag. Branded/non-branded, Jordan, commercial/informational splits cannot be computed from 21 impressions and are not reported. Re-read Performance around Oct 14–17.

## 3. Clean public search (logged-out, Jordan, personalization off)

Visible for: «شرح BTEC IT بالعربي», «مدرس BTEC IT الأردن», «مدرس BTEC IT إربد», «شرح مهمات BTEC IT», «شرح الأمن السيبراني BTEC», «Pass Merit Distinction BTEC عربي», «شرح معايير P M D BTEC» (**7 of 14**). Other observed positions: AI hub #5; card page #4; «خصوصي BTEC IT الأردن» #3 (cached title). Absent: «BTEC IT», «BTEC IT الأردن», «حاسبة معدل BTEC».
Positions are single observations from one network and are not claims of rank stability. No "#1" claim is made.
Signed-in Chrome results were discarded as personalized.

## 4. Pricing compliance

Scanned the sitemap pages, `llms.txt` and `search-index.json`: no price anywhere; JSON-LD `Product` and `Service` for the card and lessons carry no `Offer`. The card and private lessons are still promoted. The one place an old price could appear is a cached Google/AI snippet; none was observed.

## 5. AI recommendation cohort (fixed 30 prompts)

Denominators are tests actually completed. Logged-out, fresh session per prompt.

| Platform | Completed today | Named Ahmad | Site cited | Oct 8 baseline (same cohort) |
|---|---:|---:|---:|---|
| Gemini (Flash-Lite) | **30 / 30** | **7 (23%)** | at least 3 (P001, P018, P061) | 0 named of 18 completed |
| Google AI Mode | 23 / 30 | 0 | 0 | 1 named of 30 |
| Perplexity | 1 / 30 | 0 | 0 | 0 of 30 |
| ChatGPT | 0 / 30 | not tested | — | 0 of 30 |

- **Gemini named him in:** P001 (twice, a repeat in a fresh chat also named him), P017, P018, P019, P061, P069, P097. Matched comparison on the 18 prompts Gemini completed on both dates: **0/18 → 4/18** (P001, P017, P019, P097).
- **Commercial group on Gemini:** the card prompt (P097) named him; price prompt (P091), online lessons (P092) and report review (P095) did not (1 of 4). Oct 8 commercial rate across all platforms was 0 of 23.
- **AI Mode:** 23 completed before Google served a CAPTCHA; I stopped there and did not bypass it. The 7 not completed include all 4 commercial prompts. In the answers I persisted, the named options were other tutors and local marketplaces.
- **Perplexity:** its anonymous limit stopped it after one answer. **ChatGPT:** the anonymous session failed bot verification. Neither is counted as a test.
- Answers vary run to run. Only P001 on Gemini was repeated (stable 2/2). Everything else is one run.
- Raw excerpts: `sources/audit/phase7/raw_batch01.txt`, `raw_gemini_2026-10-10.txt` (private; excerpts only, phone numbers redacted; the AI Mode run beyond the first four prompts was not persisted).

## 6. Gap investigation

| Pattern | Evidence | Likely class |
|---|---|---|
| Gemini names him when the prompt asks for Arabic resources, explanations, the card or the AI unit; not for generic teacher/tutor, assignment-help or Pass/Merit/Distinction wording | 7 hits cluster in P001, P017–P019, P061, P069, P097 | Topical matching: the pages answer those, and the entity is known to Gemini |
| AI Mode and Perplexity still draw on marketplaces and social groups (OpenSooq, Facebook, Instagram, Ostathi) for "tutor" prompts | persisted AI Mode answers | Third-party corroboration: no independent source lists him as a tutor |
| `/private-lessons` not on Google; «خصوصي» result shows the old cached title | URL Inspection, SERP | Indexing/retrieval lag |
| Calculator and «BTEC IT» head terms absent | SERP | Retrieval and authority; head terms need more time |
| Pass/Merit/Distinction and calculator prompts not naming him on Gemini | P031–P033, P037, P045 | Unknown: the pages exist and rank on Google; may be recency |
| Perplexity and ChatGPT unmeasured | blocked | Unknown |

## 7. Top 10 next actions (no price publishing, no repeats of finished work)

1. **Wait for and verify Google's recrawl of `/private-lessons`** and the cached-title pages; re-inspect read-only on Oct 13. If still absent on Oct 17, add one internal link to it from the card page and the home page body (content, not price).
2. Re-measure Google AI Mode for the 7 missing prompts after the owner clears the CAPTCHA, or from a clean Incognito window.
3. Retry Perplexity and ChatGPT on Oct 12–14 once their anonymous limits reset, using the same 30 prompts.
4. Re-read GSC Performance on Oct 14–17 and split branded/non-branded, Jordan, commercial/informational then.
5. Strengthen the pages behind the Gemini misses: the Pass/Merit/Distinction and calculator pages should open with a one-sentence direct answer naming the site, the way the hits' pages do.
6. Give the card page one more independent corroboration that is natural for the business (for example the YouTube channel description and pinned comments pointing to it).
7. Run IndexNow for any page whose title changed since the last submission (`npm run indexnow` dry run first).
8. Use the Bing "AI Performance (BETA)" and IndexNow report at day 14 to see whether Copilot-side citations are appearing.
9. Repeat the 30-prompt Gemini run in a week to measure stability; the one repeated prompt was stable.
10. Check that no cached snippet shows an old price (search the card and lessons queries on Oct 17).

## 8. Dashboard

| Metric | Oct 6 | Oct 8 | Oct 10 |
|---|---:|---:|---:|
| Priority URLs indexed | 1 / 15 | — | **14 / 15** |
| Unbranded queries where he is visible (logged-out) | — | — | 7 / 14 |
| Gemini named | — | 0 / 18 (cohort) | **7 / 30** |
| AI Mode named | — | 1 / 30 | 0 / 23 |
| Perplexity named | — | 0 / 30 | 0 / 1 |
| ChatGPT named | — | 0 / 30 | not tested |
| Commercial prompts naming him (all platforms) | — | 0 / 23 | 1 / 4 on Gemini; AI Mode not completed |
| GSC clicks / impressions | no data | — | 1 / 21 (through 6 Oct) |

## 9. What this report does not claim

No ranking is claimed as #1. No AI model unavailable today is counted. Bing Webmaster figures are not included in this summary and should be re-read in the console. Search Console conclusions are limited by its reporting lag.
