# What needs Ahmad — external accounts, confirmations and missing sources

Everything the repository could do without your accounts or your judgement is done. This is the complete list of what is left, in priority order.

## A. Blocking: DNS (2 minutes)

The domain is attached to the Vercel project but has **no DNS records**, so `https://ahmaddomiedu.com` does not load yet. Add two **DNS-only** A records in Cloudflare (`@` and `www` → `76.76.21.21`) — exact steps and an alternative scoped-token route are in `docs/DOMAIN_AND_DEPLOYMENT.md`. Then tell Claude "DNS done" to run verification, enable the old-URL redirect and complete `docs/POST_DEPLOY_AUDIT.md`.

## B. Accounts only you can edit

| What | Where to do it | Instructions |
| --- | --- | --- |
| Google Search Console + Bing Webmaster | your Google/Microsoft login | `docs/SEARCH_ENGINE_SETUP.md` |
| YouTube: rename, description, playlists, 26 retitles, chapters, captions | YouTube Studio | `docs/YOUTUBE_GEO_MIGRATION.md` |
| Instagram name, bio, website link | Instagram | `docs/SOCIAL_ENTITY_CHANGES.md` |
| Asas teacher-profile URL → `sameAs` | send the URL | `docs/SOCIAL_ENTITY_CHANGES.md` §3 |
| LinkedIn / GitHub reciprocal links | those accounts | `docs/SOCIAL_ENTITY_CHANGES.md` §4–5 |

## C. Confirm before treating the site's claims as final

The knowledge pages were **drafted by Claude from your own booklets, unit books and lesson videos** and cite them page-by-page. Each carries a visible "شرح أحمد دومي" label, and each node's `reviewState` says "pending author review". Please read them; to pull any page back, set `"status": "draft"` in its JSON file and redeploy.

| # | Item | Why it needs you | Where |
| --- | --- | --- | --- |
| 1 | The 19 concept pages and 6 unit hubs | Published under your name from your material; you should confirm wording and examples | `content/concepts/**`, `content/units/**` |
| 2 | **Calculator rule source** | The repo's calculator uses P=60 / M=80 / D=100, credit hours, and shared-subject weights (/10, /10, /6, /4) but does not say which official document sets them. The site says so openly ("مصدر القواعد قيد التأكيد"). Give the source (Ministry circular, Pearson table…) and it becomes a documented methodology. | `content/tools/btec-calculator.json`, `/btec-calculator` |
| 3 | **Card prices** | Prices exist in the card platform's code (85 / 85 / 45 JOD) but are **hidden** (`showPrice:false`) because your sales so far were discounted and the list price may not be what you want published. Setting `showPrice:true` also turns on Product/Offer schema. | `content/products/btec-it-card.json` |
| 4 | **Report review** | Unknown whether the card includes report review; the page says "ask support" and does not promise it. Set `reportReview` to `included` / `not-included`. | same file |
| 5 | What the card contains | The page states only what is verifiable (videos, support material, assignment guidance, WhatsApp support, free first video). It deliberately does **not** say what the card excludes, because your brief lists answer packs as part of the paid tier. | same file |
| 6 | Learning-aim hint | Your AI unit book says its data topics belong to "هدف التعلم ب". Kept internally (`learningAimHint`, `needsVerification:true`); **not** published. Publishing needs the Pearson spec. | `content/concepts/artificial-intelligence/*` |
| 7 | Asas affiliation | The Person schema says `affiliation: Asas Educational Platform` (from the CV). Confirm it is current. | `src/lib/seo/jsonld.ts` |
| 8 | Alternate names in schema | `Ahmad Raed Ahmad Domi`, `Ahmad Ra'ed Domi`, `Ahmad Doumi`, `احمد دومي`, `أ. أحمد دومي` appear only in JSON-LD `alternateName`. Remove any you don't want. | `src/config/site.ts` |
| 9 | Two lesson videos have swapped titles | `1fQ9n-o_G1s` ("الحصة السادسة") is AI lesson 1; `KWk2JLTwGUk` ("الحصة الخامسة") is AI lesson 2. | YouTube Studio |
| 10 | 11 videos are title-level only | PM lessons 1–4 + intro, apps lessons + official task, grade-10 programming task have no captions, so no concept mapping was claimed. Add corrected captions, then run the draft generator. | `docs/YOUTUBE_GEO_MIGRATION.md` §4 |
| 11 | Visual identity | The site keeps its existing navy / ivory / gold palette. Your reels use green + white. Unify only if you want to. | `src/app/globals.css` |

## D. Missing sources (pages that exist as intent but are **not** published)

| Page | Needs |
| --- | --- |
| Programming unit | any booklet, slides or transcript of yours |
| Pass vs Merit vs Distinction; command verbs (Describe, Explain, Analyse, Evaluate, Justify) | the Pearson specification (put in `sources/official/`) or your own explanation; I did not write them from memory to avoid inventing official wording |
| Learning Aims and criteria mapping | Pearson unit specifications |
| Website development and Introduction to Applications **concept pages** | review the two hubs, then ask for concept pages from your explanation files |
| "What happens after BTEC Level 3" | your own guidance |
| Assignment guides (PUBLIC_SUMMARY) | tell Claude what level of guidance is safe to publish (no answers) |

## E. Decisions to make when convenient

- Put the card preview platform on `cards.ahmaddomiedu.com` (a CNAME in Cloudflare + a domain on the `ahmaddomi-edu` Vercel project) so the whole funnel sits on one brand domain.
- Point the old calculator (`asasbtec.vercel.app`) at the new page: add a visible link and a canonical to `https://ahmaddomiedu.com/btec-calculator`.
- Choose one page-view analytics tool (`docs/ANALYTICS.md`).

## F. Phase 6 — what AI recommendation tests still need from you

Evidence: `docs/AI_VISIBILITY_BENCHMARK.md`, `docs/AI_RECOMMENDATION_EVIDENCE_MATRIX.md`, `docs/AI_RECOMMENDATION_DISTRIBUTION_MAP.md`.

1. **Service facts** — confirmed and published on 2026-10-09 (card 85 JOD, in-person lessons 35 JOD/h, online 25 JOD/h, report review included with the card). Remaining gaps (lesson location/schedule, card duration, payment/refund terms, whether 85 JOD applies to every unit card) are listed in `docs/SERVICE_FACTS_DRAFT.md`.
2. **Asas teacher-profile URL** — one line in `thirdPartyProfiles` (`src/config/site.ts`). Asas is the one third-party platform engines already tie to your name (Perplexity P085).
3. **One display name** — Instagram shows "Ahmad Ra'ed Domi || معلم BTEC IT", YouTube/site show "Ahmad Domi | أحمد دومي". The homepage now documents both, but one form everywhere is cleaner; if you change Instagram, tell Claude so the homepage sentence is updated.
4. **YouTube diff** — see section 6 of the distribution map; needs your explicit go-ahead.
5. **Calculator rule source** (item C2 above) — the page still says the source is pending; an authoritative source is the single most useful trust fix for the calculator prompts.
6. **Card platform on the brand domain** (item E above).
7. A Facebook page "المعلم أحمد دومي" exists but is operated by the Asas/Kernel platform (different phone, site `jokernel.net`); it is not treated as yours and is not in `sameAs`.
