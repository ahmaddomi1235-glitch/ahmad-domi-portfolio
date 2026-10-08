# Service facts — DRAFT, not published

Nothing in this file is on the website. It lists the facts an AI assistant (and a student) needs before Ahmad Domi can be described as offering lessons, report review or the card, and the exact wording to publish **once each fact is confirmed by the owner**. Do not fill the blanks from old marketing copy.

## 1. What the public record already supports (safe to state)

| Fact | Source |
| --- | --- |
| BTEC IT instructor, Irbid, Jordan; teaches in Arabic with English terms | CV (`src/content/profile.ts`), YouTube/Instagram bios |
| About two years of BTEC IT teaching: Asas Educational Platform (8 months) + independent instruction (1.5 years) | CV |
| Past private instruction and academic mentoring for BTEC IT students | CV, freelance entry |
| Free explanations: concept pages, glossary, questions, calculator, files, YouTube lessons | the site itself |
| Paid BTEC IT Card with a free first video and WhatsApp support | card platform; card page |

## 2. Facts that are missing — owner must supply

| # | Fact | Why AI answers need it | Draft sentence (fill after confirming) |
| --- | --- | --- | --- |
| 1 | Are private lessons offered **now**? | Teacher/lesson prompts (P002, P003, P091, P092) return only providers that say so | "يقدّم أحمد دومي دروسًا خاصة في BTEC IT ___ (حضوري في ___ / أونلاين)." |
| 2 | Levels and units covered in lessons | "who explains the AI / cyber unit" prompts | "الوحدات: ___" |
| 3 | Price or price policy | Engines currently invent 10-25 JOD guesses | "السعر: ___ / يُتفق عليه بعد التواصل" (either is fine; silence is also fine) |
| 4 | Booking / contact method | A student must know how | "للحجز: ___" |
| 5 | Report review: offered? scope? included in the card? | P095/P096 | `reportReview` in `content/products/btec-it-card.json`: `included` / `not-included` / separate service |
| 6 | Card: current price, what is excluded, discount policy | P097 | `showPrice` stays `false` until confirmed |
| 7 | Asas teacher-profile URL | Entity corroboration | add to `thirdPartyProfiles` in `src/config/site.ts` |
| 8 | Student results/testimonials that can be quoted with consent | Social proof (never invented) | only with written consent and the real source |

## 3. Rules for when facts arrive

- Publish on existing pages (`/about`, `/btec-it-card`, homepage FAQ) — no new "doorway" pages.
- No superlatives ("best", "number one") without independent evidence.
- Product/Offer schema only after price and availability are confirmed; never review/rating schema without real reviews.
