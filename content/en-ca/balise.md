---
title: Balise
summary: Where this copy of Balise came from, how old it is, how it stays current, and whether the network is reachable.
relation: urn:uuid:878f8e32-6292-4bef-8bf3-5de3e882bd8d
order: 40
---
<p class="notice">Version <strong>{{ site.version }}</strong>, produced on <strong>{{ site.buildDay }}</strong>.</p>

## Two ways to have Balise with no network

### On the web, installed

Open the site once with a connection. The browser then stores the whole site on the device. After that it opens even with no network. On a phone, add it to the home screen.

### As a file, downloaded

Download the zip file, unzip it onto the computer or a USB key, then open `index.html`. No installation, no account, no network. Handy for shared workstations and old computers.

<div class="only-web">
<p><a href="/download/{{ site.packageName }}.zip">Download the offline copy ({{ site.packageName }}.zip)</a>, and its <a href="/download/{{ site.packageName }}.zip.sha256">SHA-256 checksum</a> to verify it.</p>
</div>
<div class="only-file">
<p>You are already using a downloaded copy. To get a newer one, check below when the network works.</p>
</div>

## How updating works

### On the web, installed

Every page opens at once from the copy stored on the device, with or without a network. When the network works, Balise quietly fetches the newest version of that page in the background, so the next visit shows it.

When the municipality publishes a new version, the browser notices it the next time Balise is opened with a network. It downloads the whole new version in the background and switches to it only once every file has arrived, so you never see half of one version and half of another. Nothing needs to be pressed.

### As a file, downloaded

A downloaded copy never changes by itself. Press "Check for updates" below when the network works. If a newer version exists, download the new zip and replace the old folder.

### Either way

The line at the bottom of every page shows the version and the date the copy was produced. A copy older than {{ site.staleAfterDays }} days turns that line red, as a reminder to update it.

## Check for updates

<p><button type="button" data-action="check-update">Check for updates</button></p>
<p class="update-result" id="update-result" aria-live="polite"></p>

## Online or offline

The indicator at the top of every page shows whether the network is working:

- **Online**: Balise reached its server a moment ago.
- **Offline**: the device has no network, or the last attempt to reach the server failed.
- **Network not checked**: the device reports a connection, but Balise has not tried it yet.

Press the indicator to check the connection now. Balise only uses the network when a page is opened or when you ask, so the indicator costs nothing while you read. Everything in Balise works offline either way.

## For the people responsible

Each procedure names who is responsible for it, when it was last reviewed, and its version. A procedure is reviewed at least once a year, and after every event where it was used.
