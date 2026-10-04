# Google Search Console and Bing Webmaster Tools

Both need the domain to resolve first (see `docs/DOMAIN_AND_DEPLOYMENT.md`). They also require the **site owner's** Google/Microsoft login, so these steps are manual; nothing can be submitted from the repository. None of this guarantees ranking, retrieval or citation by any search or AI system — it only makes sure the site is discovered, crawled and diagnosable.

## Google Search Console

1. Go to https://search.google.com/search-console → **Add property** → **Domain** → `ahmaddomiedu.com`.
2. Google shows a TXT record like `google-site-verification=…`. In Cloudflare DNS add: Type `TXT`, Name `@`, Content = that value. (A *Domain* property covers apex, `www`, http and https at once.)
3. Click **Verify**.
4. **Sitemaps** → enter `sitemap.xml` → Submit. Expected: ~53 discovered URLs.
5. **URL inspection** → inspect `https://ahmaddomiedu.com/` → *Request indexing*. Repeat for `/about`, `/btec-it`, and 3–4 concept pages.
6. Later (2–4 weeks): **Pages** report → check "Indexed" vs "Why pages aren't indexed"; **Enhancements** → Videos / Breadcrumbs for structured-data warnings.
7. The old site lived on `ahmaddomiporfolio.vercel.app`. Google's "Change of address" tool is not available for `vercel.app` subdomains, so rely on the permanent (308) redirect to the new domain (enabled after DNS verifies, see the deployment doc).

## Bing Webmaster Tools

1. https://www.bing.com/webmasters → sign in → **Import from Google Search Console** (fastest; reuses the verification). Or **Add a site** and verify with a DNS CNAME/TXT in Cloudflare.
2. Submit `https://ahmaddomiedu.com/sitemap.xml`.
3. Optional: IndexNow (Bing, Yandex and others) lets a site notify engines of changed URLs. It needs a public key file; not added — decide later if update frequency justifies it.

## What to check after a few days

```bash
site:ahmaddomiedu.com            # in Google/Bing
```

- The home page title should read `أحمد دومي | Ahmad Domi — مدرّس BTEC IT في الأردن`.
- A concept page snippet should show the short answer area.
- Rich results test (https://search.google.com/test/rich-results) for `/btec-it/cyber-security/threat-vulnerability-risk` — expect valid **Breadcrumbs**, **Video** (with key moments from the chapter clips). TechArticle and Person are informational and not rich-result types.

## Notes on crawl directives

`robots.txt` allows every crawler and lists the sitemap; there are no per-bot rules. If you later decide to restrict a specific AI crawler, add an explicit `User-agent` block in `src/app/robots.ts` and document the reason here. Blocking or allowing a bot does not by itself guarantee training, retrieval or citation.
