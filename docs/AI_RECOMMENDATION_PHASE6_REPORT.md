# AI Recommendation Phase 6 — report

Date: 2026-10-08. Goal: more unprompted recommendations of Ahmad Domi by ChatGPT, Gemini, Perplexity and Google AI Mode. Traffic and sales are not the KPI.
Baseline (Phase 5): 297 answers; Ahmad discovered in 3, named in 2, site cited in 1, 0/23 commercial; ChatGPT 0/73, Gemini 0/25, Perplexity 2/99, AI Mode 1/100 (raw only partly preserved).

## 1. Recommendation prompts audited
30, frozen as a permanent cohort in `data/ai-visibility-benchmark/recommendation-cohort-30.json`: 10 teacher-in-Jordan (P001, P002, P003, P005, P006, P007, P009, P010, P012, P015), 7 Arabic resources (P016–P021, P025), 5 P/M/D + calculator (P031, P032, P033, P037, P045), 4 cyber/AI educator (P049, P057, P061, P069), 4 lessons/report review/card (P091, P092, P095, P097). No owner name, site or handle appears in any of them. Per-prompt analysis: `docs/AI_RECOMMENDATION_EVIDENCE_MATRIX.md`.

## 2. Competitors and resources actually recommended (observed)
- Teacher prompts: school/academy and listing sources first (JIS, Masar Academy, brighttouch, OpenSooq, Facebook tutor pages, Ostathi, edujordan, teacherprivate, Apprentus, PrivateJo), then platforms (Teqani, Watad, JoAcademy, Asas), Telegram `it_for_btec`.
- Arabic-resource prompts: BTEC JO, al-maher.net, AF BTEC, QF BTEC IT, TawjihiHub, BTECHub, Eduva, Telegram, YouTube creators (Hazem Al-Rukibat, Mohammad Nasrallah, Teqani).
- P/M/D and calculator: Pearson, Woolwich, StuDocu and similar; calculators from dbtec.top, btec-engineer.com, Eduva.
- Lessons/price/report/card: OpenSooq/Facebook/PrivateJo listings, BTECHub, Ostathi; engines offered to review reports themselves; one engine said no official card exists.

## 3. Most common evidence gaps (observed unless marked)
1. No independent corroboration on the surfaces engines retrieve for "who teaches / who offers" (listings, communities, platform profiles) — the dominant gap.
2. No published service facts (availability, online/in-person, price policy, report-review scope, card scope); engines fill the void with other providers or invented price ranges.
3. Name inconsistency across properties (site/YouTube "Ahmad Domi | أحمد دومي", Instagram "Ahmad Ra'ed Domi || معلم BTEC IT", repo footer pointed at an old YouTube handle).
4. Retrieval lag/indexing: three relevant pages were "discovered, not indexed" on 2026-10-07 (hypothesis: newly indexed pages are not yet used).
5. YouTube metadata partly still on the old title pattern for older videos (observed in the cited P085 video title).
6. Visible location (Irbid) and experience were only in schema/CV, not in the page text the engines read.

## 4. Changes implemented on Ahmad-owned assets (commit 91dc387, deployed; docs commit 56c5169)
- Homepage `/`: four visible, source-backed Q&As — is there a BTEC IT teacher in Arabic in Jordan (Irbid, about two years, Asas + independent, per CV); where to learn BTEC IT in Arabic (hub, videos, glossary, assessment guide); how his name is written (full name, Ahmad Domi, Instagram display name, same person); do lessons exist (CV-supported past instruction only; **no prices, no availability promised**).
- Footer/profile link fixed to the canonical YouTube handle `@AhmadDomiedu`; Person `sameAs` now also carries the stable channel-ID URL (old handle redirects to the same channel); `knowsAbout` adds Programming and BTEC assessment writing.
- `llms.txt`: identity facts, name forms, a question → page map, and an explicit statement that lesson prices/availability are not published.
- Tests: 3 new Playwright checks (no superlatives/prices in the FAQ, canonical handle in schema and footer, llms.txt facts).
- Documentation: evidence matrix, distribution map, `SERVICE_FACTS_DRAFT.md` (unpublished drafts), owner-action section F.

## 5. Pages improved
`/` (content), `/llms.txt`, Person JSON-LD on every page that embeds it, footer/contact social links on the portfolio pages (`/about`, `/en`).

## 6. Verified educator-identity signals (public, checked 2026-10-08)
- YouTube `@AhmadDomiedu`: channel "Ahmad Domi | أحمد دومي – BTEC IT", 488 subscribers, 26 videos; description states "مدرّس BTEC IT في الأردن", lists units, links `ahmaddomiedu.com` and `/btec-it`; old handle redirects to the channel.
- Instagram `@ahmaddomiedu`: "Ahmad Ra'ed Domi || معلم BTEC IT", bio "مدرّس BTEC IT 🇯🇴 | خبرة +2 سنوات", link `ahmaddomiedu.com`, about 17K followers.
- CV (owner-confirmed source in the repo): Asas Educational Platform BTEC IT instructor (8 months), freelance BTEC IT instructor (1.5 years), BSc Cybersecurity (Al al-Bayt University, 2026).
- Google results for his name: site, Facebook page "المعلم أحمد دومي" (platform-operated, not his), YouTube, Instagram, an Asas-related reel.
- Not verified this phase: LinkedIn, GitHub, an Asas profile URL (none supplied).

