// ═════════════════════════════════════════════════════════════════════════════
// PROJECTS.JS — PORTFOLIO CONTENT
//
// This is the only file you edit to manage projects.
// Each entry becomes a card on the home page and its own project page.
//
// ─── ADDING A NEW PROJECT — QUICK STEPS ──────────────────────────────────────
//
//   1. Copy the template block below and fill in:
//        slug, title, category, tags, year, mainMediaType, description, gallery
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
//     my-project-hero.jpg        ← home grid card + project page banner
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
//   Gallery video (appears in the gallery):
//     { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description." }
//
//   To find the video ID: it's the part after "watch?v=" in the YouTube URL.
//     Example:  https://www.youtube.com/watch?v=dQw4w9WgXcQ
//     ID:       dQw4w9WgXcQ
//
// ─── PROJECT FIELDS ──────────────────────────────────────────────────────────
//
//   slug          → URL path and image filename base. Use lowercase-with-dashes.
//
//   title         → Shown on the grid card and project page.
//
//   category      → Short label shown on the card. e.g. "Print Illustration"
//
//   tags          → Drives the filter tabs on the home page. Use one or more of:
//                     "illustration-design"
//                     "brand-identity"
//                     "motion-design"
//                   Example: tags: ["illustration-design"]
//                   Example: tags: ["motion-design", "illustration-design"]
//
//   year          → Displayed on the project page. e.g. "2024" or "2023–2024"
//
//   mainMediaType → "image"  — photo or GIF hero (default)
//                   "video"  — YouTube embed as the hero
//
//   mainVideo     → YouTube video ID. Only set when mainMediaType is "video".
//
//   description   → Array of paragraph strings shown on the project page.
//                   Each string becomes its own paragraph.
//                   Example: description: [
//                     "First paragraph of the project story.",
//                     "Second paragraph with more detail.",
//                   ]
//
//   heroMedia     → Optional. Turns the project hero into a dot-navigated slider.
//                   Leave it out to show a single static hero image.
//                   Image: { type: "image", caption: "Description." }
//                             files: slug-hero-slide-1.jpg, -slide-2.jpg, etc.
//                   Video: { type: "video", src: "YOUTUBE_ID", caption: "..." }
//
//   gallery       → Images and videos shown below the description.
//                   Image: { type: "image", caption: "Description." }
//                             files: slug-gallery-1.jpg, -gallery-2.jpg, etc.
//                   Video: { type: "video", src: "YOUTUBE_ID", caption: "..." }
//                   Optional size field controls layout width:
//                     size: "full"       → spans the full width
//                     size: "half"       → half width (default)
//                     size: "third"      → one third width
//                     size: "two-thirds" → two thirds width
//
//   credits       → Optional. Shown in the footer of the project page.
//                   credits: { lines: ["Studio / Name", "Role"] }
//
//   links         → Optional. Shown in the footer of the project page.
//                   links: [{ label: "Behance", url: "https://..." }]
//
// ═════════════════════════════════════════════════════════════════════════════

