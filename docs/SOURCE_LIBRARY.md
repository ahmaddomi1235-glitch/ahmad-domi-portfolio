# Source library workflow (private material → safe knowledge)

Ahmad's working library (101 files, ≈584 MB: PDF, DOCX, XLSX, one video, one zip) lives **outside the repository**, on the Desktop. It is treated as **read-only**: nothing is moved, renamed, deleted, copied wholesale or committed. Only *derived* data is produced, and all of it sits in git-ignored folders.

## Pipeline

```bash
python scripts/content/inventory_sources.py "<source folder>"   # 1. read-only inventory: SHA-256, type, pages/words, markers, PII *counts*, text → sources/extracted/
python scripts/content/analyze_sources.py                        # 2. version clusters, overlap with published PDFs, criteria codes, decisions → sources/registry/
python scripts/content/outline_sources.py                        # 3. heading outlines (no body text) → sources/registry/outlines/
```

| Output (all git-ignored) | Contents |
| --- | --- |
| `sources/registry/inventory.json` | one record per file (hash, size, pages, words, markers, head snippet) |
| `sources/registry/overrides.json` | the editorial decision per file (category, visibility, unit, publication note) — kept private because file names of paid material must not enter a public repo |
| `sources/registry/source-registry.json`, `REPORT.md` | merged decision record + human summary |
| `sources/registry/outlines/` | heading maps used to point drafts at exact sections |
| `sources/extracted/` | extracted text (private working copy) and page previews of scanned files |
| `content/_drafts/` | machine-readable *drafts*: official-criteria map, concept candidates — never routed |

Defaults: **every file is `PRIVATE` / `draft`** until an explicit decision says otherwise. The analysis script refuses a source folder inside the repo.

## What the library turned out to be (aggregate)

| Class | Files | Policy |
| --- | --- | --- |
| Already published on the site (byte-identical text) | 7 | public — nothing to do |
| Author unit books / lessons, author line present, unpublished | 6 | `PUBLIC_CANDIDATE` after owner review |
| Report-writing methodology (author) | 2 | `PUBLIC_SUMMARY` candidate (principles only) |
| Unit books/lecture notes **without** an author line | 22 | candidate **only after authorship is confirmed** |
| Assignment guidance, ready-made reports/tables, scenarios, marking frameworks | 41 | `PAID` — may inform *definition-level* concept pages in original words, never reproduced |
| Pearson-set briefs/activities and **two scans of Pearson textbook pages** | 12 | private, copyright — facts (unit title/number, aim titles, criteria codes) with attribution at most |
| Datasets, video, image, archive, OS artefacts, superseded editions | 11 | private |

Privacy scan: no student personal data found (the "student name/ID" hits are generic examples or blank form fields); phone numbers are the owner's own support numbers and one dummy number — never copy them into public content.

## Rules this enforces

1. Original files are never published without an explicit, file-specific approval from the owner.
2. Paid/assignment-solving material never becomes a public page; at most a definition-level concept written in original words.
3. Learning Aims / criteria are published only with an `officialSource`; the only official source here is a private scan, so a mapping is prepared as a **draft** and waits for approval.
4. Authorship must be confirmed before publishing anything that lacks an author line (it may derive from a Pearson, ministry or third-party text).
