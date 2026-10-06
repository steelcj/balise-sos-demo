# Balise local web setup

Current copies of what serves the Balise web copy, so the arrangement can be rebuilt from this repository. See ADR-006 in `en/docs/architecture/adrs/`.

## What is here

- `deploy-local.sh`, copies a build into the incus web container and swaps it into place. Run it through `npm run deploy:local`.

## Still to add

- The Caddyfile used in the web container
- The incus commands or profile that create the container
- Notes on trusting Caddy's local root certificate on each device

The local root certificate itself stays out of the repository: it belongs to one machine, and each operator's Caddy generates its own.

## License

This document, *Balise local web setup*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).
