import { useRef, useCallback } from "react";

const RADIUS = 130;

const ProximityText = ({ segments, className, style }) => {
  const spanRefs = useRef([]);
  const rafRef   = useRef(null);

  let globalIdx = 0;
  const tokens = segments.flatMap(({ text, italic }) =>
    text.split(/( )/).map((token) => ({ token, italic }))
  );

  const applyProximity = useCallback((cx, cy) => {
    spanRefs.current.forEach((el) => {
      if (!el) return;
      const r    = el.getBoundingClientRect();
      const ex   = r.left + r.width  / 2;
      const ey   = r.top  + r.height / 2;
      const dist = Math.hypot(cx - ex, cy - ey);
      if (dist < RADIUS) {
        const t = 1 - dist / RADIUS;
        const scale = 1 + t * 0.55;
        const lift  = t * 10;
        el.style.transform = `scale(${scale}) translateY(${-lift}px)`;
        el.style.fontWeight = Math.round(400 + t * 500).toString();
      } else {
        el.style.transform  = "";
        el.style.fontWeight = "";
      }
    });
  }, []);

  const onMove = useCallback((cx, cy) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => applyProximity(cx, cy));
  }, [applyProximity]);

  const onReset = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    spanRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transform  = "";
      el.style.fontWeight = "";
    });
  }, []);

  spanRefs.current = [];

  return (
    <p
      className={className}
      style={style}
      onMouseMove={(e) => onMove(e.clientX, e.clientY)}
      onMouseLeave={onReset}
      onTouchMove={(e) => onMove(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchEnd={onReset}
    >
      {tokens.map(({ token, italic }, wi) => {
        if (token === " ") {
          return <span key={wi} style={{ display: "inline-block", width: "0.28em" }} />;
        }
        return (
          <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {[...token].map((ch) => {
              const idx = globalIdx++;
              return (
                <span
                  key={idx}
                  ref={(el) => { spanRefs.current[idx] = el; }}
                  style={{
                    display: "inline-block",
                    fontStyle: italic ? "italic" : "normal",
                    transition: "transform 0.25s ease-out, font-weight 0.25s ease-out",
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
};

export default ProximityText;
