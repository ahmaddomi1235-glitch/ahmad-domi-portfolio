# GEO / Entity-Home Implementation Plan — Ahmad Domi | أحمد دومي — BTEC IT

Status: written 2026-10-04, before implementation. Updated as work lands (see the checklist at the bottom).

> **Scope honesty.** Nothing here can guarantee that Google, Gemini, ChatGPT, Perplexity, Bing or any other system
> will recommend or cite Ahmad Domi. The work maximises *entity clarity, crawlability, retrievability, citation
> readiness, source quality and corroboration* — the things we control.

## 1. Current state (audit findings)

| Area | Finding |
| --- | --- |
| Repo | `ahmaddomi1235-glitch/ahmad-domi-portfolio` (branch `master`, 3 commits, clean). Vercel project `ahmaddomiporfolio` (`prj_c5l38FQzopCgBO3GkfLTQOU8CcBJ`), Node 24. |
| Stack | Next.js **16.2.12** (App Router, Turbopack), React 19.2, TypeScript, Tailwind v4, framer-motion, lucide-react. Playwright smoke tests exist (`tests/smoke.spec.ts`). Lint + build pass on `master`. |
| Routes | `/` (Arabic portfolio), `/en` (English portfolio), `/projects/[slug]`, `/en/projects/[slug]`, `/ar` (redirect → `/`), `robots.txt`, `sitemap.xml`, `/icon`, `/opengraph-image`. |
| **Rendering defect** | The root layout calls `headers()` (fed by `src/proxy.ts`) to read an `x-locale` header. That opts **every route into dynamic rendering** — `next build` shows `ƒ` for `/`, `/en`, project pages. Knowledge content must be static HTML, so this is the first thing to fix. |
| SEO | Single title/description per locale from the dictionary; canonical `/` & `/en`; hreflang `ar↔en` between pages that are *not* equivalent in the new design; `NEXT_PUBLIC_SITE_URL` falls back to `https://example.com` (canonical risk). JSON-LD: `ProfilePage → Person` only (no `WebSite`, no `@id`, no `knowsAbout`, stale YouTube handle). |
| robots / sitemap | Both exist and work; robots is a bare `allow: /`; sitemap lists only 2 pages + projects and stamps `lastModified: now` on everything. |
| OG | One generic image (Latin text only). |
| Analytics | **None.** No trackers present. |
| Content | Rich, truthful portfolio copy in `src/content/*.ts` (verified-facts discipline, privacy-reviewed student-result images). 7 original teaching PDFs under `public/documents/teaching-materials/` (≈ 380k characters of Ahmad's own explanations). CV PDF. |
| Domain | `ahmaddomiedu.com` is registered at Cloudflare; nameservers `aitana/dion.ns.cloudflare.com`; **no A/AAAA records yet**. Vercel domains list contains only `comparrand.com`. |
| Auth | Vercel CLI authenticated as `ahmaddomi1235-glitch`; `gh` authenticated (repo/workflow scopes). **Cloudflare: no CLI, no API token.** |
| Other repos | `asasbtec` (Vite SPA, client-rendered) = the existing **calculator** — a Jordanian Tawjihi/BTEC *admission-average* calculator (U/P/M/D → points × credit hours, scaled to /35 + shared subjects /30). It is a Ministry-style rule, **not** a Pearson grade formula, and its rule source is not documented in the repo. `ahmaddomi-edu` = card preview platform (3 cards, WhatsApp booking, owner dashboard — private DB; stays untouched). `allbtec` = student portal (static). |
| YouTube | Channel handle is already **`@AhmadDomiedu`** (channel `UCdZ35Tf0PAG62WQLa17vJDg`, title "Ahmad Domi"); the repo still links `@AhmadDomi-r7r`. 26 public videos (1 now unavailable), 3 playlists. 14 videos have Arabic auto-captions. |
| Third-party | Asas Educational Platform (instructor role in CV). Profile URL not yet provided. |
| Dead code / debt | `src/app/ar/page.tsx` (redirect stub), README/guide encoded as CP1252 mojibake in places, `.gitignore` has a duplicated `.vercel`. Nothing else dead enough to delete; **no portfolio content is removed**. |

### Decision: **B + C — refactor the shell, extend the content, keep every portfolio asset**

* Keep: Next 16 stack, design tokens (navy/ivory/gold), all portfolio sections, projects, student results, teaching
  materials, CV, tests.
* Refactor: static root layout, canonical config, metadata layer, structured-data layer, sitemap/robots.
* Add: knowledge-base content model + routes, entity home, calculator, card page, search, ingestion scripts.
* Move (not delete): the old portfolio homepage moves from `/` to **`/about`** (Arabic) and stays at `/en` (English).
  Old URLs keep working: `/` still resolves (now the entity home), `/en`, `/projects/*`, `/en/projects/*` unchanged,
  `/ar → /` redirect kept.

## 2. Proposed architecture

```
src/
  config/site.ts            canonical URL, brand names, sameAs, nav  (single source of truth)
  content/ (existing)       portfolio dictionaries — untouched
  lib/kb/                   types, loader (reads /content/**.json), validation rules, search index builder
  lib/seo/                  metadata() helper, JSON-LD builders
  components/kb/            Breadcrumbs, RichText, AuthorCard, SourceBadge, VideoEmbed, UnitCard, ...
  app/
    layout.tsx              STATIC root layout: <html lang="ar" dir="rtl">
    page.tsx                Entity Home
    about/                  old portfolio (ar) + author page
    en/                     English portfolio (layout sets lang="en" dir="ltr" on wrapper)
    btec-it/…               hub, unit, concept pages  (generateStaticParams from content)
    btec-it/questions/      grouped Q&A index  (no per-phrasing pages)
    btec-it/glossary/       bilingual glossary
    btec-calculator/        calculator (client island) + methodology (server HTML)
    btec-it-card/           product page (data-driven)
    videos/                 verified-own-channel video index (+ pages when transcript-derived content is reviewed)
    resources/              Ahmad's own teaching PDFs (existing) + external official links
    search/                 static client search (noindex)
    sitemap.ts robots.ts llms.txt/route.ts search-index.json/route.ts not-found.tsx
content/{entities,units,concepts,questions,assignments,assessment,glossary,products,tools,videos}/*.json
sources/{official,ahmad,transcripts}/   git-ignored (private / copyrighted / raw)
scripts/content/{import-youtube,normalize-transcript,generate-content-draft,validate-content}.ts
docs/…
```

### Why JSON content, not MDX
Zero extra dependencies, trivially validated, and the ingestion pipeline can emit it directly. Body text is an array of
typed blocks (`p`, `h2`, `ul`, `table`, `callout`, …) with `[[concept-id|label]]` links resolved at build time — so
internal links can never point to an unpublished or missing node (the validator fails the build instead).

## 3. Routes (only where source-backed)

| Route | Published in this milestone? | Source basis |
| --- | --- | --- |
| `/` Entity Home | yes | CV + approved portfolio copy |
| `/about` | yes (existing portfolio) | existing content |
| `/btec-it` hub | yes | derived from published nodes |
| `/btec-it/cyber-security` | yes | foundation booklet 2009 |
| `/btec-it/artificial-intelligence` | yes | foundation booklet 2009 + AI unit book |
| `/btec-it/data-modelling` | yes | foundation booklet 2011 |
| `/btec-it/it-project-management` | yes | PM unit book |
| `/btec-it/website-development`, `/introduction-to-applications` | yes (hubs only) | explanation files + videos; concept pages later |
| `/btec-it/programming` | **no** — no source yet | `needsSource` in backlog |
| `/btec-it/assessment/**` (P/M/D, command verbs) | **no** — drafts only | no official/Ahmad source supplied; publishing from memory would risk inventing Pearson wording |
| concept pages | 17 (see content inventory) | each cites the exact booklet/book it derives from |
| `/btec-it/questions`, `/btec-it/glossary` | yes | derived from published concepts |
| `/btec-calculator` | yes | existing `asasbtec` logic (ported verbatim), methodology labelled "Jordan Tawjihi rule — source to be confirmed" |
| `/btec-it-card` | yes | card platform copy; **price hidden until `showPrice: true`** |
| `/videos`, `/resources`, `/search` | yes | channel inventory via yt-dlp; PDFs already public |

## 4. Content model

`id, type, title_ar, title_en, slug, summary, unit, learningAim, criterion, concepts, questions, sourceType,
sourceReferences, youtubeId, author, lastReviewed, visibility, related, officialSource, status` plus
`needsVerification` (bool), `reviewState`, `aliases`, `bodyBlocks`.

* `status`: `draft | reviewed | published` — only `published` is routed, sitemapped, searchable or linked.
* `visibility`: `PUBLIC | PUBLIC_SUMMARY | PAID` — `PAID` nodes are never rendered or indexed; validator rejects any
  PUBLIC page containing paid-marker strings (`ready-to-submit`, answer-pack phrases, configurable list).
* `sourceType`: `ahmad-booklet | ahmad-video | official-pearson | general-knowledge`. `official-pearson` content must
  carry `officialSource`; `general-knowledge` cannot be `published` without `needsVerification:false` set by a human.
* Official vs Ahmad: every concept page renders a **“شرح أحمد دومي”** badge; official quotations (none yet) use a
  separate “نص رسمي” block with attribution.
* `learningAim`/`criterion` are `null` everywhere until an official spec is imported. Unit "axes" taken from Ahmad's
  booklets are shown as *his* overview with `needsVerification: true`, never as Pearson Learning Aims.

## 5. Schema strategy (JSON-LD, one `@graph` per page)

| Page | Types |
| --- | --- |
| Home | `WebSite` (+`SearchAction` → `/search?q=`), `Person` (`@id` `#person`: name, alternateName, jobTitle, description, url, image, sameAs, knowsAbout, worksFor→Asas only as `affiliation` text-backed by CV), `Organization`-free |
| About | `ProfilePage` → same `Person @id` |
| Unit hub | `CollectionPage` (+ `BreadcrumbList`) — **not** `Course` (it is an index, not an enrollable course) |
| Concept | `TechArticle` (author→Person `@id`, `about` DefinedTerm, `isBasedOn` source description), `BreadcrumbList`, `VideoObject` only when a verified own video is embedded |
| Glossary | `DefinedTermSet` |
| Calculator | `WebApplication` (free, `applicationCategory: EducationalApplication`) |
| Card | `WebPage` + (`Product`+`Offer` **only** when `showPrice && price && purchaseUrl`) |
| Videos index | `ItemList` of `VideoObject` |
| Never | reviews, ratings, awards, credentials, `FAQPage`, fake orgs |

## 6. Canonicalisation & deployment

* Canonical host **apex** `https://ahmaddomiedu.com` (hard-coded constant, *not* env — previews must also canonicalise
  to production).
* `www → apex` 308 via host-matched `redirects()` in `next.config.ts`; Vercel enforces http→https.
* `ahmaddomiporfolio.vercel.app → apex` is added **only after** DNS is verified (otherwise the live site would break).
* Vercel stays the host. Cloudflare = registrar + DNS. Vercel-requested records (read from CLI, not guessed):
  `A @ 76.76.21.21`, `A www 76.76.21.21`. **DNS-only (grey cloud)** — Vercel terminates TLS; proxying would hide origin
  checks and interfere with certificate issuance.
* Deploy via `vercel --prod` from the branch after tests pass; GitHub integration status checked and noted.

## 7. Migration strategy

1. Static root layout (remove `proxy.ts`/`headers()`); English subtree gets its own layout wrapper.
2. Move portfolio home → `/about`; build new `/`.
3. Land config + SEO libs, then content model + validator, then routes, then calculator/card/search, then scripts.
4. Redirect rules + 404; sitemap/robots/llms.txt.
5. Gate every step on `lint`, `tsc`, `validate-content`, `build`.
6. Domain attach → DNS (blocked on Cloudflare auth) → verify → add old-URL redirect → post-deploy audit.

## 8. Risks

| Risk | Mitigation |
| --- | --- |
| Publishing concept pages Ahmad has not reviewed | Every page is derived from his own booklet, cites it, carries `reviewState` and a visible “شرح أحمد دومي” source line; he can flip any node to `draft` in one field. Report flags this explicitly. |
| Auto-caption transcripts are noisy | Used only for *verification* and chapter timing; never published raw (`sources/transcripts` is git-ignored). |
| Calculator rule source unknown | Ported verbatim, labelled with its true nature; no formula invented; `needsVerification: true`. |
| Card price accuracy (discounts) | `showPrice: false` default; Product/Offer schema gated on it. |
| DNS not yet pointed | Domain already attached in Vercel; `www`/redirect rules inert until DNS resolves; old URL redirect deferred. |
| Dynamic→static change breaking existing pages | Playwright smoke suite updated and run; old routes retained. |
| Search index leaking drafts | Built only from `published` nodes by the same loader that routes pages. |

## 9. Required credentials / external actions

| Need | Why | Minimum privilege |
| --- | --- | --- |
| Cloudflare DNS access | Create two DNS-only A records | Either add them manually in the dashboard, or a scoped API token: *Zone → DNS → Edit* on `ahmaddomiedu.com` only |
| Google Search Console | Verify domain, submit sitemap | Owner action (DNS TXT via Cloudflare) |
| Bing Webmaster Tools | Same | Owner action (import from GSC) |
| Instagram / YouTube / Asas | Profile edits | Owner only — documented in `SOCIAL_ENTITY_CHANGES.md`, `YOUTUBE_GEO_MIGRATION.md` |
| Asas profile URL, LinkedIn confirmation | `sameAs` | Provide URL |

## 10. Implementation checklist (final status)

- [x] Audit (this document) — repo located, Vercel + GitHub authenticated, baseline build recorded
- [x] Static layout + canonical config + SEO libs (all routes now SSG; the `headers()`/proxy mechanism is gone)
- [x] Entity home, about/author page, header/footer, legacy portfolio preserved at `/about` and `/en`
- [x] Content model, loader, validator (17 unit tests)
- [x] Concepts (19 incl. 5 comparisons), unit hubs (6), glossary (61 terms), grouped questions
- [x] Videos index (26 channel videos, chapters on 6) with VideoObject; concept pages embed the lesson video
- [x] Calculator (verbatim logic port + methodology + honest source note), card page (price gated), resources, local search
- [x] robots, sitemap (53 URLs from content), llms.txt, 404, www→apex rule, security headers, brand OG image
- [x] Ingestion scripts: import-youtube, normalize-transcript, generate-content-draft, validate-content
- [x] Docs: social, YouTube, search-engine setup, analytics, content pipeline, owner actions, domain/deployment
- [x] lint / typecheck / validate / unit tests / build / 36 e2e tests
- [ ] DNS (blocked on Cloudflare access) → TLS → old-URL redirect → verify `https://ahmaddomiedu.com`
- [ ] Search Console / Bing submission (owner login)
- [ ] Owner confirmations in `docs/OWNER_ACTIONS.md`

## 11. Deviations from the original plan

| Planned | Done instead | Why |
| --- | --- | --- |
| 17 concept pages | 19 (5 comparisons + 14 concepts) | Source-backed pages found in the booklets: why data is the target, data states (lesson 1 video), data sources/quality/modelling, six PM concepts |
| Concept pages for Privilege Escalation, Programming, Pass/Merit/Distinction, command verbs, Metadata, Data Cleaning | Not published as pages. Metadata and Data Cleaning are glossary terms; the rest have no source in the repository | Source discipline — see `docs/OWNER_ACTIONS.md` §D |
| `/btec-it/assessment/**`, `/btec-it/assignments`, `/btec-it/programming` | Not created | Same reason; listed honestly under "قيد الإعداد" on `/btec-it` |
| Per-video pages | Videos are embedded on their concept page and listed on `/videos` | A standalone page per video would duplicate the concept page; chapters + VideoObject live on the concept page |
| Question pages | One grouped `/btec-it/questions` page | One page per phrasing would be duplicate-intent spam |
