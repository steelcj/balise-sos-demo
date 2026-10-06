---
dc:title: "ADR-005: Bilingual Pages Paired by Work Identifier"
dcterms:version: "0.1.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "How French and English pages are paired by a shared urn:uuid relation, and why French is the default."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-005-bilingual-pages-paired-by-work-identifier"
dcterms:rightsHolder: "Christopher Steel"
dc:rights: >
  Copyright 2026 Christopher Steel.
  SPDX-License-Identifier: GPL-3.0-or-later
sat:uuid: ""
sat:version_at_creation: ""
sat:migration_status: pre-sat
sat:changelog:
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-005: Bilingual Pages Paired by Work Identifier

Version: 0.1.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains how Balise pairs its French and English pages: each pair shares a `relation` identifier, a `urn:uuid:` value naming the Work that both pages express. It covers how the language switch is built, what the build warns about, and why French is the default.

## Status

Accepted, 2026-10-06.

## Context

The municipality is in Quebec. French is the language of its administration; English serves part of its residents and visiting crews. Slugs are translated, `panne-electricite-prolongee` and `extended-power-outage`, so file paths cannot pair the pages. The user's Eleventy site already pairs translations by a shared `dc:relation` Work identifier, following the Work and Expression distinction he uses for SAT, and identifies things with `urn:uuid:` values.

## Decision

Each page's front matter carries `relation: urn:uuid:...`, the same value in both languages. The page's locale comes from its folder, `content/fr-ca/` or `content/en-ca/`, set by `content/content.11tydata.js`, so authors never type it.

The `byWork` collection maps each relation to its page in each locale. The base layout uses it for the header's language switch and for `<link rel="alternate" hreflang>`. The build warns when a Work lacks a page in one locale or when two pages in one locale claim the same Work, and `scripts/check-site.js` fails if a page has no counterpart.

French is the default locale and appears first. The bilingual entry page at the root offers both, with no automatic redirect, so it behaves the same from disk and on the web.

## Consequences

The language switch always lands on the same procedure in the other language, not on a home page. Translations can be renamed or moved freely.

A page published in one language only is visible at build time rather than discovered by a reader.

Interface words live separately, in `_data/i18n.js` and `_data/nav.js`.

## Alternatives considered

Pairing by matching file names would force English slugs on French pages. Eleventy's i18n plugin pairs by path and has the same limitation.

## License

This document, *ADR-005: Bilingual Pages Paired by Work Identifier*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0 | Draft | Initial draft. |
