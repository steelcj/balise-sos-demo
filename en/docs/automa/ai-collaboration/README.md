# AI Collaboration

Standing directives for AI collaboration sessions, organized so that what applies by default is answerable by listing one directory.

## Structure

```
defaults/    the directives in force: what every AI collaboration session follows unless explicitly told otherwise
examples/    alternative directives for specific situations, adopted per-project as a deliberate choice over the default
```

## How defaults and examples relate

A directive's title states the rule itself, `Collaboration: <rule>`, and the directory it lives in states its status. Everything under `defaults/` is in force for all AI collaboration sessions automatically. Neither kind of document repeats its status in its title; moving a directive between directories is a status change and is recorded in the document's changelog like any other change.

## Other formats

This structure is per-format. Additional formats live as sibling directories under `automa/`, each with the same `defaults/` and `examples/` shape. See [markdown](../markdown/) for an example.
