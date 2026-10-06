// scripts/check-site.js
//
// Checks the built site for the properties the offline promise depends
// on. Run after `npm run build`; exits non-zero on any failure.
//
//   - every internal link and asset reference resolves to a real file
//     when the site is opened from disk (relative, ending in a file name)
//   - no root-relative "/..." reference survived the link rewrite
//   - every page in one locale has its counterpart in the other
//   - each search index loads and lists every indexed page
//   - total size of the stored copy, reported for low-bandwidth planning

const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const site = require("../_11ty/site-config.js");
const { listFiles } = require("../_11ty/offline-shell.js");

const OUT = path.resolve(__dirname, "..", "_site");
const files = listFiles(OUT);
const problems = [];
let bytes = 0;

for (const rel of files) {
  bytes += fs.statSync(path.join(OUT, rel)).size;
  if (!rel.endsWith(".html")) continue;
  const html = fs.readFileSync(path.join(OUT, rel), "utf8");
  for (const m of html.matchAll(/(?<![\w-])(?:href|src|action)="([^"]*)"/g)) {
    const ref = m[1];
    if (ref === "" || /^(#|https?:|mailto:|tel:|data:)/.test(ref)) continue;
    if (ref.startsWith("/")) {
      problems.push(`${rel}: root-relative reference ${ref}`);
      continue;
    }
    const target = ref.split(/[?#]/)[0];
    if (target === "") continue;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(rel), target));
    if (!fs.existsSync(path.join(OUT, resolved)) || fs.statSync(path.join(OUT, resolved)).isDirectory()) {
      problems.push(`${rel}: broken reference ${ref}`);
    }
  }
  const lang = html.match(/data-locale="([^"]+)"/);
  if (lang && !/<link rel="alternate" hreflang=/.test(html)) {
    problems.push(`${rel}: no other-language counterpart`);
  }
}

for (const locale of site.locales) {
  const file = path.join(OUT, "assets", "search", `${locale}.js`);
  if (!fs.existsSync(file)) {
    problems.push(`missing search index for ${locale}`);
    continue;
  }
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, "utf8"), sandbox);
  const docs = sandbox.window.BALISE_SEARCH[locale];
  for (const d of docs) {
    if (!fs.existsSync(path.join(OUT, d.u))) problems.push(`search ${locale}: ${d.u} does not exist`);
  }
  console.log(`search ${locale}: ${docs.length} pages indexed`);
}

console.log(`stored offline: ${files.length} files, ${(bytes / 1024).toFixed(1)} KiB`);
if (problems.length) {
  for (const p of problems) console.error(`FAIL ${p}`);
  process.exit(1);
}
console.log("site check passed");
