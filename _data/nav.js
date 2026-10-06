// _data/nav.js
//
// Main navigation per locale, and the address of each locale's search
// page (the header search form submits there). URLs are root-relative;
// the build turns them into relative file links.

module.exports = {
  "fr-ca": [
    { label: "Accueil", url: "/fr-ca/" },
    { label: "Procédures", url: "/fr-ca/procedures/" },
    { label: "Contacts", url: "/fr-ca/contacts/" },
    { label: "Version imprimable", url: "/fr-ca/imprimer/" },
    { label: "Cette copie", url: "/fr-ca/cette-copie/" },
  ],
  "en-ca": [
    { label: "Home", url: "/en-ca/" },
    { label: "Procedures", url: "/en-ca/procedures/" },
    { label: "Contacts", url: "/en-ca/contacts/" },
    { label: "Printable version", url: "/en-ca/print/" },
    { label: "This copy", url: "/en-ca/this-copy/" },
  ],
  search: {
    "fr-ca": "/fr-ca/recherche/",
    "en-ca": "/en-ca/search/",
  },
};
