// ─────────────────────────────────────────────────────────────────────────────
// HOW TO ADD IMAGES
//
//  1. Export your image from Figma / Photoshop / wherever
//  2. Drop the file into:  tony/public/static/img/
//  3. The filename must exactly match what's written below for each project
//
//  Supported formats:  .jpg  .png  .gif  .webp
//  Recommended size:   at least 1200px wide for good quality
//
//  Each project has two image roles:
//    mainImage      → shown on the home page grid AND as the hero on the project page
//    galleryImages  → the carousel on the project page (you can add as many as you want)
//
//  To add more carousel slides, just add another line to galleryImages:
//    "/static/img/yourproject-4.jpg",
//    "/static/img/yourproject-5.jpg",
//    etc.
// ─────────────────────────────────────────────────────────────────────────────

const projects = [

  // ─── AFUEGO51 ──────────────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   afuego51.jpg      ← home grid + project page hero
  //   afuego51-2.jpg    ← carousel slide 2  (final mockup / branded material)
  //   afuego51-3.jpg    ← carousel slide 3  (sketch / exploration / real world)
  {
    slug: "afuego51",
    title: "AFUEGO51",
    category: "Food Truck Design",
    mainImage: "/static/img/afuego51.jpg",
    mainMediaType: "image",
    intro:
      "AFUEGO51 is a food truck brand built around heat, personality, and street-level energy. The visual identity needed to cut through — working across signage, packaging, and merch in a way that felt bold without losing clarity. I developed the full brand direction, from the wordmark and color system down to how it landed across the truck wrap and printed collateral.",
    galleryImages: [
      "/static/img/afuego51.jpg",    // slide 1 — hero / final mockup
      "/static/img/afuego51-2.jpg",  // slide 2 — application / branded materials
      "/static/img/afuego51-3.jpg",  // slide 3 — sketches / explorations
    ],
  },

  // ─── MF DOOM ───────────────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   mfdoom.jpg        ← home grid + project page hero
  //   mfdoom-2.jpg      ← carousel slide 2
  //   mfdoom-3.jpg      ← carousel slide 3
  {
    slug: "mf-doom-art-print",
    title: "MF DOOM — Art Print",
    category: "Illustration",
    mainImage: "/static/img/mfdoom.jpg",
    mainMediaType: "image",
    intro:
      "A tribute print for MF DOOM, built around the weight and mythology the man carried. The illustration pulls from the iconography surrounding his legacy — the mask, the persona, the aura — rendered in a style that feels personal rather than decorative. Designed as a limited-run print, the piece was made to live on a wall and hold up at close range.",
    galleryImages: [
      "/static/img/mfdoom.jpg",    // slide 1 — final print
      "/static/img/mfdoom-2.jpg",  // slide 2 — detail / alternate view
      "/static/img/mfdoom-3.jpg",  // slide 3 — sketch / process
    ],
  },

  // ─── CUTIE ─────────────────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   cutie.gif         ← home grid + project page hero  (GIF supported)
  //   cutie-2.jpg       ← carousel slide 2
  //   cutie-3.jpg       ← carousel slide 3
  {
    slug: "cutie-lyric-music-video",
    title: "CUTIE — Lyric Music Video",
    category: "Animation",
    mainImage: "/static/img/cutie.gif",
    mainMediaType: "image",
    intro:
      "An animated lyric video made to move with the track, not just follow it. Every visual decision — typography, color, pacing — was built around the emotional rhythm of the song rather than simply syncing to the beat. The result is a visual environment that feels like part of the music, not a caption running over it.",
    galleryImages: [
      "/static/img/cutie.gif",    // slide 1 — animated hero
      "/static/img/cutie-2.jpg",  // slide 2 — still frame / scene
      "/static/img/cutie-3.jpg",  // slide 3 — storyboard / motion sketch
    ],
  },

  // ─── K.H.A.S.H FOUNDATION ─────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   khash.jpg         ← home grid + project page hero
  //   khash-2.jpg       ← carousel slide 2
  //   khash-3.jpg       ← carousel slide 3
  {
    slug: "khash-foundation",
    title: "K.H.A.S.H Foundation",
    category: "Design",
    mainImage: "/static/img/khash.jpg",
    mainMediaType: "image",
    intro:
      "Brand and design work for the K.H.A.S.H Foundation — a cause-driven organization that needed visuals to match the weight and clarity of its mission. The design system prioritizes legibility and intentionality, building trust at first glance while keeping the overall identity warm and accessible.",
    galleryImages: [
      "/static/img/khash.jpg",    // slide 1 — primary brand / lockup
      "/static/img/khash-2.jpg",  // slide 2 — application / layout
      "/static/img/khash-3.jpg",  // slide 3 — detail / exploration
    ],
  },

  // ─── LEVEE x SWAPTOBER ────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   levee.jpg         ← home grid + project page hero
  //   levee-2.jpg       ← carousel slide 2
  //   levee-3.jpg       ← carousel slide 3
  {
    slug: "levee-x-swaptober",
    title: "LEVEE x SWAPTOBER",
    category: "Animation / Design",
    mainImage: "/static/img/levee.jpg",
    mainMediaType: "image",
    intro:
      "A visual campaign built for LEVEE x SWAPTOBER, blending animation and graphic design to capture the energy of a community event. The work needed to feel alive — something you'd stop to watch — while staying grounded in the identity of both brands. Motion and static assets were developed together as one cohesive visual system.",
    galleryImages: [
      "/static/img/levee.jpg",    // slide 1 — key visual / event graphic
      "/static/img/levee-2.jpg",  // slide 2 — motion frame / secondary asset
      "/static/img/levee-3.jpg",  // slide 3 — sketch / concept board
    ],
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   bark.jpg          ← home grid + project page hero
  //   bark-2.jpg        ← carousel slide 2
  //   bark-3.jpg        ← carousel slide 3
  {
    slug: "bar-k-event-backdrop",
    title: "BAR-K Event Backdrop",
    category: "Illustration",
    mainImage: "/static/img/bark.jpg",
    mainMediaType: "image",
    intro:
      "A large-format illustration created for the BAR-K event space, designed to anchor the room and hold up at scale. The piece had to function as both art and environment — something guests would photograph, stand in front of, and remember. Scale, color value, and composition were all considered through the lens of how the work would land in a physical space.",
    galleryImages: [
      "/static/img/bark.jpg",    // slide 1 — final illustration
      "/static/img/bark-2.jpg",  // slide 2 — real world / installed photo
      "/static/img/bark-3.jpg",  // slide 3 — sketch / detail
    ],
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   kstate.jpg        ← home grid + project page hero
  //   kstate-2.jpg      ← carousel slide 2
  //   kstate-3.jpg      ← carousel slide 3
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Illustration",
    mainImage: "/static/img/kstate.jpg",
    mainMediaType: "image",
    intro:
      "A graphic tee designed for K-State Wildcats fans — athletic-coded but illustration-first, with the kind of detail that holds up in hand. The design channels school pride without leaning on clichés, translating the Wildcats identity into something you'd actually want to wear. Typography, texture, and mark composition were developed together to make the graphic feel unified and finished.",
    galleryImages: [
      "/static/img/kstate.jpg",    // slide 1 — final tee graphic
      "/static/img/kstate-2.jpg",  // slide 2 — mockup on shirt / real world
      "/static/img/kstate-3.jpg",  // slide 3 — sketch / type exploration
    ],
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   bookcovers.jpg    ← home grid + project page hero
  //   bookcovers-2.jpg  ← carousel slide 2
  //   bookcovers-3.jpg  ← carousel slide 3
  {
    slug: "book-covers",
    title: "Book Covers",
    category: "Illustration / Design",
    mainImage: "/static/img/bookcovers.jpg",
    mainMediaType: "image",
    intro:
      "A series of book cover designs built around the idea that a cover makes a promise. Each piece uses illustration and typography together to communicate tone, genre, and atmosphere before a single word inside is read. The series spans multiple titles, but each cover was treated as its own problem — distinct enough to stand alone, cohesive enough to feel like they share a hand.",
    galleryImages: [
      "/static/img/bookcovers.jpg",    // slide 1 — cover series / hero shot
      "/static/img/bookcovers-2.jpg",  // slide 2 — individual cover / detail
      "/static/img/bookcovers-3.jpg",  // slide 3 — sketch / type layout
    ],
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  // Files to add → tony/public/static/img/
  //   holditdown.jpg    ← home grid + project page hero
  //   holditdown-2.jpg  ← carousel slide 2
  //   holditdown-3.jpg  ← carousel slide 3
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Cover Art",
    category: "Illustration / Animation",
    mainImage: "/static/img/holditdown.jpg",
    mainMediaType: "image",
    intro:
      "Cover art and animation for Hold It Down — a project where the still image and the motion version had to work equally well. The illustration was built with movement in mind from the start: forms that could breathe, elements that could shift without losing what made them feel grounded. The final deliverable works as a static cover and as a looping animated piece.",
    galleryImages: [
      "/static/img/holditdown.jpg",    // slide 1 — final cover art
      "/static/img/holditdown-2.jpg",  // slide 2 — animated frame / motion still
      "/static/img/holditdown-3.jpg",  // slide 3 — sketch / concept
    ],
  },

];

export default projects;
