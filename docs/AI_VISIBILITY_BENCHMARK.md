# AI Visibility Benchmark — Ahmad Domi | أحمد دومي (BTEC IT)

Run date: 2026-10-08 (UTC). Measurement only: nothing on the site, GSC, Bing, YouTube, Instagram or any account was changed.
Dataset: `data/ai-visibility-benchmark/` (`prompts.json`, per-platform `*.tsv`, `results.json`). Raw-text caveats are in section A.

**Verdict in one line:** across 297 real AI answers to 100 unbranded BTEC prompts, Ahmad Domi was named in 2 (0.7%), the website was cited in 1 (0.3%), and no commercial prompt (0 of 23) surfaced him. This is a directional benchmark, not a population estimate, and it is incomplete (see A).

## A. Test coverage

| Platform | Mode actually used | Planned | Completed | Not completed / reason |
|---|---|---:|---:|---|
| Perplexity | web UI, logged-out, search mode, model label "turbo" | 100 | **99** | P093 hit a "sign in and retry" wall |
| Google AI Mode | `google.com?udm=50`, logged-out, Arabic UI | 100 | **100** (see data-loss note) | — |
| ChatGPT | web UI, logged-out, Temporary Chat, web search toggle ON | 100 | **73** (P001–P073) | P074–P100 hit "anonymous message limit" (respected, not bypassed) |
| Gemini | web UI, logged-out, label Flash-Lite | 100 | **25** (sample) | 75 not run (time/effort); prog/cyber/AI categories untested |
| Claude (secondary) | — | — | **NOT TESTED** | needs the owner's logged-in account; its memory/personalization would contaminate the result |

Completed total: **297 of 400 planned (74%)**.

Important limitations (read before using any number):
1. **Google AI Mode data loss (my error).** The first pass finished 100/100, but I navigated the controlling browser tab away before exporting it, so per-prompt text is gone. Surviving: full text of P001–P011 and P025, plus the result of a regex scan over all 100 answers + source cards (exactly one Ahmad Domi hit: P025). A second pass was blocked by Google's "maximum AI response requests" limit, which I respected. Treat AI Mode's 100 as "completed, aggregate-verified", not individually auditable.
2. **Raw responses are not fully persisted.** The browser sandbox could not write files, and my local-collector attempt was blocked, so I kept the live answers in the page and persisted per-test records (answer length, flags, entities, cited domains, 90–300-character excerpt) instead of full raw text. Cited-domain lists are capped at 8 per answer; AI Mode exposes source-card labels, not URLs; ChatGPT exposes source chips, so its citations were mostly not captured and its entities come from answer text.
3. **Owner-account Gemini run discarded.** A first Gemini attempt through the owner's signed-in Pro account (profile name "Ahmad Domi", history full of Ahmad Domi GEO chats) *did* recommend "الأستاذ أحمد دومي" for one teacher prompt, but that is personalization-contaminated and is **not counted**. It also left one saved (non-temporary) chat in that account's Gemini history ("مين أفضل مدرس BTEC IT بالأردن؟", 3 prompts) that you may want to delete.
4. Logged-out sessions from a Jordan network; each prompt in a fresh conversation; no leading follow-ups. Results are time-stamped to one hour on one day. Several of Ahmad's pages were first indexed by Google only on 2026-10-07, so retrieval lag is plausible and a re-run in 2–4 weeks is advisable.
5. AI answers vary run to run; one run per prompt per platform cannot show stability.

## B. Overall visibility (completed tests only as denominator)

| Metric | Count | Rate |
|---|---:|---:|
| DISCOVERED (owner asset appears in answer or sources: name, site, owned YouTube/Instagram) | 3 / 297 | 1.0% |
| MENTIONED (explicitly named) | 2 / 297 | 0.7% |
| CITED (ahmaddomiedu.com in sources) | 1 / 297 | 0.3% |
| RECOMMENDED (named as a resource/teacher to use) | 2 / 297 | 0.7% |
| COMMERCIAL RECOMMENDATION (card, lessons, report review) | 0 / 23 | 0% |

Overlap/detail: P085 (Perplexity) = named + recommended + own YouTube video cited, **no site citation** ("recommended without own-site evidence"). P040 (Perplexity) = site cited, **not named** ("cited but not named"). P025 (Google AI Mode) = named + owner's Instagram cited, listed second among three accounts, **no site citation** ("named without the website"). Commercial denominators: Perplexity 9, AI Mode 10, Gemini 4, ChatGPT 0 (its commercial prompts were in the blocked range).

