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
const ProjectDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);

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

  // Hero image src (same image shown on the works page)
  const heroSrc =
    project.mainImage ||
    (project.mainMediaType === "video"
      ? `/static/img/${project.slug}-thumb.jpg`
      : `/static/img/${project.slug}-hero.jpg`);

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

  const pageDesc = project.description?.[0] ?? `${project.title} — ${project.category} by ${name}.`;
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

      {/* ── Title and description ── */}
      <section className="project-info-section">
        <div className="container">
          <a className="project-back-link" href="/#work">← Back to Work</a>
          <div className="project-info-grid">
            <div className="project-info-left">
              <span className="project-info-category">{project.category}</span>
              <h1 className="project-info-title">{project.title}</h1>
            </div>
            <div className="project-info-right">
              <div className="project-info-desc">
                {descriptions.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Editorial gallery ── */}
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

      {/* ── Footer: credits, links, tags ── */}
      <section className="project-footer">
        <div className="container">
          <div className="project-footer-grid">

            {/* Credits */}
            <div>
              <p className="project-footer-label">Credits</p>
              {project.credits?.lines?.length > 0 ? (
                <div className="project-footer-text">
                  {project.credits.lines.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </div>
              ) : (
                <p className="project-footer-text">—</p>
              )}
            </div>

            {/* Links */}
            <div>
              <p className="project-footer-label">Links</p>
              {project.links?.length > 0 ? (
                project.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-footer-link"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <p className="project-footer-text">—</p>
              )}
            </div>

            {/* Tags */}
            <div>
              <p className="project-footer-label">Tags</p>
              {project.tags?.length > 0 ? (
                project.tags.map((tag) => (
                  <span key={tag} className="project-tag-pill">
                    {TAG_LABELS[tag] || tag}
                  </span>
                ))
              ) : (
                <p className="project-footer-text">—</p>
              )}
            </div>

          </div>
        </div>
      </section>

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
