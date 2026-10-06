#!/bin/sh
# Copy a site build into the web container and swap it in, so visitors never see a half-copied site.
# Usage: ./deploy-local.sh <site-name> <build-folder>     e.g. ./deploy-local.sh balise ~/balise/dist/site
set -eu
site="$1"
build="$2"
container="${WEB_CONTAINER:-web}"
srv="/srv"

[ -f "$build/index.html" ] || { echo "No index.html in $build; build the site first." >&2; exit 1; }

incus exec "$container" -- rm -rf "$srv/$site.new"
incus exec "$container" -- mkdir -p "$srv/$site.new"
tar -C "$build" -cf - . | incus exec "$container" -- tar -C "$srv/$site.new" --no-same-owner -xf -
incus exec "$container" -- sh -c "rm -rf '$srv/$site.old'; if [ -d '$srv/$site' ]; then mv '$srv/$site' '$srv/$site.old'; fi; mv '$srv/$site.new' '$srv/$site'; rm -rf '$srv/$site.old'"
echo "Deployed $build to $container:$srv/$site"
