// ═════════════════════════════════════════════════════════════════════════════
// PROJECTS.JS — PORTFOLIO CONTENT
//
// This is the only file you edit to manage projects.
// Each entry becomes a card on the home page and its own project page.
//
// ─── ADDING A NEW PROJECT — QUICK STEPS ──────────────────────────────────────
//
//   1. Copy the template block below and fill in:
//        slug, title, category, mainMediaType, intro, gallery captions
//
//   2. Run:  npm run check-images
//      It prints the exact filenames your new project needs.
//
//   3. Name your photos using those filenames and drop them into:
//        public/static/img/raw/
//
//   4. Run:  npm run optimize
//      Images are resized and output to  public/static/img/  automatically.
//
//   5. Done — no image paths to type. The site wires everything up from the slug.
//
// ─── HOW IMAGE NAMING WORKS ──────────────────────────────────────────────────
//
//   Image paths are derived automatically from the project slug.
//   For a project with  slug: "my-project"  name your files:
//
//     my-project-hero.jpg        ← home grid card + project page hero
//     my-project-gallery-1.jpg   ← first gallery image
//     my-project-gallery-2.jpg   ← second gallery image
//     my-project-gallery-3.jpg   ← third gallery image
//
//   If mainMediaType is "video", the grid card uses a thumbnail instead:
//     my-project-thumb.jpg
//
//   Optional — separate grid card crop (only if you need a tighter frame):
//     thumbnailImage: "/static/img/my-project-thumb.jpg"
//
// ─── HOW TO ADD A YOUTUBE VIDEO ──────────────────────────────────────────────
//
//   Hero video (plays on the project page instead of a photo):
//     Set  mainMediaType: "video"  and  mainVideo: "YOUTUBE_VIDEO_ID"
//     Still provide a -thumb.jpg so the home grid card has something to show.
//
//   Gallery video (appears in the alternating gallery rows):
//     { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description." }
//
//   To find the video ID: it's the part after "watch?v=" in the YouTube URL.
//     Example:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//     ID:       dQw4w9WgXcQ
//
// ─── PROJECT FIELDS ──────────────────────────────────────────────────────────
//
//   slug          → URL path and image filename base. Use lowercase-with-dashes.
//                   Example: "my-project" → /projects/my-project
//                                         → my-project-hero.jpg, etc.
//
//   title         → Shown on the grid card and project page header.
//
//   category      → Short label under the title. e.g. "Brand Identity"
//
//   mainMediaType → "image"  — photo or GIF hero (default)
//                   "video"  — YouTube embed as the hero
//
//   mainVideo     → YouTube video ID. Only set when mainMediaType is "video".
//
//   intro         → Description paragraph on the project page.
//
//   heroMedia     → Optional. Turns the project hero into a dot-navigated slider.
//                   Leave it out to show a single static hero image.
//                   First item is typically a video, followed by supporting images.
//                   Image: { type: "image", caption: "Description." }
//                             files: slug-hero-slide-1.jpg, -slide-2.jpg, etc.
//                   Video: { type: "video", src: "YOUTUBE_ID", caption: "..." }
//
//   gallery       → Supporting images shown below the hero in alternating rows.
//                   Use these for sketches, process shots, real-world photos —
//                   anything that adds context rather than leading the story.
//                   Image: { type: "image", caption: "Description." }
//                             files: slug-gallery-1.jpg, -gallery-2.jpg, etc.
//                   Video: { type: "video", src: "YOUTUBE_ID", caption: "..." }
//                   Image srcs are derived from slug — you don't type them here.
//
// ═════════════════════════════════════════════════════════════════════════════

