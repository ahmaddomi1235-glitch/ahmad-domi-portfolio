# Agent 8: Technical SEO and Retrieval Audit (read-only, production, 2026-10-10)

Method: Node fetch of production HTML (no JS execution), plus a fetch of all 229 sitemap URLs to compute inbound links. Word counts are taken from `<main>` only (the page's own text, not the site header or footer). No files other than this report were touched. No price text is quoted.

## 1. Per-URL table

| URL | Status / final URL | Title (chars shown) | Canonical | Robots meta | H1 | Words | Out links (total / unique) | JSON-LD types | Video embeds | Sitemap lastmod |
|---|---|---|---|---|---|---|---|---|---|---|
| /btec-it/artificial-intelligence | 200 / same | الذكاء الاصطناعي BTEC IT: شرح الوحدة بالعربي \| أحمد دومي | self | none | 1 | 2269 | 78 / 49 | CollectionPage, ItemList (37), BreadcrumbList | 0 iframe; 5 YouTube links | 2026-10-04 |
| /btec-it/cyber-security | 200 / same | الأمن السيبراني BTEC IT (الوحدة 11): شرح بالعربي \| أحمد دومي | self | none | 1 | 3034 | 87 / 59 | CollectionPage, ItemList (48), BreadcrumbList | 0 iframe; 6 YouTube links | 2026-10-04 |
| /btec-it/assessment | 200 / same | كتابة تقارير BTEC: Pass وMerit وDistinction وأفعال الأمر \| أحمد دومي | self | none | 1 | 870 | 37 / 16 | CollectionPage, ItemList (11), BreadcrumbList | 0 | 2026-10-04 |
| .../assessment/command-verbs-explain-analyse-evaluate | 200 / same | شرح أفعال الأمر في BTEC: Explain وAnalyse وEvaluate \| أحمد دومي | self | none | 1 | 622 | 16 / 10 | TechArticle, DefinedTerm, BreadcrumbList, Person, Organization | 0 | 2026-10-04 |
| .../assessment/pass-merit-distinction | 200 / same | Pass وMerit وDistinction في BTEC: ما معنى P وM وD؟ \| أحمد دومي | self | none | 1 | 700 | 17 / 11 | TechArticle, DefinedTerm, BreadcrumbList, Person, Organization | 0 | 2026-10-04 |
| /btec-it/private-lessons | 200 / same | دروس خصوصية BTEC IT أونلاين ووجاهي مع أحمد دومي \| أحمد دومي | self | none | 1 | 398 | 17 / 13 | WebPage, Service, BreadcrumbList, Person, Organization | 0 | 2026-10-09 |
| /btec-it-card | 200 / same | بطاقة أحمد دومي التعليمية BTEC IT مع مراجعة التقارير \| أحمد دومي | self | none | 1 | 472 | 10 / 8 | WebPage, Product, Brand, BreadcrumbList, Person, Organization | 0 | 2026-10-09 |
| /btec-calculator | 200 / same | حاسبة معدل BTEC للتوجيهي الأردني \| أحمد دومي | self | none | 1 | 362 | 4 / 4 | WebApplication, BreadcrumbList, Person, Organization | 0 | 2026-10-04 |
| / | 200 / same | أحمد دومي \| Ahmad Domi — مدرّس BTEC IT في الأردن | `https://ahmaddomiedu.com` (no trailing slash) | none | 1 | 790 | 38 / 21 | WebSite, SearchAction, Person, CollegeOrUniversity, Organization | 0 iframe; 3 YouTube links | 2026-10-09 |

Meta descriptions (all present, none empty): each is a single Arabic sentence of about 120-160 characters. Examples:
- AI hub: "شرح وحدة الذكاء الاصطناعي في BTEC IT بالعربي: أنواع الذكاء الاصطناعي والبيانات وتعلّم الآلة والنماذج والخصوصية…"
- Cyber hub: "شرح وحدة الأمن السيبراني وإدارة الحوادث (الوحدة 11) في BTEC IT بالعربي: التهديدات والثغرات والشبكات والتشفير…"
- Private lessons: "…تواصل لمعرفة الأسعار والتفاصيل" (no figure).
- Card: "…أول فيديو مجاني".
- Calculator: "…المعدل الكامل من 100" (a grade scale, not a price).

Video embeds: no `<iframe>` or `<video>` tags exist on any of the nine pages. Videos are shown as outbound YouTube links, not embeds.

### Inbound internal links (counted from `<main>` of all 229 sitemap pages, unique source pages)

| URL | Inbound, content only | Inbound incl. header/footer |
|---|---|---|
| AI hub | 42 | 212 |
| Cyber hub | 54 | 212 |
| /btec-it/assessment | 22 | 212 |
| command-verbs | 15 | 15 |
| pass-merit-distinction | 16 | 16 |
| private-lessons | 3 | 212 |
| /btec-it-card | 9 | 212 |
| /btec-calculator | 2 | 212 |
| / | 212 | 220 |

The existing crawl file `sources/audit/seo_crawl.json` reports 213 inbound for each of the AI hub, cyber hub, assessment, private-lessons, card and calculator pages. That figure counts the site-wide navigation links and cannot separate the two hubs.

### First-paragraph answer test (first Arabic paragraph after the H1)

| Page | Direct answer? |
|---|---|
| AI hub | No. It is a narrative framing ("الذكاء الاصطناعي لا يفكر مثل الإنسان، بل يتعلم من البيانات…") with no definition of what the unit covers. |
| Cyber hub | No. It opens with the question "ماذا نحمي؟" and the order of concepts. |
| assessment | Partly. It says what the pages are not ("لا تعطيك إجابات جاهزة") rather than answering how to write a report. |
| command-verbs | Yes. It defines P, M and D as three levels of thinking. |
| pass-merit-distinction | Yes. It explains that P, M and D are the criteria codes. |
| private-lessons | Yes. It covers who, where, how, and says to ask about the price directly. |
| card | Yes. It states what the card is and what it includes. |
| calculator | Yes. It states what the tool computes. |
| / | Yes. It says who Ahmad is and what the site covers. |

## 2. Technical checks

- **robots.txt**: `User-Agent: *` / `Allow: /` plus `Sitemap: https://ahmaddomiedu.com/sitemap.xml`. There are no per-bot rules, no disallows, and no AI-crawler blocks. Valid.
- **sitemap.xml**: 229 URLs. All 8 non-home target URLs are present exactly once. The home URL is present. 215 URLs carry a `<lastmod>`: 211 are `2026-10-04` and 4 are `2026-10-09`. The 14 URLs without a lastmod include `/en/projects/...` entries. The identical dates mean lastmod is a batch date, not a per-page signal.
- **Price scan** (digits followed by دينار/JOD/JD/$, also Arabic-Indic digits, and the reverse order): 0 hits in `sitemap.xml`, 0 in `llms.txt` (200, 122,414 bytes) and 0 in `search-index.json` (200, 420,515 bytes). `llms-full.txt` returns 404, which is not a defect.
- **Cloaking test** (normal Chrome UA, Googlebot UA, GPTBot UA; all 200):

| Page | Bytes, normal | Bytes, Googlebot | Bytes, GPTBot | MD5 (all three) |
|---|---|---|---|---|
| / | 133,699 | 133,699 | 133,699 | identical |
| /btec-it/cyber-security | 313,628 | 313,628 | 313,628 | identical |
| /btec-it/private-lessons | 103,160 | 103,160 | 103,160 | identical |

No cloaking and no UA-dependent behaviour.
- **Consistency**: `llms.txt` states "196 concept pages". The sitemap has 185 concept pages across 7 units plus 11 under /assessment, which is 196, so the claim is accurate.

## 3. Demonstrated defects

1. **Hub first paragraphs do not answer directly** (AI hub and cyber hub, both under /btec-it/). The first paragraph is a narrative preamble and does not define the unit. The effect on retrieval is not measured, so this is listed as a quality gap, not a proven loss. If the experiment edits one hub's lead, the other should stay as is.
2. **Homepage canonical omits the trailing slash** (`https://ahmaddomiedu.com`). This is harmless for the root URL (the browser normalises it) and is noted only for completeness. It is not a defect to fix.
3. **Parity confound in internal linking** (affects the experiment, not SEO): `/btec-it/assessment/pass-merit-distinction` links to the cyber hub in its content but not to the AI hub. This is the only external-to-family content link difference. See section 4.
4. **Crawl-based inbound counts are not usable for parity.** The 213 per hub in `seo_crawl.json` is dominated by the header and footer. Use the content-only counts above.

Not found: no non-200 status, no redirects, no noindex, no missing or duplicate canonicals, no multiple or missing H1 on the nine pages, no cloaking, and no price text in the three files scanned.

## 4. AI hub (treatment) vs cyber hub (control) parity table

| Metric | AI hub | Cyber hub | Delta / note |
|---|---|---|---|
| Words in main | 2269 | 3034 | Cyber +34% |
| Concept pages listed (links in hub = sitemap children) | 37 | 48 | Cyber +11 |
| ItemList items in JSON-LD | 37 | 48 | Matches the lists |
| Concept-page average words (child pages) | 618 | 669 | Cyber +8% |
| H1 / H2 count | 1 / 7 | 1 / 10 | See headings |
| Inbound, content-only (unique sources) | 42 | 54 | Equals 37 or 48 children plus 5 or 6 others |
| of which from own concept pages | 37 | 48 | One per child, so parity per child |
| of which from non-family pages | 5 | 6 | /btec-it, /, card, private-lessons, /resources (both); cyber also from pass-merit-distinction |
| Child pages' average inbound (content) | 7.95 (min 5, max 17) | 8.60 (min 6, max 16) | Near parity |
| Outbound links, total / unique | 78 / 49 | 87 / 59 | Cyber larger |
| YouTube links on page | 5 | 6 | No embeds on either |
| Resource sections | "الملفات التعليمية" (3 links) | "الملفات التعليمية" (1 link) | |
| Extra sections only on cyber | none | "البنية الرسمية للوحدة (Pearson)" (152 words, 0 links), "محاور الوحدة كما يعرضها أحمد دومي" (119 words, 0 links), "قيد الإعداد في هذه الوحدة" (50 words, 1 link) | Cyber has about 320 more words of structural text |
| Title pattern | Unit name + "شرح الوحدة بالعربي" | Unit name + "(الوحدة 11)" + "شرح بالعربي" | Cyber title carries a unit number |
| Sitemap lastmod | 2026-10-04 | 2026-10-04 | Identical |
| Canonical / robots / H1 | self / none / 1 | self / none / 1 | Identical |

Shared section structure (identical order): المفاهيم, أسئلة يجيب عنها هذا الدليل, مصطلحات الوحدة, كيف تكتب عن هذه الوحدة في تقريرك, الدروس المصوّرة, الملفات التعليمية, عن كاتب الصفحة.

Headings, AI (8): H1; H2 المفاهيم, أسئلة, مصطلحات, كيف تكتب, الدروس المصوّرة, الملفات, عن كاتب.
Headings, Cyber (11): the same set, plus the three extra H2s listed above (official structure, axes, in preparation).

**Experiment implications**
- The hubs are not size-matched. The cyber hub has 11 more concept pages, 34% more words, and 12 more inbound links, and it has structural text blocks that the AI hub lacks.
- Compare within-hub changes over time (before vs after), not AI-level vs cyber-level absolute citations. Expect cyber to be favoured at baseline.
- Do not touch the pass-merit-distinction link to cyber during the experiment unless the same link is added to the AI hub. Adding it would be a clean equalising step, but it changes the baseline and should be logged.
- Both hubs have identical technical markup (canonical, robots, H1, JSON-LD types, lastmod), so technical SEO is not a differentiator.
