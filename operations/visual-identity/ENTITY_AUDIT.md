# Entity and identity audit (2026-10-11/12)

## Identity used
أحمد دومي — Ahmad Domi, مدرّس BTEC IT في الأردن (Irbid). Official domain https://ahmaddomiedu.com. The **established official portrait** is the owner-published studio photograph `public/images/profile/ahmad-domi-profile.jpg` (1200x1800 JPEG), already used on the site's home, About and author cards and as `Person.image`. No other portrait was substituted, no AI image was created. I cannot verify identity from a photograph; ownership rests on this being the site's own established portrait (owner-controlled repository and domain).

## Before the change (live, 2026-10-11)
| Signal | State |
|---|---|
| `og:image`, `twitter:image` on any page | **absent everywhere** (the `/opengraph-image` route exists but is not referenced; it is a generic "AD" graphic) |
| `Person.image` | the full-length JPEG, plain URL string; same on pages that embed the Person node |
| `ProfilePage.primaryImageOfPage` | absent |
| About hero `<img>` | via `/_next/image?url=...` (resizing URL), alt «صورة أحمد رائد أحمد دومي», no visible caption |
| Author card (every page) | `/_next/image` variant, alt `أحمد دومي — Ahmad Domi` |
| `sameAs` | YouTube handle and channel-ID URL, Instagram, LinkedIn, GitHub (unchanged, verified earlier) |
| One Person identity | yes (`/#person`); full node only on home, About/EN, concept pages, lessons page; hubs and `/btec-it/assessment` carry only a reference |

## Changes implemented
- New canonical portrait `/images/ahmad-domi-official.jpg` (860x860 JPEG, 93 KB): a plain square crop of the same photograph, no retouching, face and shoulders centered. The original full-length file stays at its old URL (not duplicated elsewhere).
- `Person.image` is now an `ImageObject` (`@id` `/#portrait`, url, contentUrl, 860x860, caption); `ProfilePage.primaryImageOfPage` references it; `TechArticle.image` uses the same URL.
- `og:image`/`twitter:image` (+ alt) with the portrait on identity and service pages only: `/`, `/about`, `/en`, `/btec-it`, `/btec-it/private-lessons`, `/btec-it-card`. Educational pages keep no preview image (no article thumbnails changed).
- About/EN hero: stable URL in the HTML `<img>` (no resizing URL), alt «أحمد دومي (Ahmad Domi)، مدرّس BTEC IT في الأردن» / English equivalent, and a visible `<figcaption>` naming him and his role. Home hero and every author card use the same stable URL, so the whole site now exposes one portrait URL.
- `/images/*` caching: `public, max-age=86400, stale-while-revalidate=604800`.
- Not done on purpose: no image sitemap (images are in the HTML of crawled pages, one image only), no dedicated portrait page (see IMAGE_AUDIT.md), no change to hubs' Person-node gap (separate item, would affect the live experiment pages).

## Owner-controlled external profiles (public view only, no changes)
| Profile | Avatar | Observation |
|---|---|---|
| YouTube @AhmadDomiedu | 900x900, Asas-branded round frame, man **with glasses** | the face differs in glasses from the site's official portrait; I cannot confirm it is the same photo; owner to confirm |
| Instagram @ahmaddomiedu | Asas-branded round frame, dark suit, beard, no glasses | consistent with the official portrait's appearance (low resolution 100x100 seen) |
| LinkedIn /in/ahmad-domi | not retrievable without login | UNKNOWN |
| Asas platform | his instructor photos exist on asas4edu.net (Bing Images shows them) | not audited further |

No external image was changed; owner approval is required.
