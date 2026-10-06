#!/usr/bin/env python3
# browser-smoke.py
"""
browser-smoke.py, drive a real browser through the two offline promises.

Optional: needs Python Playwright and its Chromium (pip install
playwright, then playwright install chromium). Run after `npm run build`.

  1. Copy opened from disk (file://): the page knows it is a local copy,
     search finds results with accents left out, result links open, and
     procedure steps become checkboxes.
  2. Copy served from the web under a sub-path, the way GitHub Pages
     serves it: the service worker stores the site, then with the network
     cut the browser still opens pages it never visited, and search still
     works. With the network stalled rather than cut, the way a phone on
     Wi-Fi with no working connection behaves, the language switch still
     answers at once from storage.

Screenshots land in tests/screenshots/ (ignored by git).

Usage:
    python3 tests/browser-smoke.py
"""
import functools
import http.server
import shutil
import sys
import tempfile
import threading
import time
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / "_site"
SHOTS = ROOT / "tests" / "screenshots"
failures = []
stall = threading.Event()
STALL_SECONDS = 8


class Handler(http.server.SimpleHTTPRequestHandler):
    """Static files; while `stall` is set, pages hang before answering."""

    def do_GET(self):
        if stall.is_set() and self.path.split("?")[0].endswith((".html", "/")):
            time.sleep(STALL_SECONDS)
        super().do_GET()

    def log_message(self, *args, **kwargs):
        pass


def check(cond, label):
    print(("ok   " if cond else "FAIL ") + label)
    if not cond:
        failures.append(label)


def serve_under_subpath():
    """Serve _site at http://127.0.0.1:<port>/balise-sos-demo/."""
    tmp = Path(tempfile.mkdtemp())
    shutil.copytree(SITE, tmp / "balise-sos-demo")
    handler = functools.partial(Handler, directory=str(tmp))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd, f"http://127.0.0.1:{httpd.server_address[1]}/balise-sos-demo/"


def file_mode(browser):
    page = browser.new_page(viewport={"width": 390, "height": 844})
    page.goto((SITE / "fr-ca" / "index.html").as_uri())
    check("mode-file" in page.get_attribute("html", "class"), "file: page marks itself as a local copy")
    check("Copie locale" in page.inner_text("#copy-status"), "file: footer says local copy")
    page.screenshot(path=str(SHOTS / "file-home-fr.png"), full_page=True)

    page.fill("#q-mini", "generatrice")
    page.press("#q-mini", "Enter")
    page.wait_for_selector("#search-results li")
    n = page.locator("#search-results li").count()
    check(n >= 2, f"file: search 'generatrice' (no accent) finds {n} pages")
    page.screenshot(path=str(SHOTS / "file-search-fr.png"), full_page=True)

    page.locator("#search-results li a").first.click()
    page.wait_for_load_state()
    check(page.url.endswith("index.html") and "procedures" in page.url, "file: search result opens a procedure")
    boxes = page.locator(".procedure-body input[type=checkbox]").count()
    check(boxes > 5, f"file: procedure has {boxes} checkboxes")
    page.locator(".procedure-body input[type=checkbox]").first.check()
    check(page.locator(".procedure-body li.done").count() == 1, "file: ticking a step marks it done")
    page.screenshot(path=str(SHOTS / "file-procedure-fr.png"), full_page=True)

    page.click(".lang-switch")
    page.wait_for_load_state()
    check("/en-ca/procedures/" in page.url, "file: language switch lands on the matching English procedure")
    page.close()


def web_mode(browser, base):
    context = browser.new_context(viewport={"width": 390, "height": 844})
    page = context.new_page()
    page.goto(base + "en-ca/index.html")
    page.evaluate("navigator.serviceWorker.ready.then(() => true)")
    page.wait_for_function("navigator.serviceWorker.controller !== null", timeout=15000)
    page.wait_for_function("document.getElementById('copy-status').textContent.indexOf('Copy stored') !== -1", timeout=15000)
    check("Copy stored" in page.inner_text("#copy-status"), "web: footer says stored offline")

    page.click("text=This copy")
    page.wait_for_load_state()
    page.click("[data-action=check-update]")
    page.wait_for_function("document.getElementById('update-result').textContent.indexOf('…') === -1 && document.getElementById('update-result').textContent.length > 0")
    check("up to date" in page.inner_text("#update-result"), "web: update check reports up to date")

    page.goto(base + "en-ca/procedures/winter-storm/index.html")
    stall.set()
    started = time.monotonic()
    page.click("a.lang-switch")
    page.wait_for_selector("h1")
    elapsed = time.monotonic() - started
    stall.clear()
    check("/fr-ca/procedures/" in page.url and elapsed < 1.5, f"web stalled: language switch answers from storage ({elapsed:.1f} s)")

    context.set_offline(True)
    page.goto(base + "fr-ca/procedures/avis-d-ebullition/index.html")
    check("ébullition" in page.inner_text("h1"), "web offline: never-visited French page opens from storage")
    page.goto(base + "fr-ca/recherche/index.html?q=hebergement")
    page.wait_for_selector("#search-results li")
    check(page.locator("#search-results li").count() >= 1, "web offline: search finds hébergement typed without accents")
    page.screenshot(path=str(SHOTS / "web-offline-search-fr.png"), full_page=True)
    context.close()


def main():
    if not (SITE / "index.html").exists():
        sys.exit("Build first: npm run build")
    SHOTS.mkdir(parents=True, exist_ok=True)
    httpd, base = serve_under_subpath()
    with sync_playwright() as p:
        browser = p.chromium.launch()
        file_mode(browser)
        web_mode(browser, base)
        browser.close()
    httpd.shutdown()
    if failures:
        sys.exit(f"{len(failures)} check(s) failed")
    print("browser smoke test passed")


if __name__ == "__main__":
    main()
