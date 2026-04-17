import { useState, useEffect } from "react";
import Layout from "@/src/layouts/Layout";
import dynamic from "next/dynamic";

const Work = dynamic(() => import("@/src/components/Work"), { ssr: false });

const Index3 = () => {
  const [workOpen, setWorkOpen] = useState(false);
  const [btnTilt, setBtnTilt] = useState({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });

  const handleBtnMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 18;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 18;
    setBtnTilt({ transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
  };

  const handleBtnMouseLeave = () => {
    setBtnTilt({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });
  };

  // Auto-open after 2s on first load
  useEffect(() => {
    const t = setTimeout(() => setWorkOpen(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // After opening, nudge Isotope to recalculate its grid layout
  useEffect(() => {
    if (workOpen) {
      const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 400);
      return () => clearTimeout(t);
    }
  }, [workOpen]);

  return (
    <Layout headerColor={"dark"}>

      {/* ── Home Banner ── */}
      <section
        id="home"
        className="home-banner-01 video-hero slant-bottom"
        style={{ paddingTop: "100px", paddingBottom: "120px" }}
      >
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/static/video/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
        <div className="container">
          <div className="row align-items-center p-50px-tb">
            <div className="col-12">
              <div className="ht-text" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Work reveal trigger — sits at the seam ── */}
      <div className="work-reveal-trigger">
        <button
          className={`work-reveal-btn${workOpen ? " is-open" : ""}`}
          onClick={() => setWorkOpen((prev) => !prev)}
          aria-expanded={workOpen}
          style={btnTilt}
          onMouseMove={handleBtnMouseMove}
          onMouseLeave={handleBtnMouseLeave}
        >
          <span className="work-folder-icon">
            <img src="/static/img/Folder Icon_closed.png" alt="" className="folder-img folder-img-closed" />
            <img src="/static/img/Folder Icon_open.png"   alt="" className="folder-img folder-img-open"   />
          </span>
          <span className="work-reveal-label">
            {workOpen ? "Close Work" : "Work / Projects"}
          </span>
        </button>
      </div>

      {/* ── Work panel — expands on open ── */}
      <div className={`work-panel${workOpen ? " is-open" : ""}`}>
        <div className="work-panel-inner">
          <Work />
        </div>
      </div>

      {/* ── About Teaser ── */}
      <section
        className="section slant-top"
        style={{ paddingTop: "80px", paddingBottom: "50px", background: "#c8c7be" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 m-15px-tb">
              <div className="about-me-img">
                <img
                  className="about-gif"
                  src="/static/img/Body_scan_01_Test.gif"
                  alt="Ejuan animated body scan"
                />
              </div>
            </div>
            <div className="col-lg-7 m-15px-tb">
              <div className="about-me">
                <h4>
                  <span style={{ color: "#141413" }}>I'm</span>{" "}
                  <span style={{ color: "#141413", fontWeight: "800" }}>EJUAN</span>{" "}
                  <span style={{ fontSize: "20px", fontStyle: "italic", color: "#83867d" }}>
                    (ē·wän)
                  </span>{" "}
                  <span style={{ fontSize: "15px", fontStyle: "italic", color: "#83867d" }}>
                    (Most call me E.J)
                  </span>
                </h4>
                <h6></h6>
                <p>
                  "Illustration, design and motion design is where I thrive, but honestly, whatever I can put my hands on, I'll make something out of it! I coded this website just to understand the process for the love of the game."
                </p>
                <div className="btn-bar">
                  <a className="m-btn m-btn-theme" href="/about">
                    Check me out!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </Layout>
  );
};

export default Index3;
