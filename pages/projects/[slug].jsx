import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Layout from "@/src/layouts/Layout";
import projects from "@/src/data/projects";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";

SwiperCore.use([Navigation, Pagination]);

const ProjectDetail = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const project = projects.find((item) => item.slug === slug);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  // Close lightbox on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setLightboxIndex(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!project) {
    return (
      <Layout headerColor={"dark"}>
        <section style={{ paddingTop: "140px", paddingBottom: "80px", background: "#e7e6df" }}>
          <div className="container">
            <h2>Project not found</h2>
            <p>This project page does not exist yet.</p>
          </div>
        </section>
      </Layout>
    );
  }

  const images = project.galleryImages ?? [];
  const total = images.length;

  const heroMedia =
    project.mainMediaType === "video" && project.mainVideo ? (
      <video controls style={{ width: "100%", display: "block" }}>
        <source src={project.mainVideo} type="video/mp4" />
      </video>
    ) : (
      <img src={project.mainImage} alt={project.title} style={{ width: "100%", display: "block" }} />
    );

  return (
    <Layout headerColor={"dark"}>

      {/* ── Header: text left / hero image right ── */}
      <section style={{ background: "#e7e6df", paddingBottom: 0 }}>
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
                {heroMedia}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Gallery carousel ── */}
      {total > 0 && (
        <section style={{ paddingTop: "80px", paddingBottom: "100px", background: "#f0eeea" }}>
          <div className="container">
            <Swiper
              navigation
              pagination={{ clickable: true }}
              spaceBetween={16}
              breakpoints={{
                0:    { slidesPerView: 1 },
                640:  { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              style={{
                "--swiper-navigation-color": "#141013",
                "--swiper-pagination-color": "#141013",
                paddingBottom: "48px",
                paddingLeft: "4px",
                paddingRight: "4px",
              }}
            >
              {images.map((img, i) => (
                <SwiperSlide key={i}>
                  <div
                    onClick={() => setLightboxIndex(i)}
                    className="gallery-slide"
                    style={{ lineHeight: 0, cursor: "zoom-in" }}
                  >
                    <img
                      src={img}
                      alt={`${project.title} — ${i + 1}`}
                      style={{
                        width: "100%",
                        display: "block",
                        borderRadius: "6px",
                        aspectRatio: "4 / 3",
                        objectFit: "cover",
                        transition: "opacity 0.2s ease",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="container" style={{ marginTop: "40px" }}>
            <a className="m-btn m-btn-theme" href="/#work">← Back to Work</a>
          </div>
        </section>
      )}

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.92)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={images[lightboxIndex]}
            alt={`${project.title} — ${lightboxIndex + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "88vw",
              maxHeight: "88vh",
              objectFit: "contain",
              borderRadius: "4px",
              display: "block",
            }}
          />

          {/* Close */}
          <button
            onClick={() => setLightboxIndex(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "24px",
              background: "none",
              border: "none",
              color: "#fff",
              fontSize: "32px",
              lineHeight: 1,
              cursor: "pointer",
              opacity: 0.8,
            }}
          >
            ✕
          </button>

          {/* Prev */}
          {lightboxIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex - 1); }}
              style={{
                position: "absolute",
                left: "20px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "56px",
                lineHeight: 1,
                cursor: "pointer",
                opacity: 0.8,
              }}
            >
              ‹
            </button>
          )}

          {/* Next */}
          {lightboxIndex < total - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(lightboxIndex + 1); }}
              style={{
                position: "absolute",
                right: "20px",
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: "56px",
                lineHeight: 1,
                cursor: "pointer",
                opacity: 0.8,
              }}
            >
              ›
            </button>
          )}

          {/* Counter */}
          <span
            style={{
              position: "absolute",
              bottom: "24px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "rgba(255,255,255,0.5)",
              fontSize: "13px",
              letterSpacing: "0.08em",
            }}
          >
            {lightboxIndex + 1} / {total}
          </span>
        </div>
      )}

    </Layout>
  );
};

export default ProjectDetail;
