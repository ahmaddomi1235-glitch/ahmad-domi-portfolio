# Agent 7: Entity and Evidence Audit (read-only)

Date: 2026-10-10. Live pages fetched with curl (hubs, /about, /, /en, one pair of concept pages, full sitemap crawl of 229 URLs). No prices appear in this report.

## 1. Findings table

| # | Claim | Source | Status |
|---|---|---|---|
| 1 | Person JSON-LD (name, jobTitle "BTEC IT Instructor", address Irbid/JO, knowsAbout 9 topics, sameAs x5, alumniOf Al al-Bayt, affiliation Asas) | `src/lib/seo/jsonld.ts` `personNode()`; live on `/`, `/about`, and all concept pages | OK |
| 2 | Hubs `/btec-it/artificial-intelligence` and `/btec-it/cyber-security` ship Person JSON-LD | Live HTML: each hub has only `CollectionPage` + `BreadcrumbList`; `author` is the bare reference `{"@id": ".../#person"}` with no Person node on the page. `collectionGraph()` (jsonld.ts L183-L206) omits `personNode()`. | INCONSISTENT (hubs differ from concept pages, `/`, `/about`; symmetric between the two hubs) |
| 3 | Visible author on hubs: named, linked to /about, role statement | Hub text: "عن كاتب الصفحة / أحمد دومي · Ahmad Domi / مدرّس BTEC IT · الأردن" via `AuthorCard.tsx` (`<Link href="/about" rel="author">`); intro paragraph also names "أحمد دومي" | OK (identical on both hubs and on concept pages checked: what-is-cyber-security, why-data-is-the-target, ai-vs-machine-learning-vs-deep-learning, ai-data-types) |
| 4 | Irbid appears on authored pages | Author card says only "الأردن". Irbid appears on `/`, `/about`, `/en`, llms.txt and Person JSON-LD (concept pages), not in hub/concept visible text | UNSUPPORTED as a visible link in the chain (gap, not an error) |
| 5 | Job title consistent | JSON-LD/author card/YouTube bio: "BTEC IT Instructor"/"مدرّس BTEC IT". `/about` H1 and `src/content/ar.ts` L5, L26, L38, L167: "مدرب BTEC IT ومهندس أمن سيبراني"; `/en`: "BTEC IT Instructor and Cybersecurity Engineer"; Instagram display name: "معلم BTEC IT" | INCONSISTENT (three Arabic words for the role: مدرّس / مدرب / معلم; "cybersecurity engineer" is not in `profile.ts`, which only gives a BSc in Cybersecurity, 2026) |
| 6 | Experience length | `profile.ts`: Asas 8 months + freelance 1.5 years. Home FAQ (`src/app/(site)/(kb)/page.tsx` L74): "منذ أكثر من سنتين". llms.txt and Phase 6 report: "about two years". `/about`: "ثمانية أشهر" and "سنة ونصف" | INCONSISTENT ("more than two" vs "about two"; the CV gives no dates, so the sum assumes the periods do not overlap) |
| 7 | Asas | `profile.ts`, `/about`, JSON-LD `affiliation`, llms.txt all say "Asas Educational Platform" / "منصة أساس التعليمية". No Asas profile URL exists (`thirdPartyProfiles` is empty; Phase 6 report L38, L62) | OK (consistent) / UNSUPPORTED as an external corroboration link |
| 8 | Degree | `profile.ts`: BSc Cybersecurity, Al al-Bayt University, 2026; `/about` and `/en` say "Bachelor of Cybersecurity"; JSON-LD `alumniOf` | OK |
| 9 | Handles | `site.ts`: YouTube @AhmadDomiedu (+ channel id UCdZ35Tf...; live page externalId matches), Instagram @ahmaddomiedu; footer matches | OK |
| 10 | Home FAQ: site and YouTube channel are written "أحمد دومي · Ahmad Domi" | Live YouTube title is "Ahmad Domi \| أحمد دومي – BTEC IT"; `brand.full` uses an em dash and the other order | INCONSISTENT (minor: separator and order differ from the YouTube channel name) |
| 11 | Instagram name | Live title "Ahmad Ra'ed Domi \|\| معلم BTEC IT"; disclosed on home and llms.txt | OK |
| 12 | alternateName "Ahmad Doumi" | `docs/YOUTUBE_GEO_MIGRATION.md` L67: owner video title "Mr. Ahmad Doumi" | OK |
| 13 | `/about` "hundreds of students achieved full marks", "about N Instagram followers", "more than N views in 30 days" | `src/content/ar.ts` L74-76, `en.ts` L71-77; none of the permitted evidence files holds a source or date for these numbers; counters render as "0" in static HTML | UNSUPPORTED (outside the chain, but it is the strongest authority claim about the person) |
| 14 | Hub footer "آخر مراجعة 4 أكتوبر 2026" | Both unit JSON files: `reviewState` = "assistant-drafted ... pending author review", `needsVerification: true` | UNSUPPORTED (page implies a review that the data file says has not happened) |
| 15 | Chain step "educational card -> private tutoring" | Both hubs link /btec-it-card (4x) and /btec-it/private-lessons (3x) and state "تتوفر بطاقة تعليمية من أحمد دومي..., ويمكنك مشاهدة أول فيديو منها مجانًا" | OK |
| 16 | Disambiguation from "Ahmad BTEC / af_btec" and "أحمد الفقيه" | grep of `src`, `content`, `public/llms.txt`: no mention. Only `docs/CROSS_MODEL_VISIBILITY_2026-10-10.md` L119 records Perplexity ranking that channel first. Phase 6 L37: Facebook page "المعلم أحمد دومي" is platform-operated, not his | UNSUPPORTED (no on-site disambiguation exists) |

