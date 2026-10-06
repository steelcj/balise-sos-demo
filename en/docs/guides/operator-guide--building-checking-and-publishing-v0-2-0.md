---
dc:title: "Operator Guide: Building, Checking and Publishing"
dcterms:version: "0.2.0"
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
  - version: "0.2.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "GitHub Pages and its workflow replaced by deployment to the local incus web container with deploy-local.sh, per ADR-006; certificate trust and update address explained."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# Operator Guide: Building, Checking and Publishing

Version: 0.2.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This guide is for the person who builds, checks and publishes Balise. It covers the tools needed, the commands, what each step produces, how to publish to the local web container or another host, and how to cut a version so downloaded copies can tell they are out of date.

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

## Publish to the local web container

Today the web copy is served from an incus container named `web` on the operator's workstation, `flow.local`, with Caddy serving `/srv/<site>` over HTTPS using its local certificate authority. Hosting stays on machines the operator controls; no hosting company or CI service is involved. See ADR-006.

```bash
npm run build
npm run check
npm run deploy:local
```

`deploy:local` runs `en/docs/devops/balise/deploy-local.sh balise _site`. The script copies the build into `/srv/balise.new` inside the container, then swaps it into place with two renames, so a visitor never sees a half-copied site. Set `WEB_CONTAINER` to use a container with another name.

Devices that should install the web copy must trust Caddy's local root certificate, because a service worker only runs on a page the browser considers secure. On Linux desktops, add the root to the system store; on phones, install it as a user certificate authority. Without that trust the site still reads, but nothing is stored offline.

Downloaded copies ask `https://flow.local/version.js` whether a newer version exists. That only answers on the local network, which is enough for the demo.

## Publish elsewhere

Copy `_site/` to any web server that serves static files over HTTPS, a future Vishpala server or a municipality's own. Set `BALISE_PUBLIC_URL` to that address, ending in `/`, before building, so downloaded copies check the right place:

```bash
BALISE_PUBLIC_URL=https://urgence.example.qc.ca/ npm run build
```

No server-side code is needed. The service worker requires HTTPS, except on `localhost`.

## Distribute the file copy

The zip is at `_site/download/` and linked from the "This copy" page. Put it on each municipal computer and on a USB key in each site's emergency binder. A synchronizing tool between the three sites can carry the unzipped folder instead; it is exactly the content of the zip.

## Cut a version

The version comes from `VERSION`, read by the build and never typed elsewhere. Downloaded copies compare their version with the public `version.js`, so bump it whenever procedures change in a way staff must see.

The release scripts from sat-doc-automa are included. Record changes under `## [Unreleased]` in `CHANGELOG.md`, then:

```bash
python3 cut-release.py minor
```

It bumps `VERSION`, rolls the changelog, commits and tags, and stops before pushing. Push the commit and tag, then run `npm run deploy:local`. See *Commit and Versioning Workflow* in `en/docs/guides/devops/`.

## Reproducible output

The build date comes from `SOURCE_DATE_EPOCH` if set, otherwise from the last commit. With the date fixed, the same commit yields a byte-identical zip and checksum.

## License

This document, *Operator Guide: Building, Checking and Publishing*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.2.0 | Draft | GitHub Pages and its workflow replaced by deployment to the local incus web container with deploy-local.sh, per ADR-006; certificate trust and update address explained. |
| 0.1.0 | Draft | Initial draft. |
