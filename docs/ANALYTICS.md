# Analytics (prepared, not enabled)

**Status:** the repository contained **no analytics** before this work, and none was added. No cookies, no third-party trackers, no consent banner needed. What *was* added is the markup that lets you measure later without touching page code.

## Events already marked in the HTML

Links carry `data-track` and `data-track-id` attributes (no JavaScript, no data leaves the browser):

| Goal | Markup | Where |
| --- | --- | --- |
| Video click | `data-track="video_click" data-track-id=<youtubeId>` | `/videos`, unit pages, concept pages |
| Card click | `data-track="card_click" data-track-id=<place>` | home FAQ, unit pages, concept pages, card page |
| Resource (PDF) download | `data-track="resource_download" data-track-id=<materialId>` | `/resources`, unit pages |
| Internal search result click | `data-track="search_result_click" data-track-id=<nodeId>` | `/search` |
| Outbound educational links | the `rel="me"` account links and `youtube.com/watch` links | footer, home, videos |
| Landing page / topic | page path (concept pages encode the topic in the URL) | any analytics tool |
| Calculator use | the `/btec-calculator` page view; per-interaction events would need a small client hook (see below) | calculator |

## Recommended options (privacy-conscious)

1. **Vercel Web Analytics** — cookieless, no personal data, one line: `npm i @vercel/analytics` and render `<Analytics />` in `src/app/layout.tsx`; enable it in the project settings. Page views and referrers; custom events via `track()` (Pro plan).
2. **Cloudflare Web Analytics** — free, cookieless; enable in Cloudflare → Analytics & Logs → Web Analytics (it injects a beacon, or add the snippet). Works well because the domain is already on Cloudflare.
3. **Search Console** (free, no tracking code) covers queries, landing pages and CTR from Google — see `docs/SEARCH_ENGINE_SETUP.md`.

Pick **one** page-view tool, not several.

## Wiring click events later (optional)

A 20-line client component that listens for clicks on `[data-track]` and calls `va.track(el.dataset.track, { id: el.dataset.trackId })` (or `fetch('/api/…')`) is all that is needed; it can be added to `src/app/layout.tsx` without editing any page.

## Rules

- Never send what a user types into the search box or calculator to any service (search runs locally; calculator is client-only).
- No fingerprinting, no advertising pixels. If a tool needs cookies, add a consent notice first.
