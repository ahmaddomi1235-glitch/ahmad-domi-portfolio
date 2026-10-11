# OPERATION DOMI — checkpoint report (honest scope)

Written 2026-10-11 ~00:45Z. This session did NOT run for 25 hours; it ran until the experiment was deployed and then stopped at the point where further evidence needs time. No background process is running.

## What actually ran
- Real sub-agents (3, read-only, finished): Agent 5 assessment audit, Agent 7 entity audit, Agent 8 technical audit (`reports/`). The other roles (2, 3, 4, 9, 10) were performed by the main session; there were no separate processes for them.
- Baseline before any edit (ChatGPT, Gemini, Perplexity, anonymous, fresh chats): see `raw/baseline_chatgpt_2026-10-10.md` (private) and `EXPERIMENTS.md`.
- One change deployed (commit 1900fc7, live about 2026-10-11T00:39Z): a factual «من يشرح هذه الوحدة؟» section on `/btec-it/artificial-intelligence`. Control: `/btec-it/cyber-security`, untouched. Release gate: lint, typecheck, content validation, unit tests, build passed; Playwright 57 passed and one unrelated timeout that passed on rerun.
- Pricing: no price-like text on the AI hub, lessons page, card page, llms.txt, sitemap or search index after deploy.

## Findings (observation vs hypothesis)
1. Observation: on assignment-help prompts (how to write the D criterion, understand a brief, review a report) ChatGPT answered from general knowledge with no sources (0 links in 6 of 6) and never named him; Gemini did not name him in 3 of 3; Perplexity cited `/btec-it/assessment` in 2 of 3 but did not name him.
2. Observation: on teacher/resource prompts for the same units ChatGPT searched and named him in 4 of 4 (P049, P057, P061, P069).
3. Hypothesis H1: for ChatGPT, assignment-help questions do not trigger retrieval, so page attribution cannot help there; the realistic gain is on Perplexity and Gemini, where the page is retrieved but the author is not surfaced.
4. The site already has 11 assessment pages; real gaps are the assignment-brief reading and a pre-submission checklist (Agent 5), both blocked by owner review.
5. The AI and cyber hubs are not matched (size, videos, links); judge each against its own before/after.

## Answer to the main question
Did the probability of an independent assistant explicitly recommending Ahmad Domi on assignment-help questions improve? **Not shown.** The change was deployed minutes before this report; no post-change measurement exists and none would be meaningful yet. The only evidence is the pre-change baseline: 0 named on assignment-help prompts in every engine tested.

## Top next actions
1. After 24 to 72 h, re-run `prompts_assignment_help_v1.json` with 3 fresh runs per prompt on ChatGPT, Gemini and Perplexity; compare treatment (AI*) vs control (CY*) each against its own baseline.
2. Owner decisions in BLOCKERS.md (B1, B2).
3. After the window: add the Person node to hub JSON-LD (one line in `collectionGraph()`), unify role wording and the YouTube name form.
4. Re-test Google AI Mode when the CAPTCHA is cleared.
5. Re-check that no old price reappears (P012, P091, P092) after Bing re-crawl; notify Bing by IndexNow for private-lessons and the card if not yet done.
6. Keep teacher/resource prompts as the main KPI; treat assignment-help as secondary and expect small effects.

## Resume
Open this repo, read `TASK_BOARD.md`, `EXPERIMENTS.md`, `BLOCKERS.md`, then run step 1 above. Re-launch with: `claude --resume` in this session, or start a new session with the instruction "continue operations/geo-mission".
