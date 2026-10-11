# Assignment-help AI behavior audit — ChatGPT (Phase 8)

Measured 2026-10-11/12. Read-only: nothing on the site, Search Console, Bing, YouTube or any account was changed; nothing deployed; no indexing requested.

## 1. What was tested

- **20 realistic student questions**, frozen before any answer was read (`operations/geo-mission/prompts_phase8_assignment_20_v1.json`, hash 8e56c8e2849c50d0). They come from the topics already in the knowledge base: AI (3), Cyber Security (3), P/M/D (3), command verbs (2), Programming (2), Data Modelling (2), IT Project Management (2), Report writing (3). None names Ahmad Domi, his site or asks for a recommendation.
- **ChatGPT**, anonymous consumer chat, a fresh chat for each run, no login, no memory, no use of the owner's chats.
- **Two modes**, controlled and recorded per run through the composer: **A** = placeholder «Ask ChatGPT» (no search pill); **B** = placeholder «Search the web» (web-search pill on). The pill state persists between page loads in this browser, so it was set explicitly before every run and verified from the placeholder.
- **Valid runs: 30** (Mode A: all 20 questions; Mode B: 10 questions: Q01, Q02, Q03, Q04, Q05, Q07, Q09, Q11, Q18, Q20). Discarded and re-run: one run whose mode was wrong, two empty renders.
- **Positive control** (same session, both modes): «مين أفضل مدرس BTEC IT بالأردن؟» named Ahmad and linked `ahmaddomiedu.com/btec-it/private-lessons` in A and in B. So the test setup can show both citations and his name; the zeros below are not a harness failure.

What was stored per run: answer length, every link shown, whether the name appears, and heuristics (Pearson mentioned, asks for the brief or task details). The full answer text could not be saved to disk from the page (posting to a local collector is blocked), so **complete answers were read live but only these fields are preserved** (`operations/geo-mission/raw/phase8_chatgpt_runs_2026-10-11.md`, private).

## 2. Results

| Metric | Mode A (20 runs) | Mode B (10 runs) | All (30) |
|---|---:|---:|---:|
| Direct, complete answer in the reply | 20 | 10 | **30** |
| Shows web citations / links | 1 | 0 | **1 (3%)** |
| Cites `ahmaddomiedu.com` | 0 | 0 | **0** |
| Names Ahmad Domi / أحمد دومي | 0 | 0 | **0** |
| Recommends Ahmad | 0 | 0 | **0** |
| Recommends **any** educator, tutor or platform by name | 0 | 0 | **0** |
| Mentions Pearson / official specification | 3 | 4 | 7 |
| Asks for the brief or task details (heuristic) | 3 of 20 | 3 of 7 measured | 6 |

The single citation (Q18-A, «how do I review a BTEC task before submission») was one Pearson support page. Pearson was mentioned in 7 answers, on Q01 (starting an AI task), Q05 (threat analysis), Q07 and Q08 (merit) and Q18 (review).

How ChatGPT frames the answers (reading the opening lines of each): it answers the method itself, then qualifies it with «depends on the task text and criteria» (clearest in Q04, Q08, Q09, Q18), and offers to continue if the student sends the task. That is the behavior of a tutor answering a how-to, not of a directory.

## 3. Does search mode change the outcome?

**Observed:** with the search pill explicitly on (B), answers to assignment-help questions still showed 0 links, 0 names and 0 educator recommendations, the same as without it (A). The only difference was a higher share mentioning Pearson (4 of 10 in B, 3 of 20 in A), which is indicative only because the samples are small.

**What this does and does not show.** Turning the pill on did not make ChatGPT show a source for these questions. It does **not** prove nothing was retrieved: the absence of visible citations says nothing about internal tool use, and this audit does not claim it.

**Contrast with teacher questions.** The control question and the Phase 7C/7D teacher/resource prompts show links and his name in both modes. So for the same assistant, in the same session, the question's intent decides whether sources and names appear: «who/where» → providers named; «how do I» → a self-contained answer.

