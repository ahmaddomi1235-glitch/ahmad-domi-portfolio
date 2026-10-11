# Gemini breakthrough analysis — why did Gemini start mentioning Ahmad Domi? (Phase 7B)

Measured 2026-10-10. Evidence investigation; read-only. Companion files: `GEMINI_WINNING_PROMPTS.md` (exact answers and repeat runs), `GEMINI_CAUSAL_HYPOTHESES.md` (causes ranked), `GEO_NEXT_ACTIONS.md`.

## Answer in brief

Gemini did change between Oct 8 and Oct 10, and it is not a one-off: on the original winning prompts a fresh logged-out Gemini named Ahmad in 20 of 30 runs (67%), in 13 of 22 new runs (59%) when counting only text mentions, and always in a recommending context. On Oct 8 the same Gemini named him in 0 of 18.

What changed in the world in that window is not in doubt. What caused the change is **not proven**. The best-supported explanation is that Google had by Oct 10 indexed 14 of the 15 priority pages (1 of 15 on Oct 6), and Gemini's search grounding (it says "Searching the web" in every run today) is retrieving them; the wording of several answers matches live page text almost verbatim. A change in Gemini itself, or in whether it searched on Oct 8, cannot be ruled out because the Oct 8 runs did not record it.

## 1. Final-report items

1. **The seven exact winning prompts:** P001, P017, P018, P019, P061, P069, P097 — full wording, answers and sources in `GEMINI_WINNING_PROMPTS.md`.
2. **The four newly winning, comparable prompts:** P001, P017, P019, P097 (P019 is a source chip only).
3. **Sources supporting each appearance:** section 3 below.
4. **Named versus genuinely recommended:** first pass 7 prompts → 6 named in text and recommended in context, 1 citation only. Fresh runs 22 → 13 named in text (all in a recommending context), 2 chip-only, 7 absent.
5. **Repeatability:** table in `GEMINI_WINNING_PROMPTS.md`. Stable: P001 (5/5), P061 (4/4). Likely: P017, P018 (3/4). Unstable: P019, P069, P097.
6. **Exact changes made before the breakthrough:** section 4.
7. **Evidence for and against each cause:** `GEMINI_CAUSAL_HYPOTHESES.md`.
8. **Ten next actions and what not to repeat:** `GEO_NEXT_ACTIONS.md`.
9. **A controlled follow-up experiment:** `GEO_NEXT_ACTIONS.md`, last section.

## 2. October 8 versus October 10 (the 18 prompts Gemini completed on both days)

Oct 8 run: ~02:20–02:50 UTC, same UI, logged-out, label Flash-Lite, Jordan network, Arabic prompts; `search_enabled` recorded as "unknown/auto". Oct 10 run: same UI, label and network; "Searching the web" visible in all 22 repeat runs.
Differences that could matter and that I cannot control: the Oct 8 run did not record whether web search fired; Gemini's backend may have changed in between; one run per prompt per day.

| ID | Oct 8: ahmad? / entities that were named | Oct 10 first pass: ahmad? | Change |
|---|---|---|---|
| P001 | no / generic, a named female engineer | **yes** (top, "most prominent") | **absent → present** |
| P002 | no / Facebook, generic steps | no (control run: PrivateJo, directories) | – |
| P003 | no / Teqani, Watad, Pearson, YouTube, Telegram | no (control: generic) | – |
| P005 | no / Teqani, Pearson | no | – |
| P006 | no / Teqani, PrivateJo, JoAcademy, YouTube | no | – |
| P007 | no / Teqani, Asas, Facebook, YouTube | no | – |
| P009 | no / Pearson, Facebook | no (0 of 3 total today) | – |
| P010 | no / Asas | no | – |
| P012 | no / Teqani, Pearson, Facebook, YouTube | no | – |
| P016 | no / Teqani, Watad, Asas, YouTube, Telegram | no on first pass; **named in 2 of 2 control runs** | first pass unchanged; unstable |
| P017 | no / Teqani, Asas, YouTube | **yes** (a channel) | **absent → present** |
| P019 | no / Pearson, JoAcademy | chip only | **absent → source chip** |
| P025 | no / Facebook, YouTube, Telegram, Instagram | no | – |
| P031 | no / Asas | no | – |
| P032 | no / Asas | no | – |
| P091 | no / PrivateJo, OpenSooq, Pearson, Facebook | no | – |
| P095 | no / Pearson | no | – |
| P097 | no / Pearson, Asas; "no official card exists" | **yes** (card named, paid) | **absent → present** |

