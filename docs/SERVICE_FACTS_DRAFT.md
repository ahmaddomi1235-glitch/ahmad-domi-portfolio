# Commercial facts and the no-public-pricing decision (2026-10-09)

**Owner decision: prices are not published anywhere on the website.** The card and the private lessons are promoted; their prices are given only on direct inquiry. `src/config/services.ts` contains no amount, so no page, schema node, `llms.txt` line or search-index entry can render one. The price-leak tests in `tests/smoke.spec.ts` ("phase 6B commercial pages (no public prices)") fail the build if a service price or price schema reappears.

## 1. Facts published (owner-confirmed)

| Service | What is stated |
| --- | --- |
| BTEC IT Card (بطاقة أحمد دومي التعليمية — BTEC IT) | Paid educational card: illustrated Arabic explanations, support material, assignment guidance; first video free; ordered through the card platform's support team; **student report review is included with the card** (educational feedback, no grade guarantee) |
| Private BTEC IT lessons | Offered online and in person; Arabic with English terms; units listed from the published knowledge base; no price, location, schedule or minimum length stated |
| Call to action | "للاستفسار عن الأسعار وتفاصيل الاشتراك أو حجز الدروس، تواصل مع أحمد دومي." plus email/phone already shown on the site and the card platform link |

## 2. Not stated anywhere (not confirmed; pages say so instead of guessing)

Prices; where in-person lessons take place; schedules; minimum lesson length; card duration; number of report reviews; delivery method; payment methods; refund terms; discounts or packages; a dedicated WhatsApp number (the card platform describes WhatsApp support; the site's phone number is published as a phone number only).

## 3. Rules that stay in force

- No new services, packages, discounts, guarantees or limited offers without owner confirmation.
- No Offer / price / priceCurrency / availability / review / rating / award / credential schema; no Pearson affiliation claims.
- Paid card content, assignment answers and private source files are never published.
- If the owner later decides to publish a price, add it to `services.ts` deliberately and update the price-leak tests in the same change.
