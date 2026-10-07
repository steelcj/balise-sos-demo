# Balise SOS demo

*Procédures d'urgence hors ligne pour les municipalités. Offline-first emergency procedures for small municipalities.*

Balise, French for beacon, is a website of emergency procedures that keeps working when the network does not. During a major storm the Internet fails, staff cannot sign in, and the procedures have no place to live; Balise puts them on every computer, phone and USB key, searchable with no network, in French and English, and printable as a binder for when the batteries are flat.

This repository is a working demonstration for a fictional municipality, Saint-Démo-des-Neiges. It is the entry point of Vishpala's Resilience Pack.

> **Demonstration only.** The municipality, people and 555 telephone numbers are invented. Only 911 and 811 are real numbers. Do not use these procedures in a real emergency.

## Three copies from one build

- **Web, installed.** Open it once with a network; the browser stores the whole site and keeps it current every time the network returns.
- **File, downloaded.** A zip of about 170 KiB; unzip, open `index.html`, done. Works on old computers, needs nothing installed, and can check whether it is out of date.
- **Paper.** One page holds every procedure, ready to print for the emergency binder.

## Quick start

```bash
npm ci
npm run build     # site in _site/, offline zip in _site/download/
npm run check     # offline link check and markdown conformance
npm start         # local preview with live reload
python3 tests/browser-smoke.py   # offline modes, navigation, indicator and axe-core checks in Chromium, needs Playwright
```

Open `_site/index.html` straight from disk to see the file copy, or serve `_site/` to see the web copy.

`npm run check` currently reports 8 known em-dash findings in `en/docs/automa/ai-collaboration/examples/`, an upstream issue in the synced house rules; any other finding is a failure.

## Where the demo runs

The web copy is at `https://sos-flow.local/`, served by the incus web container on the operator's workstation, beside Balise itself at `https://flow.local/`. Publishing uses machines you control, not a hosting service; see ADR-006 and `en/docs/devops/balise/`. Build for the demo's address, so downloaded copies check it for updates, then deploy with the script directly:

```bash
BALISE_PUBLIC_URL=https://sos-flow.local/ npm run build
npm run check
sh en/docs/devops/balise/deploy-local.sh balise-sos-demo _site
```

`npm run deploy:local` deploys to `/srv/balise`, the folder behind `https://flow.local/`, and would replace Balise.

The fictional municipal plan this demo will be built from is in `fr-ca/docs/`.

## Documentation

Start with the overview, then the guide for your role.

- [Overview: How Balise Works](en/docs/architecture/overview--how-balise-works-v0-2-0.md)
- [Operator Guide: Building, Checking and Publishing](en/docs/guides/operator-guide--building-checking-and-publishing-v0-3-1.md)
- [Editor Guide: Writing and Updating a Procedure](en/docs/guides/editor-guide--writing-and-updating-a-procedure-v0-1-1.md)
- [Demo Script: Presenting Balise to a Municipality](en/docs/guides/demo-script--presenting-balise-to-a-municipality-v0-1-2.md)
- [Accessibility: Features, Checks and Next Steps](en/docs/accessibility/accessibility--features-checks-and-next-steps-v0-1-0.md)
- [Commit and Versioning Workflow](en/docs/guides/devops/commit-and-versioning-workflow-v0-3-0.md)
- [Balise local web setup](en/docs/devops/balise/README.md), the web container, Caddy and name publishing
- [Session Log: Building the Balise SOS Demo](en/docs/process/sessions/2026-10-06--building-the-balise-sos-demo-v0-4-0.md), the start-to-finish record

Decision records:

- [ADR-001: Static Site Built With Eleventy](en/docs/architecture/adrs/adr-001-static-site-built-with-eleventy-v0-1-1.md)
- [ADR-002: Two Offline Delivery Modes From One Build](en/docs/architecture/adrs/adr-002-two-offline-delivery-modes-from-one-build-v0-1-3.md)
- [ADR-003: Search Index as a Plain Script](en/docs/architecture/adrs/adr-003-search-index-as-a-plain-script-v0-1-0.md)
- [ADR-004: Relative File Links Everywhere](en/docs/architecture/adrs/adr-004-relative-file-links-everywhere-v0-1-1.md)
- [ADR-005: Bilingual Pages Paired by Work Identifier](en/docs/architecture/adrs/adr-005-bilingual-pages-paired-by-work-identifier-v0-1-0.md)
- [ADR-006: Self-Hosted Publishing Without GitHub Actions](en/docs/architecture/adrs/adr-006-self-hosted-publishing-without-github-actions-v0-1-1.md)
- [ADR-007: Connection Indicator and Section Submenus](en/docs/architecture/adrs/adr-007-connection-indicator-and-section-submenus-v0-1-0.md), proposed

House rules for documentation are under `en/docs/automa/`, synced from [sat-doc-automa](https://github.com/steelcj/sat-doc-automa).

## License

This software, *Balise SOS demo*, by **Christopher Steel**, is licensed under the [GNU General Public License v3.0 or later (GPL-3.0-or-later)](https://www.gnu.org/licenses/gpl-3.0.html).

You may redistribute and/or modify this software under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

See the `LICENSE` file included with this project for the full license text. The demonstration content in `content/` is licensed separately under CC BY 4.0, see `content/LICENSE.md`.

[![License: GPL v3+](https://img.shields.io/badge/License-GPLv3%2B-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
