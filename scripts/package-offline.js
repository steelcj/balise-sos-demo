// scripts/package-offline.js
//
// Packs the built site into a zip a person can download once, unzip, and
// open from disk with no network: _site/download/balise-sos-demo-<version>.zip
// plus a .sha256 file to check it. See ADR-002.
//
// The zip holds one top-level folder named after the version, so unzipping
// two versions side by side never mixes them, and two plain-text notes,
// in French and English, saying which file to open.
//
// File times inside the zip are set to the build date, not the clock, so
// the same commit always yields the same bytes.

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const { zipSync } = require("fflate");
const site = require("../_11ty/site-config.js");
const { listFiles } = require("../_11ty/offline-shell.js");

const OUT = path.resolve(__dirname, "..", "_site");
const folder = site.packageName;
const mtime = new Date(site.buildDate);

const notes = {
  "LISEZ-MOI.txt": [
    `Balise SOS, ${site.municipality} (DÉMONSTRATION, données fictives)`,
    `Version ${site.version}, produite le ${site.buildDay}.`,
    "",
    "Pour ouvrir : double-cliquez sur le fichier index.html de ce dossier.",
    "Aucune connexion Internet n'est nécessaire, la recherche comprise.",
    "",
    "Pour mettre à jour : quand le réseau fonctionne, ouvrez la page",
    "« Cette copie » et appuyez sur « Vérifier les mises à jour ».",
    "",
  ].join("\r\n"),
  "READ-ME.txt": [
    `Balise SOS, ${site.municipality} (DEMONSTRATION, fictional data)`,
    `Version ${site.version}, produced on ${site.buildDay}.`,
    "",
    "To open: double-click the index.html file in this folder.",
    "No Internet connection is needed, search included.",
    "",
    "To update: when the network works, open the \"This copy\" page",
    "and press \"Check for updates\".",
    "",
  ].join("\r\n"),
};

const tree = {};
for (const rel of listFiles(OUT)) {
  tree[`${folder}/${rel}`] = [fs.readFileSync(path.join(OUT, rel)), { mtime }];
}
for (const [name, text] of Object.entries(notes)) {
  tree[`${folder}/${name}`] = [Buffer.from(text, "utf8"), { mtime }];
}

const zip = Buffer.from(zipSync(tree, { level: 9 }));
const dir = path.join(OUT, "download");
fs.mkdirSync(dir, { recursive: true });
const file = path.join(dir, `${folder}.zip`);
fs.writeFileSync(file, zip);
const sum = crypto.createHash("sha256").update(zip).digest("hex");
fs.writeFileSync(`${file}.sha256`, `${sum}  ${folder}.zip\n`);
console.log(`[balise] offline package ${path.relative(OUT, file)}: ${Object.keys(tree).length} files, ${(zip.length / 1024).toFixed(1)} KiB, sha256 ${sum.slice(0, 16)}…`);
