# Roadmap

Running record of decisions and open work for the Balise SOS demo, newest entry first.

## 2026-10-06, self-hosting and theme

### Decided

- No GitHub Actions or GitHub Pages; publish to the incus web container on `flow.local`, later to a Vishpala server, see ADR-006
- Signage-based look with Atkinson Hyperlegible, stored with the site

### Open work

- Build the site from `fr-ca/docs/saint-exemple-plan-v0.0.3.md`: compile the public blocks into the residents' guide and public plus internal blocks into the team's guide, keep restricted blocks out of every digital copy, and replace the Saint-Démo-des-Neiges demo content
- Add the Caddyfile, the container setup and certificate-trust notes to `en/docs/devops/balise/`
- Confirm the Caddy address for the Balise site, root of `flow.local` or a sub-path, and set `BALISE_PUBLIC_URL` if it differs

## 2026-10-06, demo 0.1.0

### Decided

- Static Eleventy site, two offline modes from one build, script-loaded search, relative file links, French and English paired by Work identifier, see ADR-001 to ADR-005
- Code and code documentation under GPL-3.0-or-later; demo content under CC BY 4.0, following `vishpala-eleventy-mvp`
- Release-managed: the devops trio is included, since downloadable copies compare versions

### Open work

- Push to GitHub as the code host only
- `check-conformance.py` reports 8 em dashes in the synced example `conserving-bandwidth-and-compute-with-claude.md`; fix upstream in sat-doc-automa and resync rather than editing the copy here
- Add a `ff-manifest-balise-sos-demo.yaml` to sat-doc-automa declaring the shared items this repository carries
- Choose the documentation register on each document's `Style Guide:` line with the owner; technical and plain language were assigned by audience in this first pass
- Translate the editor guide and the demo script into French, under `fr/docs/`
- A web editing screen with Sveltia CMS over `content/`, as on the Eleventy site
- A sync method for the three sites' desktops: the unzipped folder is what to sync, whether by ZFS snapshots, Syncthing or a shared drive
- Search: move to Lunr or MiniSearch, bundled as scripts, if the corpus passes a few hundred pages or stemming is needed
- Optional preferences panel (text size, contrast), for example Fluid Infusion UI Options, weighed against page weight
- Replace demo content with the client municipality's real procedures, owners and review dates
