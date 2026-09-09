# Tuamata website — Option C (contemporary editorial)

Floating pill navigation, oversized Bricolage Grotesque display type, rounded full-bleed imagery, and an accent that shifts per practice — cobalt, amber, green. The most current-feeling of the three. Light and dark themes both ship.

Static site: no build step, no dependencies, no server code. Upload the files and it runs.

## Deploying on GitHub Pages

1. **Create the repository.** GitHub → New repository. Name it e.g. `tuamata-site`. Set it **Public** — GitHub Pages needs a public repo on the free plan. Create.
2. **Upload.** On the empty repo page, choose "uploading an existing file". Drag in *the contents of this folder* (the .html files, styles.css, script.js, sitemap.xml, robots.txt, .nojekyll) — not the folder itself. Commit.
3. **Turn Pages on.** Settings → Pages → Source: *Deploy from a branch* → Branch: `main`, folder `/ (root)` → Save. A minute later the site is live at `https://<username>.github.io/tuamata-site/`.
4. **Custom domain.** Settings → Pages → Custom domain → enter your domain → Save. GitHub writes a `CNAME` file into the repo automatically.
5. **DNS at IONOS.** Add these and nothing else:

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `<username>.github.io` |

   Leave MX, SPF, DKIM, DMARC and any Microsoft/email records alone.
6. **HTTPS.** Once DNS resolves (usually 15 min–1 hr), return to Settings → Pages and tick **Enforce HTTPS**.

Any other static host works too (Netlify, Vercel, Cloudflare Pages, cPanel) — just upload the same files.

## Before you launch — 3 things to set

1. **Your domain.** Run `./set-domain.sh https://www.yourdomain.co.uk` in this folder. It replaces the `https://REPLACE-DOMAIN` placeholder in the canonical tags, Open Graph tags, sitemap and robots.txt. On Windows, find-and-replace `https://REPLACE-DOMAIN` across the .html files, sitemap.xml and robots.txt instead.

2. **Contact email.** Top of `script.js`:
   ```js
   var SITE = { contactEmail: "partnerships@yourdomain.co.uk", formEndpoint: "" };
   ```
   Left empty, the enquiry form tells the visitor it isn't configured rather than mailing a wrong address. To receive submissions server-side instead, create a free endpoint (Formspree, Basin) and paste the URL into `formEndpoint`.

3. **Legal review.** `terms.html` and `privacy.html` are templates, marked "Draft — pending legal review" on the page, with `[To be confirmed]` gaps. Have counsel review, then delete the `<span class="draft-chip">…</span>` line from both files.

`our-team.html` contains no individual names, photos or bios — none were invented. Add real profiles when you have them.

## Photography

All images are free-licence Unsplash (no attribution required; the footer credits them anyway):

| Page | Photograph | Photographer |
|---|---|---|
| Home | Earth from space at night | Artemis / NASA imagery |
| Business Consulting | Looking up through a spiral atrium glass dome | Luciana Ribeiro |
| Cybersecurity | Server racks in a data centre | Taylor Vick |
| Environmental Policy | Aerial forest canopy under sunrise fog | Pascal Debrunner |
| Our Team | Modern atrium with geometric ceiling | Willian Justen de Vasconcellos |
| Partnering | Mirrored golden facade at dusk | Emily Wassmansdorf |

They load from Unsplash's CDN. For production it is better practice to download them and host them yourself — faster, and no dependency on someone else's CDN. Open each `https://images.unsplash.com/...` URL, save it into an `images/` folder, and point the `src` at the local file.

Every image has a fallback: if one fails to load, an inline SVG illustration takes its place, so a broken-image icon never appears.

## What's in here

`index.html` · `business-consulting.html` · `cybersecurity.html` · `environmental-policy.html` · `our-team.html` · `partnering.html` (includes the enquiry form) · `terms.html` · `privacy.html` · `404.html` · `styles.css` · `script.js` · `sitemap.xml` · `robots.txt` · `.nojekyll` · `set-domain.sh`

Every page is a real URL with its own title, meta description, canonical tag and Open Graph tags. Responsive to phone width with a collapsing menu.

## Notes

- Fonts load from Google Fonts. To be fully self-hosted, download Bricolage Grotesque and Figtree and swap the `<link>` for local `@font-face` rules.
- `.nojekyll` stops GitHub Pages running the files through Jekyll. Leave it in place.