const projects = [

  // ─── PROJECT TEMPLATE (copy this block to add a new project) ──────────────
  //
  // {
  //   slug: "project-slug",
  //   title: "Project Title",
  //   category: "Category / Sub-category",
  //   mainMediaType: "image",
  //   // mainVideo: "YOUTUBE_VIDEO_ID",   ← only if mainMediaType is "video"
  //   // thumbnailImage: "/static/img/project-slug-thumb.jpg",  ← optional grid-card override
  //   intro: "Project description goes here.",
  //
  //   // heroMedia is optional — add it to turn the hero into a clickable slider.
  //   // Leave it out to show a single hero image as normal.
  //   // Images derive from: project-slug-hero-slide-1.jpg, -slide-2.jpg, etc.
  //   // heroMedia: [
  //   //   { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Caption." },
  //   //   { type: "image", caption: "Caption for slide 1." },
  //   //   { type: "image", caption: "Caption for slide 2." },
  //   //   { type: "image", caption: "Caption for slide 3." },
  //   // ],
  //
  //   gallery: [
  //     { type: "image", caption: "Caption for gallery image 1." },
  //     { type: "image", caption: "Caption for gallery image 2." },
  //     { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Caption for this video." },
  //   ],
  // },
  //
  // ──────────────────────────────────────────────────────────────────────────


  // ─── MF DOOM ───────────────────────────────────────────────────────────────
  {
    slug: "mf-doom-art-print",
    title: "MF DOOM Illustration",
    category: "Print Illustration",
    mainMediaType: "image",
    intro:
      "What started as a personal tribute to the late MF DOOM, became something much bigger. The print spread on its own, the internet did its thing. This piece was copied onto walls in Colorado and New York, tattooed on strangers and shared across the internet without a single dollar behind it. Just a piece made out of respect for a legend (if you know you know). The fact that I could contribute something like that to the world and have it impact people at all means the world to me. ",
    gallery: [
      { type: "video", src: "0IShJ_xxbaY", caption: "Quick Proccess video of the initial idea from sketch." },
      { type: "image", caption: "Close up / Detailed view. My goal was to imitate a vintage print effect to sell the comic aesthetic." },
      { type: "image", caption: "Art prints and the Album that inspired everything." },
      { type: "image", caption: "Inspired graffiti mural in Colorado Springs, Colorado at What's Left Records." },
      { type: "image", caption: "Inspired graffiti mural in Brooklyn, New York." },
      { type: "image", caption: "Inspired Tattoo of my MF DOOM piece." },
    ],
  },

  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  {
    slug: "afuego51",
    title: "AFUEGO51 — Food Truck Design",
    category: "Brand Identity & Large Format Design",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },
    ],
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Animated Cover Art",
    category: "Album Art & Motion",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Animated canvas in action." },
    ],
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  {
    slug: "bar-k-event-backdrop",
    title: "BAR-K Event Backdrop",
    category: "Large Format Illustration",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Time-lapse of the install." },
    ],
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "Book Cover Illustration",
    category: "Editorial Illustration",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Cover design process." },
    ],
  },

  // ─── LEVEE x HALLOWEEN ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "LEVEE x Halloween — Event",
    category: "Motion & Campaign Design",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Campaign animation." },
    ],
  },

  // ─── LEVEE — VINTAGE MARKET ───────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "LEVEE — Vintage Market Event",
    category: "Motion & Campaign Design",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Vintage Market campaign animation." },
    ],
  },

  // ─── CUTIE ─────────────────────────────────────────────────────────────────
  {
    slug: "cutie-lyric-music-video",
    title: "CUTIE — Lyric Music Video",
    category: "Motion Graphics",
    mainMediaType: "image",
    mainImage: "/static/img/cutie-lyric-music-video-hero.gif", // GIF hero — kept explicit so .gif extension is used
    // mainVideo: "YOUTUBE_VIDEO_ID",  // ← uncomment + set mainMediaType: "video" to show the full video as the hero
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", src: "/static/img/cutie-lyric-music-video-hero.gif", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Full lyric video." },
    ],
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Apparel Design",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Design process walkthrough." },
    ],
  },

  // ─── DEMO REEL ────────────────────────────────────────────────────────────
  {
    slug: "demo-reel",
    title: "Demo Reel",
    category: "Motion Graphics",
    mainMediaType: "video",
    mainVideo: "YOUTUBE_VIDEO_ID",                 // ← paste the YouTube video ID here
    intro: "(Coming Soon)",
    gallery: [
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description of this clip." },
      // { type: "image", caption: "Still from the reel." },
    ],
  },

  // ─── VARIOUS PROJECTS ─────────────────────────────────────────────────────
  {
    slug: "various-projects",
    title: "Various Projects",
    category: "Mixed Work",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      // { type: "image", caption: "Description." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description." },
    ],
  },

  // ─── K.H.A.S.H FOUNDATION ────────────────────────────────────────────────
  {
    slug: "khash-foundation",
    title: "K.H.A.S.H Foundation",
    category: "Brand Identity",
    mainMediaType: "image",
    intro: "(Coming Soon)",
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
  },

];

export default projects;
