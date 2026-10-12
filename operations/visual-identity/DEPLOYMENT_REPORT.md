# Deployment report

- Commit `307dc59`, pushed to `master`; one `vercel --prod --yes` run, finished about 2026-10-12T00:02Z.
- Release gate: lint clean, typecheck clean, content validation and unit tests passed, build passed (`npm run verify` exit 0). Playwright: 60 passed of 62 on the full run; the 2 failures were timeouts that pass when run alone (statistics counters on a mobile viewport: passed; the price-scan test that fetches all 229 sitemap URLs: passed at a 240 s limit, about 32 s, so its limit was raised to 120 s in the test). No failure was an assertion about content.
- New Playwright tests: portrait file served as JPEG; `og:image`, `twitter:image` and `Person.image` identical on identity pages; About shows the portrait with a caption; educational pages have no preview image. All passed.
- Live checks (after deploy): `/images/ahmad-domi-official.jpg` HTTP 200, `image/jpeg`, 93,268 bytes, cache `public, max-age=86400, stale-while-revalidate=604800`; `og:image`/`twitter:image` present on `/`, `/about`, `/en`, `/btec-it`, `/btec-it/private-lessons`, `/btec-it-card` and absent on `/btec-it/assessment`; About HTML contains the stable-URL `<img>` and the figcaption; JSON-LD valid: one Person, `image` ImageObject, `ProfilePage.primaryImageOfPage`.
- IndexNow: HTTP 200 for 7 URLs (the six pages and the portrait URL). Search Console indexing was not used (UI not drivable here). No Google Indexing API.
- Not touched: DNS, prices, payments, calculator, paid content, Git history, repository visibility, competitor assets, external accounts.
- Pricing: no price text added; the existing price-scan test passes.
