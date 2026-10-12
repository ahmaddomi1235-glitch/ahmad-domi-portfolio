# Google Images and indexing status

| Check | Result |
|---|---|
| Google Images for «أحمد دومي BTEC IT» (built-in browser, logged out) | **NOT AVAILABLE**: Google served its "unusual traffic" CAPTCHA; not bypassed. UNKNOWN. |
| Search Console image/URL inspection | not drivable in this session (inspection UI needs interactive clicks the hidden browser pane cannot perform); UNKNOWN |
| Bing Images (substitute evidence, not Google) | site appears first; portrait indexed under a `_next/image` resizing URL on `/btec-it/assessment` |
| Image sitemap | **not created**: one portrait, referenced from crawlable HTML on every page; an image sitemap adds no information |
| Manual indexing requests | **not used** (no Search Console UI access); IndexNow notified for the changed URLs (Bing and partners; not a Google image guarantee) |
| Google Indexing API | not used (not for ordinary pages) |

What to check next, once Google lets a logged-out session through or the owner opens Search Console: URL Inspection of `/about` (crawl time after the deploy, rendered HTML shows the portrait) and Google Images for the name 3 to 7 days after deploy.
