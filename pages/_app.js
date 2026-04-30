import "@/styles/globals.css";
import { Fragment, useEffect, useState, useRef } from "react";
import SlideChars from "@/src/components/SlideChars";

const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
const GRAVITY    = 0.5;
const BOUNCE     = 0.18;
const FLOOR_FRIC = 0.78;

export default function App({ Component, pageProps }) {
  const [broken, setBroken] = useState(false);

  const konamiProgress = useRef([]);
  const brokenRef      = useRef(false);
  const physicsRef     = useRef([]);
  const physicsRafRef  = useRef(null);
  const activeDragRef  = useRef(null);
  const dragAbortRef   = useRef(null);

  // Remove any pills left over from a hot-reload during dev
  useEffect(() => {
    document.querySelectorAll(".easter-pill").forEach((el) => el.remove());
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

      // ── Spawn falling service pills ──────────────────────────────────────
      const PILLS = [
        { label: "🎨  Illustration",     bg: "#c5d400", color: "#2b2b2b" },
        { label: "🎬  Motion Design",    bg: "#ff6b4a", color: "#ffffff" },
        { label: "🖨️  Print Design",     bg: "#4da6ff", color: "#ffffff" },
        { label: "📱  Social Media",     bg: "#ffd600", color: "#2b2b2b" },
        { label: "✂️  Textile Art",      bg: "#b86bff", color: "#ffffff" },
        { label: "🏙️  Brand Identity",   bg: "#ff4da6", color: "#ffffff" },
        { label: "🖼️  Poster Design",    bg: "#00d4c5", color: "#2b2b2b" },
        { label: "💼  Corporate Design", bg: "#f0edd6", color: "#2b2b2b" },
      ];

      PILLS.forEach(({ label, bg, color }, i) => {
        const pill = document.createElement("div");
        pill.className = "easter-pill";
        pill.textContent = label;
        Object.assign(pill.style, {
          position:        "fixed",
          top:             "-160px",
          left:            "0px",
          zIndex:          (19000 + i).toString(),
          background:      bg,
          color:           color,
          fontFamily:      "inherit",
          fontSize:        "26px",
          fontWeight:      "900",
          padding:         "20px 44px",
          borderRadius:    "999px",
          whiteSpace:      "nowrap",
          cursor:          "grab",
          userSelect:      "none",
          boxShadow:       "0 8px 28px rgba(0,0,0,0.45)",
          transformOrigin: "center center",
          pointerEvents:   "auto",
          letterSpacing:   "0.02em",
          transition:      "none",
        });
        document.body.appendChild(pill);

        // Measure the real rendered size before setting physics state
        const pr      = pill.getBoundingClientRect();
        const pw      = pr.width  || 220;
        const ph      = pr.height || 56;
        const startX  = Math.random() * Math.max(window.innerWidth - pw, 0);
        pill.style.left = startX + "px";

        const pillState = {
          el:         pill,
          origStyle:  null,
          origX:      startX,
          origY:      -160 - i * 100,
          x:          startX,
          y:          -160 - i * 100,
          vx:         (Math.random() - 0.5) * 5,
          vy:         Math.random() * 2,
          rotation:   (Math.random() - 0.5) * 30,
          angularVel: (Math.random() - 0.5) * 8,
          width:      pw,
          height:     ph,
          hardBound:  true,
          scaleX:     1,
          scaleY:     1,
          scaleVX:    0,
          scaleVY:    0,
          dragging:   false,
          dragOffX:   0,
          dragOffY:   0,
          prevX:      0,
          prevY:      0,
        };

        physicsRef.current.push(pillState);

        pill.addEventListener("mousedown", (e) => {
          e.preventDefault();
          activeDragRef.current  = pillState;
          pillState.dragging     = true;
          pillState.dragOffX     = e.clientX - pillState.x;
          pillState.dragOffY     = e.clientY - pillState.y;
          pillState.prevX        = e.clientX;
          pillState.prevY        = e.clientY;
          pillState.vx           = 0;
          pillState.vy           = 0;
          pill.style.zIndex      = "20000";
          pill.style.cursor      = "grabbing";
        }, { signal });

        pill.addEventListener("touchstart", (e) => {
          const t                = e.touches[0];
          activeDragRef.current  = pillState;
          pillState.dragging     = true;
          pillState.dragOffX     = t.clientX - pillState.x;
          pillState.dragOffY     = t.clientY - pillState.y;
          pillState.prevX        = t.clientX;
          pillState.prevY        = t.clientY;
          pillState.vx           = 0;
          pillState.vy           = 0;
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

          // Squash/stretch spring (pills only)
          if (s.scaleX !== undefined) {
            s.scaleVX += (1 - s.scaleX) * 0.22;
            s.scaleVY += (1 - s.scaleY) * 0.22;
            s.scaleVX *= 0.72;
            s.scaleVY *= 0.72;
            s.scaleX  += s.scaleVX;
            s.scaleY  += s.scaleVY;
          }

          // Walls — pills stay fully on screen; sections get a soft off-screen margin
          const margin = s.hardBound ? 0 : Math.min(s.width * 0.5, 120);
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

          // Floor — pills land 50px above viewport edge so they're never obscured
          const floor = s.hardBound ? wh - s.height - 80 : wh - s.height - 16;
          if (s.y >= floor) {
            s.y  = floor;
            const impact = Math.abs(s.vy);
            s.vy         *= -BOUNCE;
            s.vx         *= FLOOR_FRIC;
            s.angularVel *= FLOOR_FRIC;
            if (Math.abs(s.vy) < 0.4) s.vy = 0;
            // Squash on impact — bigger hit = more squash
            if (s.scaleX !== undefined && impact > 1.5) {
              const squash  = Math.min(impact * 0.045, 0.45);
              s.scaleX      = 1 + squash * 1.1;
              s.scaleY      = 1 - squash;
              s.scaleVX     = 0;
              s.scaleVY     = 0;
            }
          }

          s.el.style.left = s.x + "px";
          s.el.style.top  = s.y + "px";
          s.el.style.transform = s.scaleX !== undefined
            ? `rotate(${s.rotation}deg) scaleX(${s.scaleX.toFixed(3)}) scaleY(${s.scaleY.toFixed(3)})`
            : `rotate(${s.rotation}deg)`;
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
      if (el.classList.contains("easter-pill")) {
        el.remove();
        return;
      }
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
