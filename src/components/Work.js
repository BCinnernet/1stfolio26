import Isotope from "isotope-layout";
import { useEffect, useRef } from "react";
import Image from "next/image";
import SlideChars from "@/src/components/SlideChars";
import projects from "@/src/data/projects";

const Work = () => {
  const isotope = useRef();

  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".portfolio-content", {
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
  }, []);

  return (
    <section
      id="work"
      className="section"
      style={{
        paddingTop: "16px",
        paddingBottom: "80px",
        scrollMarginTop: "110px",
      }}
    >
      <div className="container">
        <div className="row sm-m-25px-b m-35px-b">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="dark-color text-uppercase">
                Selected Work & Projects
              </h3>
              <p className="text-uppercase reveal-up delay-1" style={{ fontSize: "15px", letterSpacing: "0.08em" }}>
                Selected work across brand, motion, and illustration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="portfolio-content lightbox-gallery">
          {projects.map((project, index) => (
            <div key={index} className="grid-item product branding">
              <div className="portfolio-box-01">
                <div className="project-thumb-frame" style={{ position: "relative" }}>
                  <Image
                    fill
                    className="project-thumb-media"
                    src={
                      project.thumbnailImage ||
                      project.mainImage ||
                      project.coverImage
                    }
                    alt={project.title}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <a
                  className="link-overlay"
                  href={`/projects/${project.slug}`}
                  aria-label={project.title}
                />
              </div>

              <div className="project-card-copy">
                <h5 className="project-card-title">
                  <SlideChars text={project.title} stagger={20} />
                </h5>
                <span className="project-card-category">{project.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;