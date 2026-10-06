# Markdown

Standing directives for markdown documents, organized so that what applies by default is answerable by listing one directory.

## Structure

```
defaults/    the directives in force: what every markdown document follows unless explicitly told otherwise
examples/    alternative directives for specific situations, adopted per-document or per-project, never silently
```

## How defaults and examples relate

A directive's title states the rule itself, `Markdown: <rule>`, and the directory it lives in states its status. Everything under `defaults/` is in force for all markdown documents automatically. Documents under `examples/` will hold alternatives, for instance, a heading-numbering directive for a document series that genuinely benefits from numbered sections, adopted per-document or per-project as a deliberate choice over the default. Neither kind of document repeats its status in its title; moving a directive between directories is a status change and is recorded in the document's changelog like any other change.

Adjusting a default over time means versioning the default document itself, the same way any versioned document changes, not editing an example into its place. The `defaults/` directory always answers the question "what is in force right now."

## Other formats

This structure is per-format. Additional formats live as sibling directories under `automa/`, each with the same `defaults/` and `examples/` shape. See [ai-collaboration](../ai-collaboration/) for an example.
