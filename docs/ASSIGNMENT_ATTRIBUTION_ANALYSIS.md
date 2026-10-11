# Attribution analysis — when his page is cited, why is he sometimes not named? (Phase 8)

Read-only. No claim is made about any model's hidden reasoning; everything below is observed output plus public page facts.

## 1. The cases

All observations are from anonymous, fresh sessions; one run each unless stated.

| Engine | Question | His page cited | Named in the answer text | Intent |
|---|---|---|---|---|
| Perplexity | «كيف أكتب مهمة الذكاء الاصطناعي BTEC IT وأحقق معيار D؟» (AI1, pre-change baseline) | `/btec-it/assessment` | **no** | how-to |
| Perplexity | «كيف أراجع تقريري قبل تسليم مهمة BTEC IT؟» (GH2) | `/btec-it/assessment` | **no** | how-to |
| Perplexity | «شو الفرق بين Explain وAnalyse وEvaluate في BTEC؟» (P033) | `/btec-it/assessment` | **no** | definition |
| Perplexity | «مدرس BTEC IT أونلاين للأردن بشرح بالعربي» (P003) | `/btec-it/assessment` | **yes**, rank 2 of 3 | find a teacher/resource |
| Perplexity | «وين ألاقي شرح BTEC IT بالعربي؟» (P016) | `/btec-it/assessment` | **yes** (secondary table row) | find a resource |
| ChatGPT | assignment-help (30 runs, Phase 8) | no page cited | no | how-to |
| ChatGPT | teacher/resource prompts (Phase 7C and 7D) | his pages | **yes** in all 36 answers that cited them (24 of 30 in 7C, 12 of 12 in 7D) | find a teacher/resource |

Not every how-to answer cites his page at all (ChatGPT: 1 of 30 runs showed any link, and it was a Pearson page; Perplexity: 2 of the 3 how-to prompts run in the baseline cited it).

## 2. What the cited page says about its author

Checked on the live pages today (visible text and markup):

| Page | Name in `<title>` | Author card with link to `/about` (`rel=author`) | Name mentions (title included) | JSON-LD author reference | Full Person node on the page |
|---|---|---|---|---|---|
| `/btec-it/assessment` | yes («… \| أحمد دومي») | yes | 6 mentions | yes | **no** |
| `/btec-it/assessment/command-verbs-explain-analyse-evaluate` | yes | yes | 5 | yes | yes |
| `/btec-it/assessment/report-writing-principles` | yes | yes | 5 | yes | yes |
| `/btec-it/artificial-intelligence` (AI hub) | yes | yes | 12 | yes | no |
| `/btec-it/cyber-security` | yes | yes | 12 | yes | no |
| `/btec-it/private-lessons` | yes | yes | 14 | yes | yes |

So the cited assessment hub **does** identify its author in the title, in an author card, and in the body. The pages cited-and-named and cited-and-not-named are the **same URL** (`/btec-it/assessment`).

## 3. Comparison: cited-and-named vs cited-without-name

| Factor | Evidence | Plausible role |
|---|---|---|
| **Author identity on the page** | identical in both groups (same URL, same title suffix, same author card) | **unlikely to explain the difference**; a Person node is missing on this hub, but the named case P003 cited the same hub |
| **Query intent** | named: «find a teacher/resource» (P003, P016, plus all ChatGPT teacher prompts); not named: «how do I / what is the difference» | **strongest correlate**: provider-list questions require naming providers; how-to answers use sources as footnotes |
| **Answer structure** | named: list of options with one line each; not named: a self-contained explanation with sources attached | plausible; consistent with intent |
| **Page relevance** | the page was retrieved in both groups, i.e. relevant enough | not the bottleneck |
| **Source credibility** | competing sources in the how-to answers: Pearson PDFs, university pages, BTEC assignment sites; in the teacher answers: marketplaces and platforms | plausible: for how-to answers an official or institutional source is cited next to his |

These are correlations from a handful of single runs; none establishes causation.

## 4. Reading

1. **Attribution is not the bottleneck on the page.** The page already says who wrote it. Adding more attribution (the AI-hub experiment E1) changes a variable that does not separate the named from the unnamed cases.
2. **Intent is.** The same assistant that names him in 24 of 30 teacher/resource prompts names no one in how-to answers, whatever page it cites.
3. **ChatGPT's how-to answers show no sources at all** in both search modes; no attribution change can show up there. The measurable surface for attribution is engines that attach sources to how-to answers (Perplexity, and Gemini when its search is used), where his page is sometimes the cited footnote.
4. A student-facing reason to name an educator exists only when the answer reaches a limit: judging the student's own report or brief (Q04, Q07, Q08, Q09, Q18). That is where a page could legitimately say what it cannot do for the reader and where a human review exists (the card page states that report review is included).

## 5. Uncertainty

Small samples; Perplexity answers vary between runs; Perplexity baseline runs were made on 2026-10-10 before the AI-hub change; the Gemini comparison is not repeated here (label chips are ambiguous). The hub JSON-LD gap (no Person node on hubs and on `/btec-it/assessment`) is a real inconsistency but no run shows it matters.
