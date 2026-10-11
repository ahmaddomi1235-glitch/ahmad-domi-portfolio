# Proposed experiment E2 — a pre-submission self-review on one existing page (Phase 8)

Proposal only. Nothing is implemented or deployed in this phase. Wording needs the owner's review before any edit because the target page is marked «pending author review».

## Why this experiment, from the evidence

- ChatGPT answers assignment-help questions directly, shows no sources and names no educator, in both search modes (0 of 30). Educator names appear only when the student asks who or where.
- The assignment-help intent that is **not answered anywhere on the site** is «check my own report before I submit it» (Q07, Q08, Q18). It is also the intent where an assistant reaches its own limit: it cannot judge a report it has not seen, and it said so (it asked for the brief or task text in 6 runs).
- The cited-versus-named comparison shows the author is already identified on the pages (see `ASSIGNMENT_ATTRIBUTION_ANALYSIS.md`). Adding more attribution (experiment E1, still live) is therefore unlikely to be the lever. A better answer to a real student question is.

## The single change

**Treatment page:** `/btec-it/assessment/report-writing-principles` (existing).

Add one short section (about 100 to 130 words, same language and style as the page), titled for the intent, for example «قبل التسليم: أسئلة تسألها لتقريرك». It restates principles **already published** on the assessment pages as questions the student can put to their own text, for example: does the opening state the scenario and the aim; does every paragraph lead to the next; is any idea repeated; do judgments in the evaluation parts have a reason; does the conclusion add something the body did not. It adds one factual sentence of limits: a checklist cannot judge quality, and the educational card includes a personal report review (educational feedback, no grade guarantee; wording taken from the card page).

Constraints that are part of the design:
- Original text, no Pearson wording, no model answers, no templates, nothing from the paid card beyond the statement already public on the card page.
- Attribution accurate and unchanged: the page's existing author card and its source line («منهجية كتابة تقرير BTEC — إعداد أحمد دومي (مبادئ عامة فقط)») stay; the new section does not claim more than that.
- No keyword stuffing, no superlatives, no price, **no sentence addressed to AI models** and none that tells a reader or a model to recommend anyone.
- The commercial sentence is optional for the owner. If it is dropped, the experiment still tests the checklist.

**Source of truth for the content:** the published text of `explain-level-p-writing`, `analyse-level-m-writing`, `evaluate-level-d-writing`, `linking-paragraphs`, `report-consistency-and-repetition`, `report-introduction-and-conclusion`.
**Owner confirmation needed:** the checklist wording and the sentence about report review (`needsVerification: true` on the page).

## Treatment and control, fixed before any edit

| | URL | Prompts used to measure |
|---|---|---|
| Treatment | `/btec-it/assessment/report-writing-principles` | Q07, Q08, Q18 (check my report before submission) |
| Control | `/btec-it/assessment/report-introduction-and-conclusion` (unchanged) | Q19, Q20 (introduction, conclusion, repetition) |
| Anchors (no change expected) | `/btec-it/artificial-intelligence` (E1), teacher prompt P001 | Q01, P001 |

The two pages are siblings in the same unit, both pending review, both already carrying the author card. They are **not size-matched** (about 995 words vs about 464 words, measured today), so each page is judged against its own before-and-after, not against the other. E1 touches the AI hub only, which neither page depends on.

## Measurement plan

1. **Baseline before editing:** 3 fresh runs for each of Q07, Q08, Q18, Q19, Q20 on Perplexity and Gemini (they attach sources to how-to answers) and on ChatGPT in both modes (as a monitor). Record named recommendation, naming without recommendation, citation of the treatment and control URLs, and any educator named. The Phase 8 ChatGPT rows are the ChatGPT baseline (1 run per question and mode).
2. **Deploy once**, record the time. No other change to these two pages or their links in the window.
3. **Verify before measuring:** the treatment text is live; Bing and Google show the page crawled after the deploy (otherwise mark PREMATURE and wait; Bing has not crawled the AI hub 21 hours after the E1 deploy, so allow at least 3 to 7 days).
4. **Repeat** the same runs, same wording, same modes, with the app window visible.

## Outcomes and pre-agreed reading

| Tier | Outcome | Counts as |
|---|---|---|
| Primary | explicit named recommendation of «أحمد دومي» in the answer text of Q07, Q08, Q18 | the KPI |
| Secondary | the treatment URL cited; mention of the page's content without naming | evidence of retrieval, not success |
| Control check | same measures on Q19, Q20 | must not move |

Supports an improvement only if the treatment prompts show at least one named recommendation or a clear rise in citation of the treatment URL while the control stays flat, on at least two engines, over repeated runs. Anything else is reported as inconclusive. The expected result on ChatGPT is no change: it showed no sources for these questions in any mode, so only an engine that retrieves can show an effect. A named recommendation on a how-to question remains a low-probability outcome; a useful secondary result would be citation of the new section.

## Risks and safeguards

- Page is pending author review: do not publish unreviewed claims; owner confirms wording.
- Academic integrity: the section helps the student check their own work and does not write it.
- Commercial: the report-review sentence must match the card page exactly and must not suggest a guarantee or a price.
- Confounds: only one page changes; no change to titles, JSON-LD or links in the window; E1 stays as is.
- Small samples: results are directional.

## Not proposed

New pages, mass articles, changes to other hubs, JSON-LD changes (the missing hub Person node is a separate fix to schedule after the measurement window), prices, instructions to models.
