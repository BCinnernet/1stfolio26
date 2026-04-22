import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/layouts/Layout";
import projects from "@/src/data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// ── Scroll-reveal hook ────────────────────────────────────────────────────────
const useScrollReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
};

// ── Hero media slider (used when project.heroMedia is defined) ────────────────
const HeroSlider = ({ slides, title }) => (
  <Swiper
    className="hero-slider"
    modules={[Pagination]}
    pagination={{ clickable: true }}
    loop={slides.length > 1}
    speed={500}
  >
    {slides.map((item, i) =>
      item.type === "video" ? (
        <SwiperSlide key={i}>
          <div className="gallery-video-wrap">
            <iframe
              src={`https://www.youtube.com/embed/${item.src}`}
              title={item.caption || title}
              allowFullScreen
              sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
            />
          </div>
        </SwiperSlide>
      ) : (
        <SwiperSlide key={i}>
          <img src={item.src} alt={item.caption || title} className="hero-slider-img" />
        </SwiperSlide>
      )
    )}
  </Swiper>
);

// ── Single alternating gallery row ───────────────────────────────────────────
const GalleryItem = ({ item, index, projectTitle, onImageClick }) => {
  const [ref, visible] = useScrollReveal();
  const isEven = index % 2 === 0;

  const mediaEl =
    item.type === "video" ? (
      <div className="gallery-video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${item.src}`}
          title={item.caption || projectTitle}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
        />
      </div>
    ) : (
      <div
        className="gallery-image-wrap"
        onClick={() => onImageClick(index)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && onImageClick(index)}
      >
        <img
          src={item.src}
          alt={item.caption || projectTitle}
          className="gallery-img-hover"
        />
      </div>
    );

  const captionEl = (
    <div className="gallery-caption">
      <p>{item.caption}</p>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`gallery-section-row${visible ? " is-visible" : ""}`}
    >
      <div className="gallery-row-media">{isEven ? mediaEl : captionEl}</div>
      <div className="gallery-row-text">{isEven ? captionEl : mediaEl}</div>
    </div>
  );
};

