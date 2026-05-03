// ─────────────────────────────────────────────────────────────────────────────
// pages/index.jsx — HOME PAGE
//
// This is the main landing page. It contains three sections:
//   1. Video banner (the full-screen hero at the top)
//   2. Work / Projects toggle button + expandable project grid
//   3. About teaser (the "WHAT'S UP, I'M EJ" section)
//
// To edit text content on this page, search for the JSX below (~line 90+).
// To edit the project cards, go to src/data/projects.js instead.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Layout from "@/src/layouts/Layout";
import dynamic from "next/dynamic";
import SlideChars from "@/src/components/SlideChars";
import ProximityText from "@/src/components/ProximityText";
import siteConfig from "@/src/data/siteConfig";

const { siteUrl, name } = siteConfig;
const HOME_DESC = "Multimedia artist based in Kansas City — illustration, motion design, brand identity, poster design, apparel, and more. Eclectic on purpose.";

// Work is loaded only in the browser (ssr: false) because Isotope (the grid
// layout library it uses) doesn't work on the server side.
const Work = dynamic(() => import("@/src/components/Work"), { ssr: false });

// These two gradients create the shiny "gloss" layer on the Work button.
// GLOSS_DEFAULT = subtle shine at rest; GLOSS_HOVER = slightly brighter on hover.

