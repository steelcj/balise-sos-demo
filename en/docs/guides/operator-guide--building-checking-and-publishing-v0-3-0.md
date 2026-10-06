---
dc:title: "Operator Guide: Building, Checking and Publishing"
dcterms:version: "0.3.0"
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
  - version: "0.3.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Publishing rewritten for two sites in the web container: the demo at https://sos-flow.local/ deployed with the script directly, deploy:local kept for Balise at https://flow.local/; name publishing and certificate trust on Brave and iPhone; known conformance findings and the stalled-network browser check; console sample updated."
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

Version: 0.3.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This guide is for the person who builds, checks and publishes Balise. It covers the tools needed, the commands, what each step produces, how to publish to the local web container or another host, and how to cut a version so downloaded copies can tell they are out of date.

## What you need

Node.js 18 or later and npm. Git. Python 3 for the conformance check and the release scripts. Optionally, Pillow to redraw the app icons, and Playwright with Chromium for the browser test. On a system Python that refuses `pip install`, put Playwright in a virtual environment:

```bash
python3 -m venv ~/.venvs/playwright
~/.venvs/playwright/bin/pip install playwright
~/.venvs/playwright/bin/playwright install chromium
```

## Build

```bash
npm ci
npm run build
```

`npm run build` empties `_site/`, runs Eleventy, writes the search indexes, `sw.js`, `manifest.webmanifest` and `version.js`, then packs the offline zip. The console reports what it wrote:

```text
[balise] search index fr-ca: 10 pages, 15... bytes
[balise] service worker balise-<version>-<hash>: 39 files stored offline
[balise] offline package download/balise-sos-demo-<version>.zip: 41 files, 17x KiB, sha256 ...
```

Warnings starting `[i18n]` mean a page is missing its other-language counterpart; fix them before publishing.

For local editing, `npm start` serves the site with live reload. The service worker registers on `localhost`, so clear site data in the browser if a stale page sticks while editing.

## Check

```bash
npm run check
```

This runs `scripts/check-site.js`, which fails on any root link left in the output, any link to a missing file, any page without a counterpart, or a search index entry that points nowhere, and reports the size of the stored copy. It then runs `check-conformance.py` over `en/docs/`.

The conformance check currently reports 8 em-dash findings in `en/docs/automa/ai-collaboration/examples/`. They are known issues in the house rules synced from upstream, and they make `npm run check` exit 1. Any other finding is a real failure.

The browser test exercises both offline modes in Chromium. It cuts the network after the service worker has installed, and it also stalls the network, the way a phone on Wi-Fi with no working connection behaves, and requires the language switch to answer from storage within 1.5 seconds:

```bash
python3 tests/browser-smoke.py
```

Run it with `~/.venvs/playwright/bin/python` if Playwright is in a virtual environment.

## Publish to the local web container

The web copy is served from an incus container named `web` on the operator's workstation, with Caddy serving `/srv/<site>` over HTTPS using its local certificate authority. Hosting stays on machines the operator controls; no hosting company or CI service is involved. See ADR-006. The container holds two sites:

| Address | Folder in the container | Site |
|---------|-------------------------|------|
| `https://flow.local/` | `/srv/balise` | Balise itself |
| `https://sos-flow.local/` | `/srv/balise-sos-demo` | this demo |

Build the demo for its own address, so downloaded copies check it for updates, then deploy it with the script directly:

```bash
BALISE_PUBLIC_URL=https://sos-flow.local/ npm run build
npm run check
sh en/docs/devops/balise/deploy-local.sh balise-sos-demo _site
```

A plain `npm run build` uses the default address, `https://flow.local/`, which belongs to Balise, so always set `BALISE_PUBLIC_URL` for the demo. Do not run `npm run deploy:local` for the demo: it runs `deploy-local.sh balise _site` and would replace Balise at `https://flow.local/`.

The script copies the build into `/srv/<site>.new` inside the container, then swaps it into place with two renames, so a visitor never sees a half-copied site. Set `WEB_CONTAINER` to use a container with another name.

`en/docs/devops/balise/` holds current copies of the Caddyfile, the container configuration and the unit that publishes the demo's name, with a README on rebuilding them.

### The demo's name

Avahi on the workstation announces only its hostname, `flow.local`. The systemd user unit `avahi-alias-sos-flow.service` publishes `sos-flow.local` at the workstation's LAN address. A single label before `.local` is used because mDNS clients, Android in particular, resolve multi-label names unreliably. As a user unit it runs only while the operator is logged in, unless lingering is enabled with `loginctl enable-linger`; if the workstation's LAN address changes, edit the unit and restart it.

### Trusting the certificate

Devices that should install the web copy must trust Caddy's local root certificate, because a service worker only runs on a page the browser considers secure. Without that trust the site shows a certificate warning, and even past the warning nothing is stored offline. One root signs both sites, so a device that trusts it for one trusts it for the other.

The root in use is `/var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt` inside the container. An older root with the same name sits under `/root/.local/share/caddy/` and is not used; check the SHA-256 fingerprint before installing.

- **Brave or Chrome on Linux.** These read your own certificate store, not the system one. Import the root at `brave://settings/certificates` (or `chrome://settings/certificates`) as a trusted authority, then restart the browser.
- **iPhone.** Open the root file on the phone, install the profile under Settings → Profile Downloaded, then turn on full trust under Settings → General → About → Certificate Trust Settings. Without the second step the root does nothing.
- **Android.** Install it as a user certificate authority from the security settings.

Trusting this root lets whoever holds its key, inside the `web` container, impersonate any website to that device, so keep the container private.

Downloaded copies ask `https://sos-flow.local/version.js` whether a newer version exists. That only answers on the local network, which is enough for the demo.

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

It bumps `VERSION`, rolls the changelog, commits and tags, and stops before pushing. Push the commit and the tag it names, `git push && git push origin vX.Y.Z`, then rebuild and deploy the demo as above so the web copy reports the new version. See *Commit and Versioning Workflow* in `en/docs/guides/devops/`.

## Reproducible output

The build date comes from `SOURCE_DATE_EPOCH` if set, otherwise from the last commit. With the date fixed, the same commit yields a byte-identical zip and checksum.

## License

This document, *Operator Guide: Building, Checking and Publishing*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.3.0 | Draft | Publishing rewritten for two sites in the web container: the demo at https://sos-flow.local/ deployed with the script directly, deploy:local kept for Balise at https://flow.local/; name publishing and certificate trust on Brave and iPhone; known conformance findings and the stalled-network browser check; console sample updated. |
| 0.2.0 | Draft | GitHub Pages and its workflow replaced by deployment to the local incus web container with deploy-local.sh, per ADR-006; certificate trust and update address explained. |
| 0.1.0 | Draft | Initial draft. |