## C. Platform breakdown

| Platform | Completed | Discovered | Mentioned | Site cited | Recommended | Commercial rec. |
|---|---:|---:|---:|---:|---:|---|
| Perplexity | 99 | 2 (2.0%) | 1 (1.0%) | 1 (1.0%) | 1 (1.0%) | 0/9 |
| Google AI Mode | 100* | 1 (1.0%) | 1 (1.0%) | 0 | 1 (1.0%) | 0/10 |
| ChatGPT | 73 | 0 | 0 | 0 | 0 | not tested |
| Gemini (clean, logged-out) | 25 | 0 | 0 | 0 | 0 | 0/4 |
| Claude | 0 | NOT TESTED | | | | |

*AI Mode: see limitation 1. Several ChatGPT answers were only clarifying questions (e.g. P001, P003, P004, P013, P044); where it did name resources it named BTECHub, Eduva, TawjihiHub.

## D. Category breakdown (named / site-cited, completed denominators)

| Category | Perplexity | AI Mode | ChatGPT | Gemini |
|---|---|---|---|---|
| Teacher in Jordan (15) | 0 / 0 (15) | 0 / 0 (15) | 0 / 0 (15) | 0 / 0 (14) |
| Arabic resources (15) | 0 / 0 (15) | **1** / 0 (15) — P025 | 0 / 0 (15) | 0 / 0 (5) |
| P/M/D & assessment (15) | 0 / **1** (15) — P040 | 0 / 0 (15) | 0 / 0 (15) | 0 / 0 (2) |
| Cyber Security (15) | 0 / 0 (15) | 0 / 0 (15) | 0 / 0 (15) | not tested |
| Artificial Intelligence (15) | 0 / 0 (15) | 0 / 0 (15) | 0 / 0 (13) | not tested |
| Programming/Data/PM (15) | **1** / 0 (15) — P085 | 0 / 0 (15) | not tested | not tested |
| Commercial (10) | 0 / 0 (9) | 0 / 0 (10) | not tested | 0 / 0 (4) |

## E. Top competitor and source domains (observed only)

Perplexity cited-domain frequency (answers in which the domain appears among sources, 99 answers): qualifications.pearson.com 36, **t.me (Telegram, mostly `t.me/s/it_for_btec`) 29**, studocu.com 22, scribd.com 20, jis.edu.jo 17, btec.jo 16, btec.moe.gov.jo 14, ibm.com 13, tawjihihub.com 11, youtube.com 10, btec-jo-support.com 10, qf-btecit.web.app 9, btec-jo.com 8, al-maher.net 8, dbtec.top 6, instagram.com 6, jo.ostathi.com 5, btechub.com 3, **ahmaddomiedu.com 1**.

Entities named in answers (answers containing them): Perplexity — Pearson 50, JIS 17, MoE-Jordan 15, TawjihiHub 11, D.BTEC 7, AF BTEC 6, Ostathi 5, Watad 4, BTECHub 3. ChatGPT (73) — Pearson 23, **BTECHub 8**, OpenSooq 6, Eduva 6, TawjihiHub 5, Kafaa 4, PrivateJo 3, Teqani 2. Gemini sample (25) — Pearson 13, Asas 10, Teqani 7, YouTube/Facebook/Telegram generic. AI Mode (P001–P011) — Teqani, OpenSooq, PrivateJo, Watad, JoAcademy, AF BTEC, D.BTEC, JIS, Facebook tutor groups. Not observed at all: BTEC Pro. Observed only in ChatGPT/Perplexity: BTECHub, TawjihiHub, Eduva.

Named individual teachers/creators actually observed: Shadi Jaber, Hazem Al-Rukibat (YouTube, cited in 4 Perplexity answers), Mohammad Nasrallah (3), Ahmad Al-Faqih, Qutaiba Shtayat, Alaa Bataineh (ChatGPT), Rima Abu Laoui (Gemini). Ahmad Domi appears in only the two answers above.

## F. Best-performing prompts (Ahmad appears)