Matched result: **0 / 18 → 4 / 18** on first pass (3 text, 1 chip). The competing names on Oct 8 (Teqani, Watad, Asas, PrivateJo, JoAcademy) are still the usual competitors today; today's repeat runs additionally show Tawjihi Hub, D.BTEC, Bawabat al-Tamayuz (btec-jo-support.com), a trainer named Malek Nasser, Abadah Abdelaal, Mohammad Nasrallah, Raed Al-Natour and the Ministry's BTEC site. Prompts that were not run on Oct 8 (P018, P061, P069) are not compared.

Personalization: both days logged-out; the earlier signed-in Gemini run of Oct 8 was discarded as contaminated and is not used. Location and language: same network and Arabic wording. Platform label: identical (Flash-Lite), but a label does not prove the model snapshot is the same.

## 3. Evidence trace for each appearance

Classes: **A** directly observed, **B** public evidence that could support the answer, **C** unsupported hypothesis. Gemini's hidden reasoning is not claimed.

| ID | A. Directly observed | B. Public evidence that fits | C. Hypothesis only |
|---|---|---|---|
| P001 | Chip `ahmaddomiedu.com` (first pass and repeat run 2); his YouTube video «تأسيس جيل BTEC IT 2011 … نمذجة البيانات» as a video card (run 2, `youtube.com/watch?v=jw6aMr_Oq0c`); `t.me` chips next to the Ahmad sentence (runs 2 and 3); other runs show unrelated chips (`منصة الكفايات الوظيفية`) | Homepage title «مدرّس BTEC IT في الأردن»; unit list (cyber, AI, data modelling, programming, project management) matches his hub; YouTube channel description says «مدرّس BTEC IT في الأردن» | That the Telegram chips are student-channel mentions of him |
| P017 | Chip «أحمد دومي \| Ahmad Domi» (+3 in one run); no URL exposed | Channel with 26 videos and unit playlists | "cooperation with platforms": not supported |
| P018 | Text `ahmaddomiedu.com/btec-it`; link `https://ahmaddomiedu.com/btec-it` exposed in a repeat run; Gemini's description (Glossary, «دوسيات التأسيس وكتب الوحدات», link to YouTube) | **the hub page contains the exact phrase «دوسيات التأسيس وكتب الوحدات وملفات الشرح للتحميل»** (checked live) | – |
| P019 | Chip «أحمد دومي \| Ahmad Domi» next to unit paragraphs; text mention in only 1 of 3 repeats | Site/channel | That the chip is the site and not the channel |
| P061 | Text `ahmaddomiedu.com`; Gemini describes Glossary, تأسيس dossiers | AI unit hub, glossary and concept pages exist | – |
| P069 | Chip «أحمد دومي \| Ahmad Domi»; repeat run 2 describes AI vs machine learning vs deep learning vs neural networks | **the AI unit page on the site covers exactly these terms** (checked live); no AI-unit teacher page elsewhere known | – |
| P097 | Repeat run 1: «مدفوعة», filmed explanations, units, WhatsApp support, assignment support | **the card page (published Oct 9) says: paid educational card, filmed explanations, units (cyber, AI, data modelling), assignment guidance, WhatsApp support team, report review included, no price** (checked live) | the same facts could also come from the YouTube description or Instagram |

Never observed in any run: `llms.txt` as a source, a price, the private-lessons page, Instagram, an Asas profile. His YouTube channel and a video appeared once (P001 run 2), and that video still carries its old title pattern, so the Phase-4 title rewrite was not required for it to be found.

## 4. Change timeline (UTC; repository clock is UTC−3)