## 7. Service/product facts still needing the owner
Lesson availability now, online/in-person and location, price or price policy, booking method, report-review scope, what the card excludes and its current price, Asas profile URL, calculator rule source, consented testimonials. Checklist: `docs/SERVICE_FACTS_DRAFT.md`.

## 8. Independent evidence opportunities (classes A–D)
See `docs/AI_RECOMMENDATION_DISTRIBUTION_MAP.md`. Summary: A owned (site done; YouTube/Instagram/LinkedIn owner edits), B self-registration (Asas profile, tutor listings only if truly available), C voluntary mentions (BTEC JO, TawjihiHub, al-maher — observe, never solicit), D do not approach (competitors, student-run channels such as the `it_for_btec` Telegram channel).

## 9. Deliberately not changed
DNS, calculator formulas, card prices, any external account (YouTube, Instagram, LinkedIn, GitHub), YouTube metadata (diff proposed only), review/rating/credential/FAQPage schema, new "doorway" pages, any claim of "best/number one", any lesson price or availability, `sameAs` entries for pages he does not control (the platform-run Facebook page), outreach to anyone.

## 10. Test, build, deployment
`npm run verify` (lint, typecheck, content validation, unit tests, build) exit 0 (0 lint errors; 13 pre-existing content-validator warnings). Playwright 53/53 passed (50 existing + 3 new). Deployed to production with `vercel deploy --prod`; live checks: homepage contains the new Q&As, `llms.txt` has the identity section, schema carries the channel-ID URL, `/btec-it` returns 200. Pushed to `origin/master`.

## 11. Fresh AI observations (smoke test, minutes after deployment)
Logged-out, fresh sessions, 11 completed answers (full detail: `data/ai-visibility-benchmark/phase6-smoke-test.json`):
- **Perplexity P009** ("مدرس BTEC IT في إربد"): "موقع أحمد دومي يقدّم شرح وحدات BTEC IT بالعربي مع المصطلحات الإنجليزية، بما في ذلك متطلبات Pass وMerit وDistinction", citing `ahmaddomiedu.com/btec-it/assessment`, as the second of three options (after an OpenSooq tutor ad). This is a named + cited resource recommendation, not a "teacher" recommendation. The cited page was **not** changed in Phase 6 and the Phase 5 run of the same prompt did not name him, so this is run-to-run variance until it repeats; it is **not** evidence that the deployment worked.
- Perplexity P001, P016, P031, P045: not named. P002, P017, P097 hit a sign-in wall (not completed).
- ChatGPT (6 prompts, P001 P002 P009 P016 P031 P097): 0/6. Its anonymous limit had reset.
- Google AI Mode: not re-tested (quota from the earlier run; session state lost). Gemini: not re-run. Claude: not tested.
Do not read any improvement into 1 appearance in 11 answers.

## 12. The 10 most important next actions, ranked by evidence and effort
1. Owner confirms the service facts (lessons now? terms?) — unlocks every "who offers lessons" prompt; low effort for him.
2. Owner sends the Asas profile URL and aligns its text/link with the site — Asas is the one platform engines already tie to his name (P085).
3. Owner picks one display name for Instagram/YouTube (or confirms the documented pair).
4. Owner authorizes the YouTube diff (the programming video that was cited, plus older videos on the old title pattern).
5. Owner supplies the calculator rule source (removes the "pending confirmation" wording on the page).
6. Add worked examples to the P/M/D pages — the only page type that earned a citation (P040) and the one named in P009.
7. Register on tutor listings only where he is truly available, with the confirmed facts.
8. Move the card platform to the brand domain and publish confirmed card/report-review facts.
9. Re-run the frozen cohort weekly for four weeks with raw answers persisted to disk; repeat P009 to see if the appearance holds.
10. Monitor class C sources for voluntary mentions; no solicitation.

## Final strategic question — shortest credible path from "AI can find Ahmad Domi" to "AI independently recommends him"
Observed: he is findable by name (his site, YouTube and Instagram surface for his name), and his first unprompted appearances come from **resource** lanes — programming explanations in Arabic (P085: his YouTube video + Asas), the Evaluate worked example (P040), his Instagram (P025), and the assessment page (smoke P009). The "recommend a teacher" answers, in contrast, are built from listings, communities and platform pages, none of which carries him, and where an engine cannot find a confirmed offer it names someone who has one.
Shortest path, in order: (1) publish confirmed, truthful service facts on his own pages; (2) make the same facts and one name appear on the two or three non-owned surfaces he can truthfully control — the Asas profile and any tutor listing where he is really available; (3) keep deepening the resource lanes that are already being retrieved (P/M/D examples, programming, Arabic explanations, aligned YouTube titles); (4) let independent sources mention him on their own. Steps 1–2 are owner facts, not engineering; the site can only make step 1 easy to verify once he supplies it. Generic GEO tricks are not on this path.
