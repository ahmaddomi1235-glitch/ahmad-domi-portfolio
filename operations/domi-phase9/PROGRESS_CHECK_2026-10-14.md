# Phase 9B — live AI-visibility and indexing check (2026-10-14, pass 2)

Read-only. Nothing was edited, deployed, requested for indexing or submitted. Measured 2026-10-14 about 23:05Z–23:46Z, about 12.5 hours after the Phase 9 deploy (production 10:33:22Z, aliased 10:35:35Z). Sources: Google Search Console and Bing Webmaster Tools through the owner's signed-in Chrome (read-only), public ChatGPT / Perplexity / Gemini signed out in the built-in browser.

An earlier pass the same day is kept as `PROGRESS_CHECK_2026-10-14_pass1.md`. Where the two differ, see section 12. This pass (2) has verified Google/Bing crawl dates for all 16 URLs; pass 1 marked many as UNKNOWN.

## 0. Headline

| Question | Answer |
|---|---|
| Any model recommended Ahmad by name on an assignment-help prompt? | **No.** ChatGPT 0/30. Perplexity 0/1 answered. Gemini NOT TESTED in this pass. |
| Were the updated pages crawled? | **No** for all 9 Phase 9 pages and the E2 treatment page, on Google and Bing. The AI hub (E1) was recrawled by Bing on 2026-10-13 (after its deploy); Google still holds its 2026-10-08 copy. |
| Teacher/resource recommendations | Still working (4/4 tested in this pass; 5/5 in pass 1). |
| Wrong-portrait problem | Unchanged (0/4 here, 0/7 in pass 1). |
| Overall | **UNCHANGED / TOO EARLY**, no regression in assignment-help results. |

Platform limits (not worked around): ChatGPT anonymous message limit after about 38 prompts; Perplexity sign-up wall after one answer; Gemini Q01 did not finish in over 2 minutes with the pane hidden.

## 1. Project state recovered

- `FINAL_REPORT.md` / `BASELINE_2026-10-14.md`: baseline 0/89 named (ChatGPT 0/30, Gemini 0/29, Perplexity 0/30). 30 frozen prompts, hash 3547694fb160cb64.
- `IMPLEMENTATIONS.md`: 9 assessment pages changed 2026-10-14T10:33Z; IndexNow 200 (not proof of indexing). E1 hubs and E2 pages untouched in Phase 9.
- `EXPERIMENTS.md`: E1 deployed 2026-10-11T00:39Z (AI hub treatment vs cyber hub control). E2 deployed 2026-10-12T22:06Z (`report-writing-principles` treatment vs `report-introduction-and-conclusion` control). Improvement requires a named recommendation or clear citation rise on treatment with flat control, on two engines, repeated.
- The scheduled re-measure (`domi-e2-e1-remeasure`, 2026-10-17 07:00Z) was not waited for, as instructed.

## 2. Indexing and crawl status (16 URLs)

Google = Search Console URL Inspection (read-only, no Request Indexing). Bing = the read-only `inspecturl` call the Bing UI itself makes. Google dates are dd/mm in the account's local time.

| URL | Role | Changed (UTC) | Google status | Google last crawl | Bing status | Bing last crawl (UTC) | New version crawled? |
|---|---|---|---|---|---|---|---|
| `/btec-it/artificial-intelligence` | E1 treatment | 10-11 00:39 | On Google | 08/10 09:21 | Indexed | 10-13 19:32 | **Bing yes; Google no** |
| `/btec-it/cyber-security` | E1 control | untouched | On Google | 06/10 13:05 | Discovered, not crawled | none | n/a |
| `.../assessment/report-writing-principles` | E2 treatment | 10-12 22:06 | On Google | 08/10 11:11 | Indexed | 10-11 12:24 | **No (both)** |
| `.../assessment/report-introduction-and-conclusion` | E2 control | untouched | Not on Google (unknown URL) | none | Discovered, not crawled | none | n/a |
| `pass-merit-distinction` | Phase 9 | 10-14 10:33 | On Google | 09/10 07:28 | Discovered, not crawled | none | **No** |
| `command-verbs-explain-analyse-evaluate` | Phase 9 | 10-14 10:33 | On Google | 14/10 09:31 (before deploy) | Discovered, not crawled | none | **No** |
| `explain-level-p-writing` | Phase 9 | 10-14 10:33 | On Google | 07/10 13:58 | Indexed | 10-11 12:24 | **No** |
| `analyse-level-m-writing` | Phase 9 | 10-14 10:33 | On Google | 09/10 15:35 | Discovered, not crawled | none | **No** |
| `evaluate-level-d-writing` | Phase 9 | 10-14 10:33 | On Google | 07/10 14:03 | Indexed | 10-11 12:24 | **No** |
| `threat-analysis-method` | Phase 9 | 10-14 10:33 | On Google | 10/10 07:09 | Discovered, not crawled | none | **No** |
| `linking-paragraphs` | Phase 9 | 10-14 10:33 | Not on Google (unknown URL) | none | Discovered, not crawled | none | **No** |
| `report-consistency-and-repetition` | Phase 9 | 10-14 10:33 | Not indexed (discovered) | none | Indexed | 10-11 12:24 | **No** |
| `report-formatting-and-emphasis` | Phase 9 | 10-14 10:33 | Not indexed (discovered) | none | Discovered, not crawled | none | **No** |
| `/btec-it` | hub | n/a | On Google | 06/10 13:03 | Indexed | 10-11 08:25 | n/a |
| `/btec-it/private-lessons` | service | n/a | On Google | 13/10 23:02 | Discovered, not crawled | none | n/a |
| `/btec-it-card` | card | n/a | On Google | 07/10 14:02 | Discovered, not crawled | none | n/a |