const Index3 = () => {
  const router = useRouter();
  // true = project grid is visible, false = collapsed
  const [workOpen, setWorkOpen] = useState(false);

  // The name that shows next to "WHAT'S UP, I'M".
  // Starts as "EJUAN", then swaps to "EJ" at 2.8s on load.
  // Hovering the name toggles it back and forth permanently.
  const [nameVariant, setNameVariant] = useState("EJUAN");
  const [nameHovered, setNameHovered] = useState(false);

  // textLean: -1 to 1, updated as the mouse moves across the about column.
  // Used to slightly shift the "Check me out" button for a parallax feel.
  const [textLean, setTextLean] = useState(0);

  // refs point to actual DOM elements so we can read their size/position.
  const triggerRef = useRef(null); // the wrapper div around the button (used for scroll)
  const aboutRef   = useRef(null); // the about teaser section (used for scroll reveal)

  // ── Open work panel: immediately if ?work=open, otherwise after 1.5s ────
  useEffect(() => {
    if (!router.isReady) return;
    if (router.query.work === "open") {
      setWorkOpen(true);
      setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 150);
    } else {
      const t = setTimeout(() => setWorkOpen(true), 1500);
      return () => clearTimeout(t);
    }
  }, [router.isReady]);

  // ── Swap name from EJUAN → EJ after 2.8 seconds ─────────────────────────
  // To change this behavior, edit the two strings here or adjust the timeout.
  useEffect(() => {
    const t = setTimeout(() => setNameVariant("EJ"), 2800);
    return () => clearTimeout(t);
  }, []);

  // ── Tell Isotope to recalculate the grid after the work panel opens ──────
  // Isotope measures columns immediately; if the panel is hidden it gets 0px.
  // Firing a resize event 400ms after open gives it correct measurements.
  useEffect(() => {
    if (workOpen) {
      const t = setTimeout(() => window.dispatchEvent(new Event("resize")), 400);
      return () => clearTimeout(t);
    }
  }, [workOpen]);

  // ── Scroll-reveal for the about teaser section ───────────────────────────
  // Any element inside aboutRef with class "sr" starts invisible.
  // Once it enters the viewport (10% visible), the class "sr-visible" is added
  // which triggers the fade+slide-up animation defined in master.css.
  // The "--sr-delay" CSS variable staggers each element's entrance timing.
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
      <Head>
        <title>{name} — Multimedia Artist</title>
        <meta name="description" content={HOME_DESC} />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content={siteUrl} />
        <meta property="og:title"       content={`${name} — Multimedia Artist`} />
        <meta property="og:description" content={HOME_DESC} />
        {/* OG image: swap filename below to a hero artwork piece when ready */}
        <meta property="og:image"       content={`${siteUrl}/static/img/Jumbled%20EJUAN%20logo%20-%20henderson%20outline%20-%2063.png`} />

        {/* Twitter / X card */}
        <meta name="twitter:card"        content="summary_large_image" />
        <meta name="twitter:title"       content={`${name} — Multimedia Artist`} />
        <meta name="twitter:description" content={HOME_DESC} />
        <meta name="twitter:image"       content={`${siteUrl}/static/img/Jumbled%20EJUAN%20logo%20-%20henderson%20outline%20-%2063.png`} />
        <meta name="twitter:creator"     content="@ohhej" />

        {/* JSON-LD Person schema */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": name,
          "url": siteUrl,
          "jobTitle": "Multimedia Artist",
          "description": HOME_DESC,
          "address": { "@type": "PostalAddress", "addressLocality": "Kansas City", "addressRegion": "MO", "addressCountry": "US" },
          "sameAs": [
            "https://www.instagram.com/ohhej",
            "https://bsky.app/profile/becausetheinnernet.com",
          ],
        })}} />
      </Head>


      {/* ── SECTION 2: Work / Projects Toggle Button ──────────────────────
          Clicking this button opens/closes the project grid below it.
          The folder icon swaps between open/closed images.
          The button label uses SlideChars for the rolling text animation.
          On open, the page scrolls down to show the grid.                 */}
      <div ref={triggerRef} id="work" className="work-reveal-trigger">

        {/* Skills ticker — large faint text scrolling behind the button */}
        <div className="skills-ticker" aria-hidden="true">
          <div className="skills-ticker-track">
            <span>ILLUSTRATION — POSTER DESIGN — CORPORATE DESIGN — SOCIAL MEDIA — 2D MOTION DESIGN — TEXTILE ART — </span>
            <span>ILLUSTRATION — POSTER DESIGN — CORPORATE DESIGN — SOCIAL MEDIA — 2D MOTION DESIGN — TEXTILE ART — </span>
          </div>
        </div>

        <button
          className={`work-reveal-btn${workOpen ? " is-open" : ""}`}
          onClick={() => setWorkOpen(o => !o)}
          aria-expanded={workOpen}
        >
          <span className="work-folder-icon">
            <img src="/static/img/Folder Icon_closed.png" alt="" className="folder-img folder-img-closed" />
            <img src="/static/img/Folder Icon_open.png"   alt="" className="folder-img folder-img-open"   />
          </span>
          <span className="work-reveal-label">
            <SlideChars key={workOpen ? "close" : "open"} text={workOpen ? "Close Work" : "Work / Projects"} stagger={25} />
          </span>
        </button>
      </div>

      {/* ── PROJECT GRID (expands when workOpen is true) ──────────────────
          The Work component contains the Isotope grid of project cards.
          Project data lives in src/data/projects.js — edit there.        */}
      <div className={`work-panel${workOpen ? " is-open" : ""}`}>
        <div className="work-panel-inner">
          <Work />
        </div>
      </div>

      {/* ── SECTION 3: About Teaser ───────────────────────────────────────
          The "WHAT'S UP, I'M EJ" section that previews the about page.
          - Left column: animated GIF (the body scan)
          - Right column: name, role, body copy, CTA button

          To change body text, edit the ProximityText `segments` props below.
          Each segment is { text: "...", italic: true/false }.
          italic: true makes that text slant.

          To change the GIF, replace /public/static/img/Body_scan_01_Test.gif */}
      <section
        ref={aboutRef}
        className="section slant-top"
        style={{ paddingTop: "80px", paddingBottom: "50px", background: "#c5d400" }}
      >
        <div className="container">
          <div className="row align-items-center">

            {/* Left: the animated GIF */}
            <div className="col-lg-5 m-15px-tb sr" style={{ "--sr-delay": "0ms" }}>
              <div className="about-me-img">
                <img
                  className="about-gif"
                  src="/static/img/Body_scan_01_Test.gif"
                  alt="Ejuan animated body scan"
                />
              </div>
            </div>

            {/* Right: text content
                onMouseMove tracks cursor position to drive the textLean parallax
                on the "Check me out" button at the bottom.                    */}
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

                {/* ── Headline: "WHAT'S UP, I'M [EJ / EJUAN]" ──────────────
                    The name part uses SlideChars with animateIn so it rolls in
                    on mount. Hovering the name toggles between EJ and EJUAN
                    and STAYS in that state until hovered again.
                    To change the greeting text, edit the string below.         */}
                <h2 className="home-teaser-name sr" style={{ "--sr-delay": "120ms" }}>
                  WHAT'S UP, I'M
                  <a
                    href="/about"
                    className="home-name-hover-wrap"
                    style={{ textDecoration: "none", color: "inherit" }}
                    onMouseEnter={() => setNameHovered((h) => !h)}
                    onTouchEnd={(e) => { e.preventDefault(); setNameHovered((h) => !h); }}
                  >
                    <SlideChars
                      key={nameHovered ? "ejuan-hover" : nameVariant}
                      text={nameHovered ? "EJUAN" : nameVariant}
                      stagger={22}
                      animateIn
                    />
                  </a>
                </h2>

                {/* ── Role line ─────────────────────────────────────────────
                    ProximityText makes each character react to cursor proximity:
                    characters near the cursor scale up, bold, and lift slightly.
                    To edit the text, change the `text` value in `segments`.    */}
                <ProximityText
                  className="home-teaser-role sr"
                  style={{ "--sr-delay": "200ms" }}
                  segments={[{ text: "Multimedia Artist", italic: false }]}
                />

                {/* ── Body copy paragraphs ──────────────────────────────────
                    Each ProximityText is one paragraph. Edit the `text` strings
                    to change the copy. Use italic: true for italic phrases.    */}
                <ProximityText
                  className="home-teaser-body sr"
                  style={{ "--sr-delay": "270ms", marginBottom: "0" }}
                  segments={[
                    { text: "I can't stick to one lane if I tried... So I don't. Curiosity drives my work, and that's what keeps it eclectic.", italic: false },
                  ]}
                />
                <ProximityText
                  className="home-teaser-body sr"
                  style={{ "--sr-delay": "300ms" }}
                  segments={[
                    { text: "I work at the intersection of creative instinct and technicality, bringing ideas to life in whatever form they need to take!", italic: false },
                  ]}
                />

                {/* ── CTA Button ────────────────────────────────────────────
                    "Check me out →" links to the /about page.
                    The translateX shifts slightly with textLean (mouse parallax).
                    To change button text or link, edit the <a> below.          */}
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
