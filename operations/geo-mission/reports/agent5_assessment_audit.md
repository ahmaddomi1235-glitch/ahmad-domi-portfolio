# Agent 5 - Assessment and assignment-help audit (read-only)

Date: 2026-10-10. Scope: content/units/assessment.json, content/concepts/assessment/*.json (11 files), AI and cyber unit JSON, data/seo-intent-map.json, docs/SEO_INTENT_MAP.md, and 5 production pages fetched with curl.

## Provenance (what may be safely expanded)

- All 11 assessment concept files and the assessment unit carry `reviewState` containing "pending author review". None is author-approved. Ten say "assistant-drafted in original wording ... authorship confirmed by the owner 2026-10-04 ... pending author review". `report-writing-principles.json` is the weakest: no `sourceIds` and no `provenanceNote`, only "assistant-drafted summary of the author's methodology ... pending author review".
- `assessment.json`: `needsVerification: true`, `sourceType: ahmad-unit-book`, `visibility: PUBLIC_SUMMARY`. The 11 concepts have no `needsVerification` key (null), all `sourceType: ahmad-unit-book`, `PUBLIC_SUMMARY`, `lastReviewed 2026-10-04`.
- `artificial-intelligence.json`: `needsVerification: true`, `sourceType: ahmad-unit-book`, reviewState "assistant-drafted ... pending author review", `visibility: PUBLIC`, no official structure block (no criteria codes), `concepts` empty (pages are discovered via the concept folder).
- `cyber-security.json`: `needsVerification: true`, `sourceType: ahmad-booklet`, "pending author review"; has `officialStructure` (Unit 11, aims A to D). Criterion codes were checked against a private Pearson scan (cited in pass-merit-distinction reviewState, src-021/063).
- Consequence: every addition below is new owner-voice teaching text and must be flagged "pending author review" in reviewState, like its neighbours. Only the criterion-code table (Unit 11) has a documented external verification.

## (a) Intent-to-page matrix

| # | Student intent | Best existing page | Verdict |
|---|---|---|---|
| 1 | Understand an assignment brief | none. Closest: `/btec-it/assessment/report-writing-principles` section "1) خطّط قبل أن تكتب" (about 60 words on scenario reading) | GAP (no page or section uses "Assignment Brief" or "ورقة المهمة"; grep of content/src/data/docs returns zero hits) |
| 2 | Map learning aims to criteria | `/btec-it/assessment/pass-merit-distinction` (Unit 11 code table: A.P1-A.P3, A.M1, AB.D1 ... CD.D2) and the cyber unit "البنية الرسمية" block | Partial. Cyber Unit 11 only. AI unit has no criteria structure. No "how to read the grid" explanation. |
| 3 | Pass / Merit / Distinction | `/btec-it/assessment/pass-merit-distinction` | Covered |
| 4 | Command verbs | `/btec-it/assessment/command-verbs-explain-analyse-evaluate` | Covered (explain/analyse/evaluate; "compare/recommend" appear only in the H1) |
| 5 | Evidence-based explanation | `/btec-it/assessment/explain-level-p-writing` (5 steps) | Partly. "Evidence" as a word (use of scenario facts as proof) is not stated. |
| 6 | Analysis | `/btec-it/assessment/analyse-level-m-writing` | Covered |
| 7 | Evaluation | `/btec-it/assessment/evaluate-level-d-writing` | Covered |
| 8 | Connect a technical concept to the scenario | `explain-level-p-writing` step 3 "أين يظهر في السيناريو؟" and `/btec-it/assessment/threat-analysis-method` (cyber only) | Partial. No AI equivalent; unit pages only link to generic P/M/D pages. |
| 9 | Common report mistakes | `/btec-it/assessment/report-consistency-and-repetition` (intent map labels it "أخطاء كتابة تقرير BTEC"), plus "أخطاء شائعة" section in `report-introduction-and-conclusion` | Covered but fragmented across three pages. |
| 10 | Review a report before submission | no page. Only sentence fragments: `report-consistency-and-repetition.json` line 38 whyBtec (3 checks) and `report-formatting-and-emphasis.json` line 116 | GAP (no checklist, no page). |

Intent map facts: all 12 assessment pages are intent ASSESSMENT / MOFU (docs/SEO_INTENT_MAP.md lines 40, 84-94). No row targets "assignment brief", "pre-submission review" or "AI assignment D". The index page `/btec-it/assessment` has `lastReviewed` 2026-10-04 and says "هذه الصفحات لا تعطيك إجابات جاهزة لأي مهمة".

## Literal question test

| Question | Direct first-paragraph answer? | Author named? | Ahmad video link? |
|---|---|---|---|
| كيف أكتب مهمة الذكاء الاصطناعي BTEC IT وأحقق معيار D؟ | No. `/btec-it/artificial-intelligence` first paragraph is about "AI learns from data". The AI page has a closing block "كيف تكتب عن هذه الوحدة في تقريرك؟" (page text lines 272-276) linking only to the generic P/M/D, command-verb and principles pages. The D answer sits on `evaluate-level-d-writing` (9 steps) and is not reached from AI-intent wording. AI unit has no Unit/criterion D code. | Yes ("عن كاتب الصفحة: أحمد دومي · مدرّس BTEC IT · الأردن") | Videos on the AI page are concept lessons (for example 25:40 data types), none about writing assignments |
| كيف أفهم ورقة المهمة Assignment Brief في BTEC IT؟ | No page. Nearest is "افهم السيناريو" in report-writing-principles, not framed as brief reading. | Yes on nearest page | None |
| كيف أراجع تقريري قبل تسليم مهمة BTEC IT؟ | No page. Only scattered one-liners (above). | Yes on the pages holding the lines | None |
| كيف أربط المفهوم التقني بسيناريو المهمة؟ | Partly. `explain-level-p-writing` shortAnswer gives the 5 steps incl. "(3) أين يظهر في السيناريو؟", so it is answerable, but the question wording ("ربط المفهوم التقني بالسيناريو") is not in the title, H1 or questionsAnswered. | Yes | None |

Video facts: every assessment concept file has `videos: []` and `youtubeId: null`. I found no Ahmad video on report writing, brief reading or review in the five fetched pages; the only YouTube links are unit-concept lessons. I did not enumerate the YouTube channel, so a suitable existing video may exist and needs the owner.

Author line: present on all five fetched pages (footer block "عن كاتب الصفحة", plus "آخر مراجعة 4 أكتوبر 2026" and the source line "منهجية كتابة تقرير BTEC - إعداد أحمد دومي (مبادئ عامة فقط)"). Pages say "شرح مبني على مادة أحمد دومي - وليس نصًّا رسميًّا من Pearson", which is correct.

## (b) Smallest improvements, ranked by impact

1. Edit existing `content/concepts/assessment/report-writing-principles.json` (page `/btec-it/assessment/report-writing-principles`): add one H2 "قبل التسليم: قائمة مراجعة لتقريرك" with 6 to 7 yes/no self-check questions (answers the scenario, one criterion per heading, claim then reason then scenario link, no contradiction or repeated result, judgement plus reason in D, intro/conclusion roles, readable formatting) plus 2 new `questionsAnswered` strings including the literal wording «كيف أراجع تقريري قبل تسليم مهمة BTEC IT؟». About 120 words. Source of truth: items already in `report-consistency-and-repetition.json` line 38, `report-formatting-and-emphasis.json` line 116 and the 7-step table in the same file. Owner confirmation: yes (reviewState stays "pending author review"); no new methodology, only consolidation. Covers intent 10 and part of 9.

2. Edit existing `report-writing-principles.json`, section "1) خطّط قبل أن تكتب": add a short sub-block "كيف تقرأ ورقة المهمة (Assignment Brief)" of about 90 words: find the scenario and your role, circle each command verb, note which criteria each task part targets, list the deliverable format. Add `questionsAnswered` «كيف أفهم ورقة المهمة Assignment Brief في BTEC IT؟» and the mixed term "Assignment Brief" to the glossary. Source of truth: the existing planning paragraph and command-verb page; no Pearson wording. Owner confirmation: yes (it is a new instructional claim about the brief; also confirm the term "Assignment Brief" is how his students say it). Covers intent 1.

3. Edit the two unit pages' report block (`artificial-intelligence.json` and `cyber-security.json`, section "كيف تكتب عن هذه الوحدة في تقريرك؟"): make the intro sentence answer directly "لتحقيق D في مهمة الذكاء الاصطناعي: حدّد القرار والبدائل ثم قارن واحكم وانتقد الحكم وأوصِ" with a link to `/btec-it/assessment/evaluate-level-d-writing` and to `explain-level-p-writing` for scenario linking. About 40 words per unit. Source of truth: `evaluate-level-d-writing.json` shortAnswer (reuse, not new content). Do not state any AI criterion code, because the AI unit has no verified official structure. Owner confirmation: not for the linking text; yes if he wants to state the AI criteria letter. Covers the AI-D question and intent 8.

4. Edit existing `explain-level-p-writing.json`: add two `questionsAnswered` («كيف أربط المفهوم التقني بسيناريو المهمة؟» and a P-level "evidence" wording) and one sentence of about 30 words under step 3: the link is made by naming a concrete fact from your scenario (a system, user, data type or department) next to the concept. Also add the same question to `threat-analysis-method.json`. Source of truth: the existing step 3 text. Owner confirmation: no for questions, light check for the sentence. Covers intents 5 and 8.

5. Edit existing `pass-merit-distinction.json`: add about 40 words "كيف تقرأ جدول المعايير" (the first letter is the learning aim, D criteria such as AB.D1 span two aims, so your Merit and Pass evidence feeds the Distinction), keeping the existing warning that codes differ per unit. Source of truth: the existing table in the same file, verified against private Pearson scan. Owner confirmation: no for facts, light review for wording. Covers intent 2.

Optional, owner-dependent: attach one Ahmad video (existing on his channel, if any) on report writing to `report-writing-principles` through the `videos` field. Needs the owner to name the video.

## (c) What must NOT be added

- Model answers, complete or partly complete assignment paragraphs for any named scenario, or worked D-level text for the AI or cyber assignment. The existing "مثال توضيحي مستقل" examples (library booking system) are the safe pattern: neutral context only.
- Pearson criterion descriptors, command-verb definitions, brief text, or unit specification wording. Only criterion codes (Unit 11) are published; do not extend to the AI unit without an owner-verified source.
- Any content from the paid educational card, its private source scans, or its question sets; no card previews beyond the current CTA.
- Prices (none are published). No claims about marks, grade outcomes, pass rates or "guaranteed D". No promise that the checklist ensures a grade.
- Assignment-ghostwriting style text or calls to action ("ابعث لي مهمتك"). No invented tutoring CTAs.
- No new standalone pages unless the owner confirms; the intent map shows MEDIUM cannibalization among the assessment pages, so edits are preferable to new URLs.

## (d) Risks

- Everything is "pending author review". Expanding unreviewed pages multiplies text the owner has not approved; mark each added block in reviewState and batch the owner's review.
- A checklist and brief-reading guide drift toward assessing against criteria; keep it generic and tell students to follow their own brief and teacher (the pages already carry this disclaimer, keep it).
- Unit-11 criterion codes might be copied by students to other units; the existing warning must stay adjacent to any new code reading.
- Cannibalisation: intent-map risk is MEDIUM for P/M/D/command-verb pages. New question wording should differentiate (brief reading, review checklist) and cross-link rather than repeat P/M/D definitions.
- The AI unit has no `officialStructure`; saying "D criterion for AI" implies a code that cannot be verified from the repo.
- Video check was limited to site pages and `content/videos/videos.json`; a relevant YouTube video outside the site library was not assessed.
- AI-visibility benchmark files (data/ai-visibility-benchmark) mention submission-review wording but I did not audit them for this task.
