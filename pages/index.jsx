import { useState, useEffect, useRef } from "react";
import Layout from "@/src/layouts/Layout";
import dynamic from "next/dynamic";
import SlideChars from "@/src/components/SlideChars";
import ProximityText from "@/src/components/ProximityText";

const Work = dynamic(() => import("@/src/components/Work"), { ssr: false });

const GLOSS_DEFAULT = "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.00) 60%)";
const GLOSS_HOVER   = "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.00) 60%)";

const Index3 = () => {
  const [workOpen, setWorkOpen] = useState(false);
  const [nameVariant, setNameVariant] = useState("EJUAN");
  const [nameHovered, setNameHovered] = useState(false);
  const [textLean, setTextLean] = useState(0);
  const [btnStyle, setBtnStyle] = useState({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });
  const [glossStyle, setGlossStyle] = useState({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });
  const btnRef = useRef(null);
  const triggerRef = useRef(null);
  const aboutRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    // Distance beyond the button edge (0 when inside)
    const edgeDx = Math.max(0, Math.abs(dx) - rect.width / 2);
    const edgeDy = Math.max(0, Math.abs(dy) - rect.height / 2);
    const edgeDist = Math.hypot(edgeDx, edgeDy);
    const factor = Math.max(0, 1 - edgeDist / 56);
    const nx = Math.max(-1, Math.min(1, dx / (rect.width / 2)));
    const ny = Math.max(-1, Math.min(1, dy / (rect.height / 2)));
    const rotateY =  nx * 18 * factor;
    const rotateX = -ny * 18 * factor;
    const glossX  =  nx * 12 * factor;
    const glossY  =  ny * 12 * factor;
    setBtnStyle({ transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
    setGlossStyle({ background: factor > 0 ? GLOSS_HOVER : GLOSS_DEFAULT, transform: `translateX(${glossX}px) translateY(${glossY}px)` });
  };

  const handleMouseLeave = () => {
    setBtnStyle({ transform: "perspective(600px) rotateX(0deg) rotateY(0deg)" });
    setGlossStyle({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });
  };

  // Auto-open after 2s on first load
  useEffect(() => {
    const t = setTimeout(() => setWorkOpen(true), 2000);
    return () => clearTimeout(t);
  }, []);

  // Swap EJUAN → EJ after 2.8s
  useEffect(() => {
    const t = setTimeout(() => setNameVariant("EJ"), 2800);
    return () => clearTimeout(t);
  }, []);

  // After opening, nudge Isotope to recalculate its grid layout
  useEffect(() => {
    if (workOpen) {
      const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 400);
      return () => clearTimeout(t);
    }
  }, [workOpen]);

  // Scroll reveal for about teaser section
  useEffect(() => {
    const els = aboutRef.current?.querySelectorAll(".sr");
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
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

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
      <div ref={triggerRef} id="work" className="work-reveal-trigger">
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ padding: "48px 64px", display: "inline-block" }}
        >
        <button
          ref={btnRef}
          className={`work-reveal-btn${workOpen ? " is-open" : ""}`}
          onClick={() => {
            const opening = !workOpen;
            setWorkOpen(opening);
            if (opening) {
              setTimeout(() => {
                triggerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
              }, 300);
            }
          }}
          aria-expanded={workOpen}
          style={btnStyle}
        >
          <div className="btn-gloss" style={glossStyle} />
          <span className="work-folder-icon">
            <img src="/static/img/Folder Icon_closed.png" alt="" className="folder-img folder-img-closed" />
            <img src="/static/img/Folder Icon_open.png"   alt="" className="folder-img folder-img-open"   />
          </span>
          <span className="work-reveal-label">
            <SlideChars key={workOpen ? "close" : "open"} text={workOpen ? "Close Work" : "Work / Projects"} stagger={25} />
          </span>
        </button>
        </div>
      </div>

      {/* ── Work panel — expands on open ── */}
      <div className={`work-panel${workOpen ? " is-open" : ""}`}>
        <div className="work-panel-inner">
          <Work />
        </div>
      </div>

      {/* ── About Teaser ── */}
      <section
        ref={aboutRef}
        className="section slant-top"
        style={{ paddingTop: "80px", paddingBottom: "50px", background: "#d0cfc6" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 m-15px-tb sr" style={{ "--sr-delay": "0ms" }}>
              <div className="about-me-img">
                <img
                  className="about-gif"
                  src="/static/img/Body_scan_01_Test.gif"
                  alt="Ejuan animated body scan"
                />
              </div>
            </div>
            <div
              className="col-lg-7 m-15px-tb"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setTextLean(((e.clientX - rect.left) / rect.width - 0.5) * 2);
              }}
              onMouseLeave={() => setTextLean(0)}
              onTouchMove={(e) => {
                const t = e.touches[0];
                const rect = e.currentTarget.getBoundingClientRect();
                setTextLean(((t.clientX - rect.left) / rect.width - 0.5) * 2);
              }}
              onTouchEnd={() => setTextLean(0)}
            >
              <div className="about-me">
                <h2 className="home-teaser-name sr" style={{ "--sr-delay": "120ms" }}>
                  WHAT'S UP, I'M
                  <span
                    className="home-name-hover-wrap"
                    onMouseEnter={() => setNameHovered(true)}
                    onMouseLeave={() => setNameHovered(false)}
                  >
                    <SlideChars
                      key={nameHovered ? "ejuan-hover" : nameVariant}
                      text={nameHovered ? "EJUAN" : nameVariant}
                      stagger={22}
                      animateIn
                    />
                  </span>
                </h2>
                <ProximityText
                  className="home-teaser-role sr"
                  style={{ "--sr-delay": "200ms" }}
                  segments={[{ text: "Multimedia Artist", italic: false }]}
                />
                <ProximityText
                  className="home-teaser-body sr"
                  style={{ "--sr-delay": "270ms" }}
                  segments={[
                    { text: "Illustration, design, motion, and whatever else the work calls for. I couldn't stick to one lane if I tried, so I don't! I am too curious and love too many things, my work is eclectic on purpose.", italic: false },
                  ]}
                />
                <ProximityText
                  className="home-teaser-body sr"
                  style={{ "--sr-delay": "320ms" }}
                  segments={[
                    { text: "I enjoy working and collaborating with those who have a vision and need someone who is a ", italic: false },
                    { text: "resourceful resource", italic: true },
                    { text: ". At the intersection of creative instinct and technicality, is the space I operate in.", italic: false },
                  ]}
                />
                <div className="btn-bar sr" style={{ "--sr-delay": "360ms", transform: `translateX(${textLean * 2}px)` }}>
                  <a className="m-btn m-btn-theme" href="/about">
                    Check me out →
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
