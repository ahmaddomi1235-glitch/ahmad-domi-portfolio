# Agent 05: library check and E2 self-review draft (2026-10-12)

Read-only. Library = `Desktop/شغل` (registry: 101 records).

## 1. What the library holds, and what is paid or private

| Registry class | Count | Meaning |
|---|---|---|
| PAID | 41 | assignment explanations, ready-made reports, templates, marking frameworks |
| PRIVATE_OFFICIAL_COPYRIGHT | 12 | Pearson brief wording (IT systems) |
| PRIVATE | 11 | older editions, a variant, personal files, backup zip |
| PUBLIC_PUBLISHED / CANDIDATE | 7 / 28 | unit books, ML and programming notes; several candidates lack an authorship line |
| PUBLIC_SUMMARY_CANDIDATE | 2 | src-004 is the only report-writing source cleared as "principles only" |

Report-writing sources read:
- **src-004, OS_Redesign PDF** (40 pp, author line present). Each page says its examples must not be reused. Basis of the public pages.
- **src-005, Visual PDF** (42 pp). PRIVATE variant of 004 with extra worked examples.
- **src-020, اساسيات كتابة التقارير.docx**. PAID; built on a Pearson scenario ("Camellia") with copy-ready paragraphs.

Method note: `pdftotext` returns blank Arabic for both PDFs; PyMuPDF works (quotes below normalised).

The 7 public pages say "مبادئ عامة فقط", use an invented school-library example, and cite src-004.

## 2. Proposed self-review section for `report-writing-principles` (118 words)

> **راجع تقريرك بنفسك قبل التسليم**
> قبل أن تسلّم تقريرك، اقرأه وأنت تسأل نفسك:
> ١. هل بدأت المقدمة بدورك، ثم السياق، ثم أهمية التقرير، ثم ما سيتناوله، من دون تحليل أو حكم؟
> ٢. هل تنتهي كل فقرة بفكرة تبدأ منها الفقرة التالية؟
> ٣. هل ذكرت أثر كل ميزة وكل قيد، لا الصفة وحدها؟
> ٤. هل قارنت البدائل وفق معيار واحد في كل مرة، ثم انتقدت حكمك؟
> ٥. إذا تكررت نتيجة، هل غيّرت سببها وزاوية تحليلها؟
> ٦. هل بقي حكمك ثابتًا، أو شرحت سبب تغيّره؟
> ٧. هل بقي الموضوع نفسه من الشرح إلى التقييم، مع تغيّر السؤال فقط؟
> ٨. هل تجعل العناوين والتمييز المحدود مكان كل معيار واضحًا للقارئ؟
> ٩. هل تجمع الخاتمة أهم نتيجة ثم الحكم ثم التوصية، من دون فكرة جديدة؟
> هذه أسئلة لقراءة نصك أنت، ولا تغني عن تعليمات مهمتك ومعلّمك.

Deliberately omitted: any claim about reaching Pass, Merit or Distinction.

### Sentence verification

