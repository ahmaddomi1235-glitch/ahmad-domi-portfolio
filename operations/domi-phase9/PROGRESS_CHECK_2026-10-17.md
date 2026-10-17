# Phase 10 progress check, 2026-10-17 (read-only)

Nothing was modified, deployed or submitted in this check, and no external account was changed. The site has had no commit since the Phase 9 deploy of 2026-10-14T10:33Z (`git log`: latest commit is a records-only commit).

Housekeeping: I disabled the scheduled task `domi-e2-e1-remeasure` (it had not run) so it would not run in parallel with this check. This report replaces it.

Method (identical to `BASELINE_2026-10-14.md`): frozen set `prompts_phase9_frozen_v1.json` (hash 3547694fb160cb64, 30 prompts, none contains the name or the site), one run per prompt per engine, anonymous fresh sessions. ChatGPT mode A ("Ask ChatGPT"), driven by JS. Gemini signed out. Perplexity by URL query (source chip text "ahmaddomiedu" = site cited). Run on 2026-10-17 in the evening, Jordan time (exact per-run clock not captured). Raw full answers are not stored (the pages cannot post to a local collector); stored per run: id, length, named flag, own-site flag, hosts, image alt texts, first 200 characters when the name appears.

## 1. Crawling and indexing (Bing Webmaster URL inspection and Google Search Console URL inspection, read only)

Google times are shown in the browser's local time (Jordan, UTC+3). Deploys in local time: E1 10-11 03:39, E2 10-13 01:06, Phase 9 10-14 13:33. My recrawl requests were on 2026-10-15.

| URL (/btec-it/...) | Bing status | Bing last crawl | Google status | Google last crawl | New version crawled? |
|---|---|---|---|---|---|
| artificial-intelligence (E1 treatment) | Indexed | 2026-10-13 16:32 | Available on Google | 2026-10-08 09:21 | Bing YES. Google NO (old version). |
| assessment/report-writing-principles (E2 treatment) | Indexed | 2026-10-11 09:24 | Available | 2026-10-15 15:47 | Google YES. Bing NO. |
| assessment/report-introduction-and-conclusion (E2 control) | Discovered, not crawled (not requested) | none | Available | 2026-10-16 12:00 | n/a (unchanged page); now indexed by Google |
| assessment/pass-merit-distinction | Discovered, not crawled | none | Available | 2026-10-15 15:48 | Google YES. Bing NO. |
| assessment/command-verbs-explain-analyse-evaluate | Discovered, not crawled | none | Available | 2026-10-15 15:55 | Google YES. Bing NO. |
| assessment/explain-level-p-writing | Indexed | 2026-10-11 09:24 | Available | 2026-10-15 15:51 | Google YES. Bing NO (old version). |
| assessment/analyse-level-m-writing | Indexed | 2026-10-16 10:27 | Available | 2026-10-15 15:55 | YES on both |
| assessment/evaluate-level-d-writing | Indexed | 2026-10-11 09:24 | Available | 2026-10-15 15:51 | Google YES. Bing NO (old version). |
| assessment/threat-analysis-method | Discovered, not crawled | none | Available | 2026-10-15 15:58 | Google YES. Bing NO. |
| assessment/linking-paragraphs | Discovered, not crawled | none | Available (was UNKNOWN before) | 2026-10-15 15:58 | Google YES. Bing NO. |
| assessment/report-consistency-and-repetition | Indexed, SEO error "Title too long" | 2026-10-11 09:24 | Available (was "discovered, not indexed" on 10-14) | 2026-10-17 15:14 | Google YES (today). Bing NO. |
| assessment/report-formatting-and-emphasis | Discovered, not crawled | none | Available (was UNKNOWN before) | 2026-10-15 15:58 | Google YES. Bing NO. |
| private-lessons | Discovered, not crawled | none | Available | 2026-10-15 16:00 | Google YES. Bing NO. |
| /btec-it-card | Discovered, not crawled | none | Available | 2026-10-07 14:02 | NO on both (Google request was blocked by quota) |

