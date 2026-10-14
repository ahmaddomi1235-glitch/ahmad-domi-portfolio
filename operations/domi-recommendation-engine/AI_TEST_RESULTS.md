# AI_TEST_RESULTS

All runs anonymous and fresh. Named = answer text contains the name (primary KPI). Citation/source cards are secondary.

## 2026-10-12 results (this mission)
| Test | Engine | Method | Result |
|---|---|---|---|
| Price-leak recheck P012, P091, P092 | ChatGPT | JS-driven fresh chats | No price attributed to Ahmad. |
| Wrong-image association recheck | ChatGPT (image proxy alt text) | JS | Wrong association persists (AF BTEC / Teqani), about 2 days after the visual-identity deploy. External index refresh is outside our control. |
| E2 baseline Q07 x2, Q08 x2, Q18 x3 (treatment) | Perplexity | URL query method | 0 named in 7 runs. Sources UNKNOWN (sign-up wall). |
| E2 baseline Q19 x2, Q20 x2 (control) | Perplexity | URL query method | 0 named in 4 runs. Sources UNKNOWN. |
| Gemini, Google AI Mode / Images | Gemini, Google | n/a | Not run: pane hidden / CAPTCHA (BLOCKERS B1, B2). |

## Standing baselines (earlier phases)
- ChatGPT assignment-help (Phase 8, 20 questions, both modes): 0/30 named, 1/30 any link.
- ChatGPT teacher/resource prompts: named in 24/30 (7C) and 12/12 (7D).
- Perplexity: P003 named (rank 2 of 3); P016 named in a secondary row; how-to prompts (AI1, GH2, P033) cite `/btec-it/assessment` without naming him.

## Reading
No independent model recommended Ahmad by name on any assignment-help prompt. Nothing deployed on 2026-10-12 is a recommendation success; E2 is deployed but unmeasured (PREMATURE until recrawl).

## 2026-10-14 full re-run (owner requested; run on request although E2 recrawl is not verified)
Method: anonymous fresh sessions, one run per prompt unless noted. ChatGPT in the built-in browser by JS (mode A placeholder 'Ask ChatGPT'; mode B = web-search pill set in the same page load, placeholder 'Search the web' verified before send). Perplexity by URL query; sources are not exposed (sign-up wall) but the answer text shows a source chip, so 'chip' below = the chip text 'ahmaddomiedu' appeared. Gemini signed-out, Flash-Lite. Raw answers not stored (page-only runs).

### Index status (Bing Webmaster URL inspection, signed-in Chrome)
| URL | Status | Last crawl |
|---|---|---|
| /btec-it/artificial-intelligence (E1 treatment) | Indexed | 2026-10-13 16:32 (after the E1 deploy of 10-11 00:39Z): **crawled, E1 measurable from now** |
| /btec-it/assessment/report-writing-principles (E2 treatment) | Indexed | 2026-10-11 09:24 (BEFORE the E2 deploy of 10-12 22:06Z): **not recrawled yet, E2 results below are PREMATURE** |
Google status unreadable (no console session driven).

### ChatGPT mode A (28 prompts)
Named in answer text (and own site linked): P001, P061, P069, P057, P012, P092, P097, P091, identity prompts (3 of 3). NOT named: AI1, AI2, CY1, CY2, P049, GH1, GH2, GH3, P033, P037, Q01, Q07, Q08, Q18, Q19, Q20, P095.
- E1 pairs: AI hub teacher/resource P061 yes, P069 yes; cyber P057 yes, P049 NO (baseline named in all four, single runs; P049 flip is within run-to-run variance, not a verdict). Assignment-help AI1/AI2/CY1/CY2: 0/4 named, 0 sources, unchanged floor.
- E2: treatment Q07, Q08, Q18 = 0/3 named; control Q19, Q20 = 0/2 named; no sources anywhere. Same as baseline (floor).
### ChatGPT mode B (web search on)
Q07, Q08, Q18, Q19, Q20: 0/5 named; Q18 and one control run cited external sites (Pearson, bcu.ac.uk), none his. P091: named, source = his page, price answer 'contact him for the lesson price'.
### Perplexity (answer text)
Treatment Q07, Q08, Q18: named 0/3, no ahmaddomiedu chip. Control Q19, Q20: named 0/2 but **the ahmaddomiedu source chip appears in both** (his site cited on the control topic, not the treatment topic). AI1, CY1, P001, P091: named 0/4, no chip.
### Gemini (signed-out, Flash-Lite, no sources shown)
P001: **named first** ('الأستاذ أحمد دومي'). P091: named, no price attributed to him (generic market prices only). Q07, Q08, Q18, Q19, Q20, AI1, CY1: named 0/7.

### PRICE LEAK (regression vs 2026-10-12)
ChatGPT mode A, P091, one run: attributed to Ahmad 'أسعار معلنة: أونلاين 25 دينار للساعة، وجاهي 35 دينار للساعة', citing his 'official page'. These are the Oct 9 prices from a stale copy of /btec-it/private-lessons; the live page (checked 2026-10-14) says it does not set prices and mentions no amount. Same prompt in mode B and on Gemini/Perplexity: no price. Not reproduced on 10-12 (P012, P091, P092 clean). Intermittent, comes from ChatGPT's own cache/non-search recall; fix path is outside the site (see BLOCKERS B11).

### Images (ChatGPT, mode A)
Wrong images still attached: 'AF BTEC' on P012, P091 and the AI-teacher prompt, 'الرئيسية' (Teqani) on the AI-teacher prompt; no image of him. No change since the visual-identity deploy.

### Reading (per EXPERIMENTS.md rules)
- E1: crawl condition met on Bing. No named recommendation on any assignment-help prompt (ChatGPT, Gemini, Perplexity): KPI not met; teacher/resource prompts unchanged except one flip (P049). Verdict: no effect shown; keep open for one more run in 3-4 days, include Google status.
- E2: PREMATURE (page not recrawled). Treatment 0 named on all engines; the only secondary signal is Perplexity citing his site on the control prompts.
- Brand-level: Gemini now names him on P001 (Gemini baseline Oct 10 was 7/30 first pass).
