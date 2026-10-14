# Phase 9B progress check, 2026-10-14 (read-only; nothing deployed, no indexing request submitted, no external account changed)

Run after the Phase 9 deploy (production aliased 2026-10-14T10:35:35Z). The exact clock time of each AI run was not captured; all runs below happened after the deploy. Methods are the same as in `BASELINE_2026-10-14.md` (frozen set hash 3547694fb160cb64, one run per prompt, anonymous fresh sessions, ChatGPT mode A "Ask ChatGPT").

Deployments in scope: E1 2026-10-11T00:39Z (AI hub), E2 2026-10-12T22:06Z (`report-writing-principles` self-review section), Phase 9 2026-10-14T10:33Z (9 assessment pages). Phase 9 changed URLs: `/btec-it/assessment/` + pass-merit-distinction, command-verbs-explain-analyse-evaluate, explain-level-p-writing, analyse-level-m-writing, evaluate-level-d-writing, threat-analysis-method, linking-paragraphs, report-consistency-and-repetition, report-formatting-and-emphasis.

## 1. Indexing and crawling

Bing = Webmaster Tools URL inspection (signed in, read only). Google = Search Console URL inspection of domain property `sc-domain:ahmaddomiedu.com` (signed in, read only; times shown in the browser's local time).

| URL | Bing status | Bing last crawl | Google status | Google last crawl | Latest deployed version crawled? |
|---|---|---|---|---|---|
| AI hub (E1 treatment) | Indexed | 2026-10-13 16:32 | Indexed | 2026-10-08 09:21 | Bing YES (after the E1 deploy). Google NO (old version indexed). |
| Cyber hub (E1 control) | Discovered, not crawled (since 10-06) | none | Indexed | 2026-10-06 13:05 | no change to deploy; old version, unchanged page |
| report-writing-principles (E2 treatment) | Indexed | 2026-10-11 09:24 | Indexed | 2026-10-08 11:11 | NO on both: old version (before the E2 deploy) |
| report-introduction-and-conclusion (E2 control) | Discovered, not crawled | none | Not indexed (discovered, not indexed) | none | n/a (unchanged page, not indexed anywhere) |
| pass-merit-distinction | Discovered, not crawled | none | Indexed (has impressions in GSC) | UNKNOWN (my reading was unreliable) | NO on Bing; UNKNOWN on Google |
| command-verbs-explain-analyse-evaluate | Discovered, not crawled | none | Indexed (impressions) | UNKNOWN | NO on Bing; UNKNOWN on Google |
| explain-level-p-writing | Indexed | 2026-10-11 09:24 | Indexed | UNKNOWN | NO on Bing (old version); UNKNOWN on Google |
| analyse-level-m-writing | Discovered, not crawled | none | Indexed (impressions) | reading says 2026-10-14 09:31 local, which is before the 13:33 local deploy (low confidence) | NO on Bing; probably NO on Google |
| evaluate-level-d-writing | Indexed | 2026-10-11 09:24 | Indexed (impressions) | UNKNOWN | NO on Bing (old version); UNKNOWN on Google |
| threat-analysis-method | Discovered, not crawled | none | UNKNOWN | UNKNOWN | NO on Bing; UNKNOWN on Google |
| linking-paragraphs | Discovered, not crawled | none | UNKNOWN | UNKNOWN | NO on Bing; UNKNOWN on Google |
| report-consistency-and-repetition | Indexed, with a Bing SEO error "Title too long" | 2026-10-11 09:24 | UNKNOWN | UNKNOWN | NO on Bing (old version); UNKNOWN on Google |
| report-formatting-and-emphasis | Discovered, not crawled | none | UNKNOWN | UNKNOWN | NO on Bing; UNKNOWN on Google |
| /btec-it hub | Indexed | 2026-10-11 05:25 | UNKNOWN | UNKNOWN | page not part of the deploys |
| /btec-it/private-lessons | Discovered, not crawled (since 10-09) | none | UNKNOWN | UNKNOWN | n/a |
| /btec-it-card | Discovered, not crawled (since 10-06) | none | UNKNOWN (1 click / 8 impressions in GSC) | UNKNOWN | n/a |

Canonical: Bing's panel showed no canonical value ("-"). Google's inspection of the AI hub and E2 treatment showed the user-declared and Google-selected canonical equal to the page URL. Indexing allowed: yes on all inspected pages. Blockers: none found, except Bing's "Title too long" error on report-consistency-and-repetition and the Google sitemap-processing message "temporary error" seen in the AI hub's expanded details. IndexNow returned HTTP 200 on 2026-10-12 and 2026-10-14; that is not evidence of indexing.

Conclusion: no Phase 9 page and not the E2 treatment page has a verified crawl of its new version on Bing or Google. Only the AI hub (E1) has, and only on Bing.

## 2. ChatGPT, 30 frozen assignment-help prompts (mode A)

Primary KPI: unprompted named recommendation of Ahmad Domi.

Result: **0 of 30 named** (baseline 0 of 30). Own site cited in 0 of 30. Other educators recommended: none. No price quoted for him.

Per prompt (all: named=false, own site cited=false): Q01 (sources: qualifications.pearson.com), Q02, Q03, AI2, Q04, Q05, CY2, N24, N26, Q09, Q10, Q11, N38, GH1, N36, N37, N39, N40 (who.int, pearson, bcu.ac.uk), N41, Q13 (diagrams.net, lucidchart), N27, Q16, N31, N34, N35 (pagespeed.web.dev, search.google.com, validator.w3.org), Q18 (pearson), Q19, Q20, Q07, Q08. The remaining prompts cited no source. Answers were generic direct explanations, with no educator named.

Raw answers: not stored in full (the pages cannot post to a local collector, and no file was downloaded). Stored per run: id, length, named flag, site flag, hosts, image alts, first 200 characters when the name appears. This is the limit of "preserve actual responses".

## 3. Gemini and Perplexity

| Engine | Resolved runs | Named | Notes |
|---|---:|---:|---|
| Gemini (signed out, Flash-Lite) | 28 of 30 | 0 | AI2 and Q04 did not finish in the time window (unresolved, not counted). No sources shown. |
| Perplexity | 1 of 30 | 0 | Q01 answered (0 named, no source chip). From Q02 the site returned "sign up, then retry": the anonymous quota was used up by the earlier runs today. 29 prompts NOT TESTED. No login or workaround attempted. |

Baselines for comparison: Gemini 0/29, Perplexity 0/30 (the earlier Perplexity chip result, his site as a source on Q19 and Q20, could not be re-checked).

## 4. Teacher/resource control prompts (ChatGPT mode A)

| Prompt | Named | Own site cited |
|---|---|---|
| P001 | yes | yes |
| P061 | yes (first listed, "ترشيحي الأول للشرح") | yes |
| P069 | yes | yes |
| P049 | yes (it was not named earlier today) | yes |
| P057 | yes (first) | yes (+ YouTube) |
| P012 | yes | yes |
| P091 | yes | yes |

Teacher/resource visibility is stable: 5 of 5 control prompts named him. This is not evidence of assignment-help success.

## 5. Experiments, measured separately

| Experiment | Crawl condition | Result | Class |
|---|---|---|---|
| E1 AI hub vs Cyber hub | AI hub crawled by Bing 10-13 (not by Google); Cyber hub never crawled by Bing | AI prompts (Q01, Q02, Q03, AI2): ChatGPT 0/4, Gemini 0/3 resolved, Perplexity 0/1. Cyber prompts (Q04, Q05, CY2, N24, N26): ChatGPT 0/5, Gemini 0/4 resolved. No difference between treatment and control. | UNCHANGED (preliminary) |
| E2 report-writing-principles vs report-intro-conclusion | treatment NOT recrawled by Bing or Google | Q07, Q08, Q18: ChatGPT 0/3, Gemini 0/3. Q19, Q20 (control): ChatGPT 0/2, Gemini 0/2. | TOO EARLY |
| Phase 9 (9 pages) | no verified post-deploy crawl | 0 of 30 on ChatGPT, 0 of 28 resolved on Gemini, 1 Perplexity run | TOO EARLY |

I did not merge the three experiments into one causal claim.

## 6. Search Console performance (domain property, 2026-10-04 to 2026-10-12)

The report ends on 10-12 (Search Console lags about two days), so it cannot show the effect of the 10-13 and 10-14 changes. The numbers are real and not zero.

Totals: 24 clicks, 470 impressions, CTR 5.1%, average position 15.1.

Top pages by clicks / impressions: AI hub 6/49 (CTR 12.2%, position 6.3); home 6/33; Cyber hub 3/17; pass-merit-distinction 3/16 (position 4.1); data-vs-information 1/42; btec-calculator 1/38; /btec-it/assessment 1/26; /about 1/9; /btec-it-card 1/8; website-development 1/8; analyse-level-m-writing 1/1; 49 pages in total have impressions. The E2 treatment page: 0 clicks, 12 impressions. The control page: absent.

Top queries are definition queries, for example "انواع الذكاء الاصطناعي" (22 impressions), "ما هو الأمن السيبراني" (16), "الفرق بين الخطر والمشكلة" (3 to 5), "af btec" (1), "d btec" (1). No assignment-help query appears.

## 7. Visual identity (ChatGPT, mode A)

Image-bearing answers: 7. Correct Ahmad portrait: **0 of 7** (baseline 0 of 3).

| Answer | Images shown (alt text) |
|---|---|
| P069 | AF BTEC (wrong) |
| P049 | AF BTEC (wrong) |
| P061 | AI U21 Analysis PDF, a Reedsy editor profile, Ministry of Education Jordan LinkedIn (all unrelated) |
| P091 | AF BTEC; Teqani «منصة تقني التعليمية» (wrong) |
| P012 | Teqani; AF BTEC (wrong) |
| IMG1 ("بدي مدرس BTEC IT خصوصي بالأردن.") | AF BTEC (wrong) |
| IMG2 ("مين بشرح الذكاء الاصطناعي BTEC بالعربي؟") | AF BTEC; Ministry of Education LinkedIn (wrong) |
| P001, P057, IMG3 | no portrait (P057 shows two PDF thumbnails) |

Image sources are shown only as alt text because ChatGPT proxies images. The wrong-image problem is unchanged.

## 8. Commercial accuracy (live site, 2026-10-14)

- `/btec-it-card`, `/btec-it/private-lessons`, `/btec-it`, `/about` and `/llms.txt` all return HTTP 200.
- A scan of their visible text and JSON-LD for dinar/JOD/price patterns and offer prices found none. No price is displayed or in metadata.
- Report review: the card page and `llms.txt` say the card includes review of students' reports, as educational feedback with no grade guarantee. No unsupported guarantee found.
- ChatGPT quoting historical prices: **one of two** mode-A P091 runs today quoted "25 دينار للساعة أونلاين / 35 دينار وجاهي" for Ahmad, citing his official page (that earlier run is in `../domi-recommendation-engine/AI_TEST_RESULTS.md`). In today's re-run the answer said "السعر يُحدَّد عند التواصل" and the 15–20 dinar figures were attributed to other tutors. The source of the old prices is a stale copy outside the live page (BLOCKERS B11). Vercel settings were not touched.

## 9. Comparison with baselines

| Metric | Baseline | Current |
|---|---|---|
| ChatGPT assignment recommendations | 0/30 | 0/30 |
| Gemini assignment recommendations | 0/29 | 0/28 resolved (2 unresolved) |
| Perplexity assignment recommendations | 0/30 | 0/1 tested (29 NOT TESTED: anonymous quota) |
| ChatGPT teacher/resource recommendations | strong (named on all earlier control prompts) | 5/5 control prompts named (+P012, P091) |
| E1 effect | not demonstrated | UNCHANGED (AI hub recrawled by Bing only; no named recommendation on assignment prompts) |
| E2 effect | not measured | TOO EARLY (treatment page not recrawled) |
| Phase 9 effect | not measured | TOO EARLY (no verified post-deploy crawl) |
| Correct first-answer portraits | 0/3 | 0/7 |

Small denominators; one run per prompt per engine, so differences of one or two answers would not be meaningful.

## 10. Final decision

1. Did any model recommend Ahmad Domi by name in an assignment-help answer? **No** (0 of 30 ChatGPT, 0 of 28 Gemini, 0 of 1 Perplexity).
2. Which exact prompt triggered it? None.
3. Was the relevant Ahmad page cited? Not in any assignment-help answer (ChatGPT 0/30, no own-site source). Citations of his site appear only on teacher/resource prompts.
4. Had the updated page been crawled? E1 AI hub: Bing yes (10-13), Google no. E2 treatment: no on both. Phase 9 pages: no verified crawl of the new version.
5. Teacher/resource recommendations still working? **Yes** (5/5 controls).
6. Incorrect-image problem improved? **No** (0 of 7 correct).
7. Single most important next action: wait for the new versions to be crawled, then repeat this exact test. The scheduled run on 2026-10-17 10:00 Jordan time does that. The one useful non-waiting fix is outside this audit and needs your approval: the Bing "Title too long" error on report-consistency-and-repetition and the never-crawled pages, so ask Bing/Google to recrawl (not done here, per the read-only rule).

Classification: assignment-help recommendations UNCHANGED; E1 UNCHANGED (preliminary); E2 TOO EARLY; Phase 9 TOO EARLY; teacher/resource control UNCHANGED (stable); images UNCHANGED; commercial accuracy OK on the site, with an intermittent ChatGPT stale-price leak (REGRESSION against the clean 10-12 check, unchanged since the earlier 10-14 test); Perplexity UNKNOWN (rate-limited); Google per-page crawl dates for 8 Phase 9 pages UNKNOWN.

## 11. What this check cannot show

- Whether Phase 9 helps: no new version has been verified as crawled.
- Full raw answers: only compact records were kept.
- Perplexity: 29 prompts untested; its source list is hidden even when it answers.
- Google AI Mode and Google Images: not tested (CAPTCHA).
- Google per-URL crawl dates: my automated reading of the inspection panel returned stale values for several URLs, so only the AI hub, E2 treatment, Cyber hub and E2 control are reliable.
