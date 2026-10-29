// image-size is pinned to 2.x via "resolutions" to fix Dependabot alerts. Metro 0.80 still
// calls the 1.x API (a callable default export that also accepts file paths), so adapt it.
const fs = require('fs');

const assetsPath = require.resolve('metro/src/Assets.js');
const source = fs.readFileSync(assetsPath, 'utf8');
const original = 'const getImageSize = require("image-size");';
const patched =
  'const { imageSize } = require("image-size");\n' +
  'const getImageSize = input => imageSize(typeof input === "string" ? fs.readFileSync(input) : input);';

if (source.includes(original)) {
  fs.writeFileSync(assetsPath, source.replace(original, patched));
}
