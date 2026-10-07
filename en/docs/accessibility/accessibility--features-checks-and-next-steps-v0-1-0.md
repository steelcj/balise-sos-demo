---
dc:title: "Accessibility: Features, Checks and Next Steps"
dcterms:version: "0.1.0"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "The accessibility features Balise has today, how each was confirmed, which kinds of checks to run, and further features to consider with how to confirm them."
dcterms:created: "2026-10-07"
dcterms:modified: "2026-10-07"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "accessibility--features-checks-and-next-steps"
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

# Accessibility: Features, Checks and Next Steps

Version: 0.1.0
Status: Draft
Style Guide: style-guide--technical-documentation-for-technologists

## Abstract

This document records the accessibility of the Balise demo at version 0.2.0 plus the changes listed under Unreleased in `CHANGELOG.md`: the features it has, how each was confirmed and what has not been confirmed yet, the kinds of checks we use and recommend, and further features to consider with the check that would confirm each. It also lists accessibility checking tools and references. It does not claim conformance: automated checks pass, but no manual audit or testing with assistive technology has been done.

## Sources and Acknowledgements

The target is the Web Content Accessibility Guidelines 2.2 at Level AA (<a name="apa-wcag22-citation"></a>[World Wide Web Consortium, 2024](#apa-wcag22-reference)). The navigation submenus follow the disclosure navigation pattern of the ARIA Authoring Practices Guide (<a name="apa-apg-disclosure-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-a](#apa-apg-disclosure-reference)). Automated checks use axe-core (<a name="apa-axe-core-citation"></a>[Deque Systems, n.d.](#apa-axe-core-reference)). The typeface is Atkinson Hyperlegible (<a name="apa-atkinson-citation"></a>[Braille Institute of America, n.d.](#apa-atkinson-reference)).

## Scope and target

The scope is every page of the built site in both languages, in both offline modes, in light and dark colour schemes, and the printed binder. The target is WCAG 2.2 Level AA. Balise is meant for municipal staff and residents under stress, on old computers and phones, sometimes in poor light and with little battery; accessibility is part of whether it works in an emergency at all, not an addition to it.

## Does the search box have a label

Yes, both of them.

- The search box in the navigation of every page has a `<label for="q-mini">`, "Search the procedures" or "Rechercher dans les procédures". The label is visually hidden, because the box sits beside its "Search" button in a form marked `role="search"`, but screen readers and voice control read it.
- The box on the search page has a visible `<label for="q">` with the same words.

This is what Info and Relationships asks of a form field: the relationship between the box and its words is in the markup, not only in the layout (<a name="apa-understanding-131-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-c](#apa-understanding-131-reference)). The placeholder ("e.g. generator") is an example only and is not used as a label, so it can disappear on typing without loss. axe-core's `label` rule passes on every page in both schemes. One thing to reconsider: the search page box uses `autofocus`, which moves focus past the skip link and the navigation on arrival. It is convenient on a page whose only purpose is search, but it can disorient screen reader users; see *Further features to consider*.

## Current features and how they were confirmed

"Automated" means the browser test, `tests/browser-smoke.py`, checks it on every run. "Measured" means a contrast ratio computed from the palette with the WCAG formula. "Not yet" means no one has confirmed it.

| Feature | How Balise does it | WCAG 2.2 | Confirmed |
|---------|--------------------|----------|-----------|
| Page language | `lang="fr-CA"` or `lang="en-CA"` on every page; the language switch link carries `lang` and `hreflang` for the other language | 3.1.1, 3.1.2 | Automated, axe |
| Skip link | "Skip to content" is the first focusable element and moves focus to `<main>`, which accepts focus | 2.4.1 | Automated, axe; keyboard use not yet |
| Real headings | One `<h1>` per page, sections as `<h2>` and `<h3>`, never bold text standing in for a heading; section headings carry ids, so any section can be linked to | 1.3.1, 2.4.6 | Automated, axe; heading order rule not run, see below |
| Landmarks | `<header>`, `<nav aria-label>`, `<main>`, `<footer>`, and `role="search"` on both search forms | 1.3.1 | Automated, axe |
| Form labels | Both search boxes and every procedure checkbox have a programmatic label | 1.3.1, 3.3.2, 4.1.2 | Automated, axe |
| Text contrast | Light and dark schemes, see the measured ratios below | 1.4.3 | Automated, axe in both schemes; measured |
| Focus indicator | A 3 px outline on every link, button, input and `<main>`: navy on light paper, amber on dark paper and in the header | 2.4.7, 1.4.11 | Measured; fixed in this change, see below |
| Target size | Navigation links, buttons, the language switch, the indicator and the submenu buttons are at least 44 px high; submenu buttons are 44 px square | 2.5.8 | Automated, axe `target-size` |
| Reflow | One column, no fixed widths; header controls wrap under the brand on a narrow phone | 1.4.10 | Automated at 320 px with a submenu open, on one page; all pages not yet |
| Not colour alone | Procedure priority is written ("Priority"), the indicator states are words with a dot that only repeats them, a stale copy is announced in words as well as turning red | 1.4.1 | Design review |
| Status messages | The copy status line, the update result, the search result count and connection changes are announced through polite live regions | 4.1.3 | Not yet with a screen reader |
| Submenus | Disclosure pattern: the item stays a link, a separate button with `aria-expanded` and `aria-controls` opens the list; Enter or Space toggles, Tab enters the list, Escape closes it and returns focus to the button; a click or focus elsewhere closes it | 2.1.1, 4.1.2 | Automated, keyboard sequence and axe with a list open |
| Indicator | A button whose accessible name begins with its visible text ("Offline. Check the connection") | 2.5.3, 4.1.2 | Automated, axe; name checked in markup |
| Typeface | Atkinson Hyperlegible, which keeps similar letters and figures distinct, with a system fallback | Not a criterion | Design choice |
| Without JavaScript | Every page, link and procedure reads; submenus and the indicator stay hidden; search explains it needs scripts | Robustness | Not yet re-checked after this change |
| Dark scheme and motion | Follows the device setting; nothing animates | 1.4.3, 2.3.3 | Automated, axe in dark scheme |
| Paper | The printable version prints black on white with empty boxes to tick | Not a criterion | Not yet |

Target sizes go beyond the 24 px minimum of WCAG 2.2 (<a name="apa-understanding-258-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-g](#apa-understanding-258-reference)), because Balise is used on phones, sometimes with gloves or cold hands. The live regions follow the status messages criterion, which asks that a change of status reach a screen reader without moving focus (<a name="apa-understanding-413-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-d](#apa-understanding-413-reference)).

### Measured contrast

| Pair | Ratio | Needed |
|------|-------|--------|
| Navy text on white paper | 15.97:1 | 4.5:1 |
| Muted text on light panel | 6.69:1 | 4.5:1 |
| Muted text on dark panel | 7.43:1 | 4.5:1 |
| Navy text on amber copy line | 9.21:1 | 4.5:1 |
| White on stop red, 911 band | 5.88:1 | 4.5:1 |
| Dark ink on dark-scheme red band | 6.28:1 | 4.5:1 |
| Amber focus ring on white paper, before this change | 1.73:1 | 3:1 |
| Navy focus ring on white paper, now | 15.97:1 | 3:1 |
| Amber focus ring on dark paper | 10.03:1 | 3:1 |
| Amber focus ring on the navy header | 9.21:1 | 3:1 |

The amber focus ring on white paper failed the 3:1 that non-text contrast requires for a focus indicator (<a name="apa-understanding-1411-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-e](#apa-understanding-1411-reference)). It was found while preparing this document and fixed in the same change: the ring is navy on light paper and stays amber where amber has the contrast. axe-core does not test focus indicators, which is why the ratio was computed by hand.

### What the automated pass covers

The browser test runs axe-core 4.14.0 on all 25 HTML pages of the build, once in the light scheme and once in the dark, with the WCAG 2.0, 2.1 and 2.2 Level A and AA rule sets. On 2026-10-07 it found no violations. It also checks the keyboard sequence of the submenus, that an open submenu at 320 px causes no sideways scroll, and that the indicator states follow the network.

## Kinds of accessibility checks

No single kind of check is enough; each finds what the others miss. We use and recommend five kinds, from cheapest to most telling.

### Automated rules

Tools such as axe-core apply rules to the rendered page: missing labels, contrast of text, invalid ARIA, missing language. They are fast, repeatable and belong in every test run, which is where Balise has them. They find only a part of the problems: they cannot judge whether a label makes sense, whether focus order is logical, or whether a screen reader user can complete a procedure.

Other automated checkers are worth running by hand from time to time, since each applies its own rules: WAVE (<a name="apa-wave-citation"></a>[WebAIM, n.d.-b](#apa-wave-reference)), Accessibility Insights (<a name="apa-insights-citation"></a>[Microsoft, n.d.](#apa-insights-reference)), the accessibility audit in Lighthouse (<a name="apa-lighthouse-citation"></a>[Google, n.d.](#apa-lighthouse-reference)), and Pa11y for the command line (<a name="apa-pa11y-citation"></a>[Pa11y, n.d.](#apa-pa11y-reference)). The Web Accessibility Initiative keeps a longer list (<a name="apa-tools-list-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-h](#apa-tools-list-reference)). For a single colour pair, the WebAIM Contrast Checker gives the ratio at once (<a name="apa-contrast-checker-citation"></a>[WebAIM, n.d.-a](#apa-contrast-checker-reference)), and the Nu Html Checker finds invalid markup that confuses assistive technology (<a name="apa-nu-checker-citation"></a>[World Wide Web Consortium, n.d.](#apa-nu-checker-reference)).

### Keyboard

Unplug the mouse and use Tab, Shift+Tab, Enter, Space and Escape through every page: the skip link appears and works, focus is always visible, nothing traps focus, submenus open and close, and every action is reachable.

### Screen readers

Read pages and complete a task, for example finding and ticking through the power outage procedure, with NVDA on Windows (<a name="apa-nvda-citation"></a>[NV Access, n.d.](#apa-nvda-reference)), VoiceOver on iPhone and macOS, and TalkBack on Android, in French and English. Listen for the language change on the switch link, the submenu state, and the live announcements.

### Visual settings

Zoom to 200 % and 400 %, set a large default text size, turn on a forced colours or high contrast theme, apply increased text spacing, and use the dark scheme. Content should reflow, stay readable and keep every control visible (<a name="apa-understanding-reflow-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-f](#apa-understanding-reflow-reference)).

### People

Testing with disabled people, ideally municipal staff who would use Balise in an emergency, finds what no checklist does. Before a real deployment, a structured evaluation with WCAG-EM (<a name="apa-wcag-em-citation"></a>[World Wide Web Consortium, 2026](#apa-wcag-em-reference)) gives a result a municipality can rely on.

### When to run them

Automated rules on every change, through the browser test. A keyboard pass and a short screen reader pass before each release. Visual settings when the layout or theme changes. A WCAG-EM evaluation and tests with people before Balise holds a real municipality's procedures. The Easy Checks from the Web Accessibility Initiative are a useful first review for anyone new to this (<a name="apa-easy-checks-citation"></a>[World Wide Web Consortium Web Accessibility Initiative, n.d.-b](#apa-easy-checks-reference)).

## Further features to consider

Each item names the change and how we would confirm it.

| Consideration | Why | How to confirm |
|---------------|-----|----------------|
| Remove `autofocus` from the search page, or keep it and confirm it helps | Moving focus on arrival can skip context for screen reader users | Screen reader test of arriving at the search page from the header form and from the menu |
| Run axe's best-practice rules as well | `heading-order`, `region` and similar rules are outside the WCAG tag sets but catch real problems | Add the `best-practice` tag to the browser test and review the first results |
| Reflow on every page at 320 px and at 400 % zoom | Only one page is checked today | Extend the 320 px check in the browser test to every page |
| Forced colours and Windows contrast themes | The indicator dot and the submenu chevrons are drawn with CSS borders and backgrounds, which forced colours may change | Playwright's forced colours emulation plus a look on Windows with a contrast theme |
| Text spacing | WCAG 1.4.12 requires content to survive increased letter, word and line spacing | Apply the spacing values with a user style and look for clipped text |
| Table captions | Contacts tables follow headings but have no `<caption>`, so a screen reader listing tables hears no name | Add captions, then a screen reader pass of the Contacts page |
| Large print binder | Some readers need the paper copy in larger type | A print style option, checked by printing |
| Plain language review | Procedures are read under stress; reading level matters as much as markup | Review by a plain language editor in both languages, and a reading-level check |
| Keep checkbox progress | Ticked steps are lost on reload, which costs people who need breaks or switch devices | A per-device option to keep progress, with a keyboard and screen reader check of the reset control |
| Confirm the standard the client must meet | Quebec public bodies may have to follow the provincial web accessibility standard, SGQRI 008; Canadian federal bodies follow other rules | Ask the client municipality, then map that standard's requirements to this document |

## License

This document, *Accessibility: Features, Checks and Next Steps*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Resources

### Standards and guidance

- [Web Content Accessibility Guidelines (WCAG) 2.2](#apa-wcag22-reference)
- [Example Disclosure Navigation Menu, ARIA Authoring Practices Guide](#apa-apg-disclosure-reference)
- [Understanding Success Criterion 1.3.1: Info and Relationships](#apa-understanding-131-reference)
- [Understanding Success Criterion 1.4.10: Reflow](#apa-understanding-reflow-reference)
- [Understanding Success Criterion 1.4.11: Non-text Contrast](#apa-understanding-1411-reference)
- [Understanding Success Criterion 2.5.8: Target Size (Minimum)](#apa-understanding-258-reference)
- [Understanding Success Criterion 4.1.3: Status Messages](#apa-understanding-413-reference)

### Evaluation methods

- [Easy Checks: A First Review of Web Accessibility](#apa-easy-checks-reference)
- [WCAG Evaluation Methodology (WCAG-EM) 2.0](#apa-wcag-em-reference)
- [Web Accessibility Evaluation Tools List](#apa-tools-list-reference)

### Checking tools

- [axe-core, the rules engine used by the browser test](#apa-axe-core-reference)
- [WAVE Web Accessibility Evaluation Tools](#apa-wave-reference)
- [Accessibility Insights](#apa-insights-reference)
- [Lighthouse](#apa-lighthouse-reference)
- [Pa11y](#apa-pa11y-reference)
- [WebAIM Contrast Checker](#apa-contrast-checker-reference)
- [Nu Html Checker](#apa-nu-checker-reference)

### Assistive technology and type

- [NVDA screen reader](#apa-nvda-reference)
- [Atkinson Hyperlegible font](#apa-atkinson-reference)

## References

<a name="apa-atkinson-reference"></a>Braille Institute of America. (n.d.). *Atkinson Hyperlegible font*. Retrieved October 7, 2026, from https://www.brailleinstitute.org/freefont/
[Return to citation](#apa-atkinson-citation)

<a name="apa-axe-core-reference"></a>Deque Systems. (n.d.). *axe-core* (Version 4.14.0) [Computer software]. GitHub. Retrieved October 7, 2026, from https://github.com/dequelabs/axe-core
[Return to citation](#apa-axe-core-citation)

<a name="apa-lighthouse-reference"></a>Google. (n.d.). *Introduction to Lighthouse*. Chrome for Developers. Retrieved October 7, 2026, from https://developer.chrome.com/docs/lighthouse/overview
[Return to citation](#apa-lighthouse-citation)

<a name="apa-insights-reference"></a>Microsoft. (n.d.). *Accessibility Insights* [Computer software]. Retrieved October 7, 2026, from https://accessibilityinsights.io/
[Return to citation](#apa-insights-citation)

<a name="apa-nvda-reference"></a>NV Access. (n.d.). *Download NVDA* [Computer software]. Retrieved October 7, 2026, from https://www.nvaccess.org/download/
[Return to citation](#apa-nvda-citation)

<a name="apa-pa11y-reference"></a>Pa11y. (n.d.). *Pa11y* [Computer software]. Retrieved October 7, 2026, from https://pa11y.org/
[Return to citation](#apa-pa11y-citation)

<a name="apa-contrast-checker-reference"></a>WebAIM. (n.d.-a). *Contrast checker*. Retrieved October 7, 2026, from https://webaim.org/resources/contrastchecker/
[Return to citation](#apa-contrast-checker-citation)

<a name="apa-wave-reference"></a>WebAIM. (n.d.-b). *WAVE web accessibility evaluation tools*. Retrieved October 7, 2026, from https://wave.webaim.org/
[Return to citation](#apa-wave-citation)

<a name="apa-wcag22-reference"></a>World Wide Web Consortium. (2024). *Web Content Accessibility Guidelines (WCAG) 2.2* (W3C Recommendation, 12 December 2024). https://www.w3.org/TR/WCAG22/
[Return to citation](#apa-wcag22-citation)

<a name="apa-wcag-em-reference"></a>World Wide Web Consortium. (2026). *WCAG evaluation methodology (WCAG-EM) 2.0*. https://www.w3.org/TR/WCAG-EM/
[Return to citation](#apa-wcag-em-citation)

<a name="apa-nu-checker-reference"></a>World Wide Web Consortium. (n.d.). *Nu Html Checker*. Retrieved October 7, 2026, from https://validator.w3.org/nu/
[Return to citation](#apa-nu-checker-citation)

<a name="apa-apg-disclosure-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-a). *Example disclosure navigation menu*. ARIA Authoring Practices Guide. Retrieved October 7, 2026, from https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/examples/disclosure-navigation/
[Return to citation](#apa-apg-disclosure-citation)

<a name="apa-easy-checks-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-b). *Easy checks: A first review of web accessibility* [Draft]. Retrieved October 7, 2026, from https://www.w3.org/WAI/test-evaluate/easy-checks/
[Return to citation](#apa-easy-checks-citation)

<a name="apa-understanding-131-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-c). *Understanding success criterion 1.3.1: Info and relationships*. Retrieved October 7, 2026, from https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html
[Return to citation](#apa-understanding-131-citation)

<a name="apa-understanding-413-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-d). *Understanding success criterion 4.1.3: Status messages*. Retrieved October 7, 2026, from https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
[Return to citation](#apa-understanding-413-citation)

<a name="apa-understanding-1411-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-e). *Understanding success criterion 1.4.11: Non-text contrast*. Retrieved October 7, 2026, from https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
[Return to citation](#apa-understanding-1411-citation)

<a name="apa-understanding-reflow-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-f). *Understanding success criterion 1.4.10: Reflow*. Retrieved October 7, 2026, from https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
[Return to citation](#apa-understanding-reflow-citation)

<a name="apa-understanding-258-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-g). *Understanding success criterion 2.5.8: Target size (minimum)*. Retrieved October 7, 2026, from https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
[Return to citation](#apa-understanding-258-citation)

<a name="apa-tools-list-reference"></a>World Wide Web Consortium Web Accessibility Initiative. (n.d.-h). *Web accessibility evaluation tools list*. Retrieved October 7, 2026, from https://www.w3.org/WAI/test-evaluate/tools/list/
[Return to citation](#apa-tools-list-citation)

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.0 | Draft | Initial draft. |
