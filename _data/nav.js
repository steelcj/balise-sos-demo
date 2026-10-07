// _data/nav.js
//
// Main navigation per locale, and the address of each locale's search
// page (the header search form submits there). URLs are root-relative;
// the build turns them into relative file links.
//
// `submenu` gives an item a dropdown: "procedures" lists every procedure,
// "sections" lists the page's own `##` headings. Items without it stay
// plain links.

module.exports = {
  "fr-ca": [
    { label: "Accueil", url: "/fr-ca/" },
    { label: "Procédures", url: "/fr-ca/procedures/", submenu: "procedures" },
    { label: "Contacts", url: "/fr-ca/contacts/", submenu: "sections" },
    { label: "Version imprimable", url: "/fr-ca/imprimer/" },
    { label: "Balise", url: "/fr-ca/balise/", submenu: "sections" },
  ],
  "en-ca": [
    { label: "Home", url: "/en-ca/" },
    { label: "Procedures", url: "/en-ca/procedures/", submenu: "procedures" },
    { label: "Contacts", url: "/en-ca/contacts/", submenu: "sections" },
    { label: "Printable version", url: "/en-ca/print/" },
    { label: "Balise", url: "/en-ca/balise/", submenu: "sections" },
  ],
  search: {
    "fr-ca": "/fr-ca/recherche/",
    "en-ca": "/en-ca/search/",
  },
};
