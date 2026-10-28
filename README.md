# PreparationAI website

Static marketing site for PreparationAI, deployed on Cloudflare Workers (static assets).

## Project structure

```
.
├── public/                 <- everything inside is published to the website
│   ├── index.html          page markup
│   ├── 404.html            shown for unknown URLs
│   ├── css/styles.css      all styling
│   ├── js/main.js          all page content and interactivity (orbit, agents, exams, timeline,
│   │                       voices, FAQ, command palette ⌘K, app console, day/night theme)
│   ├── assets/img/         logos (logo-mark.png is the brain/cap mark), favicons, social preview image
│   ├── favicon.ico  robots.txt  sitemap.xml
│   └── _headers            security and cache headers
├── scripts/check.mjs       pre-push safety check
├── .githooks/pre-push      runs the check automatically before every push
├── wrangler.jsonc          tells Cloudflare which folder to publish  <-- this fixes the build error
├── package.json            scripts + pinned Wrangler
└── .gitignore              keeps junk out of git
```

## Why the first build failed

Cloudflare ran `npx wrangler deploy`, but the repository had no `wrangler.jsonc` and no
folder with an `index.html` to publish, so Wrangler printed
"Could not detect a directory containing static files". `wrangler.jsonc` now points at `public/`.

## Cloudflare settings (Workers & Pages > preparationai-si > Settings > Build)

| Setting          | Value                  |
|------------------|------------------------|
| Build command    | leave empty            |
| Deploy command   | `npx wrangler deploy`  |
| Root directory   | `/`                    |

The project name must stay `preparationai-si` (it must match `"name"` in `wrangler.jsonc`).

## Push to GitHub

First time only:

```bash
git config core.hooksPath .githooks     # runs the check before every push
chmod +x .githooks/pre-push
```

Every time:

```bash
npm install          # first time only
npm run check        # must say "All checks passed"
git add -A
git commit -m "Update website"
git push origin main
```

Cloudflare builds and deploys automatically after each push to `main`.

## Use your domain

Workers & Pages > preparationai-si > Settings > Domains & Routes > Add > Custom domain.
The domain's DNS must be on Cloudflare. If your domain is not `preparationai.si`, update the
address in `public/index.html` (canonical and og tags), `public/robots.txt` and `public/sitemap.xml`.

## What `npm run check` verifies

- `wrangler.jsonc` exists and its assets folder contains `index.html`, CSS, JS, 404 page and logos
- no unwanted files would be pushed (.DS_Store, .env, logs, backups, zips, templates, node_modules)
- every link and image used by the HTML and CSS points to a file that exists
- no file is over the 25 MiB Cloudflare limit; warns about large or unused files

## Run locally

```bash
npm install
npm run dev          # opens http://localhost:8787
```
