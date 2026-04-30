import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SlideChars from "@/src/components/SlideChars";
import projects from "@/src/data/projects";

const FILTERS = [
  { key: "all",                label: "All" },
  { key: "illustration-design", label: "Illustration & Design" },
  { key: "brand-identity",      label: "Brand & Identity" },
  { key: "motion-design",       label: "Animation / Motion & VFX" },
  { key: "various",            label: "Other Works" },
];

const TAG_LABELS = {
  "illustration-design": "Illustration",
  "brand-identity":      "Design",
  "motion-design":       "Motion",
};

// Separate the various-projects entry from the main portfolio list
const variousProject  = projects.find((p) => p.slug === "various-projects");
const mainProjects    = projects.filter((p) => p.slug !== "various-projects");

const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef();

  const visible =
    activeFilter === "all"
      ? mainProjects
      : activeFilter === "various"
      ? (variousProject?.items ?? []).map((item, i) => ({
          ...item,
          // give each item a unique key and wire it to the various-projects page
          _key:          `various-${i}`,
          slug:          "various-projects",
          mainImage:     item.src,
          mainMediaType: "image",
        }))
      : mainProjects.filter((p) => p.tags?.includes(activeFilter));

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".sr");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  return (
    <section ref={sectionRef} style={{ paddingBottom: "80px" }}>

      {/* ── Dark header: title + filter tabs ── */}
      <div className="work-section-header">
        <h2 className="work-section-title sr" style={{ "--sr-delay": "0ms" }}>
          Featured Work
        </h2>
        <p className="work-construction-note sr" style={{ "--sr-delay": "40ms" }}>
          Website is currently under heavy construction — learning to code this thing and manage the back end is a beast of a project! Thanks for visiting and stay tuned!
        </p>
        <div className="work-filter-tabs sr" style={{ "--sr-delay": "80ms" }}>
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`work-filter-btn${activeFilter === f.key ? " active" : ""}`}
              onClick={() => setActiveFilter(f.key)}
            >
              <SlideChars text={f.label} stagger={20} />
            </button>
          ))}
        </div>
      </div>

      {/* ── Project grid ── */}
      <div className="work-grid">
        {visible.length === 0 && (
          <p className="work-empty-state">More coming soon — check back!</p>
        )}
        {visible.map((project, index) => (
          <div
            key={project._key || project.slug}
            className="work-grid-item sr"
            style={{ "--sr-delay": `${index * 50}ms` }}
          >
            <a
              href={`/projects/${project.slug}`}
              className="work-grid-link"
              aria-label={project.title}
            >
              <div className="work-grid-img-wrap">
                <Image
                  fill
                  className="work-grid-img"
                  src={
                    project.thumbnailImage ||
                    project.mainImage ||
                    (project.mainMediaType === "video"
                      ? `/static/img/${project.slug}-thumb.jpg`
                      : `/static/img/${project.slug}-hero.jpg`)
                  }
                  alt={project.title}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
                <div className="work-grid-overlay">
                  <span className="work-grid-overlay-title">{project.title}</span>
                  <span className="work-grid-overlay-cat">{project.category}</span>
                </div>
              </div>
            </a>
            <div className="work-grid-copy">
              <h5 className="work-grid-title">
                <SlideChars text={project.title} stagger={40} by="word" />
              </h5>
              <span className="work-grid-cat">{project.category}</span>
              {project.tags?.length > 0 && (
                <span className="work-grid-tags">
                  {project.tags.map((t) => TAG_LABELS[t] || t).join(" · ")}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Work;
