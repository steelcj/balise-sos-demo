// _11ty/site-config.js
//
// One source of truth for site-wide settings. Imported by the Eleventy
// config (as the global `site` data) and by the packaging script, so the
// version string, the public URL, and the locale list are never written
// twice.

const fs = require("node:fs");
const path = require("node:path");
const { execSync } = require("node:child_process");

const ROOT = path.resolve(__dirname, "..");

// The repository's own version, read from VERSION and never guessed.
const version = fs.readFileSync(path.join(ROOT, "VERSION"), "utf8").trim();

// Build time. Uses SOURCE_DATE_EPOCH when set (reproducible builds), then
// the last git commit time, then the clock. Every page and the offline
// zip carry this value so a reader can tell how old their copy is.
function resolveBuildDate() {
  if (process.env.SOURCE_DATE_EPOCH) {
    return new Date(Number(process.env.SOURCE_DATE_EPOCH) * 1000);
  }
  try {
    const out = execSync("git log -1 --format=%ct", {
      cwd: ROOT,
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (out) return new Date(Number(out) * 1000);
  } catch (_) {
    // No git history yet, fall through to the clock.
  }
  return new Date();
}

const buildDate = resolveBuildDate();

module.exports = {
  name: "Balise SOS",
  // Fictional municipality used for all demo content.
  municipality: "Saint-Démo-des-Neiges",
  version,
  buildDate: buildDate.toISOString(),
  buildDay: buildDate.toISOString().slice(0, 10),
  // Where the hosted copy lives. A copy opened from disk asks this address
  // for version.js when the reader presses "check for updates". Override
  // with BALISE_PUBLIC_URL for a municipality's own host. Must end in "/".
  publicUrl: process.env.BALISE_PUBLIC_URL || "https://steelcj.github.io/balise-sos-demo/",
  defaultLocale: "fr-ca",
  locales: ["fr-ca", "en-ca"],
  // A copy older than this many days shows a reminder to refresh it.
  staleAfterDays: 30,
  // Offline package name, without extension.
  packageName: `balise-sos-demo-${version}`,
};
