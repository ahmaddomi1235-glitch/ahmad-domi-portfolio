# IMPLEMENTATIONS

| # | Date (UTC) | Change | Files | Intent served | Commit |
|---|---|---|---|---|---|
| I1 (earlier phase) | 2026-10-11 | E1 educator attribution section on AI hub | `src/app/(site)/(kb)/btec-it/[unit]/page.tsx` | how-to attribution | see geo-mission |
| I2 (earlier phase) | 2026-10-12 | Official portrait, ImageObject/Person.image, og:image on identity pages | see `operations/visual-identity/DEPLOYMENT_REPORT.md` | visual identity | 307dc59 |
| I3 | 2026-10-12 | E2: self-review section (h2, 9-item ol, disclaimer) before the final callout | `content/concepts/assessment/report-writing-principles.json` (+26 lines, additions only) | Q07, Q08, Q18 pre-submission review | 854b601 |

Gate for I3: `npm run verify` 0 errors, 26 tests pass; Playwright 61 pass, and 1 known flaky mobile counters test failed once, then passed on isolated rerun.

Not implemented (queued, see NEXT_ACTIONS.md): pass-merit-distinction criteria/brief-reading note (no verified public source for criterion codes), cyber hub D-pointer (cyber hub is the E1 control, frozen), hub Person JSON-LD node (after the measurement windows).