## 2. Minimal factual fixes (apply to both hubs equally where hub-related)

1. `src/lib/seo/jsonld.ts`, `collectionGraph()`: add `personNode()` as a second argument to `graph(...)`, exactly as `conceptGraph` does. Applies to every hub, so the AI and cyber hubs stay symmetric.
2. `src/content/ar.ts` L5, L26, L38, L167 and `src/content/en.ts` equivalents: either replace "مدرب ... ومهندس أمن سيبراني" with the `brand.jobTitleAr` form "مدرّس BTEC IT", or add the owner's CV line that supports "Cybersecurity Engineer". Until then, use one Arabic word (مدرّس) site-wide. Owner decision needed on "مهندس".
3. `src/app/(site)/(kb)/page.tsx` L74: change "منذ أكثر من سنتين" to "نحو سنتين (8 أشهر على منصة أساس وسنة ونصف كمدرّب مستقل، حسب سيرته الذاتية)". This matches llms.txt and the Phase 6 report. Owner should confirm the periods do not overlap.
4. `src/app/(site)/(kb)/page.tsx` L139: replace "يُكتب على هذا الموقع وقناة YouTube «أحمد دومي · Ahmad Domi»" with the actual forms: site «أحمد دومي · Ahmad Domi», YouTube channel «Ahmad Domi | أحمد دومي – BTEC IT».
5. `AuthorCard.tsx`: replace `· الأردن` with `· إربد، الأردن` (source `profile.location`). Site-wide component, so both hubs change together.
6. `content/units/artificial-intelligence.json` and `cyber-security.json`: either set `lastReviewed` to the real author-review date or change `reviewState` once the owner has reviewed. Do both units in the same commit.
7. `/about` section "المحتوى والنتائج": add a dated source line for the "hundreds with full marks" and the follower and view figures, or remove them. Owner-provided evidence required.
8. `/about` and `/en` (owner-stated fact: he is unrelated to "Ahmad BTEC / af_btec" and "أحمد الفقيه"): add one factual sentence, for example "لا علاقة لأحمد دومي بقنوات أخرى باسم Ahmad BTEC أو غيرها"; list the channel id in the sentence so engines can tell them apart. Do not name competitors beyond what the owner confirms.

## 3. AI hub vs cyber hub symmetry (treatment/control)

| Dimension | AI hub | Cyber hub | Symmetric? |
|---|---|---|---|
| Visible author card (name, /about link, role, date) | identical | identical | Yes |
| Intro names Ahmad | "يبني عليها أحمد دومي" | "عند أحمد دومي" | Yes |
| JSON-LD on hub | CollectionPage + Breadcrumb, `author` @id only, no Person node | same | Yes |
| Person node on concept pages | 37/37 | 48/48 | Yes (all) |
| Concept pages | 37 | 48 | NO (+11) |
| Hub internal hrefs (all) | 68 | 78 | NO |
| Hub page HTML size (rendered) | 263 KB | 314 KB | NO |
| `<title>` | "...BTEC IT: شرح الوحدة بالعربي \| أحمد دومي" | "...BTEC IT (الوحدة 11): شرح بالعربي \| أحمد دومي" | NO (cyber carries "Unit 11") |
| Official Pearson source block | none (`officialSource: null`) | "البنية الرسمية للوحدة (Pearson)", Unit 11 | NO |
| Extra sections | none | "محاور الوحدة كما يعرضها أحمد دومي", "قيد الإعداد في هذه الوحدة" | NO |
| Teaching PDFs linked | 2 (foundation pp.19-30; AI introduction) | 1 (foundation pp.2-19) | NO |
| Videos on hub | 4 (two dated 2025-12-29, two 2026-07-26) | 5 (all 2026-07-17 to 07-26) | NO (count and dates) |
| Concept pages with VideoObject | 4 | 5 | NO |
| Video with no concept mapping | sNTljXGYnpQ | LhwsFbsgrZQ (also covers AI intro) | Roughly |
| Footer/nav link to hub (pages linking, excl. self) | 212 | 212 | Yes (sitewide) |
| Inbound from other-unit concept pages | 49 | 38 | NO (+11 for AI) |
| Non-unit pages that link to the unit's concept pages | 28 | 19 | NO |
| Home card | "37 مفاهيم", listed 2nd | "48 مفاهيم", listed 1st | NO (order, count) |
| llms.txt unit list | listed 2nd | listed 1st | NO (order) |
| Glossary block on hub | 17 terms | 17 terms | Yes |
| Report-writing block, CTA to card and private lessons | identical | identical | Yes |
| Source booklet | same PDF, different page ranges | same PDF | Partial |
| Review state | assistant-drafted, pending author review | same, plus "axes not official" note | Partial |

Note for experiment design: the most consequential asymmetries are the Pearson Unit 11 authority block, the 5 vs 4 videos with different dates, 48 vs 37 concepts, and ordering on home and llms.txt. Any edit that is not applied to both hubs adds a new asymmetry.

## 4. Entity chain verdict

Ahmad Domi -> BTEC IT educator -> Arabic: strongly supported everywhere. -> Jordan (Irbid): Irbid is missing from the visible hub/concept author card. -> assessment guidance: linked from both hubs. -> Cyber/AI/Programming: Programming is in knowsAbout but is not on the hubs (Programming hub exists with 20 concepts). -> card -> private lessons: linked on both hubs.
