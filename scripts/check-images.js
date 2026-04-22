// ─────────────────────────────────────────────────────────────────────────────
// check-images.js
//
// Run:  npm run check-images
//
// Reads every project slug from projects.js, derives the expected filenames,
// and reports which are present and which are missing.
// ─────────────────────────────────────────────────────────────────────────────

const fs   = require("fs");
const path = require("path");

const PROJECTS_FILE = path.join(__dirname, "../src/data/projects.js");
const IMG_DIR       = path.join(__dirname, "../public/static/img");

// ── Parse projects.js ────────────────────────────────────────────────────────
function parseProjects() {
  // Strip comments so template examples and doc lines don't get matched
  const src = fs.readFileSync(PROJECTS_FILE, "utf8")
    .replace(/\/\/[^\n]*/g, "")      // remove  // ...  lines
    .replace(/\/\*[\s\S]*?\*\//g, ""); // remove  /* ... */  blocks

  const projects = [];

  // Find each slug and where it sits in the file
  const slugPattern = /slug:\s*"([^"]+)"/g;
  const slugMatches = [...src.matchAll(slugPattern)];

  slugMatches.forEach((slugMatch, i) => {
    const slug    = slugMatch[1];
    const start   = slugMatch.index;
    const end     = slugMatches[i + 1]?.index ?? src.length;
    const block   = src.slice(start, end);

    // mainMediaType — defaults to "image" if not present
    const mediaTypeMatch = block.match(/mainMediaType:\s*"([^"]+)"/);
    const mediaType      = mediaTypeMatch?.[1] ?? "image";

    // Gallery array — count image items that have no explicit src
    const galleryMatch = block.match(/gallery:\s*\[([\s\S]*?)\]/);
    const galleryText  = galleryMatch?.[1] ?? "";
    const galleryObjs  = [...galleryText.matchAll(/\{[^}]*type:\s*"image"[^}]*\}/g)];
    const derivedCount = galleryObjs.filter(m => !m[0].includes("src:")).length;

    // heroMedia array — count image slides that have no explicit src
    const heroMediaMatch = block.match(/heroMedia:\s*\[([\s\S]*?)\]/);
    const heroMediaText  = heroMediaMatch?.[1] ?? "";
    const heroObjs       = [...heroMediaText.matchAll(/\{[^}]*type:\s*"image"[^}]*\}/g)];
    const heroSlideCount = heroObjs.filter(m => !m[0].includes("src:")).length;

    projects.push({ slug, mediaType, derivedCount, heroSlideCount });
  });

  return projects;
}

// ── Build expected filenames for a project ───────────────────────────────────
function expectedFiles({ slug, mediaType, derivedCount, heroSlideCount }) {
  const files = [];

  files.push(
    mediaType === "video"
      ? `${slug}-thumb.jpg`
      : `${slug}-hero.jpg`
  );

  for (let i = 1; i <= heroSlideCount; i++) {
    files.push(`${slug}-hero-slide-${i}.jpg`);
  }

  for (let i = 1; i <= derivedCount; i++) {
    files.push(`${slug}-gallery-${i}.jpg`);
  }

  return files;
}

// ── Main ──────────────────────────────────────────────────────────────────────
function run() {
  const projects     = parseProjects();
  const existingFiles = new Set(fs.readdirSync(IMG_DIR));

  let totalMissing = 0;
  let totalPresent = 0;

  console.log("\nImage check\n" + "─".repeat(60));

  for (const project of projects) {
    const files   = expectedFiles(project);
    const missing = files.filter(f => !existingFiles.has(f));
    const present = files.filter(f =>  existingFiles.has(f));

    totalPresent += present.length;
    totalMissing += missing.length;

    const status = missing.length === 0 ? "✓ complete" : `✗ ${missing.length} missing`;
    console.log(`\n  ${project.slug}  [${status}]`);
    present.forEach(f => console.log(`    ✓  ${f}`));
    missing.forEach(f => console.log(`    ✗  ${f}  ← missing`));
  }

  console.log("\n" + "─".repeat(60));
  console.log(`  ${totalPresent} present   ${totalMissing} missing\n`);

  if (totalMissing > 0) {
    console.log("  Name your files as shown, drop them into");
    console.log("  public/static/img/raw/  and run:  npm run optimize\n");
  } else {
    console.log("  All images accounted for.\n");
  }
}

run();