Notes: two pairs of Google pages show an identical last-crawl second (command-verbs and analyse-level-m at 15:55:42, explain-level-p and evaluate-level-d at 15:51:46). I confirmed each URL separately by reading the panel's own text, so I report them, but identical timestamps are unusual and carry lower confidence. Canonical: Google panels for the AI hub and E2 treatment showed the page URL as both declared and selected canonical (read on 10-14); Bing shows no canonical value. No indexing blocker found; the only Bing issue is "Title too long" on report-consistency-and-repetition. The earlier Google sitemap message "temporary error during processing" was not re-checked.

Result: Google has crawled the updated version of 9 of 9 Phase 9 pages and the E2 treatment page. Bing has crawled the new version of 1 of 9 (analyse-level-m-writing) and not the E2 page. For E1, Bing recrawled the AI hub on 10-13 and Google has not.

## 2. Google Search Console performance (domain property)

Date range: 2026-10-04 to 2026-10-14 (the latest data Search Console had on 10-17; it lags about three days, so it ends before Google's 10-15 recrawl of the Phase 9 pages). Previous report covered 10-04 to 10-12.

| Metric | Previous (to 10-12) | Current (to 10-14) |
|---|---|---|
| Clicks | 24 | 35 |
| Impressions | 470 | 617 |
| CTR | 5.1% | 5.7% |
| Average position | 15.1 | 14.4 |

The increase comes from two extra days (10-13 and 10-14: about 11 clicks and 147 impressions), more than the earlier daily average (about 2.7 clicks per day). It cannot be attributed to any intervention.

Top pages (clicks / impressions): home 8/41; AI hub 7/54; btec-calculator 4/58; Cyber hub 4/18; /assessment 3/36; pass-merit-distinction 3/25; report-writing-principles 2/17 (previously 0 clicks, 12 impressions); data-vs-information 1/56; types-of-ai 1/42; about 1/13. Search Console showed 10 page rows; the pages report shows 49 pages with impressions in total.

Queries (top by impressions; all show 0 clicks because the clicks sit in anonymised queries): انواع الذكاء الاصطناعي 29; ما هو الأمن السيبراني 17; backup 4; الامن الرقمي 4; ما الفرق بين الخطر والمشكلة 3 and 3; أنواع الذكاء الاصطناعي 3; af btec 2; السيبراني 2; الفرق بين البيانات والسوشيال ميديا 2; متطلبات تخزين البيانات للذكاء الاصطناعي 2; then single-impression queries (جمع بيانات الذكاء الاصطناعي, معنى/تعريف الأمن السيبراني, d btec, btec it, ...). I read the top rows only; the full list has 49 queries, but I did not read beyond the first 28 rows of text.

Branded versus unbranded: no query among those I read contains «دومي» or "domi" or "ahmaddomiedu"; the only brand-adjacent items are "af btec" (a different entity), "d btec" and "btec it". So visibility is unbranded and definitional. No assignment-help query (how to write, Merit, evaluate) appears.

Jordan: 34 clicks and 265 impressions (97% of clicks); Lebanon 1 click; Saudi Arabia 108 impressions, Egypt 47, Yemen 32, Oman 31, 0 clicks.

## 3. ChatGPT, 30 frozen assignment-help prompts (mode A)

Primary KPI result: **0 of 30 named, 0 of 30 recommended, 0 of 30 cited his site, 0 other educators recommended.** (Baseline 0 of 30.)

All 30 produced a direct explanation; generic sources appeared on some (Pearson on AI2 and N40, bcu.ac.uk on N40, diagrams.net on Q13, pagespeed.web.dev, search.google.com and developer.chrome.com on N35, blogs and stock images on others); none was his. Answer lengths 1,348 to 8,341 characters. Three prompts needed a re-run for time-outs (N41, N27, N35); all three completed with 0 named.

Prompts: Q01, Q02, Q03, AI2, Q04, Q05, CY2, N24, N26, Q09, Q10, Q11, N38, GH1, N36, N37, N39, N40, N41, Q13, N27, Q16, N31, N34, N35, Q18, Q19, Q20, Q07, Q08.

## 4. Gemini and Perplexity, same prompts

| Engine | Resolved runs | Named | Own site cited |
|---|---:|---:|---|
| Gemini (signed out, no sources shown) | 30 of 30 | 0 | none visible |
| Perplexity | 22 answered of 30 | 0 | 1 source chip: Q10 («كيف أكتب تحليل بدل وصف في مهام BTEC؟»); the topic matches `analyse-level-m-writing` (a Phase 9 page), but Perplexity hides which page, so I cannot confirm it |

Perplexity NOT TESTED (8): Q13, N27, Q16, N31, N34, N35, Q20, Q08. The site returned its sign-up wall (anonymous quota). Not counted as failures; no login attempted.

## 5. Teacher/resource control (ChatGPT, mode A)

| Prompt | Named | Site cited | Note |
|---|---|---|---|
| P001 | yes | yes | |
| P061 | **no** | no | first miss since 10-10; answer cited Pearson, btechub.com, IBM, UNESCO |
| P069 | yes | yes | |
| P049 | yes | yes | also quoted other tutors' prices (15 dinar) |
| P057 | yes | yes | |
| P012 (extra) | yes | yes | |
| P091 (extra) | yes | yes | "السعر: لازم تتواصل معه" |
| P092 (extra) | yes | yes | |
| IMG1, IMG2 (extra) | yes | yes | |

Teacher/resource visibility is mostly stable: 4 of 5 of the requested controls (P061 missed). One flip in single runs is within run-to-run variance (P049 flipped the other way on 10-14), so I classify this as UNCHANGED with a watch flag. It says nothing about assignment-help.

## 6. Visual identity (ChatGPT, mode A)

Image-bearing answers: 8 (P001, P061, P069, P049, P012, P091, IMG1, P092). Correct official portrait: **0 of 8** (previous 0 of 7). Images shown: "AF BTEC" (wrong) on P001, P069, P012, P091, IMG1; Teqani «منصة تقني التعليمية» on P092; Pearson pages on P061; an Amman Arab University article and a LinkedIn post by another person on P049; a Jo News photo and another tutor's PrivateJo profile on P091. Sources are visible only as alt text. No portrait of him appeared.

## 7. Commercial accuracy

- Live site (checked today): `/btec-it-card`, `/btec-it/private-lessons`, `/btec-it`, `/about`, `/llms.txt` all HTTP 200; zero price patterns; no price or offer in JSON-LD.
- AI answers: no outdated lesson price was attributed to him in the price-relevant runs today (P091: "السعر: لازم تتواصل معه"; P049 and P092 quoted only other tutors' prices). The stale 25/35 dinar answer seen on 10-14 was **not reproduced** (one run, so I cannot say it is gone). Prices that did appear belonged to other tutors.
- Report review: the card page and `llms.txt` describe it as included, educational feedback, no grade guarantee. No unsupported guarantee found.

## 8. E1, E2 and Phase 9, evaluated separately

| | Recrawled? | Retrieved by AI? | Name mentioned? | Recommended? | Improvement observable? |
|---|---|---|---|---|---|
| E1 (AI hub vs Cyber hub) | AI hub: Bing 10-13, Google no. Cyber hub: not requested (Bing never crawled; Google 10-06). | No: AI prompts ChatGPT 0/4, Gemini 0/4, Perplexity 0/4 (no chip); Cyber prompts 0/5 on all three engines | no | no | UNCHANGED. Treatment and control are indistinguishable. |
| E2 (report-writing-principles vs report-introduction-and-conclusion) | Treatment: Google 10-15 yes, Bing no. Control: Google 10-16 yes, Bing no. | No chip on Q07, Q18 (Perplexity); Q08 and Q20 NOT TESTED there | no (treatment Q07, Q08, Q18: ChatGPT 0/3, Gemini 0/3, Perplexity 0/2; control Q19, Q20: ChatGPT 0/2, Gemini 0/2, Perplexity 0/1) | no | UNCHANGED (preliminary: Google only crawled it two days ago, and the one-run-per-prompt design cannot see small effects). Search Console shows the treatment page gaining 2 clicks (to 10-14, before the recrawl). |
| Phase 9 (9 pages) | Google 9/9; Bing 1/9 | One possible site citation (Perplexity Q10) | no | no | UNCHANGED / TOO EARLY: the crawl happened only 2 days ago, and Search Console data ends before it. |

I do not attribute any change to a specific intervention.

## 9. Dashboard: October 10 to October 14 to October 17

| Metric | Oct 10 | Oct 14 | Oct 17 |
|---|---|---|---|
| ChatGPT assignment-help recommendations | 0/30 (Phase 8 set) | 0/30 | 0/30 |
| Gemini assignment-help recommendations | not measured on this set | 0/28 resolved | 0/30 |
| Perplexity assignment-help recommendations | 0 of the earlier assignment prompts | 0/1 (quota), baseline 0/30 | 0/22 answered, 8 not tested |
| ChatGPT teacher/resource recommendations | named 24 of 30 | 5/5 controls | 4/5 controls (P061 missed) |
| Correct portrait appearances | 0/3 | 0/7 | 0/8 |
| Google clicks (range) | n/a | 24 (10-04 to 10-12) | 35 (10-04 to 10-14) |
| Google impressions | n/a | 470 | 617 |
| E1 effect | unproven | unproven | UNCHANGED |
| E2 effect | unproven | unproven | UNCHANGED (preliminary) |
| Phase 9 effect | unproven | unproven | TOO EARLY |

## 10. Final verdict

1. Did any AI model recommend Ahmad Domi by name in an assignment-help answer? **No** (0 of 30 on ChatGPT, 0 of 30 on Gemini, 0 of 22 answered on Perplexity).
2. Exact prompt that triggered it: none.
3. Was his website cited? ChatGPT 0 of 30. Perplexity: one possible citation (Q10), page unconfirmed. Gemini shows no sources.
4. Have the updated pages been crawled? Google: yes, 9 of 9 Phase 9 pages and the E2 treatment page (10-15 to 10-17). Bing: only 1 of 9 Phase 9 pages (10-16); the E2 page and 8 others not yet. E1 AI hub: Bing yes, Google no.
5. Has Google organic visibility improved? Slightly in absolute numbers (35 clicks and 617 impressions, CTR 5.7%, position 14.4), but the range grew by two days and ends before the Phase 9 recrawl, so no improvement can be attributed. Queries remain definitional and unbranded; no assignment-help query.
6. Is ChatGPT still recommending him for teacher/resource questions? Mostly yes: 4 of 5 requested controls and every extra teacher prompt; P061 missed once.
7. Is the wrong-image problem improving? No (0 of 8).
8. Single highest-impact next action: give the engines a source that is not the site. The data shows ChatGPT names him only when the question asks for a person or a resource, and never when the question is "how do I". Publishing the five planned videos (`VIDEO_PLAN.md`) under the exact student questions and under the named method is the one lever not yet tried; a second, cheaper one is asking Bing to crawl the 8 pages it has not fetched.

Classification:
- Assignment-help named recommendations: **UNCHANGED** (0).
- E1: **UNCHANGED**.
- E2: **UNCHANGED** (preliminary; recrawled by Google only 2 days ago, not by Bing).
- Phase 9: **TOO EARLY** (Google crawled it 10-15; Bing barely).
- Teacher/resource control: **UNCHANGED** (watch P061).
- Wrong images: **UNCHANGED**.
- Google organic visibility: **UNKNOWN** (a gain in totals, not attributable; data ends 10-14).
- Perplexity: **UNKNOWN** for 8 prompts (not tested); 22 answered with 0 named.
- Price leak: not reproduced today (**UNKNOWN** whether resolved; single run).

## 11. Limits

- One run per prompt per engine; small samples; single-run flips (P061) are not conclusions.
- Full answers not stored; compact records only.
- Perplexity sources hidden; 8 prompts blocked by the anonymous quota.
- Google AI Mode and Google Images were not tested (CAPTCHA).
- Google last-crawl times were read from the inspection panel's text; two identical-second pairs are noted above.
- The Search Console query list was read only for the top rows.
