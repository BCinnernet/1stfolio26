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
    title: "MF DOOM — Art Print",
    category: "Print Illustration",
    mainMediaType: "image",
    intro:
      "What started as a personal tribute became something much bigger. The print spread on its own — copied onto walls in New York and Iowa, tattooed on strangers, shared across the internet without a single dollar behind it. No client, no brief. Just a piece made out of respect for the legend. The fact that people wanted it on their skin and their buildings says more than any brief could.",
    heroMedia: [
      { type: "video", src: "YOUTUBE_VIDEO_ID",  caption: "Process walkthrough." },
      { type: "image", caption: "Final limited-run print — front." },
      { type: "image", caption: "Detail and alternate view." },
      { type: "image", caption: "Wall install, New York." },
    ],
    gallery: [
      { type: "image", caption: "Sketch and process work." },
      { type: "image", caption: "ADD CAPTION HERE." },
    ],
  },

  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  {
    slug: "afuego51",
    title: "AFUEGO51 — Food Truck Design",
    category: "Brand Identity & Large Format Design",
    mainMediaType: "image",
    intro:
      "Starting from nothing — no name, no visual identity, no presence. AFUEGO51 needed a brand that could cut through before the food even had a chance to speak. I built the full identity from the ground up: wordmark, color system, truck wrap, large format printing, packaging, and merch. The truck launched, hit social media, and started selling out. The work did its job.",
    gallery: [
      { type: "image", caption: "Final wordmark and brand identity." },
      { type: "image", caption: "Brand applications across signage and packaging." },
      { type: "image", caption: "Early sketches and concept exploration." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Process walkthrough." },
    ],
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Animated Cover Art",
    category: "Album Art & Motion",
    mainMediaType: "image",
    intro:
      "Cover art and animated Spotify Canvas for Hold It Down — a project by Kansas City rapper and producer Dom Chronicles, featuring Sir Michael Rocks. The illustration was built with movement in mind from the start, designed to loop seamlessly as a Spotify Canvas while holding up as a standalone static cover. It's live on Spotify right now, animating every time someone presses play.",
    gallery: [
      { type: "image", caption: "Final cover art — static version." },
      { type: "image", caption: "Spotify Canvas — animated frame." },
      { type: "image", caption: "Sketch and concept." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Animated canvas in action." },
    ],
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  {
    slug: "bar-k-event-backdrop",
    title: "BAR-K Event Backdrop",
    category: "Large Format Illustration",
    mainMediaType: "image",
    intro:
      "A large-format illustration commission through my work at Commerce Bank — created for BAR-K, a dog-friendly bar and event space with locations in Kansas City and St. Louis, Missouri. The piece had to anchor a room, hold up at scale, and function as a backdrop that thousands of people would stand in front of and photograph. From initial sketches to real-world install, it landed exactly where it needed to.",
    gallery: [
      { type: "image", caption: "Final large-format illustration." },
      { type: "image", caption: "Installed in the event space." },
      { type: "image", caption: "Sketch and detail work." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Time-lapse of the install." },
    ],
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "Book Cover Illustration",
    category: "Editorial Illustration",
    mainMediaType: "image",
    intro:
      "Cover illustration for two published bestsellers — The Life I Love and Seeds of Hope — both available for purchase online. Each cover was designed to make a promise before a single page is turned, using illustration and typography together to communicate tone and genre at a glance. Two different titles, two different moods, one consistent hand.",
    gallery: [
      { type: "image", caption: "The Life I Love — final cover." },
      { type: "image", caption: "Seeds of Hope — final cover." },
      { type: "image", caption: "Sketch and type layout." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Cover design process." },
    ],
  },

  // ─── LEVEE x HALLOWEEN ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "LEVEE x Halloween — Event",
    category: "Motion & Campaign Design",
    mainMediaType: "image",
    intro:
      "A Halloween event campaign for LEVEE — motion-first, built to stop a scroll and move people to show up. The campaign came with music, which meant the motion and the sound had to work as one thing rather than separately. Social assets, animated graphics, and a cohesive visual identity built for the night.",
    gallery: [
      { type: "image", caption: "Key visual and event graphic." },
      { type: "image", caption: "Motion frame and social assets." },
      { type: "image", caption: "Concept board and sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Campaign animation." },
    ],
  },

  // ─── LEVEE — VINTAGE MARKET ───────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "LEVEE — Vintage Market Event",
    category: "Motion & Campaign Design",
    mainMediaType: "image",
    intro:
      "A visual campaign for LEVEE's Vintage Market — part of an ongoing creative relationship with the brand. Each LEVEE event gets its own distinct identity while staying true to the brand's visual language. Motion and static assets developed together, built to live on social and drive attendance.",
    gallery: [
      { type: "image", caption: "Key visual for the Vintage Market event." },
      { type: "image", caption: "Social campaign assets." },
      { type: "image", caption: "Motion frame and detail." },
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
    intro:
      "An animated lyric video for a musician and rapper — built to move with the track, not just illustrate it. Every visual choice was made in service of the music: the typography, the color, the pacing. The result is a visual world that feels like part of the song rather than a layer placed on top of it.",
    gallery: [
      { type: "image", src: "/static/img/cutie-lyric-music-video-hero.gif", caption: "Animated hero loop." },
      { type: "image", caption: "Still frame from the video." },
      { type: "image", caption: "Storyboard and motion sketches." },
      // { type: "video", src: "YOUTUBE_VIDEO_ID", caption: "Full lyric video." },
    ],
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Apparel Design",
    mainMediaType: "image",
    intro:
      "A graphic tee designed through my work at Commerce Bank for K-State Wildcats — a Division I college athletics program with real reach. The design went to print and landed on actual students. Athletic-coded but illustration-first, the graphic translates school pride into something worth wearing rather than just another piece of licensed merch.",
    gallery: [
      { type: "image", caption: "Final tee graphic." },
      { type: "image", caption: "Printed and worn by students." },
      { type: "image", caption: "Sketch and type exploration." },
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
    intro:
      "A reel of motion work spanning animation, lyric videos, and branded content. Built across a range of styles and clients, it represents the breadth of what I do when things are moving.",
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
    intro:
      "Short film posters, merch designs, motion graphic one-offs, and things made just to make them. Not every piece fits a neat category — these are the ones that don't, and that's the point.",
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
    intro:
      "Brand and identity work for the K.H.A.S.H Foundation — a cause-driven organization with real presence. More to come as the brand grows.",
    gallery: [
      { type: "image", caption: "Primary brand lockup." },
      { type: "image", caption: "Layout and application." },
      { type: "image", caption: "Detail and exploration." },
    ],
  },

];

export default projects;
