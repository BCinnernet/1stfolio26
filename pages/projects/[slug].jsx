import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/src/layouts/Layout";
import projects from "@/src/data/projects";
import siteConfig from "@/src/data/siteConfig";

const { siteUrl, name } = siteConfig;

const TAG_LABELS = {
  "illustration-design": "Illustration & Design",
  "brand-identity":      "Brand & Identity",
  "motion-design":       "Motion Design",
};

// ── Video embed ───────────────────────────────────────────────────────────────
const VideoEmbed = ({ src, title }) => (
  <div className="editorial-item-video">
    <iframe
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
      src={`https://www.youtube.com/embed/${src}`}
      title={title}
      allowFullScreen
      sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
    />
  </div>
);


// ── Project page ──────────────────────────────────────────────────────────────
// ── Banner bulge constants ────────────────────────────────────────────────────
const BW     = 1000; // SVG viewBox width (maps to 100% of screen)
const BH     = 120;  // Banner base height in px. Increase to show more color strip.
const BULGE  = 36;   // How many px the bulge extends below the base height.
const SPREAD = 140;  // How wide the bulge is (in viewBox units, 0–1000).

const ProjectDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [bannerCursor, setBannerCursor] = useState({ nx: 0.5, active: false });

  const project = projects.find((p) => p.slug === slug);

  // Lock scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // Escape key closes lightbox
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightboxIndex(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!project) {
    return (
      <Layout headerColor="dark">
        <section style={{ paddingTop: "140px", paddingBottom: "80px", background: "#edeae4" }}>
          <div className="container">
            <h2>Project not found</h2>
            <p>This project page does not exist yet.</p>
          </div>
        </section>
      </Layout>
    );
  }

  // Resolve gallery image srcs from slug (numbering must happen before hero is prepended)
  let imgCount = 0;
  const resolvedGallery = (project.gallery ?? []).map((item) => {
    if (item.type !== "image") return item;
    imgCount++;
    return {
      ...item,
      src: item.src || `/static/img/${project.slug}-gallery-${imgCount}.jpg`,
    };
  });

  // ── Hero media (right column of the project header) ───────────────────────
  // Set heroType in projects.js to control which format displays:
  //   heroType: "image"  → uses {slug}-hero.jpg (default)
  //   heroType: "gif"    → uses {slug}-hero.gif
  //   heroType: "video"  → uses {slug}-hero.mp4 from /static/video/
  //                        or set heroVideoSrc: "/path/to/custom.mp4" for a different path
  //   heroType: "youtube" + heroYoutubeId: "VIDEO_ID" → YouTube embed
  // The same heroSrc is also inserted as the first tile in the gallery below.
  const heroIsVideo   = project.heroType === "video";
  const heroIsYoutube = project.heroType === "youtube";
  const heroVideoSrc  = project.heroVideoSrc || `/static/video/${project.slug}-hero.mp4`;

  // heroSrc → always used as the first gallery tile (full uncropped image)
  const heroSrc =
    project.mainImage ||
    (project.heroType === "gif"
      ? `/static/img/${project.slug}-hero.gif`
      : project.mainMediaType === "video"
      ? `/static/img/${project.slug}-thumb.jpg`
      : `/static/img/${project.slug}-hero.jpg`);

  // heroPanelSrc → what shows in the right-column hero panel.
  // Set heroPanelImage in projects.js to use a different/cropped file for the panel
  // while keeping the full image as the gallery's first tile.
  // Default: same as heroSrc (panel and gallery tile show the same file).
  const heroPanelSrc = project.heroPanelImage || heroSrc;

  // Insert hero as the first image tile — videos in the data stay ahead of it
  const firstImageIdx = resolvedGallery.findIndex((item) => item.type === "image");
  const gallery =
    firstImageIdx === -1
      ? [...resolvedGallery, { type: "image", src: heroSrc }]
      : [
          ...resolvedGallery.slice(0, firstImageIdx),
          { type: "image", src: heroSrc },
          ...resolvedGallery.slice(firstImageIdx),
        ];

  // Image-only index map for lightbox prev/next
  const galleryToImageIdx = {};
  let imageCount = 0;
  gallery.forEach((item, i) => {
    if (item.type !== "video") galleryToImageIdx[i] = imageCount++;
  });
  const totalImages = imageCount;

  const lightboxImgIdx =
    lightboxIndex !== null ? galleryToImageIdx[lightboxIndex] ?? null : null;

  const goToImageIdx = (imgIdx) => {
    const gi = Object.keys(galleryToImageIdx).find(
      (k) => galleryToImageIdx[k] === imgIdx
    );
    if (gi !== undefined) setLightboxIndex(Number(gi));
  };

  // Description — supports both new array and legacy string
  const descriptions = Array.isArray(project.description)
    ? project.description
    : project.intro
    ? [project.intro]
    : [];

  // Size class for editorial gallery items
  const sizeClass = (size) => {
    if (size === "full")       return "editorial-item editorial-item--full";
    if (size === "third")      return "editorial-item editorial-item--third";
    if (size === "two-thirds") return "editorial-item editorial-item--two-thirds";
    return "editorial-item";
  };

  const rawDesc  = project.description?.[0];
  const pageDesc = (!rawDesc || rawDesc.includes("Coming Soon"))
    ? `${project.title} — ${project.category} by ${name}. Based in Kansas City, Missouri.`
    : rawDesc;
  const ogImage  = `${siteUrl}/static/img/${project.slug}-hero.jpg`;
  const pageUrl  = `${siteUrl}/projects/${project.slug}`;

  return (
    <Layout headerColor="dark">
      <Head>
        <title>{project.title} — {name}</title>
        <meta name="description" content={pageDesc} />
        <link rel="canonical" href={pageUrl} />

        <meta property="og:type"        content="article" />
        <meta property="og:url"         content={pageUrl} />
        <meta property="og:title"       content={`${project.title} — ${name}`} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:image"       content={ogImage} />

        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${project.title} — ${name}`} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image"       content={ogImage} />
      </Head>

      {/* ── ACCENT BANNER ───────────────────────────────────────────────────────
           Color → accentColor in src/data/projects.js.
           Size → BW / BH / BULGE / SPREAD constants above the component.
           The bottom edge bulges toward the cursor on hover.
           ─────────────────────────────────────────────────────────────────── */}
      {(() => {
        const bx = bannerCursor.nx * BW;
        const by = bannerCursor.active ? BH + BULGE : BH;
        const lx = Math.max(bx - SPREAD, 0);
        const rx = Math.min(bx + SPREAD, BW);
        const d  = `M 0 0 L ${BW} 0 L ${BW} ${BH} L ${rx} ${BH} Q ${bx} ${by} ${lx} ${BH} L 0 ${BH} Z`;
        return (
          <svg
            viewBox={`0 0 ${BW} ${BH}`}
            preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: `${BH}px`, overflow: "visible", position: "relative", zIndex: 1, background: "#141013" }}
            onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setBannerCursor({ nx: (e.clientX - r.left) / r.width, active: true }); }}
            onMouseLeave={() => setBannerCursor(p => ({ ...p, active: false }))}
          >
            <path d={d} fill="transparent" style={{ transition: "d 0.18s ease-out" }} />
          </svg>
        );
      })()}

      {/* ── PROJECT HERO — text left, artwork right ─────────────────────────
           Left column: back link, title, category label, description.
           Right column: hero media (image, gif, mp4, or YouTube embed).
           heroType in projects.js controls the right column format.
           To force a line break in the title, add \n in the title string:
             title: "First Line\nSecond Line"
           The same hero image also appears first in the gallery below
           so visitors can view it uncropped at full size.
           ─────────────────────────────────────────────────────────────────── */}
      <section className="project-hero-section">
        {/* Text column */}
        <div className="project-hero-text">
          <a className="project-back-link" href="/">← Back to Work</a>
          <h1 className="project-info-title">{project.title}</h1>
          {/* Category label — edit "category" field in src/data/projects.js */}
          <span className="project-info-category">{project.category}</span>
          <div className="project-info-desc">
            {descriptions.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        {/* Media column — heroType in projects.js: "image" | "gif" | "video" | "youtube" */}
        <div className="project-hero-img-wrap">
          {heroIsYoutube ? (
            <iframe
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none", display: "block" }}
              src={`https://www.youtube.com/embed/${project.heroYoutubeId}`}
              title={project.title}
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            />
          ) : heroIsVideo ? (
            <video
              src={heroVideoSrc}
              className="project-hero-img"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={heroPanelSrc}
              alt={project.title}
              className="project-hero-img"
            />
          )}
        </div>
      </section>

      {/* ── GALLERY ─────────────────────────────────────────────────────────
           Images and videos come from the "gallery" array in projects.js.
           Size options per item: "full" | "half" (default) | "third" | "two-thirds"
           To add a YouTube video: { type: "video", src: "VIDEO_ID", caption: "..." }
           ─────────────────────────────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="editorial-gallery-section">
          <div className={`editorial-gallery${project.denseGrid ? " editorial-gallery--dense" : ""}`}>
            {gallery.map((item, i) => (
              item.type === "video" ? (
                <div key={i} className={`${project.denseGrid ? "editorial-item editorial-item--full" : sizeClass(item.size)} editorial-item--video`}>
                  <VideoEmbed src={item.src} title={item.caption || project.title} />
                  {item.caption && (
                    <p className="editorial-item-caption">{item.caption}</p>
                  )}
                </div>
              ) : (
                <div key={i} className={project.denseGrid ? "editorial-item" : sizeClass(item.size)}>
                  <img
                    src={item.src}
                    alt={item.caption || project.title}
                    onClick={() => setLightboxIndex(i)}
                  />
                  {item.caption && (
                    <div className="editorial-caption-overlay">{item.caption}</div>
                  )}
                </div>
              )
            ))}
          </div>
        </section>
      )}

      {/* ── Footer: credits, links, tags — hidden for now ── */}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && gallery[lightboxIndex]?.type !== "video" && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.92)",
            zIndex: 9999,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "88vw" }}
          >
            <img
              src={gallery[lightboxIndex].src}
              alt={gallery[lightboxIndex].caption || project.title}
              style={{ width: "88vw", height: "78vh", objectFit: "contain", borderRadius: "4px", display: "block" }}
            />
            {gallery[lightboxIndex].caption && (
              <p style={{ marginTop: "16px", color: "rgba(255,255,255,0.55)", fontSize: "13px", letterSpacing: "0.04em", lineHeight: "1.6", textAlign: "center", maxWidth: "540px" }}>
                {gallery[lightboxIndex].caption}
              </p>
            )}
          </div>

          <button
            onClick={() => setLightboxIndex(null)}
            style={{ position: "absolute", top: "20px", right: "24px", background: "none", border: "none", color: "#fff", fontSize: "32px", lineHeight: 1, cursor: "pointer", opacity: 0.7 }}
          >✕</button>

          {lightboxImgIdx > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImageIdx(lightboxImgIdx - 1); }}
              style={{ position: "absolute", left: "20px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: "56px", lineHeight: 1, cursor: "pointer", opacity: 0.7 }}
            >‹</button>
          )}

          {lightboxImgIdx < totalImages - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImageIdx(lightboxImgIdx + 1); }}
              style={{ position: "absolute", right: "20px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#fff", fontSize: "56px", lineHeight: 1, cursor: "pointer", opacity: 0.7 }}
            >›</button>
          )}

          <span
            style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.35)", fontSize: "12px", letterSpacing: "0.1em" }}
          >
            {lightboxImgIdx + 1} / {totalImages}
          </span>
        </div>
      )}

    </Layout>
  );
};

export default ProjectDetail;
