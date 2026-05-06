import { useRef, useCallback, useEffect, useState } from "react";
import Lottie from "lottie-react";

const LottieHero = () => {
  const lottieRef   = useRef(null);
  const containerRef = useRef(null);
  const [animData, setAnimData] = useState(null);

  useEffect(() => {
    fetch("/static/lottie/hero.json")
      .then((r) => r.json())
      .then(setAnimData)
      .catch(() => {});
  }, []);

  const totalFrames = animData ? animData.op - animData.ip : 90;

  const scrub = useCallback(
    (xRatio) => {
      if (!lottieRef.current) return;
      const frame = Math.max(0, Math.min(Math.floor(xRatio * totalFrames), totalFrames - 1));
      lottieRef.current.goToAndStop(frame, true);
    },
    [totalFrames]
  );

  const handleMouseEnter = useCallback(() => {
    lottieRef.current?.pause();
  }, []);

  const handleMouseLeave = useCallback(() => {
    lottieRef.current?.play();
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      scrub((e.clientX - rect.left) / rect.width);
    },
    [scrub]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      scrub((e.touches[0].clientX - rect.left) / rect.width);
    },
    [scrub]
  );

  if (!animData) return null;

  return (
    <div
      ref={containerRef}
      style={{ position: "absolute", inset: 0, cursor: "crosshair" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animData}
        loop
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
};

export default LottieHero;
