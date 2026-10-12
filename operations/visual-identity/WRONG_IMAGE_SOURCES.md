# Wrong-image sources — forensic record (read-only evidence, 2026-10-11/12)

Method: anonymous ChatGPT chats (no login), fresh chat per run, composer without the web-search pill, prompts from the fixed cohort. For every answer the page's `<img>` elements were listed (host, alt text, natural size) and a screenshot was kept in `evidence/`. ChatGPT proxies every image through `images.openai.com/static-rsc-4/...`, so the ORIGINAL image URL is not exposed; what is exposed is the image's **alt text, which carries the title of the source page or image**. Original URL: UNKNOWN in all cases.

| Run | Prompt | Named Ahmad | Photo / image shown with his card | Alt text exposed | Real photo of Ahmad? |
|---|---|---|---|---|---|
| P2 | مين أحمد دومي مدرس BTEC؟ | yes (entity card «أحمد رائد أحمد دومي») | group photograph of several men in suits with an Arabic banner «كادر منصة تقني» | «منصة تقني التعليمية \| الرئيسية» (the Teqani platform home page) | **no** |
| P3 | بدي مدرس BTEC IT خصوصي بالأردن. | yes (card «Ahmad Domi – BTEC IT») | portrait of a man seated at a desk (1024x1365) | «AF BTEC» | **no** (belongs to the AF BTEC source) |
| P4 | مين بشرح الذكاء الاصطناعي BTEC بالعربي؟ | yes (list item 1) | square BTEC-branded graphic (1024x1024), not a portrait | «الرئيسية» (generic page title) | **no** |
| P1 | مين أفضل مدرس BTEC IT بالأردن؟ | no | none | – | – |
| P5 | وين ألاقي شروحات أحمد دومي؟ | – | answer did not render (invalid, repeat later) | – | – |

Screenshots: `evidence/chatgpt_entity_card_wrong_image_baseline_run1.jpg` (P2), `evidence/chatgpt_baseline_P3_card_AF_BTEC_image.jpg`, `evidence/chatgpt_baseline_P4_card_btec_graphic.jpg`.

## What is established

- In **3 of 3** baseline answers that named him and showed a card image, the image was **not his photograph**. In two of them the exposed alt text names another source (Teqani platform page; «AF BTEC»).
- The wrong image is attached to the answer's entity card, not to his name inside the text: the text correctly describes him.
- So the owner's observation is reproducible without an account.

## What is NOT established

- **Why** ChatGPT picks these images. The alt text proves which kind of source the image came from (an unrelated platform page; an image labelled «AF BTEC»), not the selection rule. Similarity between «أحمد دومي» and «أحمد الفقيه» is not proof of the cause and is not claimed.
- Whether the cited page of his that ChatGPT used (`/btec-it/private-lessons` and others) offered an image candidate to the card at all.

## Site-side facts that could plausibly matter (observed, not proven causes)

1. **None of his pages declared `og:image` or `twitter:image`.** Checked on the live HTML of `/`, `/about`, `/en`, `/btec-it`, `/btec-it/private-lessons` and educational pages (no `og:image`, no `twitter:image`). A page without a preview image gives a consumer no page-declared image to attach.
2. The portrait appeared only as `<img>` through Next.js resizing URLs (`/_next/image?url=%2Fimages%2Fprofile%2Fahmad-domi-profile.jpg&w=...`), so the same photograph exists under many URL variants. Bing Images, for example, indexes it as `.../_next/image?url=%2Fimages%2Fprofile%2Fahmad-domi-profile.jpg&w=1920&q=75` on `/btec-it/assessment`.
3. The portrait is a full-length studio shot (1200x1800); the face is small in thumbnails and in circular crops.
4. His page `<img>` alt was «صورة أحمد رائد أحمد دومي» without the role, and the Person `image` was the full-length file.
5. The YouTube and Instagram avatars are different crops with Asas branding (see ENTITY_AUDIT.md).

No competitor asset was modified and no competitor is mentioned in his public content.
