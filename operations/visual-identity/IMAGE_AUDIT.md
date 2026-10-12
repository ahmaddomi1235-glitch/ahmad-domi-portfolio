# Image audit and the About-page question

- Official portrait served at `/images/ahmad-domi-official.jpg` (HTTP 200, `image/jpeg`, no auth, no noindex, robots allows `/`). Verified live after deploy (see DEPLOYMENT_REPORT.md).
- Dimensions 860x860 (above the 600px guidance for previews); filename is descriptive; alt text Arabic and English as in ENTITY_AUDIT.md.
- Bing Images (read today, query «أحمد دومي BTEC IT»): his site appears first, with the portrait indexed under a **resizing URL** `.../_next/image?url=%2Fimages%2Fprofile%2Fahmad-domi-profile.jpg&w=1920&q=75` on `/btec-it/assessment`. That fragmentation is what the stable-URL change removes going forward; existing index entries will only refresh when recrawled.
- Other owner assets in the same Bing results: YouTube videos, Asas instructor pages.

## Is the About page enough? (dedicated portrait page evaluated)
**Yes. `/about` is sufficient and was improved instead.** A separate «portrait» page would be a thin duplicate of the biography (one image plus the same facts), would compete with `/about` for the same name query, and would add a canonical conflict risk. `/about` is already the ProfilePage for the Person entity and is linked from every author card. No second biography page was created.
