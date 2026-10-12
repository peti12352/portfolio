# peter.tallosy.hu

**Production build:** Vercel project `portfolio` (GitHub `peti12352/portfolio`, `main`).  
**Live preview URL:** https://portfolio-vert-six-70.vercel.app/

`peter.tallosy.hu` today still points at **Microsoft IIS** (`185.187.72.145`) with a **March 2025 iframe** to Vercel. Pushing to GitHub updates Vercel; it does **not** change the IIS file or DNS by itself.

## Serve the apex on Vercel (recommended)

1. Open [Vercel → portfolio → Settings → Domains](https://vercel.com/peter-tallosys-projects/portfolio/settings/domains).
2. Add **`peter.tallosy.hu`** (and `www` if you use it).
3. At your DNS host for `tallosy.hu`, replace the **`peter` A record** (`185.187.72.145`) with what Vercel shows (usually **A → `76.76.21.21`** or **CNAME → `cname.vercel-dns.com`**).
4. Wait for DNS + Vercel to verify. Remove the old IIS iframe page once the domain hits Vercel.

CLI (after `npx vercel login` in this repo):

```bash
npx vercel domains add peter.tallosy.hu
```

## Or upload static files to IIS

```bash
bun run build
# Upload everything under public/ to the IIS site root for peter.tallosy.hu (replace the iframe index.html).
```

Multi-page paths use root-relative URLs (`/now/...`, `/unsorted/...`), so the site must be served at the **domain root**, not a subfolder.
