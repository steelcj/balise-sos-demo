---
title: This copy
summary: Where this copy of the site came from, how old it is, and how to keep it current.
relation: urn:uuid:878f8e32-6292-4bef-8bf3-5de3e882bd8d
order: 40
---
<p class="notice">Version <strong>{{ site.version }}</strong>, produced on <strong>{{ site.buildDay }}</strong>.</p>

## Two ways to have Balise with no network

**On the web, installed.** Open the site once with a connection. The browser then stores the whole site on the device. After that it opens even with no network, and updates itself each time the network returns. On a phone, add it to the home screen.

**As a file, downloaded.** Download the zip file, unzip it onto the computer or a USB key, then open `index.html`. No installation, no account, no network. Handy for shared workstations and old computers.

<div class="only-web">
<p><a href="/download/{{ site.packageName }}.zip">Download the offline copy ({{ site.packageName }}.zip)</a>, and its <a href="/download/{{ site.packageName }}.zip.sha256">SHA-256 checksum</a> to verify it.</p>
</div>
<div class="only-file">
<p>You are already using a downloaded copy. To get a newer one, check below when the network works.</p>
</div>

## Check for updates

<p><button type="button" data-action="check-update">Check for updates</button></p>
<p class="update-result" id="update-result" aria-live="polite"></p>

A copy older than {{ site.staleAfterDays }} days shows a warning at the bottom of every page.

## For the people responsible

Each procedure names who is responsible for it, when it was last reviewed, and its version. A procedure is reviewed at least once a year, and after every event where it was used.
