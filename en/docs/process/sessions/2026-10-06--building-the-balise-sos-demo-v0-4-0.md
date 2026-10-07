---
dc:title: "Session Log: Building the Balise SOS Demo"
dcterms:version: "0.4.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Start-to-finish record of building the Balise SOS demo: decisions, steps, problems fixed, results and open work."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-07"
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
  - version: "0.4.0"
    date: "2026-10-07"
    author: "Christopher Steel"
    notes: "Added the fourth pass, the offline speed fix, release 0.2.0 and documentation, and the fifth pass on 2026-10-07, the connection indicator, navigation submenus, accessibility record, rename and release 0.3.0; bold labels in the third pass replaced by headings."
  - version: "0.3.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Added the third pass: the demo deployed beside Balise 0.4.3 as its own site, first at flow.local:8443 then at sos-flow.local, with the container configuration saved in en/docs/devops/balise/."
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

Version: 0.4.0
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

## Third pass, same day: running the demo beside Balise 0.4.3

### What was on the machine

Node 18.19.1, npm 9.2.0, Python 3.12.3 and incus 7.0.1. The `web` container, Debian 13 with Caddy 2.11.6 from the Caddy stable apt repository, served Balise 0.4.3 from `/srv/balise` at `https://flow.local/`, through proxy devices for ports 80 and 443. The Caddyfile held one hardcoded site block. Two files, `/etc/caddy/sites/balise.caddy` and `/etc/caddy/snippets/static-site.caddy`, were never imported and had no effect; they were left in place.

### Build and check

`npm ci`, `npm run build` and `npm run check` ran clean apart from the 8 known em-dash findings in `en/docs/automa/ai-collaboration/examples/`, which are upstream issues. Because of them `npm run check` still exits 1. One extra plain build ran by mistake while looking for warnings.

### A separate site, not a replacement

The owner chose to keep Balise 0.4.3 and serve the demo from its own folder, `/srv/balise-sos-demo`, with its own Caddy site block and a build whose `BALISE_PUBLIC_URL` names that address. `npm run deploy:local` was not used, since it targets `/srv/balise`; the script was called directly as `deploy-local.sh balise-sos-demo _site`.

### First address, flow.local:8443

The first arrangement added a proxy device for port 8443 and a `flow.local:8443` block. It worked, since `flow.local` already resolves, but the owner preferred a name to a port.

### Second address, sos-flow.local

With `tls internal`, Caddy issues each site name its own short-lived certificate signed by the same local root, so a new name needs no new trust on devices. The real cost of a new name is resolution. Avahi on the workstation announces only `flow.local`, and mDNS clients, Android in particular, resolve multi-label names such as `sos.flow.local` unreliably, so a single-label name was chosen. A systemd user unit, `avahi-alias-sos-flow.service`, publishes `sos-flow.local` at the LAN address `192.168.1.100`; a user unit was used because sudo needs a password on the workstation. The Caddy block was renamed, the 8443 device removed, and the demo rebuilt with `BALISE_PUBLIC_URL=https://sos-flow.local/` and redeployed. The Caddyfile was backed up in the container before each change.

### Certificate trust

Verification with curl first failed against a root under `/root/.local/share/caddy/`; the running service, which runs as the `caddy` user, uses the root under `/var/lib/caddy/.local/share/caddy/`. Against that root both sites returned 200 with the certificate verified. The workstation's own system store does not trust the root yet, so browsers on it still warn. The root was kept in a scratch folder and not committed.

### Saved to the repository

Current copies of the Caddyfile, the container configuration with machine-specific keys removed, and the avahi unit are in `en/docs/devops/balise/`, with a README covering the sites, rebuild commands, name publishing and certificate trust.

### Browser test

Playwright and Chromium were installed, with the owner's approval, into `~/.venvs/playwright` and `~/.cache/ms-playwright`, and `tests/browser-smoke.py` passed all 11 checks. The test serves `_site` from a local server, so it does not exercise the container.

| Measure | Result |
|---------|--------|
| Demo address | `https://sos-flow.local/`, from `/srv/balise-sos-demo` |
| Balise 0.4.3 | unchanged at `https://flow.local/` |
| Files stored by the service worker | 39, about 322 KiB |
| Offline zip | 41 files, about 171 KiB |
| Site check | passed |
| Conformance | 8 known upstream findings only |
| Browser test | 11 of 11 passed |

Still open from this pass: `sos-flow.local` has not been tried on phones or other machines on the LAN; the name is published only while the operator is logged in, unless lingering is enabled; the unit names a fixed LAN address; the operator guide and ADR-006 still describe only `https://flow.local/`.

## Fourth pass, same day: offline speed, release 0.2.0 and the documentation

### Slow pages offline on an iPhone

The owner found that switching languages offline on an iPhone was very slow. The service worker fetched every page network first with a four second limit; on a network that is up without reaching the server, or off the network where `.local` names cannot be found, the request does not fail at once, so every link, the language switch included, waited the full four seconds. The cause was likely rather than confirmed, since the phone's network state was not observed.

