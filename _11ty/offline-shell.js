// _11ty/offline-shell.js
//
// Runs after Eleventy has written the site. Writes the three files that
// make the hosted copy installable and self-updating, see ADR-002:
//
//   version.js            the current version, readable by any copy, even
//                         one opened from disk, through a <script> tag
//   manifest.webmanifest  lets a phone or computer "install" the site
//   sw.js                 the service worker: stores every file of the
//                         site on the device and refreshes them whenever
//                         the network is back
//
// The service worker's cache name includes a hash of every file it
// stores, so any content change produces a new worker, and the browser
// replaces the stored copy on its next visit with a working network.

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

// Kept out of the stored copy: the offline zip (large, and pointless to
// store inside a site that is already stored), the worker itself, and
// version.js, which must always come from the network.
const EXCLUDE = [/^download\//, /^sw\.js$/, /^version\.js$/];

function listFiles(dir, base = dir) {
  const out = [];
  for (const name of fs.readdirSync(dir).sort()) {
    const full = path.join(dir, name);
    const rel = path.relative(base, full).split(path.sep).join("/");
    if (fs.statSync(full).isDirectory()) out.push(...listFiles(full, base));
    else if (!EXCLUDE.some((re) => re.test(rel))) out.push(rel);
  }
  return out;
}

function writeVersion(outDir, site) {
  const body =
    "/* Generated. Read by copies of Balise that check for updates. */\n" +
    `window.BALISE_LATEST = ${JSON.stringify({ version: site.version, built: site.buildDate })};\n`;
  fs.writeFileSync(path.join(outDir, "version.js"), body);
}

function writeManifest(outDir, site) {
  const manifest = {
    name: `${site.name} · ${site.municipality}`,
    short_name: site.name,
    description: "Procédures d'urgence hors ligne / Offline emergency procedures (démo / demo)",
    lang: "fr-CA",
    start_url: "./index.html",
    scope: "./",
    display: "standalone",
    background_color: "#fffdf7",
    theme_color: "#b3261e",
    icons: [
      { src: "assets/img/balise-icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "assets/img/balise-icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "assets/img/balise-icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
  fs.writeFileSync(path.join(outDir, "manifest.webmanifest"), JSON.stringify(manifest, null, 2) + "\n");
}

function writeServiceWorker(outDir, site) {
  const files = listFiles(outDir);
  const hash = crypto.createHash("sha256");
  for (const f of files) {
    hash.update(f);
    hash.update(fs.readFileSync(path.join(outDir, f)));
  }
  const cacheName = `balise-${site.version}-${hash.digest("hex").slice(0, 12)}`;
  const template = fs.readFileSync(path.join(__dirname, "sw.template.js"), "utf8");
  const body = template
    .replace("__CACHE_NAME__", JSON.stringify(cacheName))
    .replace("__FILES__", JSON.stringify(files, null, 2));
  fs.writeFileSync(path.join(outDir, "sw.js"), body);
  return { cacheName, files: files.length };
}

function write(outDir, site) {
  writeVersion(outDir, site);
  writeManifest(outDir, site);
  return writeServiceWorker(outDir, site);
}

module.exports = { write, listFiles };
