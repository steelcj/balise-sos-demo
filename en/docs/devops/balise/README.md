# Balise local web setup

Current copies of what serves the Balise web copy, so the arrangement can be rebuilt from this repository. See ADR-006 in `en/docs/architecture/adrs/`.

## What is here

- `deploy-local.sh`, copies a build into the incus web container and swaps it into place. Run it through `npm run deploy:local`, or directly as `sh en/docs/devops/balise/deploy-local.sh <site> _site`.
- `Caddyfile`, a copy of `/etc/caddy/Caddyfile` in the `web` container, taken 2026-10-06. It serves two sites from `/srv`, both with Caddy's internal certificate authority.
- `incus-web-container.yaml`, the output of `incus config show web` with the machine-specific `volatile.*` and `image.*` keys removed. It records the proxy devices that publish the container's ports on the host.

## Sites served

| Address | Folder in the container | Contents on 2026-10-06 |
|---------|-------------------------|------------------------|
| `https://flow.local/` | `/srv/balise` | Balise 0.4.3 |
| `https://flow.local:8443/` | `/srv/balise-sos-demo` | Balise SOS demo 0.1.0 |

The demo is built for its own address, so downloaded copies check it for updates:

```bash
BALISE_PUBLIC_URL=https://flow.local:8443/ npm run build
npm run check
sh en/docs/devops/balise/deploy-local.sh balise-sos-demo _site
```

`npm run deploy:local` deploys to `/srv/balise` and would replace Balise 0.4.3.

## Rebuilding the container

The container runs Debian 13 (trixie) on the default profile, with Caddy 2.11.6 installed from the Caddy stable apt repository. Caddy runs as the `caddy` user under systemd with `/etc/caddy/Caddyfile`.

```bash
incus launch images:debian/13 web
incus config device add web http proxy listen=tcp:0.0.0.0:80 connect=tcp:127.0.0.1:80
incus config device add web https proxy listen=tcp:0.0.0.0:443 connect=tcp:127.0.0.1:443
incus config device add web https-sos proxy listen=tcp:0.0.0.0:8443 connect=tcp:127.0.0.1:8443
# inside the container: install caddy, then
incus file push Caddyfile web/etc/caddy/Caddyfile
incus exec web -- caddy validate --config /etc/caddy/Caddyfile --adapter caddyfile
incus exec web -- systemctl reload caddy
```

The launch and install commands are reconstructed from the container's current state, not from a recorded history.

## Trusting the local certificate

A service worker only runs on a page the browser considers secure, so each device that should store the site offline must trust Caddy's local root certificate. The root used by the running service is `/var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt` inside the container. A second root under `/root/.local/share/caddy/` is not the one the service uses, and curl fails against it.

```bash
incus exec web -- cat /var/lib/caddy/.local/share/caddy/pki/authorities/local/root.crt > /tmp/caddy-root.crt
curl --cacert /tmp/caddy-root.crt https://flow.local:8443/version.js
```

On Linux desktops, add the root to the system store; on phones, install it as a user certificate authority. On 2026-10-06 the workstation's own system store did not trust it yet.

The local root certificate itself stays out of the repository: it belongs to one machine, and each operator's Caddy generates its own.

## Unused files in the container

`/etc/caddy/sites/balise.caddy` and `/etc/caddy/snippets/static-site.caddy` exist in the container but the Caddyfile does not import them, so they have no effect. A backup of the Caddyfile before the 8443 site was added is at `/etc/caddy/Caddyfile.bak-2026-10-06`.

## License

This document, *Balise local web setup*, by **Christopher Steel**, with AI assistance from **Claude Opus 5.5 (Anthropic)**, is licensed under the [GNU General Public License v3.0 or later](https://www.gnu.org/licenses/gpl-3.0.html).
