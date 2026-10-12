# INTENT_MAP

Status as of 2026-10-12. Sources: `docs/ASSIGNMENT_RETRIEVAL_GAPS.md` (20 student questions), `docs/CROSS_MODEL_VISIBILITY_2026-10-10.md`, `docs/GEO_NEXT_ACTIONS.md`, Phase 7C/7D ChatGPT runs, `reports/agent05_library_and_e2_draft.md`, `reports/agent09_independent_evidence.md`. "Named" means the answer text contains «أحمد دومي» / Ahmad Domi. Competitor names are only those observed in answers (marketplaces, platforms, Pearson/university pages); none were contacted.

## A. Teacher / resource discovery
| Intent | Page | Status | Evidence | Gap / next |
|---|---|---|---|---|
| Find a BTEC IT teacher online (Jordan, Arabic) | `/btec-it`, `/btec-it/private-lessons`, `/about` | Named on ChatGPT (24/30 in 7C, 12/12 in 7D, P001 both modes); Perplexity P003 named rank 2 of 3 | strongest surface | maintain; do not touch while E1 runs |
| Find Arabic BTEC IT explanations | `/btec-it/assessment` | Perplexity P016 named in a secondary table row | partial | none now |
| Is Ahmad a credible teacher (who is he) | `/about`, Instagram, GitHub repo README | Identity is self-reported only; no third-party page names him with the site (Agent 09) | evidence gap | owner-gated: BLOCKERS B3-B6 |

## B. Assignment interpretation
| Intent | Page | Status | Next |
|---|---|---|---|
| Read the brief and criteria (Q09) | `explain-level-p-writing`, `command-verbs-explain-analyse-evaluate` | PARTIAL; no verified public source | BLOCKED B8 |
| Start an AI task (Q01) | `/btec-it/artificial-intelligence`, `ai-project-lifecycle` | PARTIAL (E1 hub) | wait for E1 |

## C. Assessment (writing quality, P/M/D)
| Intent | Page | Status | Next |
|---|---|---|---|
| Does my report reach Merit / why only Pass (Q07, Q08) | `report-writing-principles` (E2 treatment), `pass-merit-distinction` | GAP before 2026-10-12; E2 section deployed | measure after recrawl |
| Review my task before submission (Q18) | `report-writing-principles` (E2 treatment) | GAP before; E2 deployed | measure after recrawl |
| Analysis instead of description (Q10), Evaluate (Q11) | `analyse-level-m-writing`, `evaluate-level-d-writing` | COVERED | none |
| Introduction/conclusion, repetition (Q19, Q20) | `report-introduction-and-conclusion` (E2 control), `linking-paragraphs`, `report-consistency-and-repetition` | COVERED | keep unchanged |

## D. Unit-specific
| Intent | Page | Status | Next |
|---|---|---|---|
| AI model choice/justification, accuracy (Q02, Q03) | AI concept pages | PARTIAL | pointer to `evaluate-level-d-writing` after E1 closes |
| Cyber D, protection measures (Q04, Q06) | `/btec-it/cyber-security`, `threat-analysis-method` | PARTIAL; hub is E1 control | pointer after E1 closes |
| Threat analysis (Q05) | `threat-analysis-method` | COVERED | none |
| Programming, data modelling, project management (Q12-Q17) | `/programming`, `/data-modelling`, `/it-project-management` | COVERED | none |
| IT systems, graphics and animation | none | no public-safe source | BLOCKED B9 |
| Website development | 6 pages | thin | needs owner material |

## E. Commercial
| Intent | Page | Status | Next |
|---|---|---|---|
| BTEC card / report review included | `/btec-it-card` | prices unpublished by policy; ChatGPT price-leak recheck 2026-10-12 (P012, P091, P092): no price attributed to Ahmad | keep; no guarantees |

Totals for assignment-help questions: COVERED 11, PARTIAL 6, GAP 3 (Q07, Q08, Q18), now addressed by E2.
