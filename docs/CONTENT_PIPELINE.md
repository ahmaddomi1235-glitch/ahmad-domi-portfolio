# Content pipeline

The site is a **structured knowledge base**, not a blog. Pages are generated from data under `content/`; adding a concept page requires **no route code**.

```
content/
  units/            Unit hubs (one JSON each)
  concepts/<unit>/  Concept and Comparison pages (one JSON each)
  glossary/         Bilingual terms ($defaults + items)
  videos/           Channel videos ($defaults + items, with chapters)
  resources/        Teaching PDFs mapped to units
  tools/  products/ Calculator, BTEC IT Card
  entities/ questions/ assignments/ assessment/   reserved (see "Not yet published")
  _drafts/          generated drafts — git-ignored, never routed
sources/
  official/  ahmad/  transcripts/   git-ignored private inputs
```

## Node model (`src/lib/kb/types.ts`)

`id, type, title_ar, title_en, slug, summary, unit, learningAim, criterion, concepts, questions, sourceType, sourceReferences, youtubeId, author, lastReviewed, visibility, related, officialSource, status` (+ `needsVerification`, `reviewState`, `aliases`; concepts add `shortAnswer`, `whyBtec`, `terminology`, `questionsAnswered`, `body`, `videos`, `cardCta`).

| Field | Rule |
| --- | --- |
| `status` | `draft` → `reviewed` → `published`. **Only `published` is routed, sitemapped, searchable or linked.** |
| `visibility` | `PUBLIC`, `PUBLIC_SUMMARY`, `PAID`. `PAID` can never be published (validator error). |
| `sourceType` | `ahmad-booklet`, `ahmad-unit-book`, `ahmad-video`, `official-pearson`, `general-knowledge`, `tool-source`. `official-pearson` needs `officialSource`; `general-knowledge` cannot be published unless a human sets `needsVerification:false`. |
| `learningAim` / `criterion` | `null` everywhere until an official Pearson document is imported; the validator rejects them without `officialSource`. Mappings found in Ahmad's own books are kept only as an internal `learningAimHint` with `needsVerification:true`. |

### Body blocks

`p`, `h2`, `h3`, `ul`, `ol`, `table`, `callout` (`tip|warning|example|note`), `terms`. Inline: `[[concept-id|label]]` (internal link, resolved at build time — a missing or unpublished target **fails the build**), `**bold**`. Latin runs are wrapped automatically in `<bdi lang="en" dir="ltr">`.

## Quality gate

```bash
npm run validate     # exit 1 on any error
npm run test:unit    # 17 tests of the validator, search normalisation, transcript parser, draft generator
```

Rules include: missing author/summary/source; invalid related/unit/concept ids; duplicate slug, duplicate question intent, duplicate glossary term; unpublished internal links; thin concept bodies (<4 blocks or <140 words); generic-filler openings; PAID published; paid-material markers in PUBLIC text; insecure/invalid URLs; learning aim without official source; ungated `general-knowledge`. The site build runs the same rules and refuses to build on errors.

**Duplicate intents:** one strong page answers all equivalent questions (they are listed in `questionsAnswered`). The validator blocks a second page claiming the same question.

## Adding a concept (hand-written)

1. Copy a file in `content/concepts/<unit>/`, set a new `id`/`slug` (lowercase-kebab), `unit`, `order`.
2. Write `shortAnswer` first (2–4 sentences, answer immediately), then `body`, `terminology`, `questionsAnswered`, `whyBtec`.
3. Cite sources in `sourceReferences` (file + page range, or video + timestamps).
4. Link related pages with `[[id|label]]`; set `related`.
5. `npm run validate`, then publish by `status: "published"`.

Keep Ahmad's explanation distinct from official text: official quotations (none yet) go in a separate attributed block and require `officialSource`.

## YouTube → structured page

```bash
node scripts/content/import-youtube.ts            # list channel, fetch metadata + captions, write content/_drafts/videos.import.json
node scripts/content/normalize-transcript.ts      # raw VTT → sources/transcripts/clean/<id>.json|txt
node scripts/content/generate-content-draft.ts <videoId> [--unit cyber-security] [--ref "Label|https://…"]
```

The generator produces, **as a draft only**: canonical title, template Arabic summary, English terminology, matched glossary terms (IDF-weighted, sub-linear TF), suggested concepts, possible unit (null when evidence is weak), questions answered (from the matched concept), ≈90 s chapter windows, evidence timestamps, internal-link suggestions, page slug, meta description and VideoObject fields. It never asserts a Learning Aim and never copies raw transcript text. Checked against the 11 captioned lessons: the top suggestion matched the hand-verified mapping in 10 of 11 (the miss was a topic with no glossary term yet).

An AI enrichment provider can be added later by implementing `EnrichmentProvider` (`generate-content-draft.ts`) — nothing depends on an external API today.

**Publishing a draft:** a human writes the explanation from the video/book in their own words, moves the data into `content/…`, sets `status`, and passes `npm run validate`.

## Transcripts

Raw and cleaned captions live only in `sources/transcripts/` (git-ignored). They are used to verify topics and time chapters. Pages are never raw transcripts; they are *transcript → concepts → explanation → questions → chapters → references*.

## Bulk import of the ~100 teaching files (P2)

Drop files in `sources/ahmad/` (git-ignored). Extract text, then for each document create **draft** nodes with `visibility` set deliberately (default `PAID` for anything that solves an assessed task) — publication is always an explicit edit. Private files never become routes because only nodes under `content/` with `status:"published"` are routed.

## Not yet published (by design)

| Area | Why | Unblocked by |
| --- | --- | --- |
| Programming unit | no source in the repository | a booklet/transcript from Ahmad |
| Assessment: Pass/Merit/Distinction, command verbs (Describe, Explain, Analyse, Evaluate, Justify) | writing them from memory risks inventing Pearson wording | the Pearson spec in `sources/official/` or Ahmad's own explanation |
| Learning Aims / criteria | must come from official documents | `sources/official/` |
| Assignment guides | PUBLIC_SUMMARY only; need Ahmad's guidance without answers | decision on what to summarise |
