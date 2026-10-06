# SEO competitor and content-gap research

Run on 2026-10-06 with live web search and page fetches. **Limits, stated up front:** the search tool returns US-based results, so these are *who appears for the query*, not Jordan-localised rankings; no search-volume, difficulty or backlink-count data was available, so authority is inferred only from what is visible on the page (brand, institutional domain, trust claims). Nothing below is copied from a competitor; the point is to find what a searcher gets elsewhere that `ahmaddomiedu.com` does not yet offer.

## Query by query

### 1. شرح BTEC IT بالعربي
- **Who shows up:** a Telegram channel mirror (`t.me/s/it_for_btec`), a Scribd document, a Facebook page («BTEC بالعربي»), Pearson qualification pages (Arabic only through machine-translation URLs), the Ministry of Education BTEC portal, school programme pages, Wikipedia.
- **Page types:** community channels, uploaded documents, institutional programme descriptions. No structured Arabic explainer library surfaced.
- **What they give that the site did not:** nothing structured. What the site lacked was a **title that names the query** — the hub was «قاعدة معرفة BTEC IT بالعربي».
- **Action taken:** `/btec-it` retitled **«شرح BTEC IT بالعربي: وحدات ومفاهيم ومصطلحات»**, gained a «من أين أبدأ؟» section with question-style anchors and a resources card.
- **Gap verdict:** open. This is the strongest positioning opportunity (Arabic + structured + sourced).

### 2. الفرق بين التهديد والثغرة والمخاطرة (cybersecurity)
- **Who shows up:** Arabic training-centre and knowledge-base articles (e.g. a ~1,200-word blog with an analogy, examples and prevention sections but no table, FAQ or video and no BTEC mention), IBM and Keeper Arabic pages, a risk-assessment guide, a personal article.
- **What they give:** a generic cybersecurity explanation, calls to action for bootcamps. **None is tied to BTEC IT.**
- **What the site has that they lack:** BTEC context, a comparison table, a video, the student questions answered, the Arabic ↔ English terminology, a sourced author. What they have that the site lacks: **domain authority** (older, linked-to domains).
- **Action:** title now matches the intent exactly («الفرق بين التهديد والثغرة والمخاطرة في BTEC IT»); links added to risk management, system vulnerability types and the threat-analysis writing page.
- **Gap verdict:** content parity or better; authority is the only deficit (time and links, not pages).

### 3. مدرس BTEC IT الأردن (commercial / local)
- **Who shows up:** Pearson's «BTEC in Jordan» page, the Ministry's BTEC sites, school programme pages, a licensed e-learning platform (Teqani) with instructor profiles and course pages, individual teacher profiles. The pages are **institutional or marketplace pages**; no independent teacher's site with a content library appeared.
- **What they give:** institutional credibility, course listings, instructor bios.
- **What the site lacks:** an explicit **service page** (what is offered, to whom, how to book), reviews/third-party mentions, and any local relevance beyond «في الأردن / إربد» in the home and about pages.
- **Action:** home, about and card titles/descriptions now carry «مدرّس BTEC IT» + Jordan/Irbid (facts already published in the site's own profile). **No service page was created** — see "Not created" below.
- **Gap verdict:** real, but it is a business-facts gap, not a content gap. Needs the owner's decisions.

### 4. BTEC command verbs / Pass–Merit–Distinction / report writing (English)
- **Who shows up:** Quizlet flashcards, a Pearson study-skills PDF, tutoring resource pages, a grading-criteria guide of roughly 3,500–4,000 words (criterion codes, verbs by level, FAQ), and several **assignment-writing services** whose pages push «get help now» with originality/plagiarism guarantees.
- **What they give:** a long **list of command verbs by grade level** (List, Define, Describe, Explain / Analyse, Compare, Justify / Evaluate, Appraise…) with a one-line meaning each; the rule that Merit cannot compensate for a missed Pass.
- **What the site has:** an Arabic explanation of the *thinking* behind Explain (P), Analyse (M) and Evaluate (D), report introduction/conclusion, linking paragraphs, consistency — material most of those pages do not teach — and an academic-integrity stance (guidance, not ghost-written submissions).
- **What the site lacks:** a **fuller command-verb reference** (the existing page covers five verbs; searchers expect a table of 15–25) and an explicit «Merit لا يعوّض Pass» statement if the author's material supports it.
- **Action:** titles aligned to the how-to intent («كيف تكتب مستوى التحليل Analyse (M)…»); pages cross-linked as a set; assessment hub strengthened.
- **Gap verdict:** one genuine content gap (verb reference), see recommendation R1.

### 5. BTEC Artificial Intelligence (Arabic)
- **Who shows up:** Pearson's Unit 21 specification and delivery guide, generic Arabic AI courses (Udemy), assignment-help pages, study-document sites.
- **What they give:** the official unit text or generic AI tutorials; **no Arabic, BTEC-aligned concept explainers**.
- **Gap verdict:** none on content (37 concept pages). Positioning only: unit numbers are not stated on the site except Unit 11 (verified in the repository's official-structure data), so «Unit 21»-style queries are unserved until the number is verified.

### 6. BTEC Cyber Security / Unit 11 (English and mixed)
- **Who shows up:** Pearson's Unit 11 PDFs, a tutor's paid resource page (presentations, worksheets, model answers, glossary), Quizlet, Stuvia/Studocu uploads, forum threads.
- **What they give:** worksheets and model answers (paid or uploaded).
- **Action:** the cyber hub is retitled **«الأمن السيبراني BTEC IT (الوحدة 11): شرح بالعربي»** — Unit 11 is the one number the repository verifies against the official structure.
- **Gap verdict:** the site is the only free Arabic concept-level resource seen; worksheets/model answers are deliberately out of scope (assessment integrity and paid material).

## Recommendations

| # | Recommendation | Why | Blocker | Priority |
|---|---|---|---|---|
| R1 | **BTEC command words reference (Arabic table of ~20 verbs by P/M/D)** | Highest-volume pattern in English results; Arabic version absent | Needs the author's list or a verified Pearson command-word source; must not copy wording | HIGH |
| R2 | **Service page(s)** for private lessons / report review, only if actually offered | Commercial and local queries are served by institutions, not individuals | Owner must confirm what is offered, where (Irbid / Amman / online), pricing policy and the academic-integrity wording | HIGH |
| R3 | **Unit numbers** for the other units (verified against Pearson's specification) in hub titles | «Unit N» is how students search | Needs verification per unit | MEDIUM |
| R4 | Third-party corroboration: the Asas teacher profile, school/teacher directories, a Google Business Profile *only if* a real service location exists | Authority and local signals; competitors are institutional | Owner action; no fake listings | MEDIUM |
| R5 | A visible student-results / testimonial section **only with real, permissioned content** and without review markup | Trust signal competitors use | Owner content | LOW |

## Not created, and why
- **`/btec-it/private-lessons/` and `/btec-it/report-review/`** — the repository records that private instruction and academic guidance were provided (past tense, 1.5 years) and that the card's report review is «unknown» (`reportReview: unknown`; the card page explicitly says it is not promised). Publishing a service page would assert an offer nobody has confirmed. These stay in R2 until confirmed.
- **City pages (Irbid / Amman)** — no genuine service relevance established; the home and about pages already state Irbid, Jordan factually.
- **English duplicate concept pages** — no evidence of English-only demand for these pages; Arabic pages carry the English terms.
- **«ما هو BTEC IT؟» page** — the hub's lead already answers it, and expanding it would need claims about BTEC/Pearson/Ministry that the source library does not support; any such page must cite official sources and be reviewed by the author.
