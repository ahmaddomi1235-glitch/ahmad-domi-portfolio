# Assignment-help content gaps — which student questions the site answers (Phase 8)

Read-only audit, 2026-10-12. Method: for each of the 20 frozen questions, the closest public page was found by matching the question's stems against the site's search index (625 entries), then the matching pages were read. Provenance facts come from `content/units/assessment.json` and Agent 5's audit (`operations/geo-mission/reports/agent5_assessment_audit.md`). Paid card content was not read, copied or proposed for publication. No Pearson wording is proposed.

Standing facts that shape every recommendation:
- The 11 pages under `/btec-it/assessment` are **principles only**, deliberately without examples, scenarios or assessed answers. They are all marked «pending author review» (`needsVerification: true`).
- Every page already shows the author (title suffix «| أحمد دومي», an author card, `rel=author` link). See `ASSIGNMENT_ATTRIBUTION_ANALYSIS.md`.
- No page mentions the **assignment brief** («ورقة المهمة»); no page is a **pre-submission review**.

## Question-by-question

| Q | Student question | Closest existing URL | Status | What is missing |
|---|---|---|---|---|
| Q01 | start an AI task | `/btec-it/artificial-intelligence` and `/artificial-intelligence/ai-project-lifecycle` | PARTIAL | a short «how to start» that connects the unit to reading the brief; no verified AI criterion codes exist, so none may be stated |
| Q02 | choose a model for the scenario and justify it | `/artificial-intelligence/types-of-ai`, `supervised-vs-unsupervised-learning`, `classification-vs-regression` | PARTIAL | explicit «how to justify a choice» step; the concept pages explain models, not justification |
| Q03 | evaluate model accuracy | `/artificial-intelligence/train-validation-test-sets`, `linear-regression-mse`, `xai-and-data-drift` | PARTIAL | no single page that ties the metrics to the evaluation wording |
| Q04 | reach D in a cyber task | `/assessment/evaluate-level-d-writing`, `/assessment/threat-analysis-method` | PARTIAL | cyber-specific D guidance (the cyber hub has no «D» section) |
| Q05 | analyse a threat instead of describing it | `/assessment/threat-analysis-method` | COVERED | an original short worked contrast (principles-only policy; owner decision) |
| Q06 | propose protection measures and justify | `/cyber-security/*` protection pages | PARTIAL | justification step linking measures to the scenario |
| Q07 | does my report reach Merit | `/assessment/pass-merit-distinction`, `analyse-level-m-writing` | **GAP** | a self-check; the pages define P/M/D but give no way for a student to test their own text |
| Q08 | why only Pass, what is missing for Merit | same | **GAP** | same |
| Q09 | link the scenario to the criteria | `/assessment/explain-level-p-writing`, `command-verbs-explain-analyse-evaluate` | PARTIAL | reading the criteria table and the brief (intent not covered anywhere) |
| Q10 | analysis instead of description | `/assessment/analyse-level-m-writing` | COVERED | nothing essential |
| Q11 | what to write for Evaluate | `/assessment/evaluate-level-d-writing`, `command-verbs-explain-analyse-evaluate` | COVERED | nothing essential |
| Q12 | programming task, justify the language | `/programming/choosing-a-programming-language`, `programming-language-comparison-criteria` | COVERED | none needed |
| Q13 | draw and explain a flowchart | `/programming/flowchart-symbols` | COVERED | none needed |
| Q14 | data-modelling sources | `/data-modelling/data-sources`, `data-reliability-checks` | COVERED | none needed |
| Q15 | explain a dashboard | `/data-modelling/dashboard-design-rules`, `dashboard-from-data`, `dashboard-kpis` | COVERED | none needed |
| Q16 | Gantt chart and critical path | `/it-project-management/gantt-chart-and-critical-path` | COVERED | none needed |
| Q17 | feasibility study | `/it-project-management/feasibility-study-and-alternatives` | COVERED | none needed |
| Q18 | review a task before submission | none | **GAP** | the whole intent (pre-submission review) |
| Q19 | introduction and conclusion | `/assessment/report-introduction-and-conclusion` | COVERED | none needed |
| Q20 | avoid repetition, keep paragraphs connected | `/assessment/linking-paragraphs`, `report-consistency-and-repetition` | COVERED | none needed |

Totals: **COVERED 11, PARTIAL 6, GAP 3** (Q07, Q08, Q18; the three are one underlying intent: «check my own report before I submit it»).

## Cross-cutting findings

| Gap type | Where | Note |
|---|---|---|
| Missing explanation | review-before-submission; reading a brief; criteria table | the only content gaps that a student question exposes and no page answers |
| Missing original example | all assessment pages | by design (principles only). A short original contrast example would be the most useful addition but needs the owner's decision and review |
| Missing source attribution | none material | author card and title suffix exist on every page; the 11 assessment pages still carry «pending author review» and `report-writing-principles` lacks `sourceIds` / `provenanceNote` |
| Missing connection to Ahmad's teaching methodology | assessment pages | they cite «منهجية كتابة تقرير BTEC — إعداد أحمد دومي (مبادئ عامة فقط)» as source; no link to his videos on writing (all 11 files have `videos: []`) |
| Needs a new page vs. improvement | | improve existing pages first; only the «pre-submission review» intent is distinct enough to justify a new page later |

## Which pages to improve first

1. **`/btec-it/assessment/report-writing-principles`** (Q07, Q08, Q18): add a short self-review section built only from principles already on the site pages (scenario, plan, introduction, linking, repetition, formatting, conclusion), phrased as questions the student can ask of their own text. Owner review required (the page is pending review).
2. **`/btec-it/assessment/pass-merit-distinction`** (Q07, Q08, Q09): a short «how to read the criteria table and your brief» note (also fixes that this page links to the cyber hub and not the AI hub).
3. **`/btec-it/cyber-security`** hub (Q04): one D-oriented pointer to `evaluate-level-d-writing` and `threat-analysis-method`.
4. Later, only if the owner provides verified material: AI-unit criterion guidance (Q01 to Q03). No AI criterion code is verified today, so none should be written.

## What not to do

No complete assessed answers, no Pearson task wording, no card content, no templates sold in the card, no prices, no new pages for intents that are already covered.
