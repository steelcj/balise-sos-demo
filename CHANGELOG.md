# Changelog

All notable changes to the balise-sos-demo repository are recorded here. Each document under `en/docs/` additionally carries its own changelog. Procedures carry their own `docVersion`.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Versions track the `VERSION` file and the git tags. Dates are ISO 8601.

## [Unreleased]

### Changed

- Publishing moved off GitHub: the GitHub Pages workflow is removed; `npm run deploy:local` publishes to the incus web container on `flow.local` with `en/docs/devops/balise/deploy-local.sh`; downloaded copies check `https://flow.local/` for updates (ADR-006)
- New look based on municipal signage: navy header, 911 as a red band, red reserved for danger and priority, amber copy-status line, procedure lists as signboard rows, Atkinson Hyperlegible font stored with the site, emoji icons removed
- Documents updated to match, with version bumps: overview, ADR-001, ADR-002, ADR-004, operator guide, editor guide, demo script, session log

### Added

- ADR-006, self-hosted publishing without GitHub Actions
- `en/docs/devops/balise/` for the current local web setup

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
