import { useRef, useCallback } from "react";

const WaveText = ({ segments, className, style }) => {
  const spanRefs  = useRef([]);
  const rafRef    = useRef(null);
  const t0Ref     = useRef(null);

  // Build word-grouped tokens so words never break across lines
  let globalIdx = 0;
  const tokens = segments.flatMap(({ text, italic }) =>
    text.split(/( )/).map((token) => ({ token, italic }))
  );

  const animate = useCallback((time) => {
    if (!t0Ref.current) t0Ref.current = time;
    const elapsed = (time - t0Ref.current) / 1000;
    spanRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transform = `translateY(${Math.sin(elapsed * 3.5 + i * 0.35) * 5}px)`;
    });
    rafRef.current = requestAnimationFrame(animate);
  }, []);

  const start = useCallback(() => {
    t0Ref.current = null;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);
  }, [animate]);

  const stop = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    spanRefs.current.forEach((el) => {
      if (!el) return;
      el.style.transition = "transform 0.5s cubic-bezier(0.165,0.84,0.44,1)";
      el.style.transform  = "";
      setTimeout(() => { if (el) el.style.transition = ""; }, 500);
    });
  }, []);

  spanRefs.current = [];

  return (
    <p
      className={className}
      style={style}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={start}
      onTouchEnd={stop}
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
                  style={{ display: "inline-block", fontStyle: italic ? "italic" : "normal" }}
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

export default WaveText;
