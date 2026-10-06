---
dc:title: "ADR-002: Two Offline Delivery Modes From One Build"
dcterms:version: "0.1.1"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why one build yields an installable web copy and a downloadable zip, and how each stays current."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-002-two-offline-delivery-modes-from-one-build"
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
    notes: "Stored copy size updated to about 39 files and 320 KiB after the theme added the font."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-002: Two Offline Delivery Modes From One Build

Version: 0.1.1
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains why one build of Balise produces two offline delivery modes: an installable web copy kept current by a service worker, and a downloadable zip that opens straight from disk. It covers how each mode stores the site, how each learns about updates, and the cost of supporting both.

## Status

Accepted, 2026-10-06.

## Context

The municipality has three sites, a mix of old and new computers, and staff phones. Some devices can be prepared ahead of time by someone who knows what a browser is; some will be used cold, by a volunteer, in a power outage. The user's first idea for distributing copies was ZFS snapshots between sites, which keeps sites in sync but does not reach phones and depends on the municipal network being up.

Two browser mechanisms fit different halves of the problem. A service worker can store every file of a site on the device and serve it with no network (<a name="apa-mdn-service-worker-citation"></a>[MDN contributors, n.d.-b](#apa-mdn-service-worker-reference)), and a web app manifest lets a phone or desktop install the site like an app (<a name="apa-mdn-manifest-citation"></a>[MDN contributors, n.d.-a](#apa-mdn-manifest-reference)). Both only work when the site is served over HTTPS or from localhost. A copy opened from disk, a `file://` address, gets neither.

## Decision

Support both modes from the same output folder.

**Web, installed.** `_11ty/offline-shell.js` writes `sw.js` after each build. The worker's cache name includes a SHA-256 hash of every file it stores, so any change to the site yields a new worker. On first visit with a network the worker stores all files. Pages are fetched network first with a four second limit, falling back to the stored copy; other files come from the store. When a new worker installs, it replaces the stored copy and deletes the old one. The reader does nothing.

**File, downloaded.** `scripts/package-offline.js` zips the output into `download/balise-sos-demo-<version>.zip` with a SHA-256 checksum, under a single versioned top-level folder, with short French and English notes saying to open `index.html`. File times inside the zip are set to the build date, so a given commit always yields the same bytes.

Both modes show the same footer line: which kind of copy it is, its version and build date, and a warning once the copy is older than `staleAfterDays` (30). The "This copy" page has a "Check for updates" button. In the file mode it loads `version.js` from the public site with a `<script>` tag, which the browser permits from `file://` where `fetch()` is refused, and compares versions.

## Consequences

Phones and up-to-date browsers get automatic updates with no effort. Old computers, kiosks and machines where a browser's site storage is wiped get a copy that cannot be evicted, and that also travels on a USB key.

A downloaded copy does not update itself. It can only tell its reader that it is old and that a newer one exists. Getting the new zip onto the device is a human step, recorded in the editor and operator guides.

Everything the site does has to work from `file://`, which shaped two other decisions: relative file links (ADR-004) and the script-based search index (ADR-003).

The service worker stores everything except the zip itself, about 39 files and 320 KiB, which is small enough for a phone on a weak connection.

## Alternatives considered

Web only: simplest, but browsers may clear stored site data, a service worker never installs on a device that never reached the site, and older browsers lack the API. File only: robust, but every update is manual and phones handle unzipped folders poorly. Synchronized folders (ZFS, Syncthing, a shared drive): good for keeping the three sites' desktops current, and still compatible with this decision, since the zip's contents are exactly what such a tool would sync.

## License

This document, *ADR-002: Two Offline Delivery Modes From One Build*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## References

<a name="apa-mdn-manifest-reference"></a>MDN contributors. (n.d.-a). *Web application manifest*. Mozilla. Retrieved October 6, 2026, from https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Manifest
[Return to citation](#apa-mdn-manifest-citation)

<a name="apa-mdn-service-worker-reference"></a>MDN contributors. (n.d.-b). *Service Worker API*. Mozilla. Retrieved October 6, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[Return to citation](#apa-mdn-service-worker-citation)

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.1 | Draft | Stored copy size updated to about 39 files and 320 KiB after the theme added the font. |
| 0.1.0 | Draft | Initial draft. |
