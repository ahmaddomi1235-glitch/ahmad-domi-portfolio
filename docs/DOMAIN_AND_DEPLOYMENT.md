# Domain and deployment — `ahmaddomiedu.com`

Cloudflare = registrar + DNS. Vercel = hosting. The Vercel project is **`ahmaddomiporfolio`** (`prj_c5l38FQzopCgBO3GkfLTQOU8CcBJ`); `vercel link` was run locally (the `.vercel/` folder is git-ignored).

## Status (verified 2026-10-04)

| Item | State |
| --- | --- |
| Domain at Cloudflare, nameservers `aitana.ns.cloudflare.com`, `dion.ns.cloudflare.com` | ✅ |
| `ahmaddomiedu.com` added to the Vercel project | ✅ (via `vercel domains add`) |
| `www.ahmaddomiedu.com` added to the Vercel project | ✅ |
| DNS records pointing at Vercel | ⏳ **not yet created — needs Cloudflare access** |
| TLS certificate | ⏳ issues automatically once DNS resolves |
| Old `ahmaddomiporfolio.vercel.app` → canonical redirect | ⏳ intentionally *not* enabled yet (it would break the live site until DNS works) |

## Records Vercel asked for (read from the CLI, not guessed)

```
A   ahmaddomiedu.com        76.76.21.21
A   www.ahmaddomiedu.com    76.76.21.21
```

Vercel's alternative (changing nameservers to `ns1/ns2.vercel-dns.com`) would move DNS away from Cloudflare, which is **not** the plan.

### Add them in Cloudflare (30 seconds)

Cloudflare dashboard → `ahmaddomiedu.com` → **DNS → Records → Add record**:

| Type | Name | IPv4 address | Proxy status | TTL |
| --- | --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | **DNS only** (grey cloud) | Auto |
| A | `www` | `76.76.21.21` | **DNS only** (grey cloud) | Auto |

**Why DNS-only:** Vercel terminates TLS and verifies the domain against its own edge. An orange-cloud (proxied) record hides Vercel's IPs from verification and can delay or break certificate issuance, and stacking two CDNs adds latency and cache confusion. Keep it grey. (Enabling the proxy later is possible but should be a deliberate decision with SSL mode "Full (strict)".)

**Or give Claude a scoped token** (then Claude creates the records and verifies): Cloudflare → My Profile → API Tokens → *Create Token* → template **"Edit zone DNS"** → Zone Resources: *Include → Specific zone → ahmaddomiedu.com* → create. Export it in the terminal **for that session only**: `$env:CLOUDFLARE_API_TOKEN="…"`. Never paste it into a file or chat; revoke it afterwards.

## Verify

```bash
nslookup ahmaddomiedu.com            # → 76.76.21.21
nslookup www.ahmaddomiedu.com        # → 76.76.21.21
curl -I https://ahmaddomiedu.com      # → 200, valid certificate
curl -I https://www.ahmaddomiedu.com  # → 308 → https://ahmaddomiedu.com/
vercel domains inspect ahmaddomiedu.com
```

## After DNS verifies — enable the old-URL redirect

Add this entry to `redirects()` in `next.config.ts` (only then; before DNS exists it would redirect the working site to a dead host):

```ts
{
  source: "/:path*",
  has: [{ type: "host", value: "ahmaddomiporfolio.vercel.app" }],
  destination: "https://ahmaddomiedu.com/:path*",
  permanent: true,
},
```

Deployment-specific `*.vercel.app` URLs are left alone (previews keep working; their canonical tags still point at the production domain because `SITE_URL` is a constant).

## Canonical host policy

Apex `https://ahmaddomiedu.com`. `www` → apex (308, `next.config.ts`). Vercel serves HTTPS and redirects HTTP → HTTPS automatically for custom domains. Canonical, Open Graph, sitemap and JSON-LD all use the apex.

## Deploying

```bash
npm run verify        # lint + typecheck + content validation + unit tests + build
npx playwright test   # 36 e2e tests (starts its own server on :3001)
vercel                # preview deployment
vercel --prod         # production
```

The `sources/` folder (private captions, raw files) is git-ignored and therefore never uploaded by the CLI or GitHub.

## Rollback

Vercel dashboard → project → Deployments → pick the previous production deployment → **Promote to Production**. DNS changes are independent of code and can be reverted in Cloudflare.
