---
dc:title: "Session Log: Building the Balise SOS Demo"
dcterms:version: "0.2.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Start-to-finish record of building the Balise SOS demo: decisions, steps, problems fixed, results and open work."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "2026-10-06--building-the-balise-sos-demo"
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
    notes: "Added the second pass: rebase onto the plan document, GitHub Actions replaced by local self-hosting per ADR-006, new signage-based theme with Atkinson Hyperlegible."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# Session Log: Building the Balise SOS Demo

Version: 0.2.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This is the working record of building the Balise SOS demo, from an empty repository to a tested site with both offline delivery modes and its documentation, in the order the work happened. It records each step, the commands that matter, the problems found and how they were fixed, and what was left open, so the build can be followed, repeated or questioned later.

## Starting point

The repository `steelcj/balise-sos-demo` was created empty, alongside a claude.ai Project of the same name described as "offline-first emergency procedures for municipalities". The brief: build the demo, and document it from start to finish.

The demo grows out of the small-municipality resilience work: about 2,000 residents, three sites on Microsoft products, storms that take down the Internet and sign-in, and emergency procedures with no place to live. The plan already on record was a static site people download to their devices, searchable offline, updating when networks are up, as the entry point of the Resilience Pack.

## Reading the house conventions first

Before writing anything, the conventions in `steelcj/sat-doc-automa` were read: the standard repository layout, the versioned-documents style guide, the markdown defaults, the license templates, the CLAUDE.md signpost, the energy-conservation directive, and the manifest for `vishpala-eleventy-mvp`. The Eleventy MVP repository was also read for its patterns: `content/<locale>/`, pairing translations by a `relation` Work identifier, CommonJS config, Pagefind.

Two choices followed directly. The repository takes the standard skeleton and the shared zone at `source == dest`. The energy directive argued for a small build: two runtime dependencies, system fonts, no framework.

## Choosing the shape

The decisions, each with its own record under `en/docs/architecture/adrs/`:

| Decision | Record |
|----------|--------|
| Static site with Eleventy 3 | ADR-001 |
| Two offline modes from one build, web installed and zip from disk | ADR-002 |
| Search index as a plain script, not Pagefind, so it works from `file://` | ADR-003 |
| Every output link relative and naming a file | ADR-004 |
| French and English paired by a shared `urn:uuid:` relation, French default | ADR-005 |

The `file://` requirement drove most of the engineering. A downloaded copy gets no service worker, no `fetch()` of local files, and no server to turn `/` or `folder/` into a page.

## Scaffolding

The shared zone was copied from sat-doc-automa at identical paths: the six markdown defaults and their README, the three license blocks, the ai-collaboration directive and example, the commit and versioning workflow, `check-conformance.py`, the release trio and its test, and the release `.gitignore`, extended for Node. `LICENSE` is the GPL-3.0 text; `VERSION` is `0.1.0`.

Licensing follows `vishpala-eleventy-mvp`: code and its documentation under GPL-3.0-or-later, demo content under CC BY 4.0, stated in `content/LICENSE.md`.

```bash
npm install --save-dev @11ty/eleventy fflate
```

Eleventy 3.1.6 installed, 130 packages, all build-time only.

## Building the engine

The order of work, with the file that holds each piece:

1. `_11ty/site-config.js`, one source for name, version read from `VERSION`, build date, public URL, locales, staleness threshold
2. `_11ty/relative-links.js`, the link rewriter of ADR-004
3. `_11ty/search-index.js`, capture of each page's marked body and writing of `assets/search/<locale>.js`
4. `_11ty/offline-shell.js` and `_11ty/sw.template.js`, writing `version.js`, `manifest.webmanifest` and the hashed service worker after the build
5. `eleventy.config.js`, wiring the above, with the `procedures` and `byWork` collections and the `inLocale` filter
6. `_data/i18n.js` and `_data/nav.js`, interface words and navigation per locale
7. Layouts: one base, then page, procedure, list, print and search
8. `assets/css/balise.css` and `print.css`, `assets/js/balise.js` and `search.js`, both scripts in ES5
9. `assets/img/balise-icon.svg`, then `scripts/make-icons.py` to draw the PNG icons with Pillow, since no SVG rasteriser was installed
10. `scripts/package-offline.js` for the zip and `scripts/check-site.js` for the output check

Three details are worth recording. The transform cannot see page data in Eleventy 3, so the layouts put locale, title, summary and keywords into the HTML as `data-` attributes and the index reads them from there. The worker's cache name includes a hash of every stored file, so the browser notices any change. `version.js` is fetched network-first by the worker, otherwise an installed copy would always answer "up to date" from its own store.

