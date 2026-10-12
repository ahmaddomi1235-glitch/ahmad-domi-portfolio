# OPERATION DOMI FACE — final report (checkpoint)

Written 2026-10-12. No agents ran in the background; the roles A to F were performed by the main session and documented. Nothing continues after this session.

1. **Official portrait:** the owner's established studio portrait (`ahmad-domi-profile.jpg`), served for identity signals as an unaltered square crop of the same photograph. Identity rests on it being the site's own established portrait; no other photo was substituted.
2. **Where published:** `https://ahmaddomiedu.com/images/ahmad-domi-official.jpg` (860x860 JPEG; original full-length file kept at its old URL).
3. **Cause of the wrong-image association:** **not established.** Evidence: in 3 of 3 answers that showed a card image, the image was another source's (alt texts «AF BTEC» and the Teqani platform page). Original URLs are hidden by ChatGPT's image proxy. Observed site-side facts that could matter: no page had `og:image`/`twitter:image`; the portrait was exposed only through `/_next/image` resizing URLs; the portrait is a full-length shot with a small face.
4. **Metadata corrected:** `og:image`/`twitter:image` on six identity/service pages; `Person.image` as an `ImageObject`; `ProfilePage.primaryImageOfPage`; `TechArticle.image`; alt text and a visible caption on About/EN; stable URL on home, About and every author card; `/images/*` cache header.
5. **About page sufficient?** Yes; improved rather than adding a duplicate page (see IMAGE_AUDIT.md).
6. **Did Google discover the correct image?** UNKNOWN: Google Images and Search Console were not reachable (CAPTCHA / UI). Bing Images indexes his portrait under a resizing URL (before the change).
7. **Does ChatGPT show the correct photo on the first answer?** **No, not yet.** 0 of 3 before, 0 of 3 minutes after deployment (not informative yet).
8. **Fresh tests:** 5 baseline runs (3 with a card image, all wrong; 1 without a name; 1 invalid) and 4 post-deploy runs (3 with images, all unrelated; 1 text only). 0 successes.
9. **Outside our control:** which image ChatGPT's entity card selects and when its image sources recrawl; Google/Bing image index refresh; owner-controlled profile pictures (YouTube, Instagram, LinkedIn) which need owner approval.
10. **Check next (3 to 7 days):** repeat the 5 prompts (same mode); URL Inspection of `/about` in Search Console and Google Images for the name; Bing Webmaster URL Inspection and Images; if still wrong, owner actions: align the YouTube avatar (a man with glasses, Asas frame) and the Instagram avatar with the official portrait, add the LinkedIn photo, and keep one consistent photo across profiles.

Open items for the owner: confirm the YouTube avatar shows him; approve profile-picture alignment; decide whether to keep Asas-branded avatars.
