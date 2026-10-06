---
dc:title: "ADR-006: Self-Hosted Publishing Without GitHub Actions"
dcterms:version: "0.1.1"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why Balise is published to an incus web container the operator controls instead of GitHub Pages, and the path to a server."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-006-self-hosted-publishing-without-github-actions"
dcterms:rightsHolder: "Christopher Steel"
dc:rights: >
  Copyright 2026 Christopher Steel.
  SPDX-License-Identifier: GPL-3.0-or-later
sat:uuid: ""
sat:version_at_creation: ""
sat:migration_status: pre-sat
sat:changelog:
  - version: "0.1.1"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Amended for the demo's own site at https://sos-flow.local/, beside Balise at https://flow.local/; the Caddy and container configuration is now in en/docs/devops/balise/."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-006: Self-Hosted Publishing Without GitHub Actions

Version: 0.1.1
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains why Balise is published to a web container on machines the operator controls, rather than through GitHub Actions and GitHub Pages. It describes today's arrangement on the workstation, how a build reaches it, and the path to a server once Vishpala has a live site.

## Status

Accepted, 2026-10-06. Supersedes the GitHub Pages workflow added in 0.1.0. Amended the same day, see *Amendment: the demo's own site*.

## Context

Version 0.1.0 shipped a GitHub Actions workflow that built the site and published it on GitHub Pages. That ties the hosting of the web copy, and the address every downloaded copy asks for updates, to one company's build service and hosting. Vishpala's practice is to avoid exactly that kind of lock-in and to keep infrastructure migratable, and the clients it serves should be able to run Balise on their own server, or on none.

The operator already runs an incus web container on the workstation, `flow.local`, with Caddy serving sites from `/srv/<site>` over HTTPS signed by Caddy's local certificate authority, and a small script, `deploy-local.sh`, that swaps a new build into place. When this record was first written, the Caddy and container configuration was not yet in this repository, and the record described it as understood from the script and the certificate. Current copies are now in `en/docs/devops/balise/`.

## Decision

Remove `.github/workflows/pages.yml`. Builds run on the operator's machine with `npm run build` and `npm run check`, and are published with `npm run deploy:local`, which runs `en/docs/devops/balise/deploy-local.sh balise _site`.

The script copies the build into the container under `/srv/balise.new`, then renames the live folder aside and the new one into place, so the site is never served half-copied, and deletes the previous build.

The public address defaults to `https://flow.local/`, set in `_11ty/site-config.js` and overridable with `BALISE_PUBLIC_URL`.

`en/docs/devops/balise/` holds the current versions of the local web setup, so the arrangement can be rebuilt from the repository.

## Consequences

Nothing in the build or the site depends on GitHub. The repository can move to any git host without changing how the site is published.

The web copy is reachable only where `flow.local` resolves and Caddy's root certificate is trusted. That suits a demo on the local network; it is not a public address. A downloaded copy taken elsewhere reports that it cannot reach the online site, which is the designed behaviour.

Publishing is a deliberate act by the operator, not a side effect of pushing. Check results are not recorded by a service; the operator runs them before deploying, as CONTRIBUTING asks.

## Amendment: the demo's own site

Added 2026-10-06. When the demo was first deployed, `/srv/balise` already held Balise 0.4.3 at `https://flow.local/`, and the owner chose to keep it. The demo became a second site in the same container:

- Folder `/srv/balise-sos-demo`, deployed with `deploy-local.sh balise-sos-demo _site` rather than `npm run deploy:local`, which still targets `/srv/balise`.
- Address `https://sos-flow.local/`, its own Caddy site block with `tls internal`. Caddy issues the name its own certificate, signed by the same local root, so devices that trust the root need nothing new.
- The name is published over mDNS by a systemd user unit on the workstation, since avahi announces only the hostname. A single label before `.local` was chosen over `sos.flow.local`, because mDNS clients, Android in particular, resolve multi-label names unreliably. A port on `flow.local` was tried first and dropped in favour of a name.
- The demo is built with `BALISE_PUBLIC_URL=https://sos-flow.local/`. The default in `_11ty/site-config.js` stays `https://flow.local/`.

The decision itself is unchanged: publishing stays on machines the operator controls, as a deliberate act. The consequence that the web copy is reachable only where its name resolves now also depends on the operator being logged in, unless lingering is enabled for the unit.

## Next steps

When Vishpala has a live server, the same container approach can move there: incus runs on a rented Linux virtual machine for system containers, while nested virtual machines usually need support the provider may not offer. The deploy script then runs against a remote incus remote, or the build is copied with `rsync` to a plain web server. Either way, setting `BALISE_PUBLIC_URL` to the public address and rebuilding is the only change to Balise itself.

## Alternatives considered

Keeping GitHub Pages: simplest, but the dependency this record removes. Another hosted CI and static host: the same dependency with a different name. A self-hosted git forge with its own runners, such as Forgejo: a reasonable later step for a team, and too much machinery for one operator today.

## License

This document, *ADR-006: Self-Hosted Publishing Without GitHub Actions*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.1 | Draft | Amended for the demo's own site at https://sos-flow.local/, beside Balise at https://flow.local/; the Caddy and container configuration is now in en/docs/devops/balise/. |
| 0.1.0 | Draft | Initial draft. |
