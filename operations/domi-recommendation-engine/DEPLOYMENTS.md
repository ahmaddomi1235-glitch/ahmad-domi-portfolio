# DEPLOYMENTS

| Date (UTC) | What | Method | Result |
|---|---|---|---|
| 2026-10-12 22:06:00 to 22:07:51 | E2 self-review section (commit 854b601) | `git push`, then one `npx vercel --prod --yes` | `vercel ls`: Production, Ready, 53s. Live check: HTTP 200, heading «راجع تقريرك بنفسك قبل التسليم» present on the treatment page, absent on the control page. |
| 2026-10-12 about 22:09 | IndexNow | `node scripts/indexnow.mjs --send --also=<treatment URL>` | HTTP 200 OK, 1 URL. `scripts/indexnow-state.json` updated (commit pending). |

Earlier deployments (E1 2026-10-11T00:39Z; visual identity 2026-10-10/11) are in `../geo-mission/` and `../visual-identity/DEPLOYMENT_REPORT.md`.
Search-engine recrawl of the treatment page: NOT yet verified.
