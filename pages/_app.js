import Preloader from "@/src/layouts/Preloader";
import "@/styles/globals.css";
import { Fragment, useEffect, useState, useRef } from "react";
import SlideChars from "@/src/components/SlideChars";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [easterEgg, setEasterEgg] = useState(false);
  const [easterEggOut, setEasterEggOut] = useState(false);
  const konamiProgress = useRef([]);
  const blobRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const lerpRef = useRef({ nx: 0, ny: 0 });

  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 1500);
    setTimeout(() => { setContent(true); }, 1000);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      konamiProgress.current.push(e.key);
      konamiProgress.current = konamiProgress.current.slice(-KONAMI.length);
      if (konamiProgress.current.join(",") === KONAMI.join(",")) {
        lerpRef.current = { nx: 0, ny: 0 };
        mouseRef.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        setEasterEggOut(false);
        setEasterEgg(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Mouse-reactive blob — starts after pop-in animation (1s)
  useEffect(() => {
    if (!easterEgg) return;

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const startTimer = setTimeout(() => {
      const blob = blobRef.current;
      if (!blob) return;
      // Hand control of transform + border-radius to JS
      blob.style.animation = "none";

      const tick = () => {
        const blob = blobRef.current;
        if (!blob) return;

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const targetNx = (mouseRef.current.x - vw / 2) / (vw / 2);
        const targetNy = (mouseRef.current.y - vh / 2) / (vh / 2);

        // Smooth lerp — lazy liquid feel
        lerpRef.current.nx += (targetNx - lerpRef.current.nx) * 0.06;
        lerpRef.current.ny += (targetNy - lerpRef.current.ny) * 0.06;

        const { nx, ny } = lerpRef.current;
        const tx = nx * 28;
        const ty = ny * 28;
        const amp = 16;
        const base = 50;

        // Each corner stretches toward / away from the mouse
        const tl_h = base - nx * amp - ny * amp;
        const tr_h = base + nx * amp - ny * amp;
        const br_h = base + nx * amp + ny * amp;
        const bl_h = base - nx * amp + ny * amp;
        const tl_v = base - ny * amp - nx * amp * 0.5;
        const tr_v = base - ny * amp + nx * amp * 0.5;
        const br_v = base + ny * amp + nx * amp * 0.5;
        const bl_v = base + ny * amp - nx * amp * 0.5;

        blob.style.borderRadius =
          `${tl_h}% ${tr_h}% ${br_h}% ${bl_h}% / ${tl_v}% ${tr_v}% ${br_v}% ${bl_v}%`;
        blob.style.transform = `translate(${tx}px, ${ty}px)`;

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, 1050);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(startTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [easterEgg]);

  const runDismiss = (afterFn) => {
    cancelAnimationFrame(rafRef.current);
    const blob = blobRef.current;
    if (blob) {
      blob.style.animation = "ee-blob-out 0.7s cubic-bezier(0.55,0,0.45,1) forwards";
      blob.style.transform = "";
    }
    setEasterEggOut(true);
    setTimeout(() => {
      setEasterEgg(false);
      afterFn?.();
    }, 750);
  };

  return (
    <Fragment>
      <Component {...pageProps} />

      <button
        className={`back-to-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <span className="back-to-top-arrow">
          <svg viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>

      {easterEgg && (
        <div className={`ee-overlay${easterEggOut ? " ee-out" : ""}`}>
          <div className="ee-blob" ref={blobRef} />
          <div className="ee-content">
            <div className="ee-line-wrap">
              <p className="ee-eyebrow ee-line" style={{ "--ee-delay": "0.85s" }}>YOU FOUND IT!</p>
            </div>
            <h1 className="ee-heading">
              <span className="ee-line-wrap"><span className="ee-line" style={{ "--ee-delay": "1.0s" }}>LETS MAKE</span></span>
              <span className="ee-line-wrap"><span className="ee-line" style={{ "--ee-delay": "1.12s" }}>SOMETHING!</span></span>
            </h1>
            <div className="ee-line-wrap">
              <p className="ee-sub ee-line" style={{ "--ee-delay": "1.28s" }}>
                Seriously though, if you took the time to poke around and be this inquisitive and curious, I think we'll work well together!
              </p>
            </div>
            <div className="ee-line-wrap">
              <div className="ee-actions ee-line" style={{ "--ee-delay": "1.44s" }}>
                <button
                  className="ee-btn-contact"
                  onClick={() => runDismiss(() => { window.location.href = "/about#contact"; })}
                >
                  <SlideChars text="Let's connect →" stagger={28} />
                </button>
                <button className="ee-btn-back" onClick={() => runDismiss()}>
                  <SlideChars text="← take me back" stagger={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}
