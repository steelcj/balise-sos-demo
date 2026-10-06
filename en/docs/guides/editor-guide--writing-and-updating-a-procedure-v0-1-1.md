---
dc:title: "Editor Guide: Writing and Updating a Procedure"
dcterms:version: "0.1.1"
dc:creator: "Christopher Steel"
dc:contributor: "Claude Opus 5.5 (Anthropic)"
dc:description: "How to write a Balise procedure, keep French and English together, and get changes to every copy."
dcterms:created: "2026-10-06"
dcterms:modified: "2026-10-06"
dc:format: "text/markdown"
dc:language: "en"
sat:language_bcp47: "en"
dc:identifier: "editor-guide--writing-and-updating-a-procedure"
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
    notes: "Removed the icon field, dropped with the new theme; priority description matches the Priority label."
  - version: "0.1.0"
    date: "2026-10-06"
    author: "Christopher Steel"
    notes: "Initial draft."
---

# Editor Guide: Writing and Updating a Procedure

Version: 0.1.1
Status: Draft
Style Guide: style-guide--plain-language-for-general-audiences

## Abstract

This guide is for the people who write and keep the procedures up to date. It explains how a procedure page is laid out, how to write steps that work under stress, how to keep the French and English versions together, and how to get a change out to every copy.

## Where the procedures are

Each procedure is one text file. French ones are in `content/fr-ca/procedures/`, English ones in `content/en-ca/procedures/`. The file name becomes the web address, so use lowercase words joined by hyphens, with no accents: `panne-electricite-prolongee.md`.

## The top of the file

Every procedure starts with a short block between two lines of three dashes. It tells the site what to show around the steps.

```yaml
---
title: Panne d’électricité prolongée
summary: Maintenir les services essentiels et protéger les personnes vulnérables quand le courant ne revient pas.
relation: urn:uuid:fa2d8989-a9e0-4a28-9108-06c58aac00fc
identifier: panne-electricite-prolongee
order: 2
priority: high
keywords: ["électricité", "courant", "génératrice"]
responsible: Direction des travaux publics
reviewed: 2026-09-15
docVersion: "1.1"
---
```

| Line | What it does |
|------|--------------|
| `title` | The name of the procedure, as people say it |
| `summary` | One sentence: what the procedure is for. Shown in lists and search results |
| `relation` | The code that ties this page to its translation. Copy it exactly from the other language |
| `identifier` | The file name without `.md` |
| `order` | Position in the list, 1 first |
| `priority` | `high` marks the procedure in red, labelled Priority, in every list; leave it out otherwise |
| `keywords` | Other words people might search with, like "refuge" for a shelter |
| `responsible` | The role, not the person, so it stays true when people change |
| `reviewed` | The date someone last checked the whole procedure |
| `docVersion` | The procedure's own version. Raise it when steps change |

## Writing the steps

Below the top block, write sections with `##` and steps with `-`. Every line that starts with `-` becomes a box to tick.

- Start each step with a verb: "Call", "Check", "Record"
- One action per step. If a step says "and then", split it
- Put the most dangerous mistake first, in a box that starts with `>`
- Name places and roles the same way everywhere, as on the Contacts page
- Give the fallback: what to do when the phone, the power or the person is missing
- Link to another procedure rather than copying its steps

A procedure should read in a few minutes. If it grows past one printed page or two, it is probably two procedures.

## Keeping both languages together

Every procedure exists in both languages, with the same `relation` code. To add one, write it in French, copy the file into the English folder, give it an English file name and title, translate it, and keep the code. To get a new code, run `uuidgen -r` and put `urn:uuid:` in front.

The build warns if a page has no partner in the other language. The site check fails until it does.

## Getting a change out

Changes reach people in three ways, at three speeds. Installed web copies update themselves the next time they see a network. Downloaded copies need a new zip: raise the site version so they can tell they are old, and replace the zip on each computer and USB key. Printed binders need a new print, so print the "Printable version" page after every release and swap the binders.

## Reviewing

Review each procedure at least once a year and after every event where it was used. Change `reviewed` even when nothing else changes, so readers can see it was checked.

## License

This document, *Editor Guide: Writing and Updating a Procedure*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).

## Changelog

| Version | Status | Notes |
|---------|--------|-------|
| 0.1.1 | Draft | Removed the icon field, dropped with the new theme; priority description matches the Priority label. |
| 0.1.0 | Draft | Initial draft. |
