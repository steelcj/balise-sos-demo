// scripts/clean.js
// Removes the previous build so files deleted from content/ do not linger
// in _site/ and end up stored offline or in the zip.
const fs = require("node:fs");
const path = require("node:path");
fs.rmSync(path.join(__dirname, "..", "_site"), { recursive: true, force: true });
