---
dc:title: "ADR-004: Relative File Links Everywhere"
dcterms:version: "0.1.1"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why every output link is relative and names a file, so the site works from disk and any sub-path."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-004-relative-file-links-everywhere"
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
    notes: "Sub-path example no longer refers to GitHub Pages."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-004: Relative File Links Everywhere

Version: 0.1.1
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains why every link Balise outputs is a relative link that names a file, such as `../../contacts/index.html`, while authors keep writing ordinary root links such as `/fr-ca/contacts/`. It describes the transform that does the rewriting and the check that guards it.

## Status

Accepted, 2026-10-06.

## Context

The same output must work in three places: opened from disk, served from a domain root, and served from a sub-path, as a server holding several sites might serve it at `/balise/`. Root links like `/fr-ca/` point at the root of the disk from a `file://` page, and at the wrong place under a sub-path. Directory links like `contacts/` work on a web server, which answers with `index.html`, but a browser opening a local folder shows a file listing instead.

## Decision

Authors and templates write root links. After rendering, `_11ty/relative-links.js` rewrites every `href`, `src`, `action` and `poster` attribute whose value starts with a single `/` into a path relative to the page, and adds `index.html` to any path ending in `/`. Query strings and fragments are kept.

Run-time scripts that build links get the page's path to the root from a `data-root` attribute on `<html>`, set by the same module.

`scripts/check-site.js` fails the build check if any root link survives, or if any relative link points at a file that does not exist.

## Consequences

The output is position-independent: it can be moved, zipped, synced or hosted at any path without a rebuild. Authors never think about it.

URLs on the web show `index.html`. That is cosmetic, and harmless for a site whose readers arrive from a home screen icon or a bookmark rather than a search engine.

External links, `mailto:`, `tel:` and fragment-only links are left alone.

## Alternatives considered

Eleventy's `pathPrefix` fixes the sub-path case but not `file://`. A `<base>` element breaks fragment links and still points at a directory. Writing relative links by hand in content is error-prone and breaks when a page moves.

## License

This document, *ADR-004: Relative File Links Everywhere*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.1 | Draft | Sub-path example no longer refers to GitHub Pages. |
| 0.1.0 | Draft | Initial draft. |
