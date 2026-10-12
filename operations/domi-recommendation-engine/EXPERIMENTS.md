# EXPERIMENTS

KPI for every experiment: explicit named recommendation of «أحمد دومي» / Ahmad Domi in the generated answer text. Citations, source cards and incidental mentions are secondary and recorded separately.

## E1 — educator attribution on one unit hub (live, pre-existing)
- Treatment `/btec-it/artificial-intelligence`; control `/btec-it/cyber-security` (do not modify either until E1 is closed).
- Deployed 2026-10-11T00:39Z. Details: `../geo-mission/EXPERIMENTS.md`, frozen prompts `../geo-mission/prompts_assignment_help_v1.json` (hash 5df1584d0adc1c08).
- Status 2026-10-12: PREMATURE / NOT INFORMATIVE. ChatGPT assignment-help is at a floor (0 named, 0 sources); Bing had not crawled the AI hub at the last check (2026-10-11). No improvement and no regression shown.
- Next: re-check crawl status on or after 2026-10-15, then re-run the frozen AI-vs-cyber prompts.

## E2 — pre-submission self-review on one assessment page (deployed 2026-10-12)
- Hypothesis: the unanswered intent «check my own report before I submit it» (Q07, Q08, Q18 in `docs/ASSIGNMENT_RETRIEVAL_GAPS.md`) is the one place an assistant reaches its own limit; a source-backed self-review section may be retrieved and cited, and could support a named referral. Expected on ChatGPT: no change (it retrieves nothing for these prompts). A named recommendation on a how-to question stays a low-probability outcome.
- Single change: one section (h2 + 9-question ordered list + one-line disclaimer, about 118 words) added to `content/concepts/assessment/report-writing-principles.json`. Text from Agent 05; every sentence checked against src-004 or the page's own disclaimer (`reports/agent05_library_and_e2_draft.md`). No price, no guarantee, no instruction to models, no card sentence (the owner-optional commercial sentence was left out on purpose so the experiment tests the checklist only).
- Treatment page: `/btec-it/assessment/report-writing-principles` (prompts Q07, Q08, Q18).
- Control page: `/btec-it/assessment/report-introduction-and-conclusion` (unchanged; prompts Q19, Q20). Not size-matched (about 995 vs 464 words): judge each against its own before/after.
- Anchors, unchanged: E1 hub, teacher prompt P001.
- Frozen prompts: `../geo-mission/prompts_phase8_assignment_20_v1.json` (hash 8e56c8e2849c50d0).
- Baseline (before deploy):
  - ChatGPT (Phase 8, both modes, 1 run per question and mode): 0/30 named, 1/30 any link (a Pearson page).
  - Perplexity (2026-10-12, URL method): Q07 x2, Q08 x2, Q18 x3 = 0 named in 7 treatment runs; Q19 x2, Q20 x2 = 0 named in 4 control runs. Sources UNKNOWN (sign-up wall hid them), so the citation baseline is not established.
  - Gemini: not run (app window hidden).
- Deployed: commit 854b601, Vercel production deploy started 2026-10-12T22:06:00Z, Ready about 22:08Z. Live HTML verified (heading present on treatment, absent on control). IndexNow 200 OK for the treatment URL.
- Measurement plan: do not re-test before 2026-10-15 and not before Bing/Google show a recrawl after the deploy (otherwise mark PREMATURE). Then repeat the same prompts, wording and modes (ChatGPT A/B by JS, Perplexity by URL, Gemini only with a visible window).
- Reading rules (pre-agreed): supports improvement only if treatment prompts show at least one named recommendation or a clear rise in citation of the treatment URL while control stays flat, on at least two engines, over repeated runs. Anything else = inconclusive. Technical retrieval of the section is not a recommendation success.
