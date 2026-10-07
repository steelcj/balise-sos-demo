---
dc:title: "ADR-007: Connection Indicator and Section Submenus"
dcterms:version: "0.1.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "Why Balise shows whether the network is reachable without polling, why version.js is never stored, and why the navigation submenus follow the disclosure pattern."
dcterms:created: "2026-10-07"
dcterms:modified: "2026-10-07"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "adr-007-connection-indicator-and-section-submenus"
dcterms:rightsHolder: "Christopher Steel"
dc:rights: >
  Copyright 2026 Christopher Steel.
  SPDX-License-Identifier: GPL-3.0-or-later
sat:uuid: ""
sat:version_at_creation: ""
sat:migration_status: pre-sat
sat:changelog:
  - version: "0.1.0"
    date: "2026-10-07"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# ADR-007: Connection Indicator and Section Submenus

Version: 0.1.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This record explains two decisions made together in 0.3.0. First, how Balise tells the reader whether the network is reachable: an indicator that learns from requests made anyway, with no polling, and a `version.js` that is never stored, so that its answer is truthful. Second, how the main navigation offers direct links to procedures and page sections: dropdown submenus following the disclosure pattern rather than an ARIA menu.

## Sources and Acknowledgements

The browser's online state is described by the Mozilla Developer Network (<a name="apa-mdn-online-adr7-citation"></a>[MDN contributors, n.d.](#apa-mdn-online-adr7-reference)). The submenus follow the disclosure navigation example of the ARIA Authoring Practices Guide (<a name="apa-apg-disclosure-adr7-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.](#apa-apg-disclosure-adr7-reference)).

## Status

Proposed, 2026-10-07. Implemented in 0.3.0; awaiting the owner's acceptance.

## Context

The owner asked for an indicator showing whether Balise is online or offline that uses few resources, with a button to check connectivity as an alternative, and later checks of other services such as Microsoft 365. Balise runs on old phones and computers, often on battery and metered data, and its whole purpose is to work when the network does not; anything that costs power or data while a reader is only reading works against it.

Two facts shaped the design. The browser's online state reports a connection whenever a network interface is up, so it is true on a phone connected to Wi-Fi with no route to the Internet, the situation suspected, though not confirmed, behind slow page changes on an iPhone in 0.1.0 (<a name="apa-mdn-online-adr7-citation-2"></a>[MDN contributors, n.d.](#apa-mdn-online-adr7-reference)). And until 0.3.0 the service worker stored `version.js` and fell back to it when the network failed, so an offline web copy answered "up to date" from its own store.

The owner also asked for dropdown submenus so that everyone can reach the section they need quickly: Procedures listing each procedure, and other items listing the sections of their page. Section headings had no ids, so there was nothing to link to.

## Decision

### Connection indicator

A button in the header of every page states one of three things in words: Online, the server answered a moment ago; Offline, the device has no network or the last attempt failed; Network not checked, the device reports a connection nobody has tried yet. A dot repeats the state and is never the only signal.

It learns from signals that cost no request of their own. Each background page refresh the service worker already performs reports whether the network answered, by message to open pages; a page that opens before its refresh finishes asks the worker for the last result. A network that neither answers nor fails within four seconds counts as offline until it answers. The browser's `offline` event is trusted as it stands; its `online` event triggers one check. On a first visit, before any worker controls the page, the page itself came from the server and is taken as proof of reach.

Pressing the indicator checks the connection by loading `version.js` with a `<script>` tag, which works from `file://` as well. Connection changes the reader causes or the network causes are announced through a polite live region; the silent update after each page load is not, so a screen reader does not repeat "online" on every page.

### version.js is never stored

`version.js` is excluded from the stored files and the worker does not answer it, so every request for it reaches the network or fails. Both the update check and the indicator rely on it, and both need a failure to be reported as a failure.

### Section submenus

Each navigation item that has a submenu stays a link to its page. A separate button beside it, with `aria-expanded` and `aria-controls`, shows or hides a list of links. Enter or Space toggles it, Tab moves into it, Escape closes it and returns focus to the button, and a click or focus elsewhere closes it. Without JavaScript the buttons and lists stay hidden and every page is still one link away. On a narrow screen an open list takes the full row and pushes the page down; on a wider one it drops below its item.

Procedures lists every procedure of the locale. Contacts and Balise list their own `##` headings. `_11ty/headings.js` reads those headings from each page's markdown source and writes matching ids onto the page's `<h2>` elements, so a menu link and its target are produced from one list and cannot disagree. Which items have submenus, and of which kind, is set in `_data/nav.js`.

## Consequences

The indicator costs nothing while the reader reads: no timer, no extra request, no battery or data. Its "Online" is evidence, not a guess, at the price of a third state, "Network not checked", which readers have to be told about; the Balise page explains it in both languages.

The update check and the indicator now fail honestly when offline. A downloaded copy behaves as before, since it never had a worker.

Every page carries its submenu links, which grew the stored copy from about 322 KiB to about 406 KiB. Section ids are stable only as long as heading wording is: renaming a heading changes its id and breaks outside links to that section, though never the menu.

The printable version gets no section ids, since it gathers every procedure on one page where their ids would repeat.

## Alternatives considered

The browser's online state alone was cheapest, but it cannot say "online" truthfully on a network without Internet. Polling a server every few seconds would be accurate and would cost battery and data on exactly the devices Balise is for. The Network Information API is not offered by Safari or Firefox. A button only, without an indicator, met the owner's fallback but would leave the reader without the signal they need at a glance.

For the submenus, an ARIA `menu` with `menuitem` roles promises application-style arrow-key behaviour that site navigation does not need and that screen reader users do not expect there; the disclosure pattern keeps links as links. Making the top item a button that only opens the list would hide its own page behind an extra step. Hover menus fail on touch screens and for keyboard users. A heading-id plugin for markdown-it would add a dependency, and ids added at the markdown level would repeat on the printable version.

Checking other services, such as Microsoft 365, is left for later. A page can learn only whether such a service answered, not whether it works, and each check reveals the device's address and time to that service, so the list should be short, named and chosen by the municipality. The overview describes the intended design.

## License

This document, *ADR-007: Connection Indicator and Section Submenus*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Resources

### Platform and pattern references

- [Navigator: onLine property](#apa-mdn-online-adr7-reference)
- [Example Disclosure Navigation Menu](#apa-apg-disclosure-adr7-reference)

## References

<a name="apa-mdn-online-adr7-reference"></a>MDN contributors. (n.d.). *Navigator: onLine property*. Mozilla. Retrieved October 7, 2026, from https://developer.mozilla.org/en-US/docs/Web/API/Navigator/onLine
[Return to citation](#apa-mdn-online-adr7-citation)

<a name="apa-apg-disclosure-adr7-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.). *Example disclosure navigation menu*. ARIA Authoring Practices Guide. Retrieved October 7, 2026, from https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
[Return to citation](#apa-apg-disclosure-adr7-citation)

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0 | Draft | Initial draft. |
