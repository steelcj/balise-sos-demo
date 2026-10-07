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
 *  - Shows whether the network is reachable, using only requests that
 *    happen anyway, and checks it on demand when the indicator is pressed.
 *  - Opens and closes the navigation submenus (a disclosure pattern).
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

  // Ask the online site for version.js. A <script> tag can read it even
  // from a copy opened from disk, where fetch() would be refused, and the
  // service worker lets it through to the network, so an answer means the
  // server is reachable now. done(latest) gets null when it is not.
  function probe(done) {
    var base = isFile ? publicUrl : root;
    var finished = false;
    var script = document.createElement("script");
    function finish(latest) {
      if (finished) return;
      finished = true;
      if (script.parentNode) script.parentNode.removeChild(script);
      done(latest);
    }
    window.BALISE_LATEST = null;
    script.onload = function () {
      finish(window.BALISE_LATEST || null);
    };
    script.onerror = function () {
      finish(null);
    };
    setTimeout(function () {
      finish(null);
    }, 8000);
    script.src = base + "version.js?t=" + Date.now();
    document.body.appendChild(script);
  }

  // Online/offline indicator. States: online (the server answered a
  // moment ago), offline (no network, or the last attempt failed),
  // unknown (the device reports a network nobody has tried yet), and
  // checking. No polling: it learns from page refreshes the service
  // worker does anyway, from the browser's online/offline events, and
  // from a check when the reader presses it.
  var net = document.getElementById("net-status");
  var netText = net && net.querySelector(".net-text");
  var netLive = document.getElementById("net-live");
  var netWords = { online: "netOnline", offline: "netOffline", unknown: "netUnknown", checking: "netChecking" };

  function setNet(state, announce) {
    if (!net) return;
    net.setAttribute("data-state", state);
    netText.textContent = strings[netWords[state]] || "";
    if (announce && netLive && state !== "checking") netLive.textContent = netText.textContent;
  }

  function checkNet(announce) {
    setNet("checking");
    probe(function (latest) {
      setNet(latest ? "online" : "offline", announce);
    });
  }

  if (net) {
    net.removeAttribute("hidden");
    setNet(navigator.onLine === false ? "offline" : "unknown");
    net.addEventListener("click", function () {
      checkNet(true);
    });
    window.addEventListener("offline", function () {
      setNet("offline", true);
    });
    window.addEventListener("online", function () {
      checkNet(true);
    });
    if (!isFile && "serviceWorker" in navigator) {
      navigator.serviceWorker.onmessage = function (event) {
        if (event.data && event.data.type === "balise-network") setNet(event.data.ok ? "online" : "offline");
      };
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({ type: "balise-network?" });
      } else if (navigator.onLine !== false) {
        // No worker yet, so this page came straight from the server.
        setNet("online");
      }
    }
  }

  // Update check.
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
      probe(function (latest) {
        setNet(latest ? "online" : "offline");
        if (!latest) result.textContent = strings.updateFailed;
        else if (newer(latest.version, version)) result.textContent = fill(strings.updateAvailable, { v: latest.version });
        else result.textContent = strings.updateCurrent;
      });
      if (!isFile && navigator.serviceWorker && navigator.serviceWorker.getRegistration) {
        navigator.serviceWorker.getRegistration().then(function (reg) {
          if (reg) reg.update();
        });
      }
    });
  }

  // Navigation submenus. Each item keeps its link; the button beside it
  // shows or hides the list (aria-expanded). Escape closes the open list
  // and returns focus to its button; so do a click or focus elsewhere.
  var toggles = document.querySelectorAll(".sub-toggle");
  var openToggle = null;

  function setSub(toggle, open) {
    var list = document.getElementById(toggle.getAttribute("aria-controls"));
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    if (list) list.className = open ? "sub open" : "sub";
    toggle.parentNode.className = open ? "has-sub is-open" : "has-sub";
    openToggle = open ? toggle : openToggle === toggle ? null : openToggle;
  }

  function closeSub(returnFocus) {
    if (!openToggle) return;
    var toggle = openToggle;
    setSub(toggle, false);
    if (returnFocus) toggle.focus();
  }

  for (var t = 0; t < toggles.length; t++) {
    toggles[t].removeAttribute("hidden");
    toggles[t].addEventListener("click", function () {
      var opening = this.getAttribute("aria-expanded") !== "true";
      closeSub(false);
      if (opening) setSub(this, true);
    });
  }

  if (toggles.length) {
    document.addEventListener("keydown", function (event) {
      if ((event.key === "Escape" || event.key === "Esc" || event.keyCode === 27) && openToggle) {
        closeSub(true);
      }
    });
    document.addEventListener("click", function (event) {
      if (openToggle && !openToggle.parentNode.contains(event.target)) closeSub(false);
    });
    document.addEventListener("focusin", function (event) {
      if (openToggle && !openToggle.parentNode.contains(event.target)) closeSub(false);
    });
  }
})();
