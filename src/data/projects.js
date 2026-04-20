// ═════════════════════════════════════════════════════════════════════════════
// PROJECTS.JS — PORTFOLIO CONTENT
//
// This is the only file to edit when managing projects.
// Each project shows up as a card on the home page and has its own page.
//
// ─── HOW TO ADD AN IMAGE ─────────────────────────────────────────────────────
//
//   1. Compress the image first at squoosh.app (aim for under 300KB)
//   2. Drop the file into: tony/public/static/img/
//   3. Reference it below as: "/static/img/filename.jpg"
//
//   Supported formats: .jpg  .png  .gif  .webp
//
// ─── HOW TO ADD A YOUTUBE VIDEO ──────────────────────────────────────────────
//
//   1. Upload the video to YouTube
//   2. Copy the VIDEO ID — it's the part after "watch?v=" in the URL
//      Example URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
//      Video ID:    dQw4w9WgXcQ
//   3. Set  type: "video"  and paste the ID into  src:
//
// ─── GALLERY ITEMS ───────────────────────────────────────────────────────────
//
//   Each project has a `gallery` array. Each item is either
//   an image or a video, plus a short caption (1–2 sentences max).
//
//   Image item:
//     { type: "image", src: "/static/img/filename.jpg", caption: "Description here." }
//
//   Video item:
//     { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description here." }
//
//   3–5 gallery items per project is the sweet spot.
//   The gallery alternates: item 1 = media left, item 2 = media right, etc.
//
// ─── PROJECT FIELDS ──────────────────────────────────────────────────────────
//
//   slug          → URL for this project. Use lowercase-with-dashes.
//                   Example: "project-name"  →  ejuanhenderson.com/projects/project-name
//
//   title         → Project title shown on the card and project page.
//
//   category      → Short label shown under the title. (e.g. "Animation", "Illustration / Design")
//
//   mainImage     → Image shown on the HOME PAGE grid card AND as the
//                   hero on the project page. Path: "/static/img/filename.jpg"
//
//   mainMediaType → Set to "image" for a photo/gif hero.
//                   Set to "video" to show a YouTube embed as the hero instead.
//
//   mainVideo     → Only needed if mainMediaType is "video".
//                   Paste the YouTube VIDEO ID here (not the full URL).
//
//   intro         → The paragraph of text on the project page describing the work.
//
//   gallery       → Array of image/video items (see format above).
//
// ═════════════════════════════════════════════════════════════════════════════

