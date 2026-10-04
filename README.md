# ahmaddomiedu.com — Ahmad Domi | أحمد دومي — BTEC IT

The canonical digital home of **Ahmad Domi**, BTEC IT instructor in Jordan: an Arabic-first **structured knowledge base** (units → concepts → glossary → videos → tools), the entity home page, the author page, a calculator, and the BTEC IT Card page. It is also the original bilingual portfolio, preserved at `/about` and `/en`.

> Goal: make the entity clear, crawlable, retrievable and citable. Nothing here can guarantee that any search engine or AI assistant will recommend or cite the site.

## Stack

Next.js 16 (App Router, all routes statically generated) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react · framer-motion (portfolio sections only). Content is plain JSON; there is no database and no server runtime for pages.

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Entity home (who, what he teaches, official accounts, resources) |
| `/about` · `/en` | Author page / portfolio (Arabic · English) |
| `/btec-it` | Hub of all units |
| `/btec-it/<unit>` | Unit hub (concepts, lesson videos, files) |
| `/btec-it/<unit>/<concept>` | Concept page (short answer → explanation → terminology → video → sources) |
| `/btec-it/questions` · `/btec-it/glossary` | Grouped Q&A · bilingual glossary |
| `/btec-calculator` | Grade calculator + methodology |
| `/btec-it-card` | Product page (price hidden until confirmed) |
| `/videos` · `/resources` | Channel videos · downloadable teaching PDFs |
| `/search` | Local Arabic/English search (noindex) |
| `/projects/<slug>` · `/en/projects/<slug>` | Portfolio case studies |
| `/sitemap.xml` · `/robots.txt` · `/llms.txt` · `/search-index.json` | Generated from published content |

## Develop

```bash
npm install
npm run dev            # http://localhost:3000
npm run verify         # lint + typecheck + content validation + unit tests + build
npx playwright test    # e2e (starts its own server on :3001; run npm run build first)
```

Useful commands: `npm run validate`, `npm run test:unit`, `npm run content:youtube`, `npm run content:transcripts`, `npm run content:draft -- <videoId>`.

Requires Node ≥ 22.18 (content scripts run TypeScript directly) and, for the YouTube importer, `yt-dlp` on PATH.

## Where things are

```
content/            all knowledge (JSON) — see docs/CONTENT_PIPELINE.md
sources/            private inputs (git-ignored): official/, ahmad/, transcripts/
scripts/content/    import-youtube · normalize-transcript · generate-content-draft · validate-content
src/config/site.ts  canonical host, identity, sameAs, nav (single source of truth)
src/lib/kb/         types, loader, validator, queries, search index
src/lib/seo/        metadata + JSON-LD builders
src/lib/calculator/ calculator logic ported verbatim from the asasbtec repo
src/content/        original portfolio copy (ar/en dictionaries, projects, results)
docs/               plan, domain, SEO, social, YouTube, analytics, owner actions, audit
```

## Principles

- **Source discipline:** nothing is published without a cited source; Learning Aims/criteria need an official source; uncertain mappings stay `needsVerification`.
- **Official vs Ahmad:** every educational page is labelled as Ahmad Domi's explanation, not Pearson text.
- **Paid boundary:** `PAID` nodes can never be published; the validator also rejects paid-material markers in public text.
- **Static first:** important text is in the initial HTML; JavaScript is used only for the menu, search and calculator.

## Environment

None required. The canonical host is a constant in `src/config/site.ts` (so previews also canonicalise to production). No secrets are used by the application.

## Documentation

`docs/GEO_IMPLEMENTATION_PLAN.md` · `docs/OWNER_ACTIONS.md` · `docs/DOMAIN_AND_DEPLOYMENT.md` · `docs/SEARCH_ENGINE_SETUP.md` · `docs/SOCIAL_ENTITY_CHANGES.md` · `docs/YOUTUBE_GEO_MIGRATION.md` · `docs/CONTENT_PIPELINE.md` · `docs/ANALYTICS.md` · `docs/POST_DEPLOY_AUDIT.md`

Portfolio editing notes (CV, student results, projects): `CONTENT_UPDATE_GUIDE.md`.
