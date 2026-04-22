import { useRef, useEffect, useCallback } from "react";

const THRESHOLD = 65;
const MAX_FORCE  = 24;

const RepelText = ({ segments, className, style }) => {
  const containerRef = useRef(null);
  const spanRefs     = useRef([]);
  const posCache     = useRef([]);
  const rafRef       = useRef(null);

  const chars = segments.flatMap(({ text, italic }) =>
    [...text].map((ch) => ({ ch, italic }))
  );

  const cachePositions = useCallback(() => {
    posCache.current = spanRefs.current.map((el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(cachePositions);
    window.addEventListener("resize", cachePositions);
    window.addEventListener("scroll", cachePositions, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", cachePositions);
      window.removeEventListener("scroll", cachePositions);
    };
  }, [cachePositions]);

  const applyRepel = useCallback((cx, cy) => {
    spanRefs.current.forEach((el, i) => {
      if (!el || !posCache.current[i]) return;
      const { x, y } = posCache.current[i];
      const dx   = cx - x;
      const dy   = cy - y;
      const dist = Math.hypot(dx, dy);
      if (dist < THRESHOLD && dist > 0) {
        const force = (1 - dist / THRESHOLD) * MAX_FORCE;
        el.style.transform = `translate(${-(dx / dist) * force}px, ${-(dy / dist) * force}px)`;
      } else {
        el.style.transform = "";
      }
    });
  }, []);

  const onMove = useCallback((cx, cy) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyRepel(cx, cy));
  }, [applyRepel]);

  const onReset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    spanRefs.current.forEach((el) => { if (el) el.style.transform = ""; });
  }, []);

  spanRefs.current = [];

  return (
    <p
      ref={containerRef}
      className={className}
      style={style}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseLeave={onReset}
      onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={onReset}
    >
      {chars.map(({ ch, italic }, i) =>
        ch === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.28em" }} />
        ) : (
          <span
            key={i}
            ref={(el) => { spanRefs.current[i] = el; }}
            style={{
              display: "inline-block",
              fontStyle: italic ? "italic" : "normal",
              transition: "transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)",
            }}
          >
            {ch}
          </span>
        )
      )}
    </p>
  );
};

export default RepelText;
