import Preloader from "@/src/layouts/Preloader";
import "@/styles/globals.css";
import { Fragment, useEffect, useState, useRef } from "react";
import SlideChars from "@/src/components/SlideChars";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const GRAVITY    = 0.5;
const BOUNCE     = 0.18;
const FLOOR_FRIC = 0.78;

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [broken,  setBroken]  = useState(false);

  const konamiProgress = useRef([]);
  const brokenRef      = useRef(false);
  const physicsRef     = useRef([]);
  const physicsRafRef  = useRef(null);
  const activeDragRef  = useRef(null);
  const dragAbortRef   = useRef(null);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
    setTimeout(() => setContent(true),  1000);
  }, []);


  useEffect(() => {
    const onKey = (e) => {
      konamiProgress.current.push(e.key);
      konamiProgress.current = konamiProgress.current.slice(-KONAMI.length);
      if (konamiProgress.current.join(",") === KONAMI.join(",")) {
        breakSite();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("breaksite", breakSite);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("breaksite", breakSite);
    };
  }, []);

  const breakSite = () => {
    if (brokenRef.current) return;
    brokenRef.current = true;
    setBroken(true);
    document.body.style.overflow = "hidden";

    setTimeout(() => {
      const targets = [
        ...document.querySelectorAll(".mob-header, .header-left, section, .work-reveal-trigger, .work-panel, footer"),
      ].filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      });

      const abort = new AbortController();
      dragAbortRef.current = abort;
      const { signal } = abort;

      targets.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        const origStyle = {
          position:   el.style.position,
          left:       el.style.left,
          top:        el.style.top,
          width:      el.style.width,
          margin:     el.style.margin,
          zIndex:     el.style.zIndex,
          cursor:     el.style.cursor,
          transition: el.style.transition,
          transform:  el.style.transform,
        };

        el.style.position        = "fixed";
        el.style.left            = rect.left + "px";
        el.style.top             = rect.top  + "px";
        el.style.width           = rect.width + "px";
        el.style.margin          = "0";
        el.style.zIndex          = (9000 + i).toString();
        el.style.cursor          = "grab";
        el.style.transition      = "none";
        el.style.transformOrigin = "center center";

        const state = {
          el,
          origStyle,
          origX:      rect.left,
          origY:      rect.top,
          x:          rect.left,
          y:          rect.top,
          // Start at rest — gravity pulls them down from their natural position
          vx:         (Math.random() - 0.5) * 1.5,
          vy:         Math.random() * 0.4,
          rotation:   0,
          angularVel: (Math.random() - 0.5) * 1.5,
          width:      rect.width,
          height:     rect.height,
          dragging:   false,
          dragOffX:   0,
          dragOffY:   0,
          prevX:      0,
          prevY:      0,
        };

        physicsRef.current.push(state);

        el.addEventListener("mousedown", (e) => {
          e.preventDefault();
          activeDragRef.current = state;
          state.dragging        = true;
          state.dragOffX        = e.clientX - state.x;
          state.dragOffY        = e.clientY - state.y;
          state.prevX           = e.clientX;
          state.prevY           = e.clientY;
          state.vx              = 0;
          state.vy              = 0;
          el.style.zIndex       = "10000";
          el.style.cursor       = "grabbing";
        }, { signal });

        el.addEventListener("touchstart", (e) => {
          const t               = e.touches[0];
          activeDragRef.current = state;
          state.dragging        = true;
          state.dragOffX        = t.clientX - state.x;
          state.dragOffY        = t.clientY - state.y;
          state.prevX           = t.clientX;
          state.prevY           = t.clientY;
          state.vx              = 0;
          state.vy              = 0;
        }, { signal, passive: true });
      });

      const moveState = (cx, cy) => {
        const s = activeDragRef.current;
        if (!s) return;
        const dvx   = (cx - s.prevX) * 0.7;
        const dvy   = (cy - s.prevY) * 0.7;
        s.vx        = dvx;
        s.vy        = dvy;
        s.prevX     = cx;
        s.prevY     = cy;
        s.x         = cx - s.dragOffX;
        s.y         = cy - s.dragOffY;
        // Accumulate spin from horizontal throw speed
        s.angularVel = dvx * 0.25;
        s.el.style.left = s.x + "px";
        s.el.style.top  = s.y + "px";
      };

      const endDrag = () => {
        const s = activeDragRef.current;
        if (!s) return;
        s.dragging        = false;
        s.el.style.zIndex = "9000";
        s.el.style.cursor = "grab";
        activeDragRef.current = null;
      };

      window.addEventListener("mousemove", (e) => moveState(e.clientX, e.clientY), { signal });
      window.addEventListener("mouseup",   endDrag, { signal });
      window.addEventListener("touchmove", (e) => moveState(e.touches[0].clientX, e.touches[0].clientY), { signal, passive: true });
      window.addEventListener("touchend",  endDrag, { signal });

      const tick = () => {
        const ww = window.innerWidth;
        const wh = window.innerHeight;

        physicsRef.current.forEach((s) => {
          if (s.dragging) return;

          s.vy         += GRAVITY;
          s.x          += s.vx;
          s.y          += s.vy;
          s.rotation   += s.angularVel;
          s.angularVel *= 0.985;
          s.vx         *= 0.998;

          // Soft walls — bounce before element goes fully off-screen
          const margin = Math.min(s.width * 0.5, 120);
          if (s.x < -margin) {
            s.x  = -margin;
            s.vx = Math.abs(s.vx) * BOUNCE;
            s.angularVel *= 0.8;
          }
          if (s.x + s.width > ww + margin) {
            s.x  = ww + margin - s.width;
            s.vx = -Math.abs(s.vx) * BOUNCE;
            s.angularVel *= 0.8;
          }

          // Floor — keep elements fully visible and reachable
          const floor = wh - s.height - 16;
          if (s.y >= floor) {
            s.y           = floor;
            s.vy         *= -BOUNCE;
            s.vx         *= FLOOR_FRIC;
            s.angularVel *= FLOOR_FRIC;
            if (Math.abs(s.vy) < 0.4) s.vy = 0;
          }

          s.el.style.left      = s.x + "px";
          s.el.style.top       = s.y + "px";
          s.el.style.transform = `rotate(${s.rotation}deg)`;
        });

        physicsRafRef.current = requestAnimationFrame(tick);
      };

      physicsRafRef.current = requestAnimationFrame(tick);
    }, 950);
  };

  const fixSite = () => {
    cancelAnimationFrame(physicsRafRef.current);
    dragAbortRef.current?.abort();
    activeDragRef.current = null;

    physicsRef.current.forEach(({ el, origX, origY, origStyle }) => {
      el.style.transition = "left 0.65s cubic-bezier(0.165,0.84,0.44,1), top 0.65s cubic-bezier(0.165,0.84,0.44,1), transform 0.65s cubic-bezier(0.165,0.84,0.44,1)";
      el.style.left       = origX + "px";
      el.style.top        = origY + "px";
      el.style.transform  = "rotate(0deg)";
      setTimeout(() => Object.assign(el.style, origStyle), 700);
    });

    physicsRef.current        = [];
    document.body.style.overflow = "";
    setTimeout(() => {
      brokenRef.current = false;
      setBroken(false);
    }, 750);
  };

  return (
    <Fragment>
      <Component {...pageProps} />

      <div className="scroll-btns visible">
        <button
          className="scroll-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
        >
          <span className="scroll-btn-arrow">
            <svg viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15" /></svg>
          </span>
        </button>
        <button
          className="scroll-btn"
          onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })}
          aria-label="Scroll to bottom"
        >
          <span className="scroll-btn-arrow">
            <svg viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg>
          </span>
        </button>
      </div>

      {broken && (
        <>
          <div className="crack-flash" />
          <button className="fix-btn m-btn m-btn-theme" onClick={fixSite}>
            <SlideChars text="FIX IT!" stagger={28} />
          </button>
        </>
      )}
    </Fragment>
  );
}