Indexed pages: crawl allowed and indexing allowed = yes; user-declared canonical = the URL itself; Google-selected canonical = inspected URL. No blockers found. IndexNow 200 was not counted as indexing.

Status vocabulary: indexed-old-version = all indexed Phase 9 pages, E2 treatment, AI hub on Google. Crawled-new-version = AI hub on Bing only. Discovered-not-crawled = the Bing rows above. Unknown to Google = E2 control, linking-paragraphs.

## 3. Search Console reports

- Page Indexing (data date 8/10): 61 indexed, 171 not indexed (163 discovered-not-indexed, 4 crawled-not-indexed, 3 redirect, 1 noindex). Stale; predates the Phase 9 deploy.
- Sitemap: `sitemap.xml` read 06/10, success, 232 discovered (live sitemap now 228).
- Performance, 28 days to 12 Oct (updated about 10 hours before reading; about two days stale, **not a real zero**): 24 clicks, 470 impressions, CTR 5.1%, position 15.1. Top pages (clicks/impressions): AI hub 6/49, home 6/33, cyber hub 3/17, pass-merit-distinction 3/16, data-vs-information 1/42, calculator 1/38, assessment hub 1/26, about 1/9, card 1/8, website-development 1/8; 49 pages with impressions. Listed queries show 0 clicks (clicks come from anonymised queries); top: «انواع الذكاء الاصطناعي» 22, «ما هو الأمن السيبراني» 16. No assignment-help or brand query appears.

## 4. ChatGPT, 30 frozen prompts (primary KPI)

Fresh anonymous page per prompt, signed out, "Ask ChatGPT", one run each, 2026-10-14 about 23:15–23:50Z. Prompts contain no name or site.

**Named 0/30. Own-site citation 0/30. Other educator recommended: none.** Pearson links on Q18, N40, N41; generic tool links on N35. Citation chips with hidden URLs on CY2, Q07, Q08, Q18, N40, N41. Answer lengths (chars): Q01 1480, Q02 4131, Q03 3834, AI2 4028, Q04 3332, Q05 4321, CY2 4291, N24 9199+ (read while streaming; tail unverified), N26 6895, Q07 1494, Q08 1637, Q09 1700, Q10 4485, Q11 1098, N38 4877, GH1 4203, N36 3635, N37 2499, Q18 2052, Q19 3704, Q20 3581, N39 1396, N40 4959, N41 4443, Q13 2706, N27 5132, Q16 6149, N31 7124, N34 3684, N35 4942.

Full raw answers were not stored (pages cannot write files); stored are the structured facts above and the answer openings seen. Any answer containing the name would have been preserved in full.

## 5. Gemini and Perplexity

- Perplexity: Q01 answered (not named; chips `btec-jo-support`, `rawanbtec`); the rest hit the sign-up wall. **29/30 NOT TESTED.**
- Gemini: Q01 did not complete in this pass. **NOT TESTED in pass 2** (pass 1 recorded 28 resolved runs, 0 named; see section 12).

## 6. Experiments, separate

