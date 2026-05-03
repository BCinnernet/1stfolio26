import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const LETTERS         = ["E", "J", "U", "A", "N", ".", "S", "T", "U", "D", "I", "O"];
const BASE_ROTATE     = [-12, 10, -8, 10, 8, 0, 0, 0, 0, 0, 12, -10];
const REPEL_RADIUS    = 160;
const REPEL_FORCE     = 22;
const SPRING          = 0.065;
const DAMPING         = 0.74;
const VELOCITY_SCALE  = 0.04;  // cursor speed → extra force multiplier
const FLASH_THRESHOLD = 14;    // letter speed that triggers color flash
const FLASH_FRAMES    = 28;    // frames before flash fades out

export default function ScatterHello({ inHeader = false }) {
  const letterRefs    = useRef([]);
  const stateRef      = useRef(LETTERS.map(() => ({ dx: 0, dy: 0, vx: 0, vy: 0, dRotation: 0, angularVel: 0, flashTimer: 0 })));
  const rafRef        = useRef(null);
  const cursorRef     = useRef({ x: -9999, y: -9999 });
  const prevCursorRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    // Intro: letters rise up from below and bounce into place
    stateRef.current.forEach((s) => {
      s.dx        = (Math.random() - 0.5) * 20;
      s.dy        = 70 + Math.random() * 40;
      s.dRotation = (Math.random() - 0.5) * 24;
      s.vy        = -4 - Math.random() * 2;
    });

    const tick = () => {
      const mx = cursorRef.current.x;
      const my = cursorRef.current.y;

      // Cursor velocity → scale repel force
      const cvx        = mx - prevCursorRef.current.x;
      const cvy        = my - prevCursorRef.current.y;
      const cursorSpeed = Math.sqrt(cvx * cvx + cvy * cvy);
      prevCursorRef.current = { x: mx, y: my };
      const speedMult  = 1 + Math.min(cursorSpeed * VELOCITY_SCALE, 3.5);

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
          const f   = ((REPEL_RADIUS - dist) / REPEL_RADIUS) * REPEL_FORCE * speedMult;
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

        // Color flash: trigger when letter gets hit hard enough
        const letterSpeed = Math.sqrt(s.vx * s.vx + s.vy * s.vy);
        if (letterSpeed > FLASH_THRESHOLD) s.flashTimer = FLASH_FRAMES;
        if (s.flashTimer > 0) {
          s.flashTimer--;
          el.classList.add("flashing");
        } else {
          el.classList.remove("flashing");
        }

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
    <Link
      href="/"
      id="home"
      className={sectionClass}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", cursor: "pointer" }}
    >
      <div className="scatter-hello-row">
        {LETTERS.map((char, i) => (
          <span
            key={i}
            ref={(el) => (letterRefs.current[i] = el)}
            className={`scatter-hello-letter${i >= 5 ? " scatter-hello-letter--outline" : ""}`}
            style={{
              ...(i < 5  && { fontFamily: "'Climate Crisis', sans-serif" }),
              ...(i === 1  && { marginLeft: "0.12em" }),
              ...(i === 5  && { marginLeft: "0.18em" }),
              ...(i === 6  && { fontSize: "clamp(38px, 8.5vw, 118px)" }),
              ...(i === 7  && { marginLeft: "-0.12em" }),
              ...(i === 10 && { marginLeft: "0.08em" }),
              ...(i === 11 && { marginLeft: "0.1em" }),
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </Link>
  );
}