// ── Project page ──────────────────────────────────────────────────────────────
const ProjectDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [scrollY, setScrollY] = useState(0);

  const project = projects.find((item) => item.slug === slug);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightboxIndex(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!project) {
    return (
      <Layout headerColor={"dark"}>
        <section style={{ paddingTop: "140px", paddingBottom: "80px", background: "#edeae4" }}>
          <div className="container">
            <h2>Project not found</h2>
            <p>This project page does not exist yet.</p>
          </div>
        </section>
      </Layout>
    );
  }

  const gallery = (() => {
    let imgCount = 0;
    return (project.gallery ?? []).map((item) => {
      if (item.type !== "image") return item;
      imgCount++;
      return {
        ...item,
        src: item.src || `/static/img/${project.slug}-gallery-${imgCount}.jpg`,
      };
    });
  })();

  // Build a map: gallery index → image-only index (for lightbox prev/next)
  const galleryToImageIndex = {};
  let imgCount = 0;
  gallery.forEach((item, i) => {
    if (item.type !== "video") galleryToImageIndex[i] = imgCount++;
  });
  const totalImages = imgCount;

  const lightboxImageIndex =
    lightboxIndex !== null ? galleryToImageIndex[lightboxIndex] ?? null : null;

  const goToImageIndex = (imgIdx) => {
    const galleryIdx = Object.keys(galleryToImageIndex).find(
      (k) => galleryToImageIndex[k] === imgIdx
    );
    if (galleryIdx !== undefined) setLightboxIndex(Number(galleryIdx));
  };

  const heroSrc =
    project.mainImage ||
    (project.mainMediaType === "video"
      ? `/static/img/${project.slug}-thumb.jpg`
      : `/static/img/${project.slug}-hero.jpg`);

  const singleHeroEl =
    project.mainMediaType === "video" && project.mainVideo ? (
      <div className="gallery-video-wrap">
        <iframe
          src={`https://www.youtube.com/embed/${project.mainVideo}`}
          title={project.title}
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-popups allow-presentation"
        />
      </div>
    ) : (
      <div className="hero-parallax-wrap">
        <img
          src={heroSrc}
          alt={project.title}
          className="hero-parallax-img"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        />
      </div>
    );

  // Derive hero slide image srcs from slug when no explicit src is provided
  const heroSlides = project.heroMedia?.length > 0
    ? (() => {
        let imgCount = 0;
        return project.heroMedia.map((item) => {
          if (item.type !== "image") return item;
          imgCount++;
          return {
            ...item,
            src: item.src || `/static/img/${project.slug}-hero-slide-${imgCount}.jpg`,
          };
        });
      })()
    : null;

  return (
    <Layout headerColor={"dark"}>

      {/* ── Header ── */}
      <section style={{ background: "#edeae4", paddingBottom: 0 }}>
        <div className="container">
          <div className="row align-items-end">
            <div
              className="col-lg-5 project-header-text"
              style={{ paddingTop: "140px", paddingBottom: "60px" }}
            >
              <p
                className="text-uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.12em", opacity: 0.55, marginBottom: "16px" }}
              >
                {project.category}
              </p>
              <h2 className="dark-color text-uppercase" style={{ marginBottom: "28px" }}>
                {project.title}
              </h2>
              <p style={{ fontSize: "17px", lineHeight: "1.9", opacity: 0.85, marginBottom: 0 }}>
                {project.intro}
              </p>
            </div>
            <div
              className="col-lg-7 project-header-image"
              style={{ paddingTop: "80px", paddingBottom: 0, lineHeight: 0 }}
            >
              <div style={{ borderRadius: "8px 8px 0 0", overflow: "hidden" }}>
                {heroSlides
                  ? <HeroSlider slides={heroSlides} title={project.title} />
                  : singleHeroEl
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ── */}
      {gallery.length > 0 && (
        <section style={{ paddingTop: "100px", paddingBottom: "120px", background: "#f5f3ef" }}>
          <div className="container">
            {gallery.map((item, i) => (
              <GalleryItem
                key={i}
                item={item}
                index={i}
                projectTitle={project.title}
                onImageClick={setLightboxIndex}
              />
            ))}
            <div style={{ marginTop: "20px" }}>
              <a className="m-btn m-btn-theme" href="/#work">← Back to Work</a>
            </div>
          </div>
        </section>
      )}


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
          <img
            src={gallery[lightboxIndex].src}
            alt={gallery[lightboxIndex].caption || project.title}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw", maxHeight: "88vh",
              objectFit: "contain", borderRadius: "4px", display: "block",
            }}
          />

          <button
            onClick={() => setLightboxIndex(null)}
            style={{ position: "absolute", top: "20px", right: "24px", background: "none", border: "none", color: "#fff", fontSize: "32px", lineHeight: 1, cursor: "pointer", opacity: 0.8 }}
          >✕</button>

          {lightboxImageIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImageIndex(lightboxImageIndex - 1); }}
              style={{ position: "absolute", left: "20px", background: "none", border: "none", color: "#fff", fontSize: "56px", lineHeight: 1, cursor: "pointer", opacity: 0.8 }}
            >‹</button>
          )}

          {lightboxImageIndex < totalImages - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToImageIndex(lightboxImageIndex + 1); }}
              style={{ position: "absolute", right: "20px", background: "none", border: "none", color: "#fff", fontSize: "56px", lineHeight: 1, cursor: "pointer", opacity: 0.8 }}
            >›</button>
          )}

          <span
            style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", color: "rgba(255,255,255,0.5)", fontSize: "13px", letterSpacing: "0.08em" }}
          >
            {lightboxImageIndex + 1} / {totalImages}
          </span>
        </div>
      )}

    </Layout>
  );
};

export default ProjectDetail;