const projects = [

  // ─── PROJECT TEMPLATE (copy this block to add a new project) ──────────────
  //
  // {
  //   slug: "project-slug",
  //   title: "Project Title",
  //   category: "Category Label",
  //   tags: ["illustration-design"],   // "illustration-design" | "brand-identity" | "motion-design"
  //   year: "2024",
  //   mainMediaType: "image",
  //   // mainVideo: "YOUTUBE_VIDEO_ID",   ← only if mainMediaType is "video"
  //   // thumbnailImage: "/static/img/project-slug-thumb.jpg",  ← optional grid override
  //   description: [
  //     "First paragraph about this project.",
  //     "Second paragraph with more detail.",
  //   ],
  //
  //   // heroMedia is optional — add it to turn the hero into a slider.
  //   // heroMedia: [
  //   //   { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Caption." },
  //   //   { type: "image", caption: "Caption for slide 1." },
  //   // ],
  //
  //   gallery: [
  //     { type: "image", caption: "Caption.", size: "full" },
  //     { type: "image", caption: "Caption." },                   // half (default)
  //     { type: "image", caption: "Caption.", size: "third" },
  //     { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Caption.", size: "full" },
  //   ],
  //
  //   credits: { lines: ["Ejuan Henderson", "Illustration & Design"] },
  //   links: [{ label: "Instagram", url: "https://www.instagram.com/ohhej" }],
  // },
  //
  // ──────────────────────────────────────────────────────────────────────────


  // ─── MF DOOM ───────────────────────────────────────────────────────────────
  {
    slug: "mf-doom-art-print",
    title: "MF DOOM Illustration",
    category: "Print Illustration",
    tags: ["illustration-design"],  // Illustration
    year: "2021",
    mainMediaType: "image",
    description: [
      "What started as a personal tribute to the late MF DOOM became something much bigger. The print spread on its own — the internet did its thing. This piece was copied onto walls in Colorado and New York, tattooed on strangers, and shared across the internet without a single dollar behind it. Just a piece made out of respect for a legend. If you know, you know.",
      "The fact that I could contribute something like that to the world and have it impact people at all means everything to me.",
    ],
    gallery: [
      { type: "video", src: "0IShJ_xxbaY", caption: "Quick process video of the initial idea from sketch.", size: "full" },
      { type: "image", caption: "Close up / detailed view. My goal was to imitate a vintage print effect to sell the comic aesthetic." },
      { type: "image", caption: "Art prints and the album that inspired everything." },
      { type: "image", caption: "Inspired graffiti mural in Colorado Springs, Colorado at What's Left Records." },
      { type: "image", caption: "Inspired graffiti mural in Brooklyn, New York." },
      { type: "image", caption: "Inspired tattoo of my MF DOOM piece." },
    ],
    credits: { lines: ["Ejuan Henderson", "Print Illustration"] },
    links: [{ label: "Instagram", url: "https://www.instagram.com/ohhej" }],
  },

  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  {
    slug: "afuego51",
    title: "AFUEGO51 — Food Truck Design",
    category: "Brand Identity & Large Format Design",
    tags: ["brand-identity", "illustration-design"],
    year: "",
    mainMediaType: "image",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Brand Identity & Large Format Design"] },
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Animated Cover Art",
    category: "Album Art & Motion",
    tags: ["illustration-design", "motion-design"],  // Illustration + Motion
    year: "",
    mainMediaType: "image",
    mainImage: "/static/img/hold-it-down-cover-art-hero.gif",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-2.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-4.gif", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-5.gif", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-6.gif", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-7.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-8.jpg", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Cover art Illustration & Motion"] },
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  {
    slug: "bar-k-event-backdrop",
    title: "BAR-K Event Backdrop",
    category: "Large Format Illustration",
    tags: ["illustration-design"],  // Illustration
    year: "",
    mainMediaType: "image",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Large Format Illustration"] },
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "Book Cover Illustration",
    category: "Editorial Illustration",
    tags: ["illustration-design", "brand-identity"],  // Illustration + Design
    year: "",
    mainMediaType: "image",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Editorial Illustration"] },
  },

  // ─── LEVEE x HALLOWEEN ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "LEVEE x Halloween — Event",
    category: "Motion & Campaign Design",
    tags: ["brand-identity", "motion-design"],
    year: "",
    mainMediaType: "image",
    mainImage: "/static/img/levee-x-halloween-hero.gif",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", src: "/static/img/levee-x-halloween-gallery-1.gif", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Motion & Campaign Design"] },
  },

  // ─── LEVEE — VINTAGE MARKET ───────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "LEVEE — Vintage Market Event",
    category: "Motion & Campaign Design",
    tags: ["brand-identity", "motion-design"],
    year: "",
    mainMediaType: "image",
    mainImage: "/static/img/levee-vintage-market-hero.gif",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", src: "/static/img/levee-vintage-market-gallery-1.gif", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-2.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-4.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-5.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-7.jpg", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Motion & Campaign Design"] },
  },

  // ─── CUTIE ─────────────────────────────────────────────────────────────────
  {
    slug: "cutie-lyric-music-video",
    title: "CUTIE — Lyric Music Video",
    category: "Motion Graphics",
    tags: ["motion-design"],
    year: "",
    mainMediaType: "image",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "video", src: "-ZMA5H8jpKc", caption: "(Coming Soon)", size: "full" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-hero.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-1.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-2.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-3.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-4.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-6.jpg", caption: "(Coming Soon)" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-7.jpg", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Motion Graphics"] },
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Apparel Design",
    tags: ["illustration-design", "brand-identity"],  // Illustration + Design
    year: "",
    mainMediaType: "image",
    description: [
      "(Coming Soon)",
    ],
    gallery: [
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
      { type: "image", caption: "(Coming Soon)" },
    ],
    credits: { lines: ["Ejuan Henderson", "Apparel Design"] },
  },

  // ─── DEMO REEL ────────────────────────────────────────────────────────────
  // Hidden — uncomment to restore
  // {
  //   slug: "demo-reel",
  //   title: "Demo Reel",
  //   category: "Motion Graphics",
  //   tags: ["illustration-design", "brand-identity", "motion-design"],
  //   year: "",
  //   mainMediaType: "video",
  //   mainVideo: "YOUTUBE_VIDEO_ID",
  //   description: ["(Coming Soon)"],
  //   gallery: [],
  //   credits: { lines: ["Ejuan Henderson", "Motion Graphics"] },
  // },

  // ─── VARIOUS PROJECTS / THE LAB ───────────────────────────────────────────
  // Rename slug/title once the concept is locked in.
  {
    slug: "various-projects",
    title: "Various Projects",
    category: "Mixed Work",
    tags: [],  // no direct filter tags — individual items below carry their own
    year: "",
    mainMediaType: "image",
    denseGrid: true,
    description: [
      "(Coming Soon)",
    ],
    gallery: [],
    credits: { lines: ["Ejuan Henderson"] },

    // ── Individual items shown as separate cards when a filter is active ──
    // Each item needs:
    //   title    — card title
    //   category — card subtitle
    //   tags     — which filter(s) it appears under
    //   src      — image path (put the optimized file in public/static/img/)
    //
    // Example:
    // items: [
    //   {
    //     title: "Swaptober5 Event Poster",
    //     category: "Poster Design",
    //     tags: ["illustration-design", "brand-identity"],
    //     src: "/static/img/various-swaptober5-poster.jpg",
    //   },
    // ],
    items: [],
  },

  // ─── K.H.A.S.H FOUNDATION ────────────────────────────────────────────────
  // Hidden — uncomment to restore
  // {
  //   slug: "khash-foundation",
  //   title: "K.H.A.S.H Foundation",
  //   category: "Brand Identity",
  //   tags: ["brand-identity"],
  //   year: "",
  //   mainMediaType: "image",
  //   description: ["(Coming Soon)"],
  //   gallery: [
  //     { type: "image", caption: "(Coming Soon)" },
  //     { type: "image", caption: "(Coming Soon)" },
  //     { type: "image", caption: "(Coming Soon)" },
  //   ],
  //   credits: { lines: ["Ejuan Henderson", "Brand Identity"] },
  // },

];

export default projects;
