# Content Update Guide

A plain-language guide for Ahmad (or anyone helping him) to update the site without needing to understand the whole codebase. All portfolio content lives in `src/content/*.ts` — you should almost never need to touch anything under `src/components/` or `src/app/` just to change text, links, or lists.

> **Two kinds of content now exist.** The **portfolio** (CV, projects, student results, teaching-file list — shown at `/about` and `/en`) is edited here, in `src/content/`. The **BTEC knowledge base** (units, concept pages, glossary, videos, calculator, card) lives in `content/*.json` and is documented in `docs/CONTENT_PIPELINE.md`. Run `npm run validate` after editing either.

## 1. Edit the professional profile / biography

File: `src/content/en.ts` and `src/content/ar.ts`, under `professionalProfile.paragraphs`.

Each is a plain array of strings — one string per paragraph, written in first person ("I taught...", "I developed..."). Edit the text directly. Keep the two files in sync (same number of paragraphs, same meaning) but the wording does not need to be a literal translation.

## 2. Add a certification

File: `src/content/profile.ts`, the `certifications` array.

```ts
{ name: "Certification Name", category: { ar: "التصنيف بالعربية", en: "Category in English" } }
```

If the name itself needs translation, use `{ ar: "...", en: "..." }` instead of a plain string.

## 3. Add a teaching material (Work Samples section)

File: `src/content/teachingMaterials.ts`, the `teachingMaterials` array. Each entry needs `id`, `titleAr`/`titleEn`, `descriptionAr`/`descriptionEn`, `categoryAr`/`categoryEn`, `fileType`, `filePath`, and `fileSize`.

1. Put the original file somewhere outside `public/` (e.g. the project root) and copy it — never move or edit the original — into `public/documents/teaching-materials/` with a clean, descriptive filename.
2. Add the entry to `teachingMaterials.ts` with `filePath` pointing to `/documents/teaching-materials/<filename>`.
3. Only add files that are genuinely educational materials prepared for students (summaries, revision files, worksheets, lab guides) — not CVs, project docs, or unrelated files.

## 4. Add a project

File: `src/content/projects.ts`. Add a new object to the `projects` array following the `Project` type at the top of the file. Every project needs:

- `summary` — a functional description (what it does), not a marketing tagline.
- `contribution` — one sentence on what you personally built.
- `technologies` — only tools actually used.
- Optionally a full `caseStudy` block (`overview`, `problem`, `howItWorks`, `role`, `implemented`, `status`) for its own case-study page.

If you don't have enough verified detail yet, set `detailsPending: true` instead of a `caseStudy` — the project shows with a "case study in preparation" note rather than a broken or invented page. Never add a `liveUrl` unless it is a real, working, public link. The project automatically gets a case-study page at `/projects/[slug]` (Arabic) and `/en/projects/[slug]` (English).

## 5. Change social links

File: `src/content/profile.ts`, the `social` object. Used everywhere (header, footer, contact section) — one edit updates the whole site.

## 6. Replace the CV

The CV currently published is `public/documents/Ahmad-Domi-CV.pdf`, copied from `AHMAD_DOMI_ATS_CV_Template.pdf` in the project root (the original is untouched). To update it:

1. Replace `public/documents/Ahmad-Domi-CV.pdf` with the new file (same filename, or update `cvFileName` in `src/content/profile.ts` if you rename it).
2. `cvUrl` in `src/content/profile.ts` is already set to `/documents/Ahmad-Domi-CV.pdf` — no further change needed unless the filename changes.

The "Download CV" buttons in the header, mobile menu, and professional profile section are hidden automatically whenever `cvUrl` is `null`.

## 7. Add or update student result images

Published images live in `public/images/student-results/` (currently `result-01.jpg` through `result-16.jpg`). Their captions and metadata live in `src/content/studentResults.ts`. The originals are kept, untouched, in `images_source/` (git-ignored, never published directly) — see `ASSET_PRIVACY_REVIEW.md` for the full review of what was published and the one image withheld (it exposed a student's phone number, photo, and name together).

To add a new image:

1. Put the new source file in `images_source/`.
2. Decide whether it's safe to publish: does it expose a phone number, ID, email, or a photo of an identifiable person in combination with their name? If yes, don't publish it as-is.
3. Add an entry to `scripts/asset-approvals.json`:
   ```json
   { "id": "result-17", "sourceFileName": "your-file.jpg", "publishedFileName": "result-17.jpg", "privacyReviewed": true, "notes": "..." }
   ```
4. Run `node scripts/prepare-portfolio-assets.mjs` — it copies only approved entries into `public/images/student-results/`.
5. Add a matching entry to `src/content/studentResults.ts` with `image`, `width`, `height` (check the actual file dimensions), `alt`, `caption`, and `category` (`"result"` or `"message"`). Keep alt text and captions generic — don't restate a student's name even if it appears in the image itself.

## 8. Update Arabic and English text together

Every piece of UI copy lives in two parallel files: `src/content/ar.ts` and `src/content/en.ts`. They both implement the same `Dictionary` type (`src/content/dictionary.ts`), so if you add a field to one you must add it to the other or the project will fail to type-check.

## 9. Deploy updates to Vercel

If the project is already connected to a Vercel project:

1. Commit and push your changes to the connected Git branch (usually `main`).
2. Vercel automatically builds and deploys.

If it is not connected yet:

1. Push this project to a GitHub repository.
2. Go to vercel.com → New Project → import the repository.
3. Framework preset: Next.js (auto-detected).
4. No environment variables are needed — the canonical domain (`https://ahmaddomiedu.com`) is a constant in `src/config/site.ts`.
5. Deploy. Domain/DNS notes: `docs/DOMAIN_AND_DEPLOYMENT.md`.

To test a production build locally before pushing:

```
npm run build
npm start
```
