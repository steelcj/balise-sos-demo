# CLAUDE.md

This repository governs its documents with standing rules, called automa. An automa is followed exactly, every time, by whoever picks it up, human or AI.

Read this before starting any work.

## Rules in force

- Every directive in `en/docs/automa/ai-collaboration/defaults/` applies to this session.
- Every markdown rule in `en/docs/automa/markdown/defaults/` applies to everything you write here.
- License sections come from the templates in `en/docs/automa/licenses/`.

## Style guides

- Style guides are defined in sat-doc-automa, under `en/docs/guides/style-guides/` there; they are not synced into this repository.
- Every document names its governing guide on the `Style Guide:` line in its version block.
- Follow the guide the document names. When editing, the document's declared guide wins.
- When creating a new document, ask which register applies, technical or plain language, and record the choice on the `Style Guide:` line.

## Attribution

- Record AI assistance in `dc:contributor` using the form "Name (Organization)".
- Transcribe what is true. Never invent it. Leave the field out entirely when no AI helped.

## Versioning

- New documents start at version 0.1.0 with Status: Draft.
- Every change gets a changelog entry.

## If this file and a rule disagree

The rule document wins. This file is a signpost, not the law. If it points the wrong way, fix this file.

# Balise SOS demo

Below this line is this repository's own guidance.

## What must stay true

- Every page works opened from disk (`file://`), from a domain root, and from a sub-path. Write root links (`/fr-ca/...`); the build makes them relative. Never hand-write relative links.
- Browser scripts in `assets/js/` are ES5, no modules, no build step, no runtime dependency.
- Every page in `content/fr-ca/` has a partner in `content/en-ca/` with the same `relation`.
- `VERSION` is the only place the version is written.

## Commands

- `npm run build`, then `npm run check`. Both must pass before a commit.
- `python3 tests/browser-smoke.py` after any change to offline behaviour. It needs Playwright and Chromium.
- Ask before running the browser test or a full reinstall, per the energy-conservation directive.
