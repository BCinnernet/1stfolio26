# Site Editing Guide — EJuan Henderson Studio

> **How to use this guide in VS Code:** click any blue file link and it jumps directly to that line.
> Most edits are in one file: `src/data/projects.js`.

---

## Table of Contents

1. [Personal Info & Social Links](#1-personal-info--social-links)
2. [Adding a New Project](#2-adding-a-new-project)
3. [Removing or Hiding a Project](#3-removing-or-hiding-a-project)
4. [Reordering Projects on the Home Grid](#4-reordering-projects-on-the-home-grid)
5. [Jump to a Specific Project](#5-jump-to-a-specific-project)
6. [Hero Panel Image](#6-hero-panel-image)
7. [Gallery — Adding, Removing & Reordering](#7-gallery--adding-removing--reordering)
8. [Gallery — Captions](#8-gallery--captions)
9. [Videos — YouTube in the Gallery](#9-videos--youtube-in-the-gallery)
10. [Videos — YouTube as the Hero Panel](#10-videos--youtube-as-the-hero-panel)
11. [Home Grid Card Image](#11-home-grid-card-image)
12. [Project Descriptions (body copy)](#12-project-descriptions-body-copy)
13. [Project Title, Category & Tags](#13-project-title-category--tags)
14. [Project Credits & Links](#14-project-credits--links)
15. [Accent Colors (per project)](#15-accent-colors-per-project)
16. [Home Page Body Copy](#16-home-page-body-copy)
17. [About Page Body Copy](#17-about-page-body-copy)
18. [Footer Scrolling Text](#18-footer-scrolling-text)
19. [Site-Wide Colors & Styling](#19-site-wide-colors--styling)
20. [Image Workflow (raw → optimized)](#20-image-workflow-raw--optimized)

---

## 1. Personal Info & Social Links

**Jump to:** [src/data/siteConfig.js:6](src/data/siteConfig.js#L6)

Change your name, email, location, site URL, and social links here.
These values are used everywhere automatically — nav, footer, SEO tags, etc.

```js
const siteConfig = {
  name: "Ejuan Henderson",
  email: "ejuanhenderson@gmail.com",
  location: "Kansas City, Missouri",
  siteUrl: "https://ejuanhenderson.com",
  social: {
    instagram: { url: "https://www.instagram.com/ohhej", label: "Instagram" },
    bluesky:   { url: "https://bsky.app/profile/...",    label: "Bluesky"   },
  },
};
```

---

## 2. Adding a New Project

**Jump to:** [src/data/projects.js:142](src/data/projects.js#L142) ← the copy-paste template

1. Copy the template block and paste it inside the `projects = [...]` array.
2. Fill in the fields.
3. Run `npm run check-images` — it prints the exact filenames needed.
4. Name your source files to match and drop them into `public/static/img/raw/`.
5. Run `npm run optimize`.
6. Commit and push — the site deploys automatically.

**Minimum fields needed:**

```js
{
  slug: "my-project",
  title: "My Project Title",
  category: "Print Illustration",
  tags: ["illustration-design"],
  accentColor: "#512888",
  mainMediaType: "image",
  description: ["First paragraph.", "Second paragraph."],
  gallery: [
    { type: "image", caption: "Caption here." },
  ],
  credits: { lines: ["Ejuan Henderson", "Role"] },
}
```

---

## 3. Removing or Hiding a Project

**Jump to:** [src/data/projects.js:140](src/data/projects.js#L140)

**Remove it permanently:** delete the entire `{ ... }` block for that project.

**Hide it temporarily** without deleting anything — add one line:
```js
hidden: true,
```
The card disappears from the grid but the data stays.

---

## 4. Reordering Projects on the Home Grid

**Jump to:** [src/data/projects.js:140](src/data/projects.js#L140)

The grid displays projects in the order they appear in the array.
Cut and paste an entire `{ ... }` block to a different position to change its spot.

---

## 5. Jump to a Specific Project

Click the project name to jump straight to its data block:

| Project | Jump to |
|---|---|
| MF DOOM Illustration | [projects.js:189](src/data/projects.js#L189) |
| AFUEGO51 — Food Truck Design | [projects.js:214](src/data/projects.js#L214) |
| CUTIE — Lyric Music Video | [projects.js:238](src/data/projects.js#L238) |
| Book Cover Illustration | [projects.js:267](src/data/projects.js#L267) |
| Hold It Down — Cover Art | [projects.js:294](src/data/projects.js#L294) |
| KState Wildcats T-Shirt | [projects.js:319](src/data/projects.js#L319) |
| Bar K Event Backdrop | [projects.js:344](src/data/projects.js#L344) |
| Levee Vintage Market | [projects.js:364](src/data/projects.js#L364) |
| Levee × Halloween | [projects.js:387](src/data/projects.js#L387) |
| Various Projects | [projects.js:431](src/data/projects.js#L431) |

---

## 6. Hero Panel Image

The project page has a two-column header: text on the left, media on the right.
That same image is also automatically inserted as the **first tile in the gallery**
so visitors can see it uncropped at full size.

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)  
**Hero panel CSS sizing:** [styles/globals.css:649](styles/globals.css#L649)

### Default — no extra fields needed
Panel shows `{slug}-hero.jpg`, cropped/filled to fit the space.
The gallery leads with the same image at its natural proportions.

### Show a different crop in the panel only
The gallery first tile stays as the full `-hero.jpg`. Only the panel changes.
```js
heroPanelImage: "/static/img/my-project-hero-panel.jpg",
```
Drop the file in `raw/` named `{slug}-hero-panel.jpg` and run `npm run optimize`.

### Show a GIF in the panel
```js
heroType: "gif",
// auto-uses: public/static/img/raw/{slug}-hero.gif
```

### Show an autoplay video in the panel
```js
heroType: "video",
// auto-uses: public/static/video/{slug}-hero.mp4
// or set a custom path:
heroVideoSrc: "/static/video/my-custom-file.mp4",
```

### Show a YouTube embed in the panel
```js
heroType: "youtube",
heroYoutubeId: "dQw4w9WgXcQ",  // part after watch?v= in the YouTube URL
```
When using YouTube in the panel, remove that same video from the `gallery`
array so it doesn't appear twice on the page.

### Force a line break in the title
```js
title: "First Line\nSecond Line",
```

---

## 7. Gallery — Adding, Removing & Reordering

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)  
Then look for the `gallery: [ ... ]` array inside that project block.

> The hero image is automatically placed as tile #1. Don't add it manually —
> it's already there.

### Add an image
```js
{ type: "image", caption: "Optional caption." },
```
Filenames are auto-derived in order: `{slug}-gallery-1.jpg`, `-gallery-2.jpg`, etc.
Run `npm run check-images` after editing to see exactly what's expected.

### Remove an image
Delete its `{ type: "image", ... }` line. Re-run `npm run check-images` —
numbering shifts, so you may need to rename files in `raw/` and re-optimize.

### Reorder images
Cut and paste the `{ type: "image" }` lines into the order you want, then
re-run `npm run check-images` and rename/re-optimize as needed.

> **Tip — lock in a specific filename to avoid renumbering:**
> ```js
> { type: "image", src: "/static/img/my-project-gallery-3.jpg", caption: "..." },
> ```
> Setting `src` explicitly means the position in the array no longer controls the filename.

---

## 8. Gallery — Captions

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

Edit the `caption` field on any gallery item:
```js
{ type: "image", caption: "This text appears on hover." },
```
Remove the `caption` field entirely (or set it to `""`) to show no caption.

---

## 9. Videos — YouTube in the Gallery

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

Add inside the `gallery` array:
```js
{ type: "video", src: "dQw4w9WgXcQ", caption: "Optional caption.", size: "full" },
```

**Finding the ID:** it's the part after `watch?v=` in the YouTube URL.
`https://www.youtube.com/watch?v=dQw4w9WgXcQ` → ID is `dQw4w9WgXcQ`

Set `size: "full"` to stretch the video across the full gallery width.

---

## 10. Videos — YouTube as the Hero Panel

See [Section 6](#6-hero-panel-image) → "Show a YouTube embed in the panel."

When the panel shows YouTube, remove that video from the `gallery` array
so it doesn't appear twice.

---

## 11. Home Grid Card Image

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

By default the grid card uses `{slug}-hero.jpg`. To show a different image
on the card without changing the project hero:
```js
thumbnailImage: "/static/img/my-project-thumb.jpg",
```
Drop `{slug}-thumb.jpg` in `raw/` and run `npm run optimize`.
This is also automatically used when `mainMediaType: "video"`.

---

## 12. Project Descriptions (body copy)

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

Edit the `description` array — each string is one paragraph:
```js
description: [
  "First paragraph of the project story.",
  "Second paragraph with more detail.",
],
```

---

## 13. Project Title, Category & Tags

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

```js
title: "AFUEGO51 — Food Truck Design",
category: "Brand Identity & Large Format Design",
tags: ["brand-identity", "illustration-design"],
```

**Available tags:**
- `"illustration-design"` → Illustration & Design filter
- `"brand-identity"` → Brand & Identity filter
- `"motion-design"` → Motion Design filter

A project can have multiple tags: `tags: ["illustration-design", "brand-identity"]`

---

## 14. Project Credits & Links

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

```js
credits: {
  lines: ["Ejuan Henderson", "Illustration & Design"],
},
links: [
  { label: "Behance",   url: "https://behance.net/..." },
  { label: "Instagram", url: "https://instagram.com/..." },
],
```

---

## 15. Accent Colors (per project)

**Jump to the relevant project** → see [Section 5](#5-jump-to-a-specific-project)

The thin color strip at the top of each project page:
```js
accentColor: "#c93c20",  // any hex color
```

---

## 16. Home Page Body Copy

### Skills ticker (scrolling text behind the Work button)
**Jump to:** [pages/index.jsx:162](pages/index.jsx#L162)

Edit the text inside the `<span>` tags. Both spans must be identical
(they're duplicated to create the infinite scroll effect).

### "WHAT'S UP, I'M EJ" — role line
**Jump to:** [pages/index.jsx:275](pages/index.jsx#L275)

Edit the `text` value:
```jsx
segments={[{ text: "Multimedia Artist", italic: false }]}
```

### "WHAT'S UP, I'M EJ" — body copy paragraphs
**Jump to:** [pages/index.jsx:284](pages/index.jsx#L284)

Each `ProximityText` block is one paragraph. Edit the `text` value inside `segments`.
Set `italic: true` on a segment to italicize it.

### Hero video (full-screen video at the very top)
**Jump to:** [pages/index.jsx:140](pages/index.jsx#L140)

Replace the file at `public/static/video/hero-video.mp4`. No code change needed.

---

## 17. About Page Body Copy

### Body text paragraphs
**Jump to:** [src/components/About.js:25](src/components/About.js#L25)

Edit the `<p>` tags directly:
```jsx
<div className="about-me">
  <p>First paragraph.</p>
  <p>Second paragraph.</p>
</div>
```

### About page photo
Replace `public/static/img/about-photo.jpg` — no code change needed.
The pixelated hover effect is automatic.

---

## 18. Footer Scrolling Text

**Jump to:** [src/layouts/Footer.js:13](src/layouts/Footer.js#L13)

Edit the text inside the `<span>` tags in the `marquee-track` div.
Both `<span>` tags must be identical (duplicated for the infinite loop).

Your name and copyright year update automatically from `siteConfig.js`.

---

## 19. Site-Wide Colors & Styling

**File:** [styles/globals.css](styles/globals.css)

| What to change | Jump to |
|---|---|
| Project page title size/style | [globals.css:693](styles/globals.css#L693) |
| Hero panel size & layout | [globals.css:649](styles/globals.css#L649) |
| Gallery background & column count | [globals.css:738](styles/globals.css#L738) |
| "Back to Work" link style | [globals.css:621](styles/globals.css#L621) |
| Project footer (credits, links, tags) | [globals.css:835](styles/globals.css#L835) |
| Site accent color (yellow-green) | search `#c5d400` in globals.css |

---

## 20. Image Workflow (raw → optimized)

**Never put images directly into `public/static/img/`.**
Always go through the pipeline:

```
1. Drop originals into:   public/static/img/raw/
2. Run:                   npm run check-images   ← shows what's missing
3. Run:                   npm run optimize       ← resizes and outputs
4. Commit & push:         git add public/static/img/
                          git commit -m "Add images for {slug}"
                          git push
```

### Filename rules

| Filename | Used for |
|---|---|
| `{slug}-hero.jpg` | Project hero panel + home grid card |
| `{slug}-thumb.jpg` | Home grid card for video projects |
| `{slug}-gallery-1.jpg` | First gallery image |
| `{slug}-gallery-2.jpg` | Second gallery image |
| `{slug}-gallery-N.jpg` | Nth gallery image |
| `{slug}-hero.gif` | Animated hero (copied as-is, never resized) |
| `{slug}-gallery-N.gif` | Animated gallery image (copied as-is) |

GIFs are always preserved as-is — animation is never lost.
MP4 video files go directly into `public/static/video/` — they bypass the optimizer entirely.

---

*Last updated: May 2026*
