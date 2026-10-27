#!/usr/bin/env node
// Pre-push check: makes sure the project can deploy and nothing unwanted is committed.
// Zero dependencies. Run with:  npm run check
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname, resolve, relative, sep } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [];
const warnings = [];
const err = (m) => errors.push(m);
const warn = (m) => warnings.push(m);
const rel = (p) => relative(root, p).split(sep).join('/');

// 1. Which files would be pushed? (git-aware when possible)
function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (['.git', 'node_modules', '.wrangler'].includes(name)) continue;
    const p = join(dir, name);
    statSync(p).isDirectory() ? walk(p, out) : out.push(rel(p));
  }
  return out;
}
let files;
let gitAware = false;
try {
  files = execFileSync('git', ['ls-files', '--cached', '--others', '--exclude-standard'], { cwd: root, encoding: 'utf8' })
    .split('\n').filter(Boolean);
  gitAware = true;
} catch {
  files = walk(root);
}
files = files.filter((f) => existsSync(join(root, f)));

// 2. Deployment config must point at a real folder that has index.html
const cfgPath = join(root, 'wrangler.jsonc');
let assetsDir = 'public';
if (!existsSync(cfgPath)) {
  err('wrangler.jsonc is missing (Cloudflare needs it to find the static files).');
} else {
  const cfg = readFileSync(cfgPath, 'utf8');
  const m = cfg.match(/"directory"\s*:\s*"([^"]+)"/);
  if (!m) err('wrangler.jsonc has no "assets.directory".');
  else assetsDir = m[1].replace(/^\.\//, '').replace(/\/$/, '');
}
const pub = join(root, assetsDir);
if (!existsSync(pub)) err(`Assets folder "${assetsDir}/" does not exist.`);
for (const f of ['index.html', 'css/styles.css', 'js/main.js', '404.html', 'assets/img/logo-icon.webp', 'assets/img/logo-full.webp']) {
  if (!existsSync(join(pub, f))) err(`Missing required file: ${assetsDir}/${f}`);
}

// 3. Unwanted files
const unwanted = [
  /(^|\/)\.DS_Store$/, /(^|\/)Thumbs\.db$/i, /(^|\/)node_modules\//, /(^|\/)\.wrangler\//,
  /(^|\/)\.env(\..*)?$/, /(^|\/)\.dev\.vars$/, /\.(log|bak|tmp|orig|swp|b64|zip|rar|7z)$/i, /~$/,
  /(^|\/)(tpl|template)[^/]*\.html$/i, /(backup|_old|-old|copy of|\(\d+\))/i,
];
for (const f of files) if (unwanted.some((re) => re.test(f))) err(`Unwanted file would be pushed: ${f}`);

// 4. Nothing outside the allowed top-level layout
const allowedTop = new Set(['public', 'scripts', '.githooks', 'wrangler.jsonc', 'package.json', 'package-lock.json', '.gitignore', 'README.md', '.gitattributes', 'LICENSE']);
for (const f of files) {
  const top = f.split('/')[0];
  if (!allowedTop.has(top)) warn(`Unexpected file at project level (not used by the site): ${f}`);
}

// 5. File sizes (Workers static assets: 25 MiB per file)
let total = 0;
for (const f of files.filter((x) => x.startsWith(assetsDir + '/'))) {
  const s = statSync(join(root, f)).size;
  total += s;
  if (s > 25 * 1024 * 1024) err(`${f} is larger than the 25 MiB limit.`);
  else if (s > 1.5 * 1024 * 1024) warn(`${f} is ${(s / 1048576).toFixed(1)} MB — consider compressing it.`);
}

// 6. Every local link in HTML and CSS must exist; flag unused assets
const referenced = new Set();
const isLocal = (u) => u && !/^(https?:|mailto:|tel:|data:|#|\/\/|javascript:)/i.test(u);
function checkRefs(fileAbs, text, patterns) {
  for (const re of patterns) {
    for (const m of text.matchAll(re)) {
      let u = m[1].trim().split('#')[0].split('?')[0];
      if (!isLocal(m[1].trim()) || !u) continue;
      const target = u.startsWith('/') ? join(pub, u) : resolve(dirname(fileAbs), u);
      referenced.add(rel(target));
      if (!existsSync(target)) err(`${rel(fileAbs)} links to a missing file: ${m[1].trim()}`);
    }
  }
}
for (const f of files.filter((x) => x.startsWith(assetsDir + '/'))) {
  const abs = join(root, f);
  if (f.endsWith('.html')) checkRefs(abs, readFileSync(abs, 'utf8'), [/\b(?:href|src)=["']?([^"'\s>]+)/g]);
  if (f.endsWith('.css')) checkRefs(abs, readFileSync(abs, 'utf8'), [/url\(\s*["']?([^"')]+)["']?\s*\)/g]);
}
const implicit = new Set(['index.html', '404.html', 'robots.txt', 'sitemap.xml', '_headers', '_redirects', 'favicon.ico']);
for (const f of files.filter((x) => x.startsWith(assetsDir + '/'))) {
  const inner = f.slice(assetsDir.length + 1);
  if (implicit.has(inner)) continue;
  if (!referenced.has(f) && !readFileSync(join(pub, 'index.html'), 'utf8').includes(inner) && !readFileSync(join(pub, '404.html'), 'utf8').includes(inner)) {
    // og-image is referenced by an absolute URL; accept anything mentioned in index.html
    warn(`Possibly unused file: ${f}`);
  }
}

// 7. Report
console.log(`Checked ${files.length} files${gitAware ? ' (what git would push)' : ''}; site folder: ${assetsDir}/ (${(total / 1024).toFixed(0)} KB)`);
for (const w of warnings) console.log('  warning:', w);
for (const e of errors) console.log('  ERROR:  ', e);
if (errors.length) { console.log(`\n${errors.length} problem(s) found. Fix them, then run again.`); process.exit(1); }
console.log('\nAll checks passed. Safe to push.');
