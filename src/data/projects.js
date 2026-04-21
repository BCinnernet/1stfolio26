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


  // ─── MF DOOM ───────────────────────────────────────────────────────────────
  {
    slug: "mf-doom-art-print",
    title: "MF DOOM — Art Print",
    category: "Print Illustration",
    mainImage: "/static/img/mfdoom.jpg",         // ← replace with the project image
    mainMediaType: "image",
    intro:
      "What started as a personal tribute became something much bigger. The print spread on its own — copied onto walls in New York and Iowa, tattooed on strangers, shared across the internet without a single dollar behind it. No client, no brief. Just a piece made out of respect for the legend. The fact that people wanted it on their skin and their buildings says more than any brief could.",
    gallery: [
      { type: "image", src: "/static/img/mfdoom.jpg",   caption: "Final limited-run print." },
      { type: "image", src: "/static/img/mfdoom-2.jpg", caption: "Detail and alternate view." },
      { type: "image", src: "/static/img/mfdoom-3.jpg", caption: "Sketch and process work." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },
    ],
  },

  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  {
    slug: "afuego51",
    title: "AFUEGO51 — Food Truck Design",
    category: "Brand Identity & Large Format Design",
    mainImage: "/static/img/afuego51.jpg",       // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Starting from nothing — no name, no visual identity, no presence. AFUEGO51 needed a brand that could cut through before the food even had a chance to speak. I built the full identity from the ground up: wordmark, color system, truck wrap, large format printing, packaging, and merch. The truck launched, hit social media, and started selling out. The work did its job.",
    gallery: [
      { type: "image", src: "/static/img/afuego51.jpg",   caption: "Final wordmark and brand identity." },
      { type: "image", src: "/static/img/afuego51-2.jpg", caption: "Brand applications across signage and packaging." },
      { type: "image", src: "/static/img/afuego51-3.jpg", caption: "Early sketches and concept exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },
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
      "Cover art and animated Spotify Canvas for Hold It Down — a project by Kansas City rapper and producer Dom Chronicles, featuring Sir Michael Rocks. The illustration was built with movement in mind from the start, designed to loop seamlessly as a Spotify Canvas while holding up as a standalone static cover. It's live on Spotify right now, animating every time someone presses play.",
    gallery: [
      { type: "image", src: "/static/img/holditdown.jpg",   caption: "Final cover art — static version." },
      { type: "image", src: "/static/img/holditdown-2.jpg", caption: "Spotify Canvas — animated frame." },
      { type: "image", src: "/static/img/holditdown-3.jpg", caption: "Sketch and concept." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Animated canvas in action." },
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
      "A large-format illustration commission through my work at Commerce Bank — created for BAR-K, a dog-friendly bar and event space with locations in Kansas City and St. Louis, Missouri. The piece had to anchor a room, hold up at scale, and function as a backdrop that thousands of people would stand in front of and photograph. From initial sketches to real-world install, it landed exactly where it needed to.",
    gallery: [
      { type: "image", src: "/static/img/bark.jpg",   caption: "Final large-format illustration." },
      { type: "image", src: "/static/img/bark-2.jpg", caption: "Installed in the event space." },
      { type: "image", src: "/static/img/bark-3.jpg", caption: "Sketch and detail work." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Time-lapse of the install." },
    ],
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "Book Cover Illustration",
    category: "Editorial Illustration",
    mainImage: "/static/img/bookcovers.jpg",     // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Cover illustration for two published bestsellers — The Life I Love and Seeds of Hope — both available for purchase online. Each cover was designed to make a promise before a single page is turned, using illustration and typography together to communicate tone and genre at a glance. Two different titles, two different moods, one consistent hand.",
    gallery: [
      { type: "image", src: "/static/img/bookcovers.jpg",   caption: "The Life I Love — final cover." },
      { type: "image", src: "/static/img/bookcovers-2.jpg", caption: "Seeds of Hope — final cover." },
      { type: "image", src: "/static/img/bookcovers-3.jpg", caption: "Sketch and type layout." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Cover design process." },
    ],
  },

  // ─── LEVEE x HALLOWEEN ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "LEVEE x Halloween — Event",
    category: "Motion & Campaign Design",
    mainImage: "/static/img/levee.jpg",          // ← replace with the Halloween event project image
    mainMediaType: "image",
    intro:
      "A Halloween event campaign for LEVEE — motion-first, built to stop a scroll and move people to show up. The campaign came with music, which meant the motion and the sound had to work as one thing rather than separately. Social assets, animated graphics, and a cohesive visual identity built for the night.",
    gallery: [
      { type: "image", src: "/static/img/levee.jpg",   caption: "Key visual and event graphic." },
      { type: "image", src: "/static/img/levee-2.jpg", caption: "Motion frame and social assets." },
      { type: "image", src: "/static/img/levee-3.jpg", caption: "Concept board and sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Campaign animation." },
    ],
  },

  // ─── LEVEE — VINTAGE MARKET ───────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "LEVEE — Vintage Market Event",
    category: "Motion & Campaign Design",
    mainImage: "/static/img/levee-vintage.jpg",   // ← replace with the Vintage Market project image
    mainMediaType: "image",
    intro:
      "A visual campaign for LEVEE's Vintage Market — part of an ongoing creative relationship with the brand. Each LEVEE event gets its own distinct identity while staying true to the brand's visual language. Motion and static assets developed together, built to live on social and drive attendance.",
    gallery: [
      { type: "image", src: "/static/img/levee-vintage.jpg",   caption: "Key visual for the Vintage Market event." },
      { type: "image", src: "/static/img/levee-vintage-2.jpg", caption: "Social campaign assets." },
      { type: "image", src: "/static/img/levee-vintage-3.jpg", caption: "Motion frame and detail." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Vintage Market campaign animation." },
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
      "An animated lyric video for a musician and rapper — built to move with the track, not just illustrate it. Every visual choice was made in service of the music: the typography, the color, the pacing. The result is a visual world that feels like part of the song rather than a layer placed on top of it.",
    gallery: [
      { type: "image", src: "/static/img/cutie.gif",   caption: "Animated hero loop." },
      { type: "image", src: "/static/img/cutie-2.jpg", caption: "Still frame from the video." },
      { type: "image", src: "/static/img/cutie-3.jpg", caption: "Storyboard and motion sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Full lyric video." },
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
      "A graphic tee designed through my work at Commerce Bank for K-State Wildcats — a Division I college athletics program with real reach. The design went to print and landed on actual students. Athletic-coded but illustration-first, the graphic translates school pride into something worth wearing rather than just another piece of licensed merch.",
    gallery: [
      { type: "image", src: "/static/img/kstate.jpg",   caption: "Final tee graphic." },
      { type: "image", src: "/static/img/kstate-2.jpg", caption: "Printed and worn by students." },
      { type: "image", src: "/static/img/kstate-3.jpg", caption: "Sketch and type exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Design process walkthrough." },
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
      "Short film posters, merch designs, motion graphic one-offs, and things made just to make them. Not every piece fits a neat category — these are the ones that don't, and that's the point.",
    gallery: [
      // Add whatever here — posters, merch, experiments, fun stuff
      // { type: "image", src: "/static/img/various-1.jpg", caption: "Description." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID",          caption: "Description." },
    ],
  },

  // ─── TBD ──────────────────────────────────────────────────────────────────
  {
    slug: "khash-foundation",
    title: "K.H.A.S.H Foundation",
    category: "Brand Identity",
    mainImage: "/static/img/khash.jpg",          // ← replace with the project image
    mainMediaType: "image",
    intro:
      "Brand and identity work for the K.H.A.S.H Foundation — a cause-driven organization with real presence. More to come as the brand grows.",
    gallery: [
      { type: "image", src: "/static/img/khash.jpg",   caption: "Primary brand lockup." },
      { type: "image", src: "/static/img/khash-2.jpg", caption: "Layout and application." },
      { type: "image", src: "/static/img/khash-3.jpg", caption: "Detail and exploration." },
    ],
  },

];

export default projects;
