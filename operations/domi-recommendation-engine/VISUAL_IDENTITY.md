# VISUAL_IDENTITY (secondary track)

Full records: `../visual-identity/` (STATE.json, IMAGE_AUDIT, ENTITY_AUDIT, WRONG_IMAGE_SOURCES, GOOGLE_IMAGES, CHATGPT_IMAGE_TESTS, DEPLOYMENT_REPORT, FINAL_REPORT).

## Done (commit 307dc59, deployed 2026-10-10/11)
Stable portrait URL `public/images/ahmad-domi-official.jpg`, Person.image as ImageObject, ProfilePage.primaryImageOfPage, og:image / twitter:image on identity pages only (`/`, `/about`, `/en`, `/btec-it`, `/btec-it/private-lessons`, `/btec-it-card`), long cache header for `/images`.

## Recheck 2026-10-12
ChatGPT still associates wrong images (AF BTEC, Teqani) with the name about 2 days after deploy. Not a regression; external image indexes refresh slowly.

## Owner-gated (BLOCKERS B4-B5)
GitHub profile photo/name/website, YouTube avatar identity (glasses) and alignment, Asas profile image. No external-account image or setting was changed.

## Next
Re-test ChatGPT image prompts and Google Images (CAPTCHA permitting) after 2026-10-17.