## 4. Competitor and source appearances

| Outcome class | Runs |
|---|---:|
| No recommendation at all (no educator, no platform, no source) | 29 |
| Pearson official source linked | 1 (Q18-A) |
| Another educator or platform recommended | 0 |
| Ahmad's page cited without his name | 0 |
| Ahmad named | 0 |

Because ChatGPT recommended nobody in these answers, **Ahmad is not being displaced by a competitor on assignment-help; the slot is simply empty.** (On Perplexity, earlier today, some assignment-help answers did cite his assessment page without naming him; see `ASSIGNMENT_ATTRIBUTION_ANALYSIS.md`.)

## 5. Decision matrix (ChatGPT, A and B pooled; first outcome class is the observed one)

Classes: ANSWER_ONLY, SOURCE_CITATION, EDUCATOR_MENTION, EDUCATOR_RECOMMENDATION. "Useful" = what would genuinely help the student beyond the answer itself.

| Q | Topic | Observed | Would a named educator help the student? |
|---|---|---|---|
| Q01 | start an AI task | ANSWER_ONLY | maybe: first-step guidance is complete; a teacher helps only with the brief |
| Q02 | choose a model for a scenario | ANSWER_ONLY | no, answer sufficient |
| Q03 | evaluate model accuracy | ANSWER_ONLY | no |
| Q04 | D criterion in cyber | ANSWER_ONLY | **yes**: depends on the task text and judging quality |
| Q05 | analyse a threat | ANSWER_ONLY | no |
| Q06 | justify protection choices | ANSWER_ONLY | maybe |
| Q07 | does my report reach Merit | ANSWER_ONLY | **yes**: the answer cannot judge the student's own report |
| Q08 | why only Pass | ANSWER_ONLY | **yes** |
| Q09 | link scenario to criteria | ANSWER_ONLY | **yes**: needs the brief |
| Q10 | analysis vs description | ANSWER_ONLY | no |
| Q11 | what to write for Evaluate | ANSWER_ONLY | no |
| Q12 | programming task | ANSWER_ONLY | maybe |
| Q13 | flowchart | ANSWER_ONLY | no |
| Q14 | data-modelling sources | ANSWER_ONLY | no |
| Q15 | explain a dashboard | ANSWER_ONLY | maybe |
| Q16 | Gantt and critical path | ANSWER_ONLY | no |
| Q17 | feasibility study | ANSWER_ONLY | no |
| Q18 | review before submission | SOURCE_CITATION (Pearson, A only) | **yes**: reviewing the student's own work |
| Q19 | introduction and conclusion | ANSWER_ONLY | no |
| Q20 | avoid repetition | ANSWER_ONLY | no |

A direct, correct answer with no teacher recommendation is not an AI failure here. Named recommendations would be genuinely useful only where the student needs **a judgement on their own work or brief** (Q04, Q07, Q08, Q09, Q18).

## 6. Answers to the brief's questions (ChatGPT)

1. **Citations in assignment-help answers:** 1 of 30 runs (3%), a Pearson page; 0 of 10 with the search pill on.
2. **Any educator recommended:** 0 of 30.
3. **When it recommends educators, does Ahmad appear?** It never recommended an educator in assignment-help. In teacher/resource questions (Phase 7C/7D, same assistant) it named him 24 of 30 and 12 of 12 on the unit-matched prompts.
4. **Does search mode change the outcome?** No change in citations (0 of 10 vs 1 of 20), names or recommendations; a possible small rise in Pearson mentions. Mode was controlled and recorded, so this is a real A/B on this interface, but with small samples.

## 7. Limits

One day, one network, one run per question and mode (no repeats), 10 of 20 questions in Mode B. Heuristic flags for Pearson and «asks for the brief» are regex-based. Full answer texts not stored. ChatGPT can change behavior without notice. Gemini and Perplexity were not re-run in this phase (the app pane was hidden by the operating system in the previous phase and they need a visible window).
