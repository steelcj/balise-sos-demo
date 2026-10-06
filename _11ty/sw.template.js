/* Balise service worker. Generated from _11ty/sw.template.js; do not edit sw.js.
 *
 * What it does, in plain terms:
 *  - On first visit with a network, it stores every file of the site on the
 *    device, so the whole site keeps working with no network at all.
 *  - Pages are shown from the stored copy at once, and refreshed from the
 *    network in the background, so a page never waits on a network that is
 *    down or half-up. A page not stored yet is asked from the network, with
 *    a short time limit.
 *  - version.js is asked from the network first, since it answers "is there
 *    something newer?".
 *  - Everything else (styles, scripts, the search index) is served from the
 *    stored copy.
 *  - When the site changes, the cache name changes, the browser installs a
 *    new worker on its next visit with a network, and the old copy is
 *    removed once the new one is complete.
 */
"use strict";

const CACHE = __CACHE_NAME__;
const FILES = __FILES__;
const NETWORK_TIMEOUT_MS = 4000;

// Resolve each stored file against this worker's own location, so the
// same worker works at a domain root or under a sub-path.
const BASE = self.registration ? self.registration.scope : new URL("./", self.location).href;
const URLS = FILES.map((f) => new URL(f, BASE).href);

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith("balise-") && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  // Pages are stored as .../index.html; a request for .../ should find them.
  const url = new URL(request.url);
  url.search = "";
  const direct = await cache.match(url.href);
  if (direct) return direct;
  if (url.pathname.endsWith("/")) {
    url.pathname += "index.html";
    return cache.match(url.href);
  }
  return undefined;
}

async function networkFirst(request) {
  try {
    const response = await withTimeout(fetch(request), NETWORK_TIMEOUT_MS);
    storePage(request, response.clone());
    return response;
  } catch (_) {
    const cached = await fromCache(request);
    if (cached) return cached;
    return (await fromCache(new Request(new URL("index.html", BASE).href))) || Response.error();
  }
}

// Store a good page response under its .../index.html key. Redirected
// responses are not stored: Safari refuses them for a navigation.
async function storePage(request, response) {
  if (!response || !response.ok || response.redirected) return;
  const cache = await caches.open(CACHE);
  const key = new URL(request.url);
  key.search = "";
  if (key.pathname.endsWith("/")) key.pathname += "index.html";
  await cache.put(key.href, response);
}

// Pages: answer from the store at once, refresh it in the background.
async function storedThenRefresh(event, request) {
  const refresh = fetch(request).then(
    (response) => storePage(request, response.clone()).then(() => response),
    () => undefined
  );
  const cached = await fromCache(request);
  if (cached) {
    event.waitUntil(refresh);
    return cached;
  }
  try {
    const response = await withTimeout(refresh, NETWORK_TIMEOUT_MS);
    if (response) return response;
  } catch (_) {}
  return (await fromCache(new Request(new URL("index.html", BASE).href))) || Response.error();
}

async function cacheFirst(request) {
  const cached = await fromCache(request);
  if (cached) return cached;
  return fetch(request);
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (!request.url.startsWith(BASE)) return;
  // The offline zip is large and is not stored; let it go straight to the network.
  if (new URL(request.url).pathname.includes("/download/")) return;
  // version.js answers "is there something newer?", so it must not come from the store first.
  if (new URL(request.url).pathname.endsWith("/version.js")) {
    event.respondWith(networkFirst(request));
  } else if (request.mode === "navigate") {
    event.respondWith(storedThenRefresh(event, request));
  } else {
    event.respondWith(cacheFirst(request));
  }
});
