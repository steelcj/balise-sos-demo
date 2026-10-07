# Roadmap

Running record of decisions and open work for the Balise SOS demo, newest entry first.

## 2026-10-07, own site, connection indicator, navigation and accessibility

### Decided

- The demo runs as its own site at `https://sos-flow.local/`, beside Balise 0.4.3 at `https://flow.local/`; the name is published over mDNS by a systemd user unit, see the ADR-006 amendment
- Pages open from the stored copy at once and refresh in the background; `version.js` is never stored, so update checks fail honestly offline, see ADR-002 and ADR-007
- A connection indicator with no polling, and navigation submenus following the disclosure pattern, see ADR-007 (proposed)
- The "This copy" page is renamed "Balise"
- Accessibility target WCAG 2.2 Level AA; axe-core runs in the browser test on every page in light and dark schemes, see *Accessibility: Features, Checks and Next Steps*
- `.claude/logs` stays a private scratch record and is not committed
- Releases 0.2.0, pushed with its tag, and 0.3.0, tagged

### Closed

- Caddyfile, container setup and certificate-trust notes added to `en/docs/devops/balise/` (open work of 2026-10-06)
- Caddy address confirmed, `https://sos-flow.local/`, with `BALISE_PUBLIC_URL` set for the demo's builds (open work of 2026-10-06)
- Pushed to GitHub as the code host (open work of 2026-10-06, demo 0.1.0)

### Open work

- Push 0.3.0: `git push && git push origin v0.3.0`
- Move to a production DigitalOcean droplet following the migration guide in `en/docs/guides/devops/`: first the repository changes it lists, then the droplet, staging at `stage.vishpala.com` and production at `balise.vishpala.com`, then ADR-008
- Test `https://sos-flow.local/` on an iPhone and an Android phone: the indicator, the submenus, and switching languages offline
- Accept, amend or reject ADR-007
- Review *Accessibility: Features, Checks and Next Steps* with the owner, section by section, as the technical style guide asks
- Replace Caddy's local root with a root name-constrained to `flow.local` and `sos-flow.local`, install it on each device, and delete the unused root under `/root/.local/share/caddy/` in the container
- Keep `sos-flow.local` published when the operator is logged out, with `loginctl enable-linger` or a system unit; the unit also names a fixed LAN address, `192.168.1.100`
- Remove the trap that a plain `npm run build` targets `https://flow.local/` and `npm run deploy:local` replaces Balise: make the demo's address and folder the defaults
- Install steps per platform on the Balise page, and an Install button where the browser offers one
- On-demand checks of other services, such as Microsoft 365, following the design in the overview
- Accessibility next steps from that document: screen reader and keyboard passes, the search page's `autofocus`, axe best-practice rules, reflow on every page, forced colours, text spacing, table captions, a large print binder, a plain language review, the standard the client must meet
- Decide what to do with the unused `/etc/caddy/sites/` and `/etc/caddy/snippets/` files in the container
- `.claude/CLAUDE.md` refers to `.claude/session-summaries.md`, which does not exist

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
