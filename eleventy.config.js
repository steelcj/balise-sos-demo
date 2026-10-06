// eleventy.config.js
//
// Balise SOS demo. The build has four jobs beyond plain Eleventy:
//
//   1. Bilingual pages paired by a shared Work identifier (`relation`),
//      so every page can link to its other-language Expression. ADR-005.
//   2. Every link rewritten to a relative file link, so the output opens
//      from disk as well as from any web host. ADR-004.
//   3. A per-locale search index written as a plain script. ADR-003.
//   4. A service worker, manifest and version file for the hosted copy,
//      written after the build. ADR-002.
//
// The offline zip is made afterwards by scripts/package-offline.js.

const site = require("./_11ty/site-config.js");
const links = require("./_11ty/relative-links.js");
const searchIndex = require("./_11ty/search-index.js");
const offlineShell = require("./_11ty/offline-shell.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("site", site);

  eleventyConfig.addPassthroughCopy({ assets: "assets" });

  // The content licence statement is for the repository, not a page.
  eleventyConfig.ignores.add("content/LICENSE.md");

  // Dates as YYYY-MM-DD, the form used in front matter and shown to readers.
  eleventyConfig.addFilter("isoDay", (value) => {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    return isNaN(d) ? String(value) : d.toISOString().slice(0, 10);
  });

  // Relative path from the current page to the site root, for scripts.
  eleventyConfig.addFilter("rootFrom", (url) => links.rootFrom(url || "/"));

  // Pages of one locale, sorted by `order` then title.
  eleventyConfig.addFilter("inLocale", (pages, locale) =>
    (pages || [])
      .filter((p) => p.data.locale === locale)
      .sort((a, b) => (a.data.order ?? 999) - (b.data.order ?? 999) || String(a.data.title).localeCompare(String(b.data.title), locale))
  );

  // Every procedure, across locales.
  eleventyConfig.addCollection("procedures", (api) =>
    api.getAll().filter((item) => item.data.kind === "procedure")
  );

  // Pages grouped by the Work they express: relation -> { locale -> page }.
  eleventyConfig.addCollection("byWork", (api) => {
    const byWork = {};
    for (const item of api.getAll()) {
      const { relation, locale, title } = item.data;
      if (!relation || !locale) continue;
      byWork[relation] ||= {};
      if (byWork[relation][locale]) {
        console.warn(`[i18n] two ${locale} pages share ${relation}: ${byWork[relation][locale].url} and ${item.url}`);
      }
      byWork[relation][locale] = { url: item.url, title };
    }
    for (const [relation, expressions] of Object.entries(byWork)) {
      for (const locale of site.locales) {
        if (!expressions[locale]) console.warn(`[i18n] ${relation} has no ${locale} page`);
      }
    }
    return byWork;
  });

  // Index each page for search, then make every link relative. Order
  // matters: the index stores root-relative paths, the page gets relative ones.
  eleventyConfig.addTransform("balise-offline", function (content) {
    const out = this.page.outputPath;
    if (!out || !out.endsWith(".html")) return content;
    searchIndex.collect({ url: this.page.url, html: content });
    return links.rewrite(content, this.page.url);
  });

  eleventyConfig.on("eleventy.before", () => searchIndex.reset());

  eleventyConfig.on("eleventy.after", ({ dir }) => {
    for (const s of searchIndex.write(dir.output)) {
      console.log(`[balise] search index ${s.locale}: ${s.docs} pages, ${s.bytes} bytes`);
    }
    const sw = offlineShell.write(dir.output, site);
    console.log(`[balise] service worker ${sw.cacheName}: ${sw.files} files stored offline`);
  });

  return {
    dir: {
      input: "content",
      includes: "../_includes",
      data: "../_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
