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
//   accentColor   → Hex color for the thin banner strip at the top of the project page.
//                   Example: accentColor: "#512888"
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
//   title         → To force a line break inside the title, use \n:
//                   title: "First Line\nSecond Line"
//
// ─── HERO PANEL (right column on the project page) ───────────────────────────
//
//   By default the hero panel shows {slug}-hero.jpg, and that same image is
//   automatically inserted as the FIRST TILE in the gallery below so visitors
//   can see the full uncropped version.
//
//   heroPanelImage → Optional. Point this at a different/tighter crop to show
//                   in the panel without affecting the gallery tile.
//                   The gallery first tile will still use the regular hero image.
//                   Example:
//                     heroPanelImage: "/static/img/my-project-hero-panel.jpg"
//                   Drop the file in raw/ and run npm run optimize as usual,
//                   naming it  {slug}-hero-panel.jpg  (or any name you choose
//                   since you're setting the path explicitly).
//
//   heroType      → Controls what FORMAT the hero panel displays.
//                   Leave it out (or set "image") to use a photo (default).
//                     heroType: "gif"     → shows {slug}-hero.gif
//                     heroType: "video"   → plays {slug}-hero.mp4 from /static/video/
//                     heroType: "youtube" → shows a YouTube embed (set heroYoutubeId too)
//
//   heroYoutubeId → YouTube video ID for the panel. Only used when heroType: "youtube".
//                   Example: heroYoutubeId: "-ZMA5H8jpKc"
//
//   heroVideoSrc  → Custom video file path. Only used when heroType: "video".
//                   Defaults to /static/video/{slug}-hero.mp4 if not set.
//
// ─── OTHER OPTIONAL FIELDS ───────────────────────────────────────────────────
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
  //   title: "Project Title",          // use \n to force a line break: "Line One\nLine Two"
  //   category: "Category Label",
  //   tags: ["illustration-design"],   // "illustration-design" | "brand-identity" | "motion-design"
  //   year: "2024",
  //   accentColor: "#512888",          // thin color strip at the top of the project page
  //   mainMediaType: "image",
  //   // mainVideo: "YOUTUBE_VIDEO_ID",   ← only if mainMediaType is "video"
  //   // thumbnailImage: "/static/img/project-slug-thumb.jpg",  ← optional grid card override
  //   description: [
  //     "First paragraph about this project.",
  //     "Second paragraph with more detail.",
  //   ],
  //
  //   // ── Hero panel options (right column on the project page) ──────────────
  //   //
  //   // Default: panel shows {slug}-hero.jpg and that same image leads the gallery.
  //   //
  //   // Use heroPanelImage to show a tighter crop in the panel while keeping
  //   // the full hero image as the gallery's first tile:
  //   // heroPanelImage: "/static/img/project-slug-hero-panel.jpg",
  //   //
  //   // Use heroType to change the panel format:
  //   // heroType: "gif",                          // shows {slug}-hero.gif
  //   // heroType: "video",                        // plays {slug}-hero.mp4
  //   // heroVideoSrc: "/static/video/custom.mp4", // custom video path (optional)
  //   // heroType: "youtube",                      // YouTube embed
  //   // heroYoutubeId: "YOUTUBE_VIDEO_ID",        // required with heroType: "youtube"
  //
  //   gallery: [
  //     // The hero image is automatically inserted here as the first tile — no need to add it.
  //     { type: "image", caption: "Caption." },
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
    title: "MF DOOM — Tribute Print",
    category: "Print Illustration",
    tags: ["illustration-design"],  // Illustration
    year: "2021",
    accentColor: "#4CAF50",
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
    accentColor: "#c93c20",
    mainMediaType: "image",
    description: [
      "AFUEGO51 is a new and successful up-and-coming Peruvian rotisserie chicken food truck in Kansas City, built around bold flavor and a strong visual identity. The goal was to create something modern and eye-catching while pulling inspiration from Peruvian culture, with a look that stands out and works across menus and branding.",
      "I handled the full brand identity including logo design, illustration, and menu layout. I explored directions inspired by elements like the Nazca lines, mountains, and traditional patterns, then refined them into something clean but expressive. The flame in the logo was inspired by the cooking process itself, tying the visuals back to the food. The system is built to expand as the brand continues to grow.",
    ],
    gallery: [
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Brand Identity & Large Format Design"] },
  },

  // ─── LEVEE — VINTAGE MARKET ───────────────────────────────────────────────
  {
    slug: "levee-vintage-market",
    title: "The Levee KC — Vintage Market",
    category: "Motion & Campaign Design",
    tags: ["brand-identity", "motion-design"],
    year: "",
    accentColor: "#fff200",
    mainMediaType: "image",
    mainImage: "/static/img/levee-vintage-market-hero.gif",
    noHeroInGallery: true,
    description: [
      "The Levee Vintage Market was a community-driven event created in partnership with Swap Studios and The Levee KC, bringing together vendors selling vintage clothing and custom goods.",
      "I worked on the promotional visuals for the event, building around the idea of clothing that has already been lived in. The concept leaned into pieces holding their own presence, with imagery that suggested form and movement without showing a person directly. It gave the visuals a slightly surreal feel while still highlighting the individuality of the clothing and the people behind it.",
    ],
    gallery: [
      { type: "video", src: "xFjM7kuseiI", caption: "Levee Vintage Market Promo", vertical: true },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-1.gif", caption: "" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-7.jpg", caption: "" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-2.jpg", caption: "" },
      { type: "image", src: "/static/img/levee-vintage-market-hero.jpg",      caption: "" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-4.jpg", caption: "" },
      { type: "image", src: "/static/img/levee-vintage-market-gallery-5.jpg", caption: "" },
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
    accentColor: "#ffb347",
    mainMediaType: "image",
    thumbnailImage: "/static/img/cutie-lyric-music-video-hero.gif",
    heroType: "youtube",
    heroYoutubeId: "-ZMA5H8jpKc",
    description: [
      "This lyric music video was created for A'Sean, a creative musician based between Kansas City and New York, for his track \"Cutie\" featuring Scorpio Szn. The song has a light, playful energy, so the goal was to match that visually while leaning into the double meaning of \"cutie\" as both a romantic term and the fruit. That led to a bright, orange-themed direction that felt fun, soft, and a little whimsical.",
      "I handled the full concept, storyboarding, and animation. I built everything by hand with no AI, focusing on keeping the visuals engaging through movement and transitions that guide the eye. I also worked in subtle references to his identity as a traveling artist to give the video a bit more personality and narrative. The typography and pacing were designed to feel light and effortless, while still keeping the viewer locked in from start to finish.",
    ],
    gallery: [
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-1.jpg", caption: "" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-2.jpg", caption: "" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-3.jpg", caption: "" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-6.jpg", caption: "" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-7.jpg", caption: "" },
      { type: "image", src: "/static/img/cutie-lyric-music-video-gallery-8.gif", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Motion Graphics"] },
  },

  // ─── HOLD IT DOWN ─────────────────────────────────────────────────────────
  {
    slug: "hold-it-down-cover-art",
    title: "Hold It Down — Animated Cover Art",
    category: "Album Art & Motion",
    tags: ["illustration-design", "motion-design"],  // Illustration + Motion
    year: "",
    accentColor: "#39ff14",
    mainMediaType: "image",
    mainImage: "/static/img/hold-it-down-cover-art-hero.gif",
    description: [
      "\"Hold It Down\" was created for rapper and DJ Dom Chronicles in collaboration with Sir Michael Rocks. The concept centered around placing both artists in a world surrounded by the things that inspire them. Dom came in with references and ideas, and we explored a few directions before landing on a visual that felt personal and expressive.",
      "From there, I took the lead on illustration and animation. I created the artwork and brought it to life for use across social media and Spotify's canvas feature. The visuals were designed to feel dynamic while still working as a strong standalone cover. The illustration also extended into merchandise, including t-shirts, giving the project a life beyond just the digital release.",
    ],
    gallery: [
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-4.gif", caption: "" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-2.jpg", caption: "" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-6.gif", caption: "" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-7.jpg", caption: "" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-8.jpg", caption: "" },
      { type: "image", src: "/static/img/hold-it-down-cover-art-gallery-5.gif", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Cover art Illustration & Motion"] },
  },

  // ─── BOOK COVERS ──────────────────────────────────────────────────────────
  {
    slug: "book-covers",
    title: "Best Seller Book Cover Illustrations & Design",
    category: "Editorial Illustration",
    tags: ["illustration-design", "brand-identity"],  // Illustration + Design
    year: "",
    accentColor: "#87ceeb",
    mainMediaType: "image",
    mainImage: "/static/img/book-covers-gallery-1.jpg",
    description: [
      "These book covers were created for author Rochinda Chism-Pickens, for her titles \"The Life I Love\" and \"The Seeds of Hope\". The goal was to visually capture the tone and message of each book in a way that felt thoughtful, warm, and inviting.",
      "I handled the full process from illustration to cover design and dust jacket layout. I explored a range of directions early on, working through different visual approaches before landing on final designs that felt aligned with the author's vision. Both books went on to become national bestsellers!",
    ],
    gallery: [
      { type: "image", src: "/static/img/book-covers-hero.jpg",      caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-3.jpg", caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-5.jpg", size: "third", caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-6.jpg", size: "third", caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-7.jpg", caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-8.jpg", caption: "" },
      { type: "image", src: "/static/img/book-covers-gallery-9.jpg", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Editorial Illustration"] },
  },

  // ─── K-STATE WILDCATS ─────────────────────────────────────────────────────
  {
    slug: "kstate-wildcats-tshirt",
    title: "K-State Wildcats T-Shirt Design",
    category: "Apparel Design",
    tags: ["illustration-design", "brand-identity"],  // Illustration + Design
    year: "",
    accentColor: "#c9a0dc",
    mainMediaType: "image",
    description: [
      "This project was a t-shirt design created in partnership with Kansas State University through Commerce Bank, focused on building something that felt true to the school's identity while still standing out. The goal was to create a design students would actually want to wear, not just something that checked the box.",
      "I handled the full illustration and design, working within K-State's brand guidelines while exploring ways to push things visually. I developed multiple concepts before landing on a direction that centered around their vintage mascot, giving it a more expressive and slightly updated feel. The final design was selected and produced, with the shirt worn and shared by students.",
    ],
    gallery: [
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Apparel Design"] },
  },

  // ─── BAR-K EVENT BACKDROP ─────────────────────────────────────────────────
  {
    slug: "bar-k-event-backdrop",
    title: "STL BAR-K Event Backdrop",
    category: "Large Format Illustration",
    tags: ["illustration-design"],  // Illustration
    year: "",
    accentColor: "#add8e6",
    mainMediaType: "image",
    description: [
      "This project was created for Bar K in Kansas City and St. Louis through a partnership with Commerce Bank. I handled the illustration and overall design, developing graphics that were deployed across both locations over a two-year span.",
      "The work had to hold up at large format scale while feeling at home in Bar K's lively, community-driven environment. It was a great opportunity to create something with real staying power — work that people would walk past, interact with, and actually live alongside.",
    ],
    gallery: [
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Large Format Illustration"] },
  },

  // ─── LEVEE x HALLOWEEN ────────────────────────────────────────────────────
  {
    slug: "levee-x-halloween",
    title: "The Levee KC x Halloween Event",
    category: "Motion & Campaign Design",
    tags: ["brand-identity", "motion-design"],
    year: "",
    accentColor: "#9932cc",
    heroType: "youtube",
    heroYoutubeId: "KcW96-hpFHk",
    mainImage: "/static/img/levee-x-halloween-hero.gif",
    description: [
      "Swaptober is a community Halloween event hosted at The Levee KC in collaboration with Swap Studios. For its fifth year, I partnered with both teams to help bring the event to life visually and build excitement around it.",
      "I handled the promotional design and created a promo video for the event, along with motion graphics and GIF content for social media. The goal was to create something that felt fun and engaging while capturing the overall energy of a Swaptober event.",
    ],
    gallery: [
      { type: "video", src: "KcW96-hpFHk", caption: "Swaptober Promo" },
      { type: "image", src: "/static/img/levee-x-halloween-gallery-1.gif", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
      { type: "image", caption: "" },
    ],
    credits: { lines: ["Ejuan Henderson", "Motion & Campaign Design"] },
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
    accentColor: "#141013",
    mainMediaType: "image",
    denseGrid: true,
    description: [
      "A collection of one-off pieces I wanted to share. Some personal, some professional, some collaborative — just work I like that doesn't belong to a single project.",
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
  //     { type: "image", caption: "" },
  //     { type: "image", caption: "" },
  //     { type: "image", caption: "" },
  //   ],
  //   credits: { lines: ["Ejuan Henderson", "Brand Identity"] },
  // },

];

export default projects;
