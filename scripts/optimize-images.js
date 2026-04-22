// ─────────────────────────────────────────────────────────────────────────────
// optimize-images.js
//
// ─── WORKFLOW ────────────────────────────────────────────────────────────────
//
//   1. Name your files using the project slug + a role suffix (see below)
//   2. Drop them into:  public/static/img/raw/
//   3. Run:             npm run optimize
//   4. Done — optimized files land in  public/static/img/  and the site
//      picks them up automatically. No paths to update in code.
//
//   Not sure what files you need?  Run:  npm run check-images
//   It prints the exact filenames expected for every project.
//
// ─── FILE NAMING ─────────────────────────────────────────────────────────────
//
//   Use the project slug as the base, then add a role suffix:
//
//   <slug>-hero.jpg              Home grid card + project page hero  (1400 × 900px)
//   <slug>-thumb.jpg             Grid card only — tighter crop       (800 × 600px)
//                                (also used automatically for video-hero projects)
//   <slug>-hero-slide-1.jpg      Hero carousel slide 1               (1400 × 900px)
//   <slug>-hero-slide-2.jpg      Hero carousel slide 2               (1400 × 900px)
//   <slug>-gallery-1.jpg         First gallery image                 (1600px wide)
//   <slug>-gallery-2.jpg         Second gallery image                (1600px wide)
//   <slug>-gallery-3.jpg         Third gallery image                 (1600px wide)
//
//   Example — project with  slug: "mf-doom-art-print"  and a hero slider:
//     mf-doom-art-print-hero.jpg          (grid card thumbnail)
//     mf-doom-art-print-hero-slide-1.jpg  (first slider image)
//     mf-doom-art-print-hero-slide-2.jpg  (second slider image)
//     mf-doom-art-print-gallery-1.jpg     (supporting gallery image)
//
// ─── FILE FORMAT NOTES ───────────────────────────────────────────────────────
//
//   .jpg / .png   Compressed and output as optimised JPEG
//   .gif          Copied as-is — animation is fully preserved, no resizing
//
//   Files without a recognised suffix (-hero, -thumb, -gallery) are skipped
//   with a warning so nothing gets processed silently under the wrong size.
//
// ─── OUTPUT ──────────────────────────────────────────────────────────────────
//
//   Processed files land in:   public/static/img/
//   Your raw originals stay in: public/static/img/raw/  (never overwritten)
//
// ─────────────────────────────────────────────────────────────────────────────

const sharp = require("sharp");
const fs    = require("fs");
const path  = require("path");

const RAW_DIR    = path.join(__dirname, "../public/static/img/raw");
const OUTPUT_DIR = path.join(__dirname, "../public/static/img");

// ── Size profiles ─────────────────────────────────────────────────────────────
//
//  hero      Used on both the home grid card AND the project page hero.
//            1400 wide gives the parallax effect room to shift vertically
//            without showing a gap. "inside" keeps the full image — no cropping.
//
//  gallery   Shown half-width in the project page rows, but also opened
//            full-screen in the lightbox (up to 88vw). Needs to be larger
//            so it stays sharp when clicked open.
//
//  thumbnail Only used when a project has a separate `thumbnailImage` field.
//            Tighter crop at 4:3 — fills the grid card frame exactly.
//
const PROFILES = {
  hero:      { width: 1400, height: 900,  fit: "inside" },
  gallery:   { width: 1600, height: null, fit: "inside" },
  thumbnail: { width: 800,  height: 600,  fit: "cover"  },
};

// ── Decide which profile a file gets based on its name ───────────────────────
function getProfile(filename) {
  const name = path.parse(filename).name;             // e.g. "mfdoom-hero-slide-1"
  if (/-thumb$/.test(name))      return "thumbnail";  // ends in -thumb
  if (/-gallery/.test(name))     return "gallery";    // contains -gallery
  if (/-hero-slide/.test(name))  return "hero";       // hero carousel slide
  if (/-hero$/.test(name))       return "hero";       // ends in -hero
  // Unrecognised suffix — warn and skip
  return null;
}

// ── Process one file ──────────────────────────────────────────────────────────
async function processFile(filename) {
  const ext       = path.extname(filename).toLowerCase();
  const inputPath = path.join(RAW_DIR, filename);

  // GIFs: copy straight across — Sharp would strip the animation
  if (ext === ".gif") {
    const outPath = path.join(OUTPUT_DIR, filename);
    fs.copyFileSync(inputPath, outPath);
    const kb = (fs.statSync(outPath).size / 1024).toFixed(0);
    console.log(`  gif      ${filename.padEnd(36)} ${kb} KB  (animation preserved)`);
    return;
  }

  // Everything else → optimised JPEG, output always as .jpg
  const baseName  = path.parse(filename).name;
  const outName   = baseName + ".jpg";
  const outPath   = path.join(OUTPUT_DIR, outName);
  const profile   = getProfile(filename);

  if (!profile) {
    console.warn(`  SKIPPED  ${filename.padEnd(36)} (no recognised suffix: -hero, -thumb, -gallery)`);
    return;
  }

  const { width, height, fit } = PROFILES[profile];

  const resizeOpts = { width, fit, withoutEnlargement: true };
  if (height) resizeOpts.height = height;

  const info = await sharp(inputPath)
    .resize(resizeOpts)
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outPath);

  const kb = (info.size / 1024).toFixed(0);
  console.log(
    `  ${profile.padEnd(9)}${outName.padEnd(36)} ${info.width} × ${info.height}px   ${kb} KB`
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function run() {
  // Create raw/ folder if it doesn't exist yet
  if (!fs.existsSync(RAW_DIR)) {
    fs.mkdirSync(RAW_DIR, { recursive: true });
    console.log("\nCreated public/static/img/raw/");
    console.log("Drop your images in there and run  npm run optimize  again.\n");
    return;
  }

  const files = fs.readdirSync(RAW_DIR).filter(f =>
    /\.(jpg|jpeg|png|gif)$/i.test(f)
  );

  if (files.length === 0) {
    console.log("\nNo images found in public/static/img/raw/");
    console.log("Drop your .jpg, .png, or .gif files in there and run again.\n");
    return;
  }

  console.log(`\nOptimizing ${files.length} image(s)...\n`);
  console.log(
    "  role     ".padEnd(11) +
    "output file".padEnd(36) +
    "dimensions         size"
  );
  console.log("  " + "─".repeat(70));

  for (const file of files) {
    try {
      await processFile(file);
    } catch (err) {
      console.error(`  ERROR    ${file}: ${err.message}`);
    }
  }

  console.log("\n  Done. All images are in public/static/img/\n");
}

run();