## Writing the content

Saint-Démo-des-Neiges is fictional, with three sites matching the real client's shape: town hall, municipal garage, community centre. Six procedures, written in French first, then in English: activating the emergency operations centre, extended power outage, winter storm, opening a shelter, boil-water advisory, communicating without a network. Plus a home page, the procedure list, contacts, "this copy", search and the printable version, ten indexed pages and two utility pages per language.

Every number is in the 555-01xx range set aside for fiction, except 911 and 811. A striped banner on every page says it is a demonstration.

## Problems found and fixed

**Attributes mistaken for links.** The first check reported every print button as a broken link. `\b(href|src|action)=` also matches inside `data-action=`, because a hyphen is a word boundary. Both the checker and the rewriter now require that the attribute name is not preceded by a letter or hyphen.

**Search showed nothing.** In the browser, the search page threw `Cannot read properties of undefined`. The interface strings were embedded at the end of `<body>`, after the search script that needs them. They moved into `<head>`.

**"Refuge" found nothing.** The offline test searched for "refuge", which the shelter procedure never uses. Rather than change the test, procedures gained a `keywords` front matter field, indexed with heading weight, holding the words people actually search with.

**One version, two places.** `package.json` carried its own version. It was removed so `VERSION` is the only source.

## Checking

```bash
npm run build
node scripts/check-site.js
python3 tests/browser-smoke.py
```

Results at the end of the session:

| Measure | Result |
|---------|--------|
| Pages per language indexed | 10 |
| Search index size | about 13 KiB English, 15 KiB French |
| Files stored by the service worker | 36, about 280 KiB |
| Offline zip | 38 files, about 135 KiB |
| Site check | passed |
| Browser test, file mode | local copy detected, accent-free search, result opens, 17 checkboxes, language switch lands on the same procedure |
| Browser test, web mode under `/balise-sos-demo/` | stored offline, update check up to date, with network cut a never-visited page opens and search works |

## Left open

Recorded in `ROADMAP.md`: a web editing screen with Sveltia CMS; a French translation of this documentation; a sync manifest for this repository in sat-doc-automa; a Lunr or MiniSearch index if the corpus grows past a few hundred pages; a sync method for the three sites' desktops; real content from the client municipality.

The GitHub App had no write access to the repository during this session, so the work was handed over as a git bundle to push by hand.

## Second pass, same day: self-hosting and a new look

**The plan document.** Meanwhile the owner pushed an initial commit holding `fr-ca/docs/saint-exemple-plan-v0.0.3.md`, a fictional municipal emergency plan following the provincial template, with a visibility on every block (public, internal, restricted) meant to compile into an external guide for residents and an internal guide for the emergency team. The demo commit was rebased onto it so history stays linear. Building the site from that plan is the obvious next step and is recorded on the roadmap.

**No GitHub Actions.** The owner asked to avoid GitHub Actions, since they tie hosting to GitHub, and supplied the `deploy-local.sh` script used with the incus web container on the workstation, `flow.local`, and Caddy's local root certificate. The workflow was removed, the script placed in `en/docs/devops/balise/` with an `npm run deploy:local` wrapper, and the update address set to `https://flow.local/`. ADR-006 records the decision. The certificate was not committed, since it belongs to one machine.

**Theme.** The first look, warm off-white with a red accent, was close to a common generated default and used red for reassurance as well as danger. The new look borrows from municipal signage: a navy header panel, the 911 line as a red band, red kept for danger and priority, amber for the copy-status line, which turns red once the copy is old. Procedure lists became rows on a signboard with the priority on the left edge, labelled in words. Emoji icons were dropped, since old systems render them as empty boxes. Type is Atkinson Hyperlegible, designed by the Braille Institute for low-vision readers, two Latin weights, about 35 KiB, stored with the site and falling back to system fonts. A dark scheme follows the device.

Two layout problems were found in screenshots and fixed: the navigation sat inside the navy header and vanished, and a paragraph width rule shrank the demonstration notice to half the page.

| Measure | 0.1.0 first pass | After this pass |
|---------|------------------|-----------------|
| Files stored by the service worker | 36, about 280 KiB | 39, about 320 KiB |
| Offline zip | about 135 KiB | about 172 KiB |

## License

This document, *Session Log: Building the Balise SOS Demo*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.2.0 | Draft | Added the second pass: rebase onto the plan document, GitHub Actions replaced by local self-hosting per ADR-006, new signage-based theme with Atkinson Hyperlegible. |
| 0.1.0 | Draft | Initial draft. |
