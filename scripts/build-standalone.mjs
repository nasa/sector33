// Builds a single self-contained HTML file that runs by double-clicking it: no server, no
// install, no extraction.
//
// Why this is needed at all: a normal Vite build cannot be opened from disk. Its entry is
// <script type="module">, and browsers refuse to load module scripts over file:// because
// the origin is opaque — the page loads and nothing happens. Its asset paths are absolute
// ("/assets/...") too, which resolve to the filesystem root rather than next to the file.
//
// So everything is folded into one document:
//   - the stylesheet is inlined, with every font it references turned into a data: URI
//   - the entry script is inlined, which sidesteps the module CORS rule entirely because
//     there is nothing left to fetch
//   - images the bundle points at become data: URIs
//   - the HDS icon sprite is injected into the document and its URL emptied, so every
//     <use href="#play"> resolves inside the page
//
// That last one is deliberate rather than lazy. A data: URI would be the obvious move, but
// browsers block <use> pointing at data: URIs, so the icons would silently vanish.
// Referencing symbols in the same document is the one form that works everywhere.
//
// Two traps worth knowing if you edit this:
//   - Every replacement uses a *function*, never a replacement string. Minified JS and CSS
//     contain "$" sequences, and in a replacement string "$&" and "$'" mean "the match"
//     and "everything after the match" — which silently pasted the rest of the document
//     back in and turned a 3 MB file into 18 MB.
//   - The bundle writes its string literals with backticks, not quotes, so patterns
//     looking for asset paths have to accept all three quote characters.
//
// Run:  npm run build:standalone

import fs from 'fs';
import path from 'path';

const DIST = 'dist';
const ASSETS = path.join(DIST, 'assets');
const OUT_DIR = 'standalone';
const OUT_FILE = 'Sector33.html';

const MIME = {
    '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
    '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
    '.gif': 'image/gif', '.svg': 'image/svg+xml'
};

// Each file is encoded once however many times it is referenced.
const cache = new Map();
const assetPath = (ref) => path.join(ASSETS, path.basename(ref.split('?')[0]));
const isAsset = (ref) => !/^data:/i.test(ref) && fs.existsSync(assetPath(ref))
    && fs.statSync(assetPath(ref)).isFile();

const dataUri = (ref) => {
    const file = assetPath(ref);
    if (!cache.has(file)) {
        const mime = MIME[path.extname(file).toLowerCase()] || 'application/octet-stream';
        cache.set(file, `data:${mime};base64,${fs.readFileSync(file).toString('base64')}`);
    }
    return cache.get(file);
};

// ---------------------------------------------------------------------------

if (!fs.existsSync(path.join(DIST, 'index.html'))) {
    console.error('No dist/index.html. Run "npm run build" first.');
    process.exit(1);
}

let html = fs.readFileSync(path.join(DIST, 'index.html'), 'utf8');

const cssTag = html.match(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>/);
const jsTag = html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/);
if (!cssTag || !jsTag) {
    console.error('Could not find the built stylesheet or entry script in dist/index.html.');
    process.exit(1);
}

// --- stylesheet, with its fonts folded in ----------------------------------
// The quote group is optional because Vite emits url(/assets/x.woff2) unquoted. Existing
// data: URIs in the HDS CSS (the dashed focus rings) are skipped by isAsset.
let fontCount = 0;
const css = fs.readFileSync(assetPath(cssTag[1]), 'utf8')
    .replace(/url\((["']?)([^)"']+)\1\)/g, (whole, _quote, ref) => {
        if (!isAsset(ref)) return whole;
        fontCount++;
        return `url(${dataUri(ref)})`;
    });

// --- entry script ----------------------------------------------------------
let js = fs.readFileSync(assetPath(jsTag[1]), 'utf8');

// The sprite is injected rather than inlined, so its URL collapses to "" and every href
// the app builds from it becomes a same-document "#symbol" reference.
let spriteMarkup = '';
const spriteRef = js.match(/["'`](?:\.?\/)?assets\/(hds-sprite[^"'`]*\.svg)["'`]/);
if (spriteRef && isAsset(spriteRef[1])) {
    spriteMarkup = fs.readFileSync(assetPath(spriteRef[1]), 'utf8')
        .replace(/<\?xml[^>]*\?>/, '')
        .replace(/<svg/, '<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"');
    js = js.replace(spriteRef[0], () => '""');
}

let imageCount = 0;
js = js.replace(/["'`](?:\.?\/)?assets\/([A-Za-z0-9_.-]+\.(?:png|jpe?g|gif|svg))["'`]/g,
    (whole, file) => {
        if (!isAsset(file)) return whole;
        imageCount++;
        return `"${dataUri(file)}"`;
    });

// --- favicon ---------------------------------------------------------------
html = html.replace(/(<link[^>]+rel="icon"[^>]+href=")([^"]+)(")/,
    (whole, open, ref, close) => (isAsset(ref) ? `${open}${dataUri(ref)}${close}` : whole));

// --- assemble --------------------------------------------------------------
// A literal </script> inside the bundle's own strings would close the tag early. Splitting
// the sequence keeps it inert to the HTML parser while staying identical to JavaScript.
const safeJs = js.replace(/<\/script>/gi, () => '<\\/script>');

html = html
    .replace(cssTag[0], () => `<style>\n${css}\n</style>`)
    .replace(jsTag[0], () => `<script type="module">\n${safeJs}\n</script>`);

if (spriteMarkup) html = html.replace(/<body>/, () => `<body>\n${spriteMarkup}`);

fs.mkdirSync(OUT_DIR, { recursive: true });
const outPath = path.join(OUT_DIR, OUT_FILE);
fs.writeFileSync(outPath, html);

const mb = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
console.log(`${outPath}  ${mb} MB`);
console.log(`  fonts and images in CSS: ${fontCount}`);
console.log(`  images in bundle:        ${imageCount}`);
console.log(`  icon sprite:             ${spriteMarkup ? 'injected into the document' : 'NOT FOUND'}`);
console.log(`  unique assets encoded:   ${cache.size}`);
console.log('\nDouble-click the file to play. No server, no install.');
