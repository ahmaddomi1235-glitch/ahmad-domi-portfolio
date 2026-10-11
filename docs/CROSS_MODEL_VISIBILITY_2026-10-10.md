# Cross-model AI visibility — Ahmad Domi | أحمد دومي (BTEC IT), 2026-10-10 (Phase 7C)

Read-only measurement. Nothing on the site, YouTube, Instagram, Search Console, Bing or any account was changed, deployed or submitted. Raw records (private, git-ignored): `sources/audit/phase7/chatgpt_runs_2026-10-10.md`, `perplexity_runs_2026-10-10.md`, `repeat_gemini_runs.md`, `raw_gemini_2026-10-10.txt`.

## Answer

**Yes. In a fresh, logged-out ChatGPT session, ChatGPT named Ahmad Domi in 24 of the 30 frozen prompts (80%), ranked him first in 21 of those 24, and cited his own website in all 24.** The Oct 8 baseline was 0 named in 73 completed prompts. The six prompts where it did not name him are definitional or ambiguous (Pass/Merit/Distinction, Explain/Analyse/Evaluate, grade calculator, who verifies reports); ChatGPT answered them from general knowledge with no sources.

**Why ChatGPT differs from Gemini (observed, not proven):** in 13 of the 24 ChatGPT answers the cited page was `ahmaddomiedu.com/btec-it/private-lessons`, a page published on Oct 9 that is **not indexed by Google** (Gemini's source of web results) and that **Bing lists as "Discovered but not crawled"** (checked today). ChatGPT also quoted prices from the Oct 9 version of that page, so it had read a snapshot of the page itself, not a search-index entry. Gemini never cited that page and mostly recommended him as an educational resource, not as a tutor. How ChatGPT fetches pages is not known and is not inferred here.

**One policy problem found:** in one ChatGPT answer (P012, first run) ChatGPT quoted two hourly lesson prices for Ahmad (online and in person; figures not reproduced here). They come from the version of the page that was live on Oct 9 before prices were removed; they are not on the live page. A repeat run of the same prompt quoted none, and ChatGPT said the price is not published in P091 and P092.

## 1. Independence and test conditions

| Item | ChatGPT | Perplexity | Gemini | Google AI Mode |
|---|---|---|---|---|
| Interface | chatgpt.com anonymous consumer chat in the app's built-in browser: no login, no memory, anonymous `uc/` threads; source chips and links shown, so web search was used (mode not selectable, model label not shown) | perplexity.ai anonymous, optional cookies declined, default search ("Researched") | gemini.google.com anonymous, label Flash-Lite, search shown | `google.com/search?udm=50&hl=ar&gl=jo` |
| Fresh session per prompt | yes (new page for each prompt) | yes | yes | – |
| Prompt text | the exact frozen text; no name, site or past results in the prompt | same | same | same |
| Owner's chats / history | not used; this assistant's own research was not counted as ChatGPT tests | not used | not used | – |
| Completed | **30 / 30** (+1 repeat of P012) | **30 / 30** | **30 / 30** first pass (+ repeat runs from Phase 7B) | **NOT TESTED today:** Google served a CAPTCHA ("unusual traffic"); not bypassed. 23 prompts were completed earlier on Oct 10 (0 named) before the block |

Caveats: the browser may carry OpenAI/Perplexity cookies from earlier benchmark sessions (no account, no memory feature); one run per prompt (two for P012).

## 2. Headline numbers (completed tests only)

| Platform | Prompts completed | Named Ahmad in the answer text | Rank 1 when named | Own website cited | Oct 8 baseline (same cohort) |
|---|---:|---:|---:|---:|---|
| **ChatGPT** | 30 | **24 (80%)** | 21 of 24 | **24 of 24** (a URL on `ahmaddomiedu.com`) | 0 named (26 of 30 completed) |
| Gemini (first pass) | 30 | 7 (23%), one of them label-only | – | 3 explicit | 0 of 18 completed |
| Perplexity | 30 | 4 (13%): 2 as an option, 2 as a secondary mention | 1 | 3 URLs (+1 label) | 0 of 30 |
| Google AI Mode | not tested today | – | – | – | 1 of 30 named; earlier today 0 of 23 |

Do not compare Gemini's repeat-run figure (13 of 22, drawn from earlier winners) with these broad-cohort rates.

## 3. Per-prompt results

ChatGPT cell = rank among the options it listed / how many options. "Secondary" = named in a table row but not as the main answer.

| Prompt | Group | ChatGPT | Gemini (first pass) | Perplexity |
|---|---|---|---|---|
| P001 | teacher-jordan | **1/2** | yes | no |
| P002 | teacher-jordan | **1/1** | no | no |
| P003 | teacher-jordan | **1/2** | no | rank 2 of 3 |
| P005 | teacher-jordan | **1/2** | no | no |
| P006 | teacher-jordan | **3/3** | no | no |
| P007 | teacher-jordan | **1/1** | no | secondary |
| P009 | teacher-jordan | **1/1** | no | rank 1 of 3 |
| P010 | teacher-jordan | **1/2** | no | no |
| P012 | teacher-jordan | **1/1** | no | no |
| P015 | teacher-jordan | **2/3** | no | no |
| P016 | arabic-resources | **1/4** | no (named in 2 of 2 control runs) | secondary |
| P017 | arabic-resources | **1/2** | yes | no |
| P018 | arabic-resources | **2/5** | yes | no |
| P019 | arabic-resources | **1/3** | label only | no |
| P020 | arabic-resources | **1/3** | no | no |
| P021 | arabic-resources | **1/3** | no | no |
| P025 | arabic-resources | **1/1** | no | no |
| P031 | assessment-pmd | no | no | no |
| P032 | assessment-pmd | no | no | no |
| P033 | assessment-pmd | no | no | site cited, not named |
| P037 | assessment-pmd | no | no | no |
| P045 | assessment-pmd | no | no | no |
| P049 | cyber-ai-educator | **1/1** | no | no |
| P057 | cyber-ai-educator | **1/2** | no | no |
| P061 | cyber-ai-educator | **1/2** | yes | no |
| P069 | cyber-ai-educator | **1/2** | yes | no |
| P091 | commercial | **1/3** | no | no |
| P092 | commercial | **1/1** | no | no |
| P095 | commercial | no | no | no |
| P097 | commercial | **1/2** (the card) | yes | no |

ChatGPT by group: teacher-in-Jordan 10/10, Arabic resources 7/7, cyber/AI educator 4/4, commercial 3/4, **assessment/P-M-D 0/5**.
Won by ChatGPT only: P002, P005, P006, P007, P010, P012, P015, P020, P021, P025, P049, P057, P091, P092 (14). Won by no platform: P031, P032, P037, P045, P095.

## 4. The ten priority prompts, with citations (ChatGPT)

| ID | Prompt | Named / recommended | Cited URLs on his site | Other options shown |
|---|---|---|---|---|
| P001 | مين أفضل مدرس BTEC IT بالأردن؟ | #1 of 2, private tutor | `/btec-it/private-lessons` | Teqani |
| P002 | بدي مدرس خصوصي BTEC IT في عمان | #1 (only), private tutor; ChatGPT notes he is from Irbid and in-person Amman lessons need confirming | `/btec-it/private-lessons` | – |
| P003 | مدرس BTEC IT أونلاين للأردن بشرح بالعربي | #1 of 2 | `/btec-it/private-lessons` | Tawjihi Hub |
| P009 | مدرس BTEC IT في إربد | #1, in person or online | `/btec-it/private-lessons` | Pearson centre list (High Gate School) |
| P016 | وين ألاقي شرح BTEC IT بالعربي؟ | #1 of 4, resource | `/btec-it/introduction-to-applications`, `/btec-it/website-development` | QF BTEC IT, Eduva, Telegram |
| P017 | أفضل قناة يوتيوب عربية لشرح BTEC IT | #1 ("الأفضل كبداية"); the YouTube link is a **search URL**, not his channel | `/btec-it/introduction-to-applications` | م. حازم الركيبات |
| P018 | مواقع عربية تشرح مواد BTEC تكنولوجيا المعلومات | #2 of 5 | `/btec-it/introduction-to-applications` | Eduva, BTECHub, Tawjihi Hub, Pearson |
| P061 | أفضل مصدر عربي لمهمة الذكاء الاصطناعي BTEC؟ | #1 of 2 ("أفضل نقطة بداية"), flagged as not the official Pearson source | `/btec-it/artificial-intelligence` | Pearson specification |
| P069 | مين بشرح وحدة الذكاء الاصطناعي BTEC بالأردن؟ | #1 of 2, teacher, with a private-lessons enquiry | `/btec-it/artificial-intelligence`, `/btec-it/private-lessons` | KafaaEdu |
| P097 | في كرت أو بطاقة تعليمية لـ BTEC IT بالأردن؟ | **the card, #1 of 2**: real card, filmed explanations, units (cyber, AI, data modelling) | `/btec-it-card` (link text says "details and prices"; no price shown) | بوابة التميز |

Metrics across the 24 ChatGPT answers that named him:

| Metric | Count |
|---|---:|
| Named in text | 24 |
| Recommended (as the option to start with or consider) | 24 |
| Own website cited | 24 |
| Own YouTube channel cited by URL | 1 (P012, `youtube.com/@AhmadDomiedu`). Two other answers gave only a YouTube search link, which is **not counted** as a citation of his channel |
| Own Instagram cited | 1 (P025, `instagram.com/ahmaddomiedu`) |
| BTEC IT Card recommended or linked | P097 (named), P057 and P049 (card page linked), P020 (mentioned as paid), P025 (link) |
| Private tutoring recommended | 13 answers (P001, P002, P003, P005, P006, P009, P010, P012, P015, P049, P069, P091, P092) |
| Stated a price for him | 1 (P012 first run, stale); said "price not published" in 2 (P091, P092) |
| Asked the user a follow-up question | all |

ChatGPT also printed the phone number and e-mail address that his private-lessons page publishes, in several answers. That is his page's own contact information; it is noted as exposure, not as a defect.

## 5. Retrieval differences

| Question | ChatGPT | Gemini | Perplexity | AI Mode (earlier today) |
|---|---|---|---|---|
| Retrieved his website | in every answer that named him (24 of 30). Pages: private-lessons, introduction-to-applications, website-development, AI hub, card, `/btec-it`, home, `/en` | 3 explicit (P001, P018, P061) in 30 first-pass answers | `/btec-it/assessment` in 3 (P003, P016, P033) | none |
| Retrieved private-lessons / card | **yes**: private-lessons in 13 answers, card page in 4 | **no** for private-lessons (not on Google); card in 2 of 4 P097 runs | no | no |
| His educator identity (Irbid, about two years, Asas, "مدرّس BTEC IT") | yes: used Irbid, Asas experience, online and in person | partly (unit lists) | partly (Irbid, cybersecurity engineer in P009) | no |
| His YouTube | channel URL once; otherwise search links | video cards in 1 run | videos in 2 answers | no |
| His Instagram | once | never | never | no |
| Competing sources | Teqani, Tawjihi Hub, Eduva, BTECHub, QF BTEC IT, KafaaEdu, Ostathi, PrivateJo (including a competitor's advertised price), JO Academy, Pearson | Tawjihi Hub, D.BTEC, Bawabat al-Tamayuz, Teqani, a trainer's Facebook video, Telegram | LinkedIn profiles of trainers, Kernel, Teqani, Tawjihi Hub, QF BTEC IT, The BTEC Tech, a different "Ahmad BTEC / أحمد الفقيه" channel | OpenSooq, Facebook groups, named tutors |
| Answered from search evidence | tutor, resource and card prompts: yes (links, chips); definitional prompts: no links, general knowledge | yes (search shown in every run) | yes, mostly directories and LinkedIn | yes (marketplaces) |

**Name-collision risk:** Perplexity ranked "Ahmad BTEC / af_btec / أحمد الفقيه" (a different educator) first for P007 and P069 and offered "Ahmad BTEC" for P017. A student could confuse him with Ahmad Domi. ChatGPT and Gemini did not show this.

**Why the unindexed private-lessons page matters:** ChatGPT used this page in more than half of its named answers, including its Oct 9 morning wording, while Bing's own inspection (read today) shows it as "Discovered but not crawled" and Google does not list it. So whatever ChatGPT used to read it was not those two indexes. The mechanism is unknown; what is observed is that ChatGPT read the page soon after it was published and still holds an older copy.

## 6. Comparison with the baselines

| | Oct 8 | Oct 10 |
|---|---|---|
| ChatGPT | 0 named of 73 completed (cohort: 0 of 26) | **24 of 30** |
| Gemini | 0 of 18 (cohort) | 7 of 30 first pass; 13 of 22 on selected repeats (not comparable) |
| Perplexity | 0 of 30; one named hit in the Phase 6 smoke test (P009) | 4 of 30 (P009 named again) |
| Google AI Mode | 1 of 30 | not tested today; 0 of 23 earlier |

Changes on his side after the Oct 8 ChatGPT run: Oct 8 ≈12:20 UTC Phase 6 (home Q&As, canonical YouTube handle, `llms.txt` identity); Oct 9 ≈11:22 UTC card and private-lessons pages published; Oct 9 ≈15:12 UTC prices removed. The Oct 8 ChatGPT run predates all of them, and the private-lessons page did not exist then. Whether those changes caused the difference cannot be separated from changes at OpenAI or from the new page itself; the private-lessons page is the clearest new source because it appears in more than half of the named answers.

## 7. Limits and uncertainty

- One run per prompt (two for P012). ChatGPT is non-deterministic: P012 quoted prices once and not on the repeat.
- ChatGPT's mode, model label and whether search was forced could not be read from the anonymous UI.
- Positions are inside a list of 1 to 5 options that ChatGPT chose to show; they are not rankings.
- P092 contained two price-like figures later in the answer that I could not re-open (anonymous threads cannot be reloaded). The sentence about Ahmad said prices are not published, so they are treated as other providers' prices, but this is **not verified**.
- Google AI Mode could not be tested; the Gemini results for these prompts come from Phase 7B.
- One network, one day, one browser. No claim of "#1" is made beyond the list position shown inside each answer.

## 8. Highest-impact next actions for ChatGPT visibility

1. **Stop old prices circulating (policy risk first).** Notify Bing for `/btec-it/private-lessons` and `/btec-it-card` through IndexNow with the explicit-URL option (the diff-based run will skip them, their `lastmod` is Oct 9), then re-run P012, P091 and P092 five times each and log any price figure. Do not restore prices.
2. **Keep `private-lessons` accurate and canonical.** It is the page ChatGPT reads most; its "not endorsed by Pearson" and "no assessed-work writing" statements are being quoted correctly.
3. **Decide deliberately whether the phone number and e-mail stay on the page;** ChatGPT prints them verbatim.
4. **Reduce the name collision on Perplexity** with one factual sentence on `/about` and the home page: full name, Irbid, exact channel name «Ahmad Domi | أحمد دومي – BTEC IT». Only mention the other channel if the owner confirms it is unrelated.
5. **Give ChatGPT his real YouTube channel URL.** Only 1 of 24 answers linked his channel; two gave a YouTube search link. Put the channel link in body text with the exact channel name on the home and lessons pages.
6. **Leave the definitional prompts alone** (P031–P037, P045 partly): ChatGPT answers them with no sources, and chasing them means competing with Pearson pages.
7. **P045 (calculator):** ChatGPT and Perplexity cite Eduva, TawjihiAI and Tawjihi Hub. Confirm `/btec-calculator` has an indexed title and a first sentence stating which rule it implements, then re-test in a week.
8. **P095 (report review):** the card includes report review but ChatGPT answered with internal-verifier definitions. No change unless the owner wants a «من يراجع تقريرك قبل التسليم؟» section on the card page.
9. **Repeat the ChatGPT cohort on Oct 13 and Oct 17** (3 runs per prompt, same conditions) and record source URLs, to judge stability before changing anything else.
10. **Retest Google AI Mode** once the owner clears the CAPTCHA in a clean window. It is the only engine with 0 named so far.

## 9. What not to do

Do not publish or imply prices; do not ask students or competitors to promote him; do not rewrite YouTube titles, rebuild the site, add mass articles or add superlatives; do not count a source label as a recommendation; do not claim #1 anywhere.
