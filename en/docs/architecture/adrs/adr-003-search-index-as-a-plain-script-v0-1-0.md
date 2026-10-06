---
dc:title: "ADR-003: Search Index as a Plain Script"
dcterms:version: "0.1.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why search uses a build-time index loaded by a script tag instead of Pagefind, so it works from disk."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-003-search-index-as-a-plain-script"
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

# ADR-003: Search Index as a Plain Script

Version: 0.1.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains why Balise searches with a small index built at compile time and loaded as a plain script, instead of using Pagefind, the static search tool on the user's Eleventy site. It describes the index format, the matching rules, and the size and scaling limits of the approach.

## Status

Accepted, 2026-10-06.

## Context

Search has to work in both delivery modes of ADR-002, including a copy opened from disk. Pagefind (<a name="apa-pagefind-citation"></a>[CloudCannon, n.d.](#apa-pagefind-reference)) loads its index fragments with `fetch()` and runs a WebAssembly module. Browsers refuse `fetch()` of local files from a `file://` page, so Pagefind returns nothing in a downloaded copy. A `<script src>` tag, by contrast, loads a local file without complaint.

The content is small: six procedures and four other pages per language. French readers often type without accents on phones and shared keyboards.

## Decision

At build time, a transform in `eleventy.config.js` hands each rendered page to `_11ty/search-index.js`, which keeps only the region the layout marks `data-search="body"`, plus the title, summary, `keywords` front matter and headings. After the build it writes `assets/search/<locale>.js`, which assigns an array of entries to `window.BALISE_SEARCH[locale]`.

The search page loads that script and `assets/js/search.js`. Matching folds case and accents, so "generatrice" finds "génératrice". Every word typed must match; the last may be a prefix, so results appear while typing. Hits weigh ten for the title, four for headings and keywords, three for the summary and one for body text. Results show a short extract with matches marked, built with DOM text nodes, never `innerHTML`.

`keywords` exist because people search with words a procedure does not use, "refuge" or "abri" for a shelter. Editors add them in front matter.

The client code is ES5, without modules or arrow functions, so it runs on old browsers.

## Consequences

Search works offline in both modes, from the first page load, with no network and no WebAssembly. Each index is about 15 KiB.

The whole index loads at once. That is right for tens of pages and wrong for thousands; a municipality with a large corpus would want sharding by section or a different tool. The threshold is noted on the roadmap.

There is no stemming. "Génératrices" is found by "generatrice" only because the last word is matched as a prefix. Keywords cover the common synonyms.

## Alternatives considered

Pagefind fails under `file://`, as above. Lunr or MiniSearch would work if bundled as scripts, and would add stemming, at the cost of a dependency and roughly ten times the code for a corpus this size. They remain the natural next step if the corpus grows.

## License

This document, *ADR-003: Search Index as a Plain Script*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## References

<a name="apa-pagefind-reference"></a>CloudCannon. (n.d.). *Pagefind: Static low-bandwidth search at scale*. Retrieved October 6, 2026, from https://pagefind.app/
[Return to citation](#apa-pagefind-citation)

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0 | Draft | Initial draft. |