| Experiment | ChatGPT | Crawl state | Class |
|---|---|---|---|
| E1 AI hub vs Cyber hub | AI Q01 Q02 Q03 AI2: 0/4; Cyber Q04 Q05 CY2 N24 N26: 0/5 | AI hub crawled by Bing after deploy, not by Google | UNCHANGED (preliminary) |
| E2 report-writing-principles vs control | treatment Q07 Q08 Q18: 0/3; control Q19 Q20: 0/2 | treatment not recrawled anywhere | TOO EARLY |
| Phase 9, nine pages | 0/30 overall | 0/9 recrawled | TOO EARLY |

## 7. Teacher/resource controls (ChatGPT)

P001 named (hedged), links private-lessons. P061 named first, AI hub linked. P069 named first, AI hub linked. P049 named, private-lessons linked. P057 NOT TESTED in pass 2 (limit). Stable. Not assignment-help success.

## 8. Visual identity

P001 «AF BTEC»; P061 «AI U21 Analysis | PDF»; P069 the Asas platform's LinkedIn image; P049 none. **Correct portrait 0/4** (baseline 0/3). UNCHANGED.

## 9. Commercial accuracy (live site)

Card and private-lessons pages return 200; no amounts in text, meta or JSON-LD (card `Product` has no `offers`); report review stated as included with the card; no guarantee wording. Stale-price leak: not re-run in pass 2 (UNKNOWN). Pass 1 recorded one of two P091 runs quoting 25/35 dinar for Ahmad (stale copy outside the live page, BLOCKERS B11).

## 10. Baseline comparison

| Metric | Baseline | Current |
|---|---|---|
| ChatGPT assignment recommendations | 0/30 | 0/30 |
| Gemini | 0/29 | NOT TESTED in pass 2 (pass 1: 0/28 resolved) |
| Perplexity | 0/30 | 0/1 answered, 29 NOT TESTED |
| Teacher/resource recommendations | strong | strong |
| E1 | not demonstrated | not demonstrated (UNCHANGED, preliminary) |
| E2 | not measured | TOO EARLY |
| Phase 9 | not measured | TOO EARLY |
| Correct portraits | 0/3 | 0/4 (pass 1: 0/7) |

## 11. Final decision

1. Named in an assignment-help answer? **No.**
2. Trigger prompt: none.
3. Ahmad's page cited? No on assignment prompts; only on teacher/resource prompts.
4. Updated pages crawled? Only the AI hub on Bing (13 Oct). Not the E2 treatment, not any Phase 9 page, on Google or Bing.
5. Teacher/resource recs still working? Yes.
6. Image problem improved? No.
7. Next action: get the changed pages recrawled (Request Indexing for the nine Phase 9 URLs plus `report-writing-principles` when the Search Console quota allows; IndexNow does not reach Google), and re-run the frozen 30 only after the inspected last-crawl dates pass the deploy times. Gemini/Perplexity need the owner (visible pane, signed-in Perplexity).

Classification: CONFIRMED IMPROVEMENT none. UNCHANGED: ChatGPT assignment recommendations, portraits, teacher/resource recs, E1 (preliminary). REGRESSION: none seen on assignment prompts (stale-price leak remains an open risk from pass 1). TOO EARLY: E2, Phase 9, E1 on Google. UNKNOWN: Perplexity, Gemini in this pass, price leak in this pass.

## 12. Differences between pass 1 and pass 2

- Google crawl dates: pass 2 read them via URL inspection for all 16 URLs; pass 1 marked most UNKNOWN. Pass 2 values supersede.
- Bing crawl times: pass 1 printed 10-11 09:24 / 10-13 16:32 / 10-11 05:25 (browser-local, UTC+3 display); pass 2 lists the API's UTC values (12:24, 19:32, 08:25). These are the same events, not a contradiction.
- Gemini: pass 1 recorded 28 resolved runs (0 named); pass 2 could not get an answer. Both support "no named recommendation"; the pass 1 count was not re-verified.
- Teacher controls: pass 1 ran P057/P012/P091 (all named); pass 2 hit the ChatGPT limit before P057.
- Images: pass 1 saw 7 image-bearing answers, pass 2 saw 4; 0 correct portraits in both.
- Neither pass found any named recommendation on assignment prompts.

## 13. Limits

One run per prompt; no variance estimate. ChatGPT citation chips do not expose URLs. N24 final tail unverified. Search Console performance and indexing reports lag by 2–6 days. No indexing requests, sitemap submissions, IndexNow calls, edits or deployments were made.
