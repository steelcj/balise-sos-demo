# Contributing

Thank you for helping. Balise is used when things are already going wrong, so changes are judged first by whether they keep working with no network, on old devices, from disk.

## Before you change anything

- Read the [overview](en/docs/architecture/overview--how-balise-works-v0-1-1.md) and the decision records under `en/docs/architecture/adrs/`
- Content changes: follow the [editor guide](en/docs/guides/editor-guide--writing-and-updating-a-procedure-v0-1-1.md); every page needs its other-language partner
- Code changes: keep browser scripts in ES5, add no runtime dependency, and keep every feature working from `file://`

## Before you commit

```bash
npm run build
npm run check
```

Both must pass. If you changed anything offline-related, also run `python3 tests/browser-smoke.py`.

## Documentation

Documents under `en/docs/` follow the house rules in `en/docs/automa/markdown/defaults/`: commas rather than em dashes, no heading numbers, no horizontal rules, no hard line wraps in prose, APA 7 citations using Citation Anchor Pairs. New documents start at 0.1.0, Draft, and every change gets a changelog entry. Record AI assistance in `dc:contributor`.

## Versions

Add entries under `## [Unreleased]` in `CHANGELOG.md` as you work. Releases are cut with `cut-release.py`, see the operator guide.
