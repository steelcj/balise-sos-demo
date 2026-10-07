# Changelog

All notable changes to the balise-sos-demo repository are recorded here. Each document under `en/docs/` additionally carries its own changelog. Procedures carry their own `docVersion`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions track the `VERSION` file and the git tags. Dates are ISO 8601.

## [Unreleased]

### Added

- Online/offline indicator in the header of every page: Online, Offline or Network not checked, in words, learned from the service worker's background page refreshes and the browser's online and offline events, with no polling; pressing it checks the connection
- Dropdown submenus in the main navigation, following the disclosure pattern: Procedures lists every procedure, Contacts and Balise list their page sections
- Ids on every page's section headings, from `_11ty/headings.js`, so sections can be linked to
- Accessibility: Features, Checks and Next Steps, a new document in `en/docs/accessibility/`
- The browser test checks the submenus from the keyboard, the indicator, and every page with axe-core 4.14.0 (pinned dev dependency) against WCAG 2.2 A and AA in light and dark schemes

### Fixed

- An offline web copy reported "up to date" from its own stored `version.js`; `version.js` is no longer stored or answered by the service worker
- The amber focus ring had 1.73:1 contrast on white paper, below the 3:1 WCAG 1.4.11 asks for; it is now navy on light paper and stays amber on dark paper and in the header

### Changed

- "This copy" page renamed "Balise" in both languages, at `/en-ca/balise/` and `/fr-ca/balise/`, with every link, string and zip read-me updated; the page now explains how updating works and what the indicator means, with real subheadings in place of bold labels
- Overview 0.2.0: how updating works, the indicator and a design for checking other services later; ADR-002 0.1.3, operator guide 0.3.1 and demo script 0.1.2 updated for the rename and the changes above
- CLAUDE.md points to the style guides in sat-doc-automa, where they are

- README: `npm run deploy:local` no longer shown as the way to publish the demo, since it would replace Balise at `https://flow.local/`; new section on where the demo runs, `https://sos-flow.local/`, and how to build and deploy it there; the browser test and the 8 known conformance findings noted; the versioning workflow and local web setup added to the documentation list
- Operator guide 0.3.0 and ADR-006 0.1.1: publishing described for the demo's own site at `https://sos-flow.local/`, with name publishing and certificate trust; `npm run deploy:local` kept for Balise at `https://flow.local/`

## [0.2.0] - 2026-10-06

### Changed

- Publishing moved off GitHub: the GitHub Pages workflow is removed; `npm run deploy:local` publishes to the incus web container on `flow.local` with `en/docs/devops/balise/deploy-local.sh`; downloaded copies check `https://flow.local/` for updates (ADR-006)
- New look based on municipal signage: navy header, 911 as a red band, red reserved for danger and priority, amber copy-status line, procedure lists as signboard rows, Atkinson Hyperlegible font stored with the site, emoji icons removed
- Documents updated to match, with version bumps: overview, ADR-001, ADR-002, ADR-004, operator guide, editor guide, demo script, session log
- Offline web copy: pages now open from the stored copy at once and refresh in the background, instead of waiting up to four seconds on the network; offline on a phone still on Wi-Fi, every link, the language switch included, had taken four seconds. The browser test gains a stalled-network check. ADR-002 0.1.2
- Session log 0.3.0: third pass recording the demo deployed beside Balise 0.4.3 at `https://sos-flow.local/`

### Added

- ADR-006, self-hosted publishing without GitHub Actions
- `en/docs/devops/balise/` for the current local web setup
- `en/docs/devops/balise/Caddyfile` and `incus-web-container.yaml`, current copies of the web container's Caddy and incus configuration, and `avahi-alias-sos-flow.service`, which publishes `sos-flow.local` over mDNS; the demo now runs as a separate site at `https://sos-flow.local/` from `/srv/balise-sos-demo`, beside Balise 0.4.3 at `https://flow.local/`; the folder README records the sites, rebuild commands, name publishing and which Caddy root certificate is in use

## [0.1.0] - 2026-10-06

### Added

- Eleventy 3 static site for the fictional municipality of Saint-Démo-des-Neiges, in French (default) and English, pages paired by a shared `urn:uuid:` relation
- Six procedures: activating the emergency operations centre, extended power outage, winter storm, opening a shelter, boil-water advisory, communicating without a network; plus home, procedure list, contacts, this copy, search and printable version pages
- Offline web copy: hashed service worker storing every file, network-first pages, web app manifest and icons
- Offline file copy: reproducible zip with SHA-256 checksum, opening from `file://`
- Accent-folding search from a per-locale index loaded as a plain script, with `keywords` front matter
- Relative file links throughout, copy age and staleness warning, update check from disk, checkbox steps, print stylesheet
- `scripts/check-site.js`, `tests/browser-smoke.py`, GitHub Pages workflow (removed in the next release)
- Documentation: overview, five ADRs, operator guide, editor guide, demo script, session log
- Shared zone from sat-doc-automa: markdown defaults, license blocks, ai-collaboration directive, devops workflow, release scripts, conformance checker
