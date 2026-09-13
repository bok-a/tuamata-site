# Tuamata website — Option C

Static site. No build step, no dependencies, no server code. Deployed to GitHub Pages at `bok-a/tuamata-site`.

## To update the live site

Go to `github.com/bok-a/tuamata-site/upload/main`, drag in the files, commit. GitHub overwrites the old versions and the site rebuilds in about a minute.

## What's configured

- **Domain:** `https://tuamata.co.uk` in every canonical tag, Open Graph tag, `sitemap.xml` and `robots.txt`.
- **Contact** (top of `script.js`, shown on `partnering.html`): `contact@tuamata.co.uk` · `+44 7824 559625` · 86–90 Paul Street, London, England, EC2A 4NE. The enquiry form mails the address above.
- **Team** (`our-team.html`): Ben Finlay (Director), Barbara Somlai (Director), Sandra Finlay (Company Secretary), Bokhodir Aminov (Cybersecurity Lead), each linked to LinkedIn.
- **Stats band** on the homepage: 100 projects · 45 clients · 13 joint policies · 1500 penetration tests. Numbers count up on load, and the real figures are in the HTML so they still show with animation disabled.

## Still to do

1. **Connect the domain.** GitHub → Settings → Pages → Custom domain → `tuamata.co.uk` → Save. Then in IONOS DNS:

   | Type | Host | Value |
   |---|---|---|
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | CNAME | www | `bok-a.github.io` |

   **Delete the existing `@` A record and `www` record first** — the domain still points at the old 10Web site, and leaving both sets in place sends visitors to random hosts. **Leave MX, SPF, DKIM and DMARC untouched** — company email runs on IONOS (`pop.ionos.co.uk`). Once DNS resolves, tick **Enforce HTTPS**.

2. **Team photos.** In `script.js`, find the `TEAM` array and set `photo:` to a path, e.g. `photo: "images/ben-finlay.jpg"`. It replaces the coloured initials automatically. Upload the images into an `images/` folder in the repo.

3. **Team bios.** Only Sandra's is written. Add one sentence each for Ben, Barbara and Bokhodir in the `bio:` field of the same array. Cards render fine without them.

4. **Legal review.** `terms.html` and `privacy.html` are templates, marked "Draft — pending legal review" on the page, with `[To be confirmed]` gaps for jurisdiction, cookies and data retention. Once cleared, delete the `<span class="draft-chip">…</span>` line from both.

5. **Submit `sitemap.xml`** in Google Search Console once the domain is live.

## Editing the stats

They're in `script.js` on the homepage render, as `stat(100, "Successful projects")` and so on. Change the number and the label together.

## Photography

Free-licence Unsplash, loaded from their CDN. Photographers: Luciana Ribeiro (Consulting), Taylor Vick (Cybersecurity), Pascal Debrunner (Environmental Policy), Willian Justen de Vasconcellos (Our Team), Emily Wassmansdorf (Partnering). For production, downloading them into `images/` and pointing `src` at local files is faster and removes the third-party dependency. Every image falls back to an inline SVG illustration if it fails to load, so a broken-image icon never appears.

## Files

`index.html` · `business-consulting.html` · `cybersecurity.html` · `environmental-policy.html` · `our-team.html` · `partnering.html` · `terms.html` · `privacy.html` · `404.html` · `styles.css` · `script.js` · `sitemap.xml` · `robots.txt` · `.nojekyll` · `set-domain.sh`

`.nojekyll` stops GitHub Pages running the files through Jekyll — leave it in place.
