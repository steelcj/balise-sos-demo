---
dc:title: "ADR-001: Static Site Built With Eleventy"
dcterms:version: "0.1.1"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why the Balise demo is a static Eleventy site with no server or database."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-001-static-site-built-with-eleventy"
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
    notes: "Hosting examples no longer name GitHub Pages; points to ADR-006; output size updated to about 320 KiB."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-001: Static Site Built With Eleventy

Version: 0.1.1
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains why the Balise demo is a static site built with Eleventy rather than a hosted application or a content management system with a database. It states the constraints that drove the choice, the decision, and what follows from it for editors, operators and readers.

## Status

Accepted, 2026-10-06.

## Context

Balise is the first piece of the Resilience Pack for small municipalities. The situation it answers is specific: during a major storm the Internet fails, staff cannot sign in to hosted services, and the emergency procedures have no place to live. Whatever holds the procedures therefore has to keep working on a device that has lost its network, its sign-in, and possibly its server.

That rules out anything that needs a live server or an account to read a page. It also argues for output that is plain files: files can be copied to a laptop, a phone, a USB key, a shared drive, or printed, and they outlive the tool that made them. Vishpala's practice favours tools that avoid vendor lock-in and leave the client with infrastructure they can move.

The user's existing site work already runs on Eleventy (<a name="apa-eleventy-docs-citation"></a>[Eleventy, n.d.](#apa-eleventy-docs-reference)), with content in markdown and multilingual paths, so the skills and patterns carry over.

## Decision

Build Balise as a static site with Eleventy 3. Content is markdown with front matter under `content/<locale>/`. The build produces a folder of HTML, CSS, a little JavaScript and two search index scripts, about 320 KiB in all, including the font, with no runtime server and no database.

## Consequences

Readers need nothing but a browser. The output can be hosted anywhere that serves files, including a web container on the operator's own machine, a rented server, a municipal web host, or nowhere at all. See ADR-006 for where it is served today.

Editors write markdown. A web editing interface, Sveltia CMS as used on the user's Eleventy site, can be added later over the same files without changing the build; it is recorded on the roadmap rather than built into the demo.

Every change needs a rebuild. That is acceptable: procedures change a few times a year, and the build takes well under a second.

The build depends on Node.js and two packages, `@11ty/eleventy` and `fflate`. Neither is needed by readers.

## Alternatives considered

A hosted wiki or intranet page fails the core case, it is unreachable exactly when it is needed. A word-processor document on a shared drive works offline once copied, but cannot be searched across documents on a phone, has no shared update path, and drifts into many copies. A native mobile app would need two app store releases, would not run on the old desktop computers in the town hall, and locks the municipality into a developer.

## License

This document, *ADR-001: Static Site Built With Eleventy*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## References

<a name="apa-eleventy-docs-reference"></a>Eleventy. (n.d.). *Eleventy documentation*. Retrieved October 6, 2026, from https://www.11ty.dev/docs/
[Return to citation](#apa-eleventy-docs-citation)

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.1 | Draft | Hosting examples no longer name GitHub Pages; points to ADR-006; output size updated to about 320 KiB. |
| 0.1.0 | Draft | Initial draft. |
