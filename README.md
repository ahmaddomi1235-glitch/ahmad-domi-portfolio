# Ahmad Domi — Portfolio

Bilingual (Arabic/English) professional portfolio for Ahmad Raed Ahmad Domi, positioned primarily as a BTEC IT Technical Instructor, with cybersecurity engineering and software projects supporting that credibility.

- Arabic (default): `/`
- English: `/en`

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the Arabic homepage, `http://localhost:3000/en` for English.

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm start        # run the production build
npm run lint     # ESLint
node scripts/prepare-portfolio-assets.mjs   # copy privacy-approved student result images into public/
```

## Content

All visible copy and structured data live under `src/content/` — see `CONTENT_UPDATE_GUIDE.md` for a plain-language walkthrough of how to edit biography text, add a project/certification, replace the CV, or add student result images.

## Environment variables

- `NEXT_PUBLIC_SITE_URL` — the production domain, used for canonical URLs, Open Graph/Twitter metadata, and the sitemap. Defaults to a placeholder if unset.

## Deploying to Vercel

1. Push this repository to GitHub.
2. Import it at vercel.com as a new project (Next.js preset is auto-detected).
3. Set `NEXT_PUBLIC_SITE_URL` in the Vercel project's environment variables.
4. Deploy.
