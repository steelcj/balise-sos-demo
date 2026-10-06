// _11ty/relative-links.js
//
// Rewrites root-relative links in built HTML into plain relative links
// that name a file, so the same output works in three places without
// change: opened from disk (file://), served from a domain root, and
// served from a sub-path such as /balise/ on a shared web server.
//
// Authors keep writing ordinary links, "/fr-ca/contacts/", in content and
// templates. After rendering, this transform turns that into, for a page
// at /fr-ca/procedures/panne-electricite/, "../../contacts/index.html".
//
// Two details matter for file://. A browser opening a folder from disk
// shows a directory listing, not index.html, so directory URLs gain an
// explicit "index.html". And there is no server to resolve "/", so every
// link must be relative to the page that contains it.

const path = require("node:path").posix;

// href="..." src="..." action="..." with a value starting with a single "/".
const ATTR = /(?<![\w-])(href|src|action|poster)=("|')\/(?!\/)([^"']*)\2/g;

function toFileTarget(target) {
  // Split off ?query and #hash, which ride along unchanged.
  const match = target.match(/^([^?#]*)(.*)$/);
  let pathname = match[1];
  const tail = match[2];
  if (pathname === "" || pathname.endsWith("/")) pathname += "index.html";
  return { pathname, tail };
}

// Directory of the page's output file, relative to the site root.
function pageDir(pageUrl) {
  const { pathname } = toFileTarget(pageUrl.replace(/^\//, ""));
  return path.dirname(pathname);
}

function relativeFrom(pageUrl, rootTarget) {
  const { pathname, tail } = toFileTarget(rootTarget);
  let rel = path.relative(pageDir(pageUrl), pathname);
  if (rel === "") rel = path.basename(pathname);
  return rel + tail;
}

// Relative path from the page to the site root, "" or "../../", used by
// scripts that build links at run time (search results, update check).
function rootFrom(pageUrl) {
  const dir = pageDir(pageUrl);
  if (dir === ".") return "./";
  return dir.split("/").map(() => "..").join("/") + "/";
}

function rewrite(html, pageUrl) {
  return html.replace(ATTR, (_, attr, quote, target) => {
    return `${attr}=${quote}${relativeFrom(pageUrl, target)}${quote}`;
  });
}

module.exports = { rewrite, relativeFrom, rootFrom };
