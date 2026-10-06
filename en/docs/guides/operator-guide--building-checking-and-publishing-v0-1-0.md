---
dc:title: "Operator Guide: Building, Checking and Publishing"
dcterms:version: "0.1.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Commands and steps to build Balise, check its offline guarantees, publish it, and cut a version."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "operator-guide--building-checking-and-publishing"
dcterms:rightsHolder: "Christopher Steel"
dc:rights: >
  Copyright 2026 Christopher Steel.
  SPDX-License-Identifier: GPL-3.0-or-later
sat:uuid: ""
sat:version_at_creation: ""
sat:migration_status: pre-sat
sat:changelog:
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# Operator Guide: Building, Checking and Publishing

Version: 0.1.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This guide is for the person who builds, checks and publishes Balise. It covers the tools needed, the commands, what each step produces, how to publish on GitHub Pages or another host, and how to cut a version so downloaded copies can tell they are out of date.

## What you need

Node.js 18 or later and npm. Git. Python 3 for the conformance check and the release scripts. Optionally, Pillow to redraw the app icons, and Playwright with Chromium for the browser test.

## Build

```bash
npm ci
npm run build
```

`npm run build` empties `_site/`, runs Eleventy, writes the search indexes, `sw.js`, `manifest.webmanifest` and `version.js`, then packs the offline zip. The console reports what it wrote:

```text
[balise] search index fr-ca: 10 pages, 15... bytes
[balise] service worker balise-0.1.0-<hash>: 36 files stored offline
[balise] offline package download/balise-sos-demo-0.1.0.zip: 38 files, 13x KiB, sha256 ...
```

Warnings starting `[i18n]` mean a page is missing its other-language counterpart; fix them before publishing.

For local editing, `npm start` serves the site with live reload. The service worker registers on `localhost`, so clear site data in the browser if a stale page sticks while editing.

## Check

```bash
npm run check
```

This runs `scripts/check-site.js`, which fails on any root link left in the output, any link to a missing file, any page without a counterpart, or a search index entry that points nowhere, and reports the size of the stored copy. It then runs `check-conformance.py` over `en/docs/`.

The browser test exercises both offline modes in Chromium, including cutting the network after the service worker has installed:

```bash
python3 tests/browser-smoke.py
```

## Publish on GitHub Pages

`.github/workflows/pages.yml` builds and deploys on every push to `main`. In the repository settings, under Pages, set the source to GitHub Actions. The site then lives at `https://steelcj.github.io/balise-sos-demo/`, which is the `publicUrl` in `_11ty/site-config.js` that downloaded copies ask for updates.

## Publish elsewhere

Copy `_site/` to any web server that serves static files over HTTPS. Set `BALISE_PUBLIC_URL` to that address, ending in `/`, before building, so downloaded copies check the right place:

```bash
BALISE_PUBLIC_URL=https://urgence.example.qc.ca/ npm run build
```

No server configuration is needed. The service worker requires HTTPS, except on `localhost`.

## Distribute the file copy

The zip is at `_site/download/` and linked from the "This copy" page. Put it on each municipal computer and on a USB key in each site's emergency binder. A synchronizing tool between the three sites can carry the unzipped folder instead; it is exactly the content of the zip.

## Cut a version

The version comes from `VERSION`, read by the build and never typed elsewhere. Downloaded copies compare their version with the public `version.js`, so bump it whenever procedures change in a way staff must see.

The release scripts from sat-doc-automa are included. Record changes under `## [Unreleased]` in `CHANGELOG.md`, then:

```bash
python3 cut-release.py minor
```

It bumps `VERSION`, rolls the changelog, commits and tags, and stops before pushing. Push the commit and tag; the Pages workflow publishes. See *Commit and Versioning Workflow* in `en/docs/guides/devops/`.

## Reproducible output

The build date comes from `SOURCE_DATE_EPOCH` if set, otherwise from the last commit. With the date fixed, the same commit yields a byte-identical zip and checksum.

## License

This document, *Operator Guide: Building, Checking and Publishing*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0 | Draft | Initial draft. |