| # | Public page (quote) | Library file (quote, normalised) | Verdict |
|---|---|---|---|
| 1 | introduction-and-conclusion: «المقدمة لا تحلل ولا تحكم»; principles: «دورك، ثم السياق، ثم أهمية التقرير، ثم ما سيتناوله» | src-004 p4: «الدور ← السياق ← أهمية التقرير ← محتوى التقرير»; «ليست مكانًا للتحليل أو إصدار الحكم» | SUPPORTED |
| 2 | linking-paragraphs: «كل فقرة تأخذ خيطًا من الفقرة السابقة وتضيف إليه فكرة جديدة» | p8: «تترك في نهايتها فكرة أو نتيجة يمكن للفقرة التالية أن تبدأ منها» | SUPPORTED |
| 3 | analyse-level-m: «كل ميزة أو قيد يتبعه أثر» | p12: «كل ميزة أو عيب يجب أن يتبعها أثر» | SUPPORTED |
| 4 | evaluate-level-d: «اختر معيارًا واحدًا... ثم قارن كل البدائل وفقه»; «انتقد حكمك» | p17: «اختر معيارًا واحدًا، ثم قارن جميع البدائل وفقًا له»; p20: «لماذا يجب أن ينتقد الطالب اختياره؟» | SUPPORTED |
| 5 | consistency: «إن تكررت نتيجة فغيّر سببها وزاوية تحليلها» | p28: «إذا تكررت النتيجة، غيّر سببها وزاوية تحليلها» | SUPPORTED |
| 6 | consistency: «إذا تغيّر حكمك فوضّح السبب» | p27: «إذا تغيّر حكمك، وضّح السبب الذي غيّره» | SUPPORTED |
| 7 | consistency: «ثبات الموضوع أن تغيّر السؤال لا الموضوع» | p30: «لا تغيّر الموضوع؛ غيّر السؤال الذي تسأله عنه» | SUPPORTED |
| 8 | formatting / principles: «تمييز محدود للمعلومات المهمة»; «ومعرفة مكان كل معيار» | p24: «أسهل في معرفة مكان كل معيار»; «تمييز محدود للمعلومات المهمة» | SUPPORTED |
| 9 | introduction-and-conclusion: «أهم نتيجة ← الحكم النهائي ← التوصية الرئيسية» | p34: «نتيجة ← حكم ← توصية»; «ولا تضف فكرة جديدة» | SUPPORTED |
| 10 | principles: «ولا يغني عن تعليمات مهمتك وعن معلّمك» | none (the page's own disclaimer) | SUPPORTED by the page; no methodology claim |

The opening line is framing only. **All 9 questions and the closing line pass; nothing was removed.** Question 3 avoids "قائمتين منفصلتين", which appears only in the private src-005.

Do not add these site-originated items; they are absent from src-004, 005 and 020:
- the underline/circle "quick test" (consistency page)
- the "one or two highlights per paragraph" limit (formatting page)
- the connector list and "deleting the link sentence = filler" (linking page)
- the introduction page's two "common mistakes" (long general definition; copying conclusion)
- the "formatting doesn't cover weak content" warning

Only the owner can confirm these as his own teaching.

### Paid or private ideas that must NOT be exposed
1. The three worked scenarios in src-004 and 005 (phishing at a financial firm; laptops for field technicians; computer-vision inspection) with all their P, M and D paragraphs, judgments, recommendations and conclusions. The PDFs forbid reuse.
2. src-005's extra examples (cloud vs local storage, firewall vs MFA, ML vs DL).
3. src-020: the Camellia scenario, per-criterion paragraph templates with a KPI each, the copy-as-is text tables, the "5 to 7 lines" intro length, and the weighted numeric evaluation method.
4. src-020's intro order (context, needs, aim, method, structure) conflicts with the public order (role, context, importance, content). Do not mix them.
5. Criterion codes and anything tied to a named Pearson task.

## 3. New findings for the 20 questions (beyond `ASSIGNMENT_RETRIEVAL_GAPS.md`)

1. **No unpublished report-writing topic.** Every src-004 principle already has a public page. Q07, Q08 and Q18 can be served only by the section above (writing quality); no library file has a grade-reading rubric (src-078 is private).
2. **Q02, Q06, Q03 ("justify a choice")** can improve without paid material: src-004 supports criteria, compare, provisional judgment, critique, decide. An original pointer from the AI and cyber hubs to `evaluate-level-d-writing` suffices.
3. **Q09 (reading criteria and brief):** criterion codes appear in the library only in paid or private files, and the registry calls them "NOT official mappings". No verified public source.
4. **Heavily covered in the library, absent on the site:** IT systems (12 files: 10 Pearson-copyright, 2 paid teacher or marking) and graphics and animation (2 paid). No public-safe source; owner-authored principle pages would be needed.
5. **Already covered on the site:** ML notes (ARIMA, K-means, PCA, SVM, trees have pages), programming (20 pages), project management (25), data modelling (27), cyber (48). The 8 AI/ML candidates still lack an authorship line.
6. **Website development is thin** (6 pages) with one published unit book and no other library source.

## 4. Owner actions
- Approve or reject the 118-word section (the page is still "pending author review").
- Confirm the 5 site-originated items in section 2 as his own teaching.
- Decide whether to author IT-systems and graphics principle pages (no public-safe material exists today).
