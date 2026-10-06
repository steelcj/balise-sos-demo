/* Balise SOS, page behaviour.
 *
 * Everything here is an enhancement: with JavaScript off, every page,
 * link and procedure still works. Written as plain ES5 so it runs on old
 * browsers and old devices, see ADR-003.
 *
 *  - Tells the reader which kind of copy they are using and how old it is.
 *  - On the web, installs the service worker that stores the site offline.
 *  - Turns procedure bullets into tickable checkboxes (nothing is saved).
 *  - Wires the print buttons and the "check for updates" button.
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var isFile = location.protocol === "file:";
  html.className += " js " + (isFile ? "mode-file" : "mode-web");

  var strings = {};
  try {
    strings = JSON.parse(document.getElementById("balise-strings").textContent);
  } catch (e) {}

  function fill(s, values) {
    return String(s || "").replace(/\{(\w)\}/g, function (_, k) {
      return values[k] !== undefined ? values[k] : "";
    });
  }

  var root = html.getAttribute("data-root") || "./";
  var version = html.getAttribute("data-version");
  var built = new Date(html.getAttribute("data-built"));
  var staleDays = Number(html.getAttribute("data-stale-days")) || 30;
  var publicUrl = html.getAttribute("data-public-url") || "";

  // Copy status line in the footer.
  var status = document.getElementById("copy-status");
  function setStatus(text) {
    if (!status) return;
    var age = Math.floor((Date.now() - built.getTime()) / 86400000);
    var line = text + " " + status.getAttribute("data-base");
    if (age > staleDays) {
      line += " " + fill(strings.statusStale, { n: age });
      status.className += " stale";
    }
    status.textContent = line;
  }
  if (status) status.setAttribute("data-base", status.textContent);

  if (isFile) {
    setStatus(strings.statusFile);
  } else if ("serviceWorker" in navigator) {
    setStatus(navigator.serviceWorker.controller ? strings.statusOffline : strings.statusOnline);
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register(root + "sw.js")
        .then(function () {
          return navigator.serviceWorker.ready;
        })
        .then(function () {
          setStatus(strings.statusOffline);
        })
        .catch(function () {});
    });
  } else {
    setStatus("");
  }

  // Checklists.
  var items = document.querySelectorAll(".procedure-body ul > li");
  for (var i = 0; i < items.length; i++) {
    (function (li, n) {
      var label = document.createElement("label");
      var box = document.createElement("input");
      box.type = "checkbox";
      box.id = "step-" + n;
      label.setAttribute("for", box.id);
      var nodes = [];
      for (var c = li.firstChild; c; c = c.nextSibling) {
        if (c.nodeName !== "UL" && c.nodeName !== "OL") nodes.push(c);
      }
      for (var k = 0; k < nodes.length; k++) label.appendChild(nodes[k]);
      li.insertBefore(label, li.firstChild);
      li.insertBefore(box, label);
      box.addEventListener("change", function () {
        li.className = box.checked ? "done" : "";
      });
    })(items[i], i + 1);
  }

  // Print buttons.
  var printers = document.querySelectorAll('[data-action="print"]');
  for (var p = 0; p < printers.length; p++) {
    printers[p].addEventListener("click", function () {
      window.print();
    });
  }

  // Update check. A <script> tag can read version.js from the online site
  // even from a copy opened from disk, where fetch() would be refused.
  function newer(a, b) {
    var x = String(a).split("."), y = String(b).split(".");
    for (var i = 0; i < 3; i++) {
      var d = (Number(x[i]) || 0) - (Number(y[i]) || 0);
      if (d) return d > 0;
    }
    return false;
  }

  var checker = document.querySelector('[data-action="check-update"]');
  var result = document.getElementById("update-result");
  if (checker && result) {
    checker.addEventListener("click", function () {
      result.textContent = strings.updateChecking;
      var base = isFile ? publicUrl : root;
      var done = false;
      var script = document.createElement("script");
      function finish(text) {
        if (done) return;
        done = true;
        result.textContent = text;
        if (script.parentNode) script.parentNode.removeChild(script);
      }
      window.BALISE_LATEST = null;
      script.onload = function () {
        var latest = window.BALISE_LATEST;
        if (!latest) return finish(strings.updateFailed);
        if (newer(latest.version, version)) finish(fill(strings.updateAvailable, { v: latest.version }));
        else finish(strings.updateCurrent);
      };
      script.onerror = function () {
        finish(strings.updateFailed);
      };
      setTimeout(function () {
        finish(strings.updateFailed);
      }, 8000);
      script.src = base + "version.js?t=" + Date.now();
      document.body.appendChild(script);
      if (!isFile && navigator.serviceWorker && navigator.serviceWorker.getRegistration) {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (reg) reg.update();
        });
      }
    });
  }
})();