- **P085** "مين بشرح البرمجة BTEC IT بالعربي؟" — Perplexity: named in a 5-item list ("مدرّس BTEC IT على منصة أساس … Unit 5: نماذج البرمجة") and his YouTube video "مقارنة البرمجة الإجرائية والكائنية والمعتمدة على الأحداث" is one of the sources. Not on ChatGPT/AI Mode for this prompt (ChatGPT blocked; AI Mode no).
- **P040** "مثال على فقرة Evaluate بمهمة BTEC IT" — Perplexity cites `ahmaddomiedu.com/btec-it/assessment` as 1 of 10 sources (educational source visibility, not a teacher recommendation).
- **P025** "في حساب انستغرام أو تيك توك بشرح BTEC IT بالعربي؟" — AI Mode lists Instagram **@ahmaddomiedu** ("Ahmad Ra'ed Domi || معلم BTEC IT", Irbid) with a source card.

## G. Worst-performing high-value prompts (absent everywhere)

P001, P002, P005, P008, P011, P015 (teacher recommendation in Jordan/Amman), P016 and P017 (Arabic BTEC IT explanations / YouTube channel), P031/P033/P032 (P/M/D and command verbs — his dedicated pages exist and were indexed, yet answers cite Pearson, StuDocu, Woolwich), P045 (calculator — `btec-calculator` exists; answers cite dbtec.top, btec-engineer.com, Eduva), P046/P056 (Cyber Security — 49 site pages, none retrieved), P061/P064 (AI assignment — 38 site pages, none retrieved), P091–P100 (all commercial).

## H. Fastest GEO opportunities (evidence-backed; none implemented)

1. Get present on the sources the engines actually retrieve for "teacher" prompts: Telegram `it_for_btec` (29/99 Perplexity answers), btec.jo / btec-jo.com, TawjihiHub, Ostathi, OpenSooq listing, Facebook tutor groups (AI Mode cards). Earned/owned profiles only.
2. Align the **Asas platform** profile (Perplexity tied his name to it in P085) with the website: same name form, Irbid, BTEC IT, link to ahmaddomiedu.com.
3. Unify name variants ("Ahmad Domi", "Ahmad Ra'ed Domi", "أحمد دومي") across Instagram/YouTube/site; AI Mode already surfaces the Instagram profile.
4. YouTube is the most-shared retrieval surface (Perplexity 10/99 answers, AI Mode 16/100 source cards, Gemini 10/25): make his videos answer the observed phrasing ("شرح واجب الوحدة X", "BTEC IT U4", P/M/D, command verbs) in titles/descriptions/chapters, and link the matching site page.
5. P/M/D: add more worked-example blocks (the Evaluate example is the only thing that got cited).
6. Commercial gap: verified service facts (private lessons, report review, card) are absent from answers; engines fall back to OpenSooq/Facebook/PrivateJo and unsourced price guesses (10–25 JOD in Perplexity, 15–25 JOD in AI Mode). Owner must supply approved facts first.
7. Calculator/glossary/questions pages: submit for earned mentions where students ask (P045, P022, P028).
8. Confirm the programming-paradigms, data-vs-information and project-vs-routine pages get indexed (all three were "discovered, not indexed" on 2026-10-07; P076/P077/P079/P082 answered from other sources).
9. Re-run the same 100 prompts in 2–4 weeks, with ChatGPT after its limit resets and AI Mode after its quota resets, and with a full persisted raw log.
10. Treat Claude as a separate, owner-approved test (clean profile with memory off).

## I. Final answers

1. **Does ChatGPT currently recommend Ahmad Domi for BTEC IT?** Not in this test: 0 of 73 completed (logged-out, web search on). 27 prompts (programming + commercial) were not testable because of its anonymous limit.
2. **Does Gemini recommend him?** Not in the clean logged-out sample: 0 of 25. (The owner-account run did, but that is contaminated and excluded.)
3. **Does Perplexity cite ahmaddomiedu.com?** Yes, once in 99 answers (P040), and it also cited his YouTube channel once and named him once (P085).
4. **Does Google AI mention him?** Yes, once in 100 (P025, via his Instagram), never via the website.
5. **Prompts we are winning:** P085 (programming in Arabic), P040 (Evaluate example), P025 (Instagram accounts). Nothing else.
6. **Prompts we are losing:** every teacher-in-Jordan prompt, the P/M/D and command-verb prompts, Cyber and AI assignment prompts, the calculator, and all commercial prompts.
7. **Evidence needed:** third-party corroboration on the platforms the engines retrieve (Telegram, BTEC JO, TawjihiHub, Asas, Ostathi, OpenSooq/Facebook, LinkedIn), consistent entity naming, YouTube metadata that matches student phrasing, owner-verified service/pricing details, and confirmed indexing of the remaining pages.
