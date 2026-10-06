/* Balise SOS, search.
 *
 * Searches the index in assets/search/<locale>.js, already loaded by a
 * <script> tag, so it needs no network and no fetch(), and works from a
 * copy opened from disk. Plain ES5 for old browsers. See ADR-003.
 *
 * Matching folds case and accents, so "electricite" finds "électricité"
 * and "generatrice" finds "génératrice". Every word typed must appear;
 * the last word may be a prefix, so results appear while typing. Title
 * hits weigh most, then headings and keywords, then summary, then body.
 * Keywords come from a page's `keywords` front matter: the other words
 * people use for the same thing ("refuge" for a shelter).
 */
(function () {
  "use strict";

  var html = document.documentElement;
  var locale = html.getAttribute("data-locale");
  var root = html.getAttribute("data-root") || "./";
  var docs = (window.BALISE_SEARCH && window.BALISE_SEARCH[locale]) || [];
  var strings = {};
  try {
    strings = JSON.parse(document.getElementById("balise-strings").textContent);
  } catch (e) {}

  var input = document.getElementById("q");
  var form = document.querySelector("[data-search-form]");
  var list = document.getElementById("search-results");
  var count = document.getElementById("search-count");
  if (!input || !list) return;

  function fold(s) {
    s = String(s || "").toLowerCase();
    if (s.normalize) s = s.normalize("NFD").replace(/[̀-ͯ]/g, "");
    return s.replace(/[’']/g, " ");
  }

  function words(s) {
    return fold(s).split(/[^a-z0-9]+/).filter(function (w) {
      return w.length > 1;
    });
  }

  // Pre-fold every field once.
  var prepared = [];
  for (var i = 0; i < docs.length; i++) {
    var d = docs[i];
    prepared.push({
      doc: d,
      t: " " + words(d.t).join(" ") + " ",
      h: " " + words(d.h.join(" ") + " " + (d.k || "")).join(" ") + " ",
      s: " " + words(d.s).join(" ") + " ",
      b: " " + words(d.b).join(" ") + " ",
    });
  }

  function hits(field, term, prefix) {
    var needle = " " + term + (prefix ? "" : " ");
    var n = 0, at = field.indexOf(needle);
    while (at !== -1) {
      n++;
      at = field.indexOf(needle, at + 1);
    }
    return n;
  }

  function score(p, terms) {
    var total = 0;
    for (var i = 0; i < terms.length; i++) {
      var prefix = i === terms.length - 1;
      var s = hits(p.t, terms[i], prefix) * 10 + hits(p.h, terms[i], prefix) * 4 + hits(p.s, terms[i], prefix) * 3 + hits(p.b, terms[i], prefix);
      if (!s) return 0;
      total += s;
    }
    return total;
  }

  // A short extract of the body around the first matching word, with the
  // matches marked. Built with DOM nodes, never innerHTML.
  function snippet(text, terms) {
    var folded = fold(text);
    var first = -1;
    for (var i = 0; i < terms.length && first === -1; i++) first = folded.indexOf(terms[i]);
    var start = Math.max(0, (first === -1 ? 0 : first) - 60);
    var piece = text.slice(start, start + 200);
    var fp = fold(piece);
    var p = document.createElement("p");
    if (start > 0) p.appendChild(document.createTextNode("… "));
    var pos = 0;
    var re = new RegExp("(" + terms.map(function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }).join("|") + ")", "g");
    var m;
    while ((m = re.exec(fp))) {
      p.appendChild(document.createTextNode(piece.slice(pos, m.index)));
      var mark = document.createElement("mark");
      mark.textContent = piece.slice(m.index, m.index + m[0].length);
      p.appendChild(mark);
      pos = m.index + m[0].length;
    }
    p.appendChild(document.createTextNode(piece.slice(pos) + (start + 200 < text.length ? " …" : "")));
    return p;
  }

  function run(query) {
    while (list.firstChild) list.removeChild(list.firstChild);
    var terms = words(query);
    if (!terms.length) {
      count.textContent = "";
      return;
    }
    var found = [];
    for (var i = 0; i < prepared.length; i++) {
      var s = score(prepared[i], terms);
      if (s) found.push({ s: s, d: prepared[i].doc });
    }
    found.sort(function (a, b) {
      return b.s - a.s;
    });
    count.textContent = found.length ? strings.searchCount.replace("{n}", found.length) : strings.searchEmpty;
    for (var j = 0; j < found.length; j++) {
      var d = found[j].d;
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = root + d.u;
      a.textContent = d.t;
      li.appendChild(a);
      if (d.s) {
        var sum = document.createElement("p");
        sum.textContent = d.s;
        li.appendChild(sum);
      }
      li.appendChild(snippet(d.b, terms));
      list.appendChild(li);
    }
  }

  function fromUrl() {
    var m = location.search.match(/[?&]q=([^&]*)/);
    return m ? decodeURIComponent(m[1].replace(/\+/g, " ")) : "";
  }

  var timer = null;
  input.addEventListener("input", function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      run(input.value);
    }, 120);
  });
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      run(input.value);
    });
  }

  var initial = fromUrl();
  if (initial) {
    input.value = initial;
    run(initial);
  }
})();