Pages now come from the stored copy at once and refresh in the background, as Balise 0.4.3 already did. A page not yet stored keeps the time limit. The browser test gained a check in which the test server stalls on pages rather than refusing them, the behaviour of a half-up network; the language switch answered in 0.1 s. The check was not run against the old worker to show that it would have failed. ADR-002 went to 0.1.2.

### Release 0.2.0

The owner pointed out that `VERSION` had not moved. `cut-release.py minor` cut 0.2.0, the demo was rebuilt and redeployed, and the owner pushed the branch and, after a first attempt naming `v0.2.1`, the tag `v0.2.0`, then published the GitHub release.

### The documentation brought in line

The root README still listed `npm run deploy:local` as the way to publish the demo, which would now replace Balise 0.4.3. The README, the operator guide, 0.3.0, and ADR-006, 0.1.1 with a dated amendment, were brought in line with the demo's own site, name publishing and certificate trust. The trap itself remains: a plain build targets `https://flow.local/` and `deploy:local` targets `/srv/balise`; changing both defaults is on the roadmap.

### Certificate trust

Brave on the workstation warned on `https://sos-flow.local/`, because it reads the per-user certificate store, which did not hold Caddy's root, and `certutil` was not installed. The live root was copied outside the repository with its fingerprint, with import steps for Brave and a two-step install for iPhone. The recommended long-term fix, not yet made, is a root name-constrained to the two demo names, since Caddy's root as it stands can vouch for any site.

## Fifth pass, 2026-10-07: connection indicator, navigation and accessibility

### The request

The owner asked for an online and offline indicator that uses few resources, or a button to check connectivity, with checks of services such as Microsoft 365 later; an explanation of how updating works; confirmation that the search box has a label, advice on accessibility checks and a document recording accessibility features and checking sites with APA citations; the "This copy" menu item renamed "Balise"; and dropdown submenus to reach procedures and sections directly.

### Choices made with the owner

The accessibility document and ADR-007 use the technical register. The updating explanation went into the overview, technically, and onto the Balise page, plainly, rather than into a new document. Submenus were given to Procedures, listing the procedures, and to Contacts and Balise, listing their sections. axe-core was added to the browser test as a pinned dev dependency.

### Found before building

Both search boxes already had labels. The update check had a real fault: the worker stored `version.js` and fell back to it, so an offline web copy reported "up to date". The amber focus ring measured 1.73:1 on white, below the 3:1 a focus indicator needs. Headings had no ids. The style guides named by CLAUDE.md are in sat-doc-automa, not in this repository, and CLAUDE.md was corrected.

### What was built

`version.js` is no longer stored or answered by the worker. The worker reports the result of each background page refresh to open pages, which drives a three-state indicator, Online, Offline or Network not checked, with no polling; pressing it checks the connection. The navigation gained disclosure submenus, with ids for section headings produced by `_11ty/headings.js` from each page's markdown. The page was renamed in both languages with every link, string and zip read-me. The focus ring is navy on light paper. ADR-007 records the indicator and submenu decisions, as proposed.

### Problems found and fixed

Nunjucks has no comma operator, so the submenu lists moved into a build filter. Ids added by markdown would have repeated on the printable version, so ids are added after rendering and the printable version is skipped. An absolutely positioned dropdown would have covered its own link on a phone, so narrow screens open the list inline. A `display` rule overrode the `hidden` attribute, so a rule now makes `hidden` win. In the browser test, a stalled request from the previous check reported "online" after the network was cut, and the expected text was English on a French page; both were test errors, not faults in the indicator.

### Results

| Measure | Result |
|---------|--------|
| Files stored by the service worker | 38, about 406 KiB, grown by the submenu links on every page |
| Offline zip | 40 files, about 190 KiB |
| Browser test | 26 of 26 checks passed |
| axe-core 4.14.0 | 25 pages, light and dark schemes, no WCAG 2.2 A or AA violations |
| Conformance | 8 known upstream findings only |

### Release 0.3.0 and the records

0.3.0 was cut, rebuilt and deployed to `https://sos-flow.local/`, and is tagged but not pushed. The browser test ran on the build before the release commit; only the version and build date differ. ROADMAP.md gained an entry for 2026-10-07 with what was decided, closed and left open. The owner chose to keep `.claude/logs` as a private scratch record, not committed.

## License

This document, *Session Log: Building the Balise SOS Demo*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.4.0 | Draft | Added the fourth pass, the offline speed fix, release 0.2.0 and documentation, and the fifth pass on 2026-10-07, the connection indicator, navigation submenus, accessibility record, rename and release 0.3.0; bold labels in the third pass replaced by headings. |
| 0.3.0 | Draft | Added the third pass: the demo deployed beside Balise 0.4.3 as its own site, first at flow.local:8443 then at sos-flow.local, with the container configuration saved in en/docs/devops/balise/. |
| 0.2.0 | Draft | Added the second pass: rebase onto the plan document, GitHub Actions replaced by local self-hosting per ADR-006, new signage-based theme with Atkinson Hyperlegible. |
| 0.1.0 | Draft | Initial draft. |
