# Service facts — owner-confirmed 2026-10-09 (Phase 6B), remaining gaps

Published facts come from `src/config/services.ts` (single source of truth for pages, schema, llms.txt and tests). Change a number there and every page, the schema and the tests follow.

## 1. Confirmed by the owner and published

| Service | Confirmed fact | Where it is published |
| --- | --- | --- |
| BTEC IT Card (بطاقة أحمد دومي التعليمية — BTEC IT) | **85 JOD** | `/btec-it-card` (+ Product/Offer JSON-LD), home, `/btec-it/private-lessons`, `llms.txt` |
| In-person private BTEC IT lessons | **35 JOD per hour** | `/btec-it/private-lessons` (+ Service/Offer JSON-LD), home, `llms.txt` |
| Online private BTEC IT lessons | **25 JOD per hour** | same |
| Student report review | **Included with the BTEC IT Card** — not a separate paid service | `/btec-it-card#report-review`, home, `llms.txt` |

Wording rules applied: educational feedback and guidance only; no grade guarantee; not writing assessed work; not endorsed by or affiliated with Pearson; prices are stated as current (not estimates, discounts or historical).

## 2. Still NOT stated anywhere (owner has not confirmed; pages say so instead of guessing)

| Fact | Why it matters |
| --- | --- |
| Where in-person lessons take place, schedules, minimum lesson length | AI answers and students ask; the lessons page says these are not specified here |
| Card duration, number of report reviews, delivery method, payment methods, refund terms, discounts | Card page says it does not cover them |
| **Does 85 JOD apply to every unit card?** The card platform listed Cyber 85, AI 85 and Data Modelling 45 (booked together with the Introduction to Applications card). Only "BTEC IT Card = 85 JOD" is confirmed, so per-unit prices are no longer shown and the 45 JOD figure is not published | If unit cards differ in price, tell Claude and the card page can say so |
| A dedicated WhatsApp number | The phone number on the site is published as a phone number only; booking for the card is described as "via the support team on WhatsApp from the card platform", which is what the platform already states |
| Asas teacher-profile URL, calculator rule source, consented testimonials | See `docs/OWNER_ACTIONS.md` |

## 3. Rules that stay in force

- No new services, packages, discounts, guarantees, payment plans or refund promises without owner confirmation.
- No review/rating/award/credential schema; no availability or stock status in schema.
- Paid card content, assignment answers and private source files are never published.
