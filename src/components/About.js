import { useCallback, useRef, useState, useEffect } from "react";
import useSectionReveal from "@/src/hooks/useSectionReveal";
import BlueskyIcon from "@/src/components/BlueskyIcon";
import siteConfig from "@/src/data/siteConfig";

const { email, location, social } = siteConfig;
const { instagram, bluesky } = social;

const GLOSS_DEFAULT = "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.00) 60%)";
const GLOSS_HOVER   = "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.00) 60%)";

const CardContent = ({ onMouseMove, onMouseLeave, onClick, cardStyle, glossStyle }) => (
  <div
    className="contact-card"
    style={{ ...cardStyle, ...(onClick ? { cursor: "pointer" } : {}) }}
    onMouseMove={onMouseMove}
    onMouseLeave={onMouseLeave}
    onClick={onClick}
  >
    <div className="contact-card-gloss" style={glossStyle} />
    <div style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
      <p className="contact-card-label" style={{ marginBottom: 0 }}>Let's make something!</p>
      <h3 className="contact-card-title" style={{ marginBottom: 0, marginTop: "-8px" }}>Don't be a stranger!</h3>
      <a href={`mailto:${email}`} className="contact-card-email">{email}</a>
      <div className="contact-card-socials" style={{ justifyContent: "flex-start", marginBottom: "4px", marginTop: "-8px" }}>
        <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
          <i className="fab fa-instagram" />
          <span>{instagram.label}</span>
        </a>
        <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
          <BlueskyIcon />
          <span>{bluesky.label}</span>
        </a>
      </div>
      <p className="contact-card-text" style={{ marginBottom: 0 }}>
        Open 24/7 <span style={{ padding: "0 6px" }}>|</span> <em style={{ fontFamily: "'Covered By Your Grace', cursive", fontStyle: "italic", fontWeight: "400", fontSize: "1.35em" }}>Always Open !</em>
      </p>
      <p className="contact-card-text" style={{ marginBottom: 0 }}>Available for freelance, collaborations, and creative opportunities.</p>
      <p className="contact-card-location" style={{ marginBottom: 0 }}>{location}</p>
    </div>
  </div>
);

const About = () => {
  const ref = useSectionReveal(0.08);
  const titleRef = useRef(null);

  const [cardStyle, setCardStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  const [glossStyle, setGlossStyle] = useState({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });
  const [overlayCardStyle, setOverlayCardStyle] = useState({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
  const [overlayGlossStyle, setOverlayGlossStyle] = useState({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });

  const [expanded, setExpanded] = useState(false);
  const [closing, setClosing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragRot, setDragRot] = useState({ x: 0, y: 0 });
  const [popDone, setPopDone] = useState(false);

  const openCard = useCallback(() => { setExpanded(true); setPopDone(false); }, []);

  const closeCard = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setExpanded(false); setClosing(false); }, 320);
  }, []);

  useEffect(() => {
    window.addEventListener("openContactCard", openCard);
    if (window.location.hash === "#contact") openCard();
    return () => window.removeEventListener("openContactCard", openCard);
  }, [openCard]);

  useEffect(() => {
    if (!expanded) return;
    const onKey = (e) => { if (e.key === "Escape") closeCard(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expanded, closeCard]);

  const handleTitleTouch = useCallback(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("tapped");
    setTimeout(() => el.classList.remove("tapped"), 620);
  }, []);

  const makeTiltHandlers = (setStyle, setGloss) => ({
    onMouseMove: (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateY = ((x - rect.width  / 2) / (rect.width  / 2)) * 6;
      const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;
      const glossX  = ((x - rect.width  / 2) / (rect.width  / 2)) * 8;
      const glossY  = ((y - rect.height / 2) / (rect.height / 2)) * 8;
      setStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
      setGloss({ background: GLOSS_HOVER, transform: `translateX(${glossX}px) translateY(${glossY}px)` });
    },
    onMouseLeave: () => {
      setStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
      setGloss({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });
    },
  });

  const inlineTilt  = makeTiltHandlers(setCardStyle, setGlossStyle);
  const overlayTilt = makeTiltHandlers(setOverlayCardStyle, setOverlayGlossStyle);

  return (
    <>
      <section
        ref={ref}
        id="about"
        className="section gray-bg"
        style={{ paddingTop: "20px", paddingBottom: "40px" }}
      >
        <div className="container">
          <div className="row align-items-start">

            <div className="col-lg-5 offset-lg-1 order-1 about-text-col sr" style={{ "--sr-delay": "100ms" }}>
              <h2
                ref={titleRef}
                className="about-page-title sr"
                style={{ "--sr-delay": "0ms" }}
                onTouchStart={handleTitleTouch}
              >
                {"About".split("").map((char, i) => (
                  <span key={i} className="about-title-char" style={{ "--char-delay": `${i * 28}ms` }}>
                    {char === " " ? " " : char}
                  </span>
                ))}
              </h2>
              <div className="about-me">
                <p>
                  I'm Ejuan Henderson, I also go by EJ. I'm a multimedia artist working across illustration, design, and motion. I follow ideas into whatever form they need, blending instinct with technical skill. Things change rapidly, so I aim to keep up to speed with the intersection of tech and art. Learning to build this website is one of my latest examples.
                </p>
                <p>
                  I'm a super curious dude by nature, and I absolutely lead with that in my work. The only way to know what's possible is to play, experiment and explore is how I sees it. Keeping that inner child alive is everything!
                </p>
                <p>
                  Outside of that, I have a background in marketing, social media, and communication. I know how that world works and I can speak <em>that</em> language too.
                </p>
              </div>
            </div>

            <div className="col-lg-4 order-2 sr" style={{ "--sr-delay": "220ms", maxWidth: "420px", paddingLeft: "40px" }}>
              <CardContent
                cardStyle={cardStyle}
                glossStyle={glossStyle}
                onMouseMove={inlineTilt.onMouseMove}
                onMouseLeave={inlineTilt.onMouseLeave}
                onClick={openCard}
              />
            </div>

          </div>
        </div>
      </section>

      {expanded && (
        <div
          className={`contact-overlay${closing ? " is-closing" : ""}`}
          onClick={closeCard}
        >
          <div
            className={`contact-overlay-card${closing ? " is-closing" : ""}${popDone ? " pop-done" : ""}`}
            onAnimationEnd={() => { if (!closing) setPopDone(true); }}
            onClick={(e) => e.stopPropagation()}
            style={{
              cursor: isDragging ? "grabbing" : "grab",
              transform: isDragging
                ? `perspective(900px) rotateX(${dragRot.x}deg) rotateY(${dragRot.y}deg)`
                : undefined,
              transition: isDragging ? "none" : "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onPointerDown={(e) => {
              e.currentTarget.setPointerCapture(e.pointerId);
              setIsDragging(true);
              setDragStart({ x: e.clientX, y: e.clientY });
            }}
            onPointerMove={(e) => {
              if (!isDragging) return;
              const dx = e.clientX - dragStart.x;
              const dy = e.clientY - dragStart.y;
              setDragRot({
                x: Math.max(-40, Math.min(40, -dy * 0.4)),
                y: Math.max(-50, Math.min(50,  dx * 0.4)),
              });
            }}
            onPointerUp={() => {
              setIsDragging(false);
              setDragRot({ x: 0, y: 0 });
            }}
          >
            <CardContent
              cardStyle={isDragging ? { transform: "none" } : overlayCardStyle}
              glossStyle={overlayGlossStyle}
              onMouseMove={isDragging ? undefined : overlayTilt.onMouseMove}
              onMouseLeave={overlayTilt.onMouseLeave}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default About;