const projects = [

  // ─── PROJECT TEMPLATE (copy this block to add a new project) ──────────────
  //
  // {
  //   slug: "project-slug",
  //   title: "Project Title",
  //   category: "Category / Sub-category",
  //   mainImage: "/static/img/main-image.jpg",         ← home grid + hero image
  //   mainMediaType: "image",                          ← "image" or "video"
  //   // mainVideo: "YOUTUBE_VIDEO_ID",               ← uncomment if mainMediaType is "video"
  //   intro: "Project description goes here.",
  //   gallery: [
  //     { type: "image", src: "/static/img/image-1.jpg", caption: "Caption for this image." },
  //     { type: "image", src: "/static/img/image-2.jpg", caption: "Caption for this image." },
  //     { type: "video", src: "YOUTUBE_VIDEO_ID",        caption: "Caption for this video." },
  //   ],
  // },
  //
  // ──────────────────────────────────────────────────────────────────────────


  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  {
    slug: "afuego51",
    title: "AFUEGO51 — Food Truck Design",
    category: "Brand Identity & Large Format Design",
    mainImage: "/static/img/afuego51.jpg",       // ← replace with the project image
    mainMediaType: "image",
    intro:
      "AFUEGO51 is a food truck brand built around heat, personality, and street-level energy. The visual identity needed to cut through — working across signage, packaging, and merch in a way that felt bold without losing clarity. I developed the full brand direction, from the wordmark and color system down to how it landed across the truck wrap and printed collateral.",
    gallery: [
      { type: "image", src: "/static/img/afuego51.jpg",   caption: "Final wordmark and brand identity." },
      { type: "image", src: "/static/img/afuego51-2.jpg", caption: "Brand applications across signage and packaging." },
      { type: "image", src: "/static/img/afuego51-3.jpg", caption: "Early sketches and concept exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },  ← uncomment to add a video
    ],
  },

  // ─── MF DOOM ───────────────────────────────────────────────────────────────
  {
    slug: "mf-doom-art-print",
    title: "MF DOOM — Art Print",
    category: "Print Illustration",
    mainImage: "/static/img/mfdoom.jpg",         // ← replace with the project image
    mainMediaType: "image",
    intro:
      "A tribute print for MF DOOM, built around the weight and mythology the man carried. The illustration pulls from the iconography surrounding his legacy — the mask, the persona, the aura — rendered in a style that feels personal rather than decorative. Designed as a limited-run print, the piece was made to live on a wall and hold up at close range.",
    gallery: [
      { type: "image", src: "/static/img/mfdoom.jpg",   caption: "Final limited-run print." },
      { type: "image", src: "/static/img/mfdoom-2.jpg", caption: "Detail and alternate view." },
      { type: "image", src: "/static/img/mfdoom-3.jpg", caption: "Sketch and process work." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },
    ],
  },

  // ─── CUTIE ─────────────────────────────────────────────────────────────────
  {
    slug: "cutie-lyric-music-video",
    title: "CUTIE — Lyric Music Video",
    category: "Motion Graphics",
    mainImage: "/static/img/cutie.gif",          // ← GIFs are supported
    mainMediaType: "image",
    // mainVideo: "YOUTUBE_VIDEO_ID",            // ← uncomment + set mainMediaType: "video" to show the full video as the hero
    intro:
      "An animated lyric video made to move with the track, not just follow it. Every visual decision — typography, color, pacing — was built around the emotional rhythm of the song rather than simply syncing to the beat. The result is a visual environment that feels like part of the music, not a caption running over it.",
    gallery: [
      { type: "image", src: "/static/img/cutie.gif",   caption: "Animated hero loop." },
      { type: "image", src: "/static/img/cutie-2.jpg", caption: "Still frame from the video." },
      { type: "image", src: "/static/img/cutie-3.jpg", caption: "Storyboard and motion sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Full lyric video." },
    ],
  },

  // ─── K.H.A.S.H FOUNDATION ─────────────────────────────────────────────────
  {
    slug: "khash-foundation",
    title: "K.H.A.S.H Foundation",
    category: "Brand Identity",
    mainImage: "/static/img/khash.jpg",          // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Brand and design work for the K.H.A.S.H Foundation — a cause-driven organization that needed visuals to match the weight and clarity of its mission. The design system prioritizes legibility and intentionality, building trust at first glance while keeping the overall identity warm and accessible.",
    gallery: [
      { type: "image", src: "/static/img/khash.jpg",   caption: "Primary brand lockup." },
      { type: "image", src: "/static/img/khash-2.jpg", caption: "Layout and application." },
      { type: "image", src: "/static/img/khash-3.jpg", caption: "Detail and exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Brand presentation." },
    ],
  },

  // ─── LEVEE x SWAPTOBER ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "LEVEE x Halloween — Event",
    category: "Motion & Campaign Design",
    mainImage: "/static/img/levee.jpg",          // ← replace with the Halloween event project image
    mainMediaType: "image",
    intro:
      "A visual campaign for LEVEE x Halloween — an event that needed motion and design that could live on social and stop a scroll. Animation and static assets were developed together as one cohesive system, built to capture the energy of the event and move people to show up.",
    gallery: [
      { type: "image", src: "/static/img/levee.jpg",   caption: "Key visual and event graphic." },
      { type: "image", src: "/static/img/levee-2.jpg", caption: "Motion frame and social assets." },
      { type: "image", src: "/static/img/levee-3.jpg", caption: "Concept board and sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Campaign animation." },
    ],
  },

  // ─── LEVEE — SOLSTICE ─────────────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "LEVEE — Vintage Market Event",
    category: "Motion & Campaign Design",
    mainImage: "/static/img/levee-vintage.jpg",   // ← replace with the Vintage Market project image
    mainMediaType: "image",
    intro:
      "Campaign design and motion work for LEVEE's Vintage Market event. A separate identity from the Halloween campaign but rooted in the same ongoing creative relationship with the brand — built to feel distinct for the occasion while staying true to LEVEE's visual language. Social-first design with motion assets to drive attendance and energy.",
    gallery: [
      { type: "image", src: "/static/img/levee-vintage.jpg",   caption: "Key visual for the Vintage Market event." },
      { type: "image", src: "/static/img/levee-vintage-2.jpg", caption: "Social campaign assets." },
      { type: "image", src: "/static/img/levee-vintage-3.jpg", caption: "Motion frame and detail." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Vintage Market campaign animation." },
    ],
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  {
    slug: "bar-k-event-backdrop",
    title: "BAR-K Event Backdrop",
    category: "Large Format Illustration",
    mainImage: "/static/img/bark.jpg",           // ← replace with the project image
    mainMediaType: "image",
    intro:
      "A large-format illustration created for the BAR-K event space, designed to anchor the room and hold up at scale. The piece had to function as both art and environment — something guests would photograph, stand in front of, and remember. Scale, color value, and composition were all considered through the lens of how the work would land in a physical space.",
    gallery: [
      { type: "image", src: "/static/img/bark.jpg",   caption: "Final large-format illustration." },
      { type: "image", src: "/static/img/bark-2.jpg", caption: "Installed in the event space." },
      { type: "image", src: "/static/img/bark-3.jpg", caption: "Sketch and detail work." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Time-lapse of the install." },
    ],
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Apparel Design",
    mainImage: "/static/img/kstate.jpg",         // ← replace with the project image
    mainMediaType: "image",
    intro:
      "A graphic tee designed for K-State Wildcats fans — athletic-coded but illustration-first, with the kind of detail that holds up in hand. The design channels school pride without leaning on clichés, translating the Wildcats identity into something you'd actually want to wear. Typography, texture, and mark composition were developed together to make the graphic feel unified and finished.",
    gallery: [
      { type: "image", src: "/static/img/kstate.jpg",   caption: "Final tee graphic." },
      { type: "image", src: "/static/img/kstate-2.jpg", caption: "Mockup on garment." },
      { type: "image", src: "/static/img/kstate-3.jpg", caption: "Sketch and type exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Design process walkthrough." },
    ],
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "The Life I Love & Seeds of Hope — Book Covers",
    category: "Editorial Illustration",
    mainImage: "/static/img/bookcovers.jpg",     // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Cover illustration for two titles — The Life I Love and Seeds of Hope. Each cover uses illustration and typography together to communicate tone, genre, and atmosphere before a single word inside is read. Both were treated as their own problem — distinct enough to stand alone, cohesive enough to feel like they share a hand.",
    gallery: [
      { type: "image", src: "/static/img/bookcovers.jpg",   caption: "The Life I Love — final cover." },
      { type: "image", src: "/static/img/bookcovers-2.jpg", caption: "Seeds of Hope — final cover." },
      { type: "image", src: "/static/img/bookcovers-3.jpg", caption: "Sketch and type layout." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Cover design process." },
    ],
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Animated Cover Art",
    category: "Album Art & Motion",
    mainImage: "/static/img/holditdown.jpg",     // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Cover art and animation for Hold It Down — live on Spotify as an animated canvas that plays alongside the track. The illustration was built with movement in mind from the start: forms that breathe, elements that shift without losing what makes them feel grounded. The final deliverable works as a static cover and as a looping animated piece in the player.",
    gallery: [
      { type: "image", src: "/static/img/holditdown.jpg",   caption: "Final cover art — static version." },
      { type: "image", src: "/static/img/holditdown-2.jpg", caption: "Spotify Canvas — animated frame." },
      { type: "image", src: "/static/img/holditdown-3.jpg", caption: "Sketch and concept." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Animated canvas in action." },
    ],
  },

  // ─── DEMO REEL ────────────────────────────────────────────────────────────
  {
    slug: "demo-reel",
    title: "Demo Reel",
    category: "Motion Graphics",
    mainImage: "/static/img/demo-reel-thumb.jpg",  // ← add a thumbnail image (still frame or custom graphic)
    mainMediaType: "video",
    mainVideo: "YOUTUBE_VIDEO_ID",                 // ← paste the YouTube video ID here
    intro:
      "A reel of motion work spanning animation, lyric videos, and branded content. Built across a range of styles and clients, it represents the breadth of what I do when things are moving.",
    gallery: [
      // Add supporting clips, stills, or behind-the-scenes below
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Description of this clip." },
      // { type: "image", src: "/static/img/reel-still-1.jpg", caption: "Still from the reel." },
    ],
  },

  // ─── VARIOUS PROJECTS ─────────────────────────────────────────────────────
  {
    slug: "various-projects",
    title: "Various Projects",
    category: "Mixed Work",
    mainImage: "/static/img/various-thumb.jpg",    // ← add a thumbnail — a collage or single strong image works well
    mainMediaType: "image",
    intro:
      "A mix of personal work, side projects, and things made just to make them. Not every piece fits a neat category — these are the ones that don't, and that's the point.",
    gallery: [
      // Add whatever here — personal illustrations, experiments, fun stuff
      // { type: "image", src: "/static/img/various-1.jpg", caption: "Description." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID",          caption: "Description." },
    ],
  },

];

export default projects;
