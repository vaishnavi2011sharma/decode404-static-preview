# Decode404 website: go-live guide

A static site. There is no build step and no server code. Upload the files and it runs.

## What is inside
- `index.html`: the whole website (content, styles, 3D scene, form logic)
- `vendor/`: Three.js and GSAP, self-hosted so the site does not depend on a CDN
- `favicon.svg`, `robots.txt`
- `.htaccess`: compression, caching and security headers for Apache / cPanel hosting
- `projects/`: put project screenshots here (see below)
- `tools/capture-screenshots.mjs`: one-command screenshot capture for the 15 projects

## Option A: cPanel / shared hosting (most common)
1. Log in to cPanel, open File Manager, then open `public_html` (or the folder for your domain).
2. Upload `decode404-website.zip` and choose Extract. `index.html` must sit directly inside `public_html`, not in a sub-folder.
3. Turn on the free SSL certificate (AutoSSL or Let's Encrypt) for the domain.
4. Open `.htaccess` and remove the `#` from the three HTTPS redirect lines at the bottom.
5. Point the domain's nameservers (or A record) at the host if it is not already, then visit your domain.

## Option B: Netlify, Vercel or Cloudflare Pages (free, automatic HTTPS)
- Netlify: drag the extracted folder onto app.netlify.com/drop, then Domain settings and Add custom domain.
- Vercel: run `npx vercel` inside the folder (or import it from GitHub), then Settings and Domains.
- Cloudflare Pages: Create project, then Direct upload, then add the custom domain.
Each service shows the exact DNS records to add at your domain registrar.

## Before you announce the site
1. Screenshots: from this folder run
   `npm i -D playwright && npx playwright install chromium && node tools/capture-screenshots.mjs`
   Images appear in `projects/` and the cards use them automatically. Without them the cards show a clean browser-frame card.
2. Project names: only EventSaaga and Dippak Gupta By N3D were confirmed. The other cards show their domain. Edit the `WORK` list in `index.html` to set proper names and one-line descriptions.
3. Contact form: it opens the visitor's email app addressed to decode404official@gmail.com and offers a WhatsApp fallback. For server-side delivery, connect a form service such as Formspree or Resend.
4. Add `sitemap.xml` once the final domain is known.
5. Fonts: the Outfit typeface loads from Google Fonts. Download and self-host it if you want zero third-party requests.