| When | Change | Relation to Gemini |
|---|---|---|
| Oct 4 (13:25–21:30 −03) | Canonical entity home, knowledge base, 199 concepts, structured data, sitemap | before baseline |
| Oct 6 15:22 UTC | Intent-first titles/meta for 213 pages; richer hubs; curated links; stub pages noindex; IndexNow initial 232 URLs + 232 after | before baseline; pages still mostly unindexed (1 of 15 priority URLs indexed on Oct 6) |
| Oct 6–9 | Manual Search Console indexing requests on the priority URLs (owner-approved) | between baseline and breakthrough; exact indexing dates per page **not retrievable**: the Page Indexing report is stale (last updated 3 Oct) and I could not read per-URL crawl dates in this session |
| Oct 8 02:20–02:50 | **Gemini baseline: 0 of 18** | – |
| Oct 8 ≈12:20 | Phase 6 deploy: homepage Q&A (Irbid, ~2 years, name forms), Person `sameAs`/`knowsAbout`, canonical YouTube handle, `llms.txt` identity section | after baseline |
| Oct 9 ≈11:22 | Phase 6B: card page, private-lessons page, `Product`/`Service` JSON-LD without `Offer`, footer/nav links, IndexNow for 4 URLs | after baseline; the card page text matches P097 run 1 |
| Oct 9 ≈15:12 | Pricing removed from all public pages | after baseline; no evidence either way |
| Oct 10 | Gemini first pass: **7 / 30 named**; repeat runs 13 / 22 | – |
| Oct 10 | GSC: 14 of 15 priority URLs indexed (live inspection); `/private-lessons` not indexed | – |

A change that precedes a mention is not proof of cause. YouTube metadata edits were made by the owner earlier in the project; no dated record of the individual edits exists in the repository, so their timing relative to Oct 8 is not stated here.

## 5. Why some prompts still lose

Losing prompts: P002, P003, P005, P006, P007, P009, P010, P012, P015, P016 (first pass only), P020, P021, P025, P031–P033, P037, P045, P049, P057, P091, P092, P095.

| Contrast | Wins | Losses | Reading |
|---|---|---|---|
| Intent: resource/channel/site discovery | P017, P018, P019, P061 + P016 on control runs | P020, P021, P025, P057 | mostly wins, not exclusively |
| Intent: "who explains X" for a **named unit** | P061, P069 (AI) | P049, P057 (cyber) | mixed |
| Intent: local tutor (Irbid, Amman, online) | none | P002, P003, P009 (all control runs also lost) | consistently lost: Gemini returns PrivateJo, Apprentus, Facebook groups, schools |
| Intent: assessment explanation (P/M/D, Distinction) | none | P031–P033, P037 | Gemini answers from general knowledge without sources, so there is nothing to cite |
| Intent: commercial | P097 (card) | P091 (price), P092, P095 (report review) | only the card matched a page title |
| Generic head «أفضل مدرس BTEC IT بالأردن» | P001, 5/5 | – | exception to "teacher prompts lose": a head query with the site title «مدرّس BTEC IT في الأردن» |
| Language | Arabic mostly; English P019 (chip only) | English P005 | too few to say |
| Landing page indexed | card and hub | `/private-lessons` (not indexed) | consistent with the index explanation but only one data point |

These are correlations from small samples; none establishes causation.

## 6. Cross-model comparison

| Prompt | Gemini today | Google AI Mode today (Oct 10) | Perplexity | ChatGPT |
|---|---|---|---|---|
| P001 | named 5/5 | 0 (named Tariq Al-Fassid, Shadi Jaber; marketplaces) | Oct 10: 0 (Ostathi, PrivateJo, JIS); Oct 8: 0 | Oct 8: 0 (asked a clarifying question) |
| P002, P003, P005 | 0 | 0 (OpenSooq, Facebook groups, Alpha Education, Ahmad Zakaria Al-Rahahleh) | wall after 1 answer | 0 on Oct 8 and in the Phase-6 smoke test |
| P009 | 0 | not completed | Phase-6 smoke test: named and cited `/btec-it/assessment`, rank 2 | 0 |
| P097 | named 2/4 | not completed | not completed | 0 |

Same owned evidence is public to every engine; Gemini and AI Mode both use Google's index yet answered differently, so **the Gemini gain should not be assumed to transfer.** AI Mode favors marketplaces and social groups for tutor intent; Perplexity favors directories (Ostathi, PrivateJo) and, once, the assessment page. ChatGPT was not testable today. Gaps specific to service verification: all engines look for a verifiable tutor listing, and there is none that is independent of his own pages.

## 7. Limits of this investigation

One Gemini model label, one network, one day. Small samples (3–5 runs per prompt). Google crawl dates per URL were not retrievable today. Source chips are loosely positioned. The Oct 8 baseline has one run per prompt and no recorded search state. Sampling noise alone would explain some prompt-level flips (P016); it is very unlikely to explain P001 (0 of 1 on Oct 8, then 5 of 5), but that rests on one baseline run.
