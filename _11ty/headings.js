// _11ty/headings.js
//
// Section headings of a page, read from its markdown source, so the main
// navigation can offer a submenu of a page's sections and each section can
// be linked to directly. The same list drives both the ids written onto
// the page's <h2> elements and the submenu links, so they cannot disagree.
//
// Only level-two headings (`## `) are sections. The printable version is
// left alone: it gathers every procedure on one page, where their section
// ids would repeat.

const fs = require("node:fs");

function slug(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Markdown inline syntax a heading may carry, reduced to its text.
function plain(text) {
  return String(text)
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[*_`]/g, "")
    .trim();
}

const cache = new Map();

// [{ id, label }] for each `## ` heading of a markdown file, in order.
function sections(inputPath) {
  if (!inputPath || !inputPath.endsWith(".md")) return [];
  if (cache.has(inputPath)) return cache.get(inputPath);
  const out = [];
  const seen = {};
  let fenced = false;
  let body = fs.readFileSync(inputPath, "utf8");
  body = body.replace(/^---\n[\s\S]*?\n---\n/, "");
  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fenced = !fenced;
    const m = !fenced && /^##\s+(.+?)\s*#*\s*$/.exec(line);
    if (!m) continue;
    const label = plain(m[1]);
    let id = slug(label) || "section";
    seen[id] = (seen[id] || 0) + 1;
    if (seen[id] > 1) id += "-" + seen[id];
    out.push({ id, label });
  }
  cache.set(inputPath, out);
  return out;
}

// Write the section ids onto the page's <h2> elements, in order. Leaves
// the page unchanged when the count does not match, and says so.
function addIds(html, inputPath, url) {
  if (html.includes('class="print-all"')) return html;
  const list = sections(inputPath);
  if (!list.length) return html;
  const found = html.match(/<h2>/g) || [];
  if (found.length !== list.length) {
    console.warn(`[headings] ${url}: ${found.length} <h2> on the page, ${list.length} in the source; ids not added`);
    return html;
  }
  let i = 0;
  return html.replace(/<h2>/g, () => `<h2 id="${list[i++].id}">`);
}

function reset() {
  cache.clear();
}

module.exports = { sections, addIds, reset, slug };
