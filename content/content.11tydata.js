// content/content.11tydata.js
//
// Directory data for every page. The locale is read from the folder the
// page lives in, content/<locale>/..., so authors never type it; pages
// outside a locale folder (the bilingual entry page) have no locale.

const site = require("../_11ty/site-config.js");

module.exports = {
  eleventyComputed: {
    locale: (data) => {
      if (data.locale) return data.locale;
      const m = (data.page.inputPath || "").match(/content\/([a-z]{2}-[a-z]{2})\//);
      return m && site.locales.includes(m[1]) ? m[1] : undefined;
    },
  },
};
