import { useEffect, useRef, useCallback } from "react";

const LETTERS      = ["E", "J", "U", "A", "N", ".", "S", "T", "U", "D", "I", "O"];
const BASE_ROTATE  = [-12, 10, -8, 10, 8, 0, 0, 0, 0, 0, 12, -10];
const REPEL_RADIUS = 160;
const REPEL_FORCE  = 22;
const SPRING       = 0.065;
const DAMPING      = 0.74;

export default function ScatterHello({ inHeader = false }) {
  const letterRefs = useRef([]);
  const stateRef   = useRef(LETTERS.map(() => ({ dx: 0, dy: 0, vx: 0, vy: 0, dRotation: 0, angularVel: 0 })));
  const rafRef     = useRef(null);
  const cursorRef  = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const tick = () => {
      const mx = cursorRef.current.x;
      const my = cursorRef.current.y;

      stateRef.current.forEach((s, i) => {
        const el = letterRefs.current[i];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const lx   = rect.left + rect.width  / 2;
        const ly   = rect.top  + rect.height / 2;

        const ddx  = lx - mx;
        const ddy  = ly - my;
        const dist = Math.sqrt(ddx * ddx + ddy * ddy);

        if (dist < REPEL_RADIUS && dist > 0) {
          const f = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE;
          s.vx         += (ddx / dist) * f;
          s.vy         += (ddy / dist) * f;
          s.angularVel += (ddx / dist) * f * 0.14;
        }

        s.vx         += -s.dx        * SPRING;
        s.vy         += -s.dy        * SPRING;
        s.angularVel += -s.dRotation * SPRING * 0.7;
        s.vx         *= DAMPING;
        s.vy         *= DAMPING;
        s.angularVel *= DAMPING;
        s.dx         += s.vx;
        s.dy         += s.vy;
        s.dRotation  += s.angularVel;

        const totalRotation = (BASE_ROTATE[i] || 0) + s.dRotation;
        el.style.transform = `translate(${s.dx.toFixed(2)}px, ${s.dy.toFixed(2)}px) rotate(${totalRotation.toFixed(2)}deg)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMouseMove  = useCallback((e) => { cursorRef.current = { x: e.clientX, y: e.clientY }; }, []);
  const onMouseLeave = useCallback(()  => { cursorRef.current = { x: -9999, y: -9999 }; }, []);

  const onTouchStart = useCallback((e) => {
    const t = e.touches[0];
    cursorRef.current = { x: t.clientX, y: t.clientY };
    stateRef.current.forEach((s) => {
      s.vx         += (Math.random() - 0.5) * 30;
      s.vy         += (Math.random() - 0.5) * 30;
      s.angularVel += (Math.random() - 0.5) * 12;
    });
  }, []);

  const onTouchMove = useCallback((e) => {
    const t = e.touches[0];
    cursorRef.current = { x: t.clientX, y: t.clientY };
  }, []);

  const onTouchEnd = useCallback(() => {
    cursorRef.current = { x: -9999, y: -9999 };
  }, []);

  const sectionClass = inHeader
    ? "scatter-hello-section scatter-hello-section--header"
    : "scatter-hello-section slant-bottom";

  return (
    <div
      id="home"
      className={sectionClass}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="scatter-hello-row">
        {LETTERS.map((char, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            className={`scatter-hello-letter${i >= 5 ? " scatter-hello-letter--outline" : ""}`}
            style={
              i === 5  ? { marginLeft: "0.18em" } :
              i === 6  ? { fontSize: "clamp(38px, 8.5vw, 118px)" } :
              i === 7  ? { marginLeft: "-0.12em" } :
              i === 10 ? { marginLeft: "0.08em" } :
              i === 11 ? { marginLeft: "0.1em" } :
              undefined
            }
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
