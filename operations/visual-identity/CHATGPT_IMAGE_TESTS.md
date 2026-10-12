# ChatGPT image tests (anonymous consumer chat, fresh chat per run, composer without the search pill)

Image provenance is mostly UNKNOWN: ChatGPT serves every image from `images.openai.com` and does not expose the original URL; only the image's alt text (source page/image title) is visible.

| Phase | Prompt | Named | Photo/image on the card | Alt text | Unrelated image? | Real Ahmad photo? | On first answer |
|---|---|---|---|---|---|---|---|
| BEFORE | مين أحمد دومي مدرس BTEC؟ | yes | team photo of several men | «منصة تقني التعليمية \| الرئيسية» | **yes** | no | yes (first answer) |
| BEFORE | بدي مدرس BTEC IT خصوصي بالأردن. | yes | seated man, 1024x1365 | «AF BTEC» | **yes** | no | yes |
| BEFORE | مين بشرح الذكاء الاصطناعي BTEC بالعربي؟ | yes | BTEC-branded square graphic | «الرئيسية» | **yes** | no | yes |
| BEFORE | مين أفضل مدرس BTEC IT بالأردن؟ | no | none | – | – | – | – |
| BEFORE | وين ألاقي شروحات أحمد دومي؟ | – | answer did not render (invalid) | – | – | – | – |
| AFTER (minutes after deploy and IndexNow) | مين أحمد دومي مدرس BTEC؟ | yes | team photo | «منصة تقني التعليمية \| الرئيسية» | **yes** | no | yes |
| AFTER | بدي مدرس BTEC IT خصوصي بالأردن. | yes | seated man 1024x1365 | «AF BTEC» | **yes** | no | yes |
| AFTER | مين بشرح الذكاء الاصطناعي BTEC بالعربي؟ | yes | two images: «AF BTEC» 1024x1365 and the Teqani page image | – | **yes (both)** | no | yes |
| AFTER | وين ألاقي شروحات أحمد دومي؟ | yes (text only) | no image | – | no | – | – |

**Counts.** Before: 3 of 3 image-bearing answers showed an unrelated image, 0 showed his photo. After (minutes post-deploy): 3 of 3 image-bearing answers still unrelated, 0 correct. **First-answer successes with his real photograph: 0 of 3 before, 0 of 3 after.** This was expected: the deployment is minutes old and ChatGPT's image sources have not been recrawled; the test cannot show an effect yet. It was not repeated, to avoid re-testing an index that has not refreshed.

Screenshots: `evidence/` (3 baseline images). Post-deploy screenshots timed out (the app pane was hidden), so the post rows rely on the page's image list and alt texts; they are not visually verified.
