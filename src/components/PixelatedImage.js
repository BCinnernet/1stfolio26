"use client";
import { useRef, useEffect } from "react";

const PixelatedImage = ({ src, alt, pixelSize = 20 }) => {
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const animRef = useRef(null);
  const currentSize = useRef(pixelSize);  // tracks where animation currently is
  const targetSize = useRef(pixelSize);   // tracks where animation is heading

  // Draws the image at a given pixel block size (1 = crisp, 20 = very blocky)
  const draw = (ctx, img, size) => {
    const w = ctx.canvas.width;
    const h = ctx.canvas.height;

    if (size <= 1) {
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(img, 0, 0, w, h);
      return;
    }

    // Step 1: draw image tiny onto an offscreen canvas
    const offscreen = document.createElement("canvas");
    offscreen.width  = Math.max(1, Math.ceil(w / size));
    offscreen.height = Math.max(1, Math.ceil(h / size));
    offscreen.getContext("2d").drawImage(img, 0, 0, offscreen.width, offscreen.height);

    // Step 2: stretch it back up without smoothing — creates the blocky look
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(offscreen, 0, 0, offscreen.width, offscreen.height, 0, 0, w, h);
  };

  // Smooth animation loop using easing
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas || !imgRef.current) return;
    const ctx = canvas.getContext("2d");

    const diff = targetSize.current - currentSize.current;
    if (Math.abs(diff) < 0.5) {
      currentSize.current = targetSize.current;
      draw(ctx, imgRef.current, currentSize.current);
      return;
    }

    currentSize.current += diff * 0.15; // eases toward target
    draw(ctx, imgRef.current, Math.round(currentSize.current));
    animRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      canvas.width  = img.naturalWidth;
      canvas.height = img.naturalHeight;
      draw(ctx, img, pixelSize); // start pixelated
    };
    return () => cancelAnimationFrame(animRef.current);
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-label={alt}
      role="img"
      onMouseEnter={() => { targetSize.current = 1;         cancelAnimationFrame(animRef.current); animRef.current = requestAnimationFrame(animate); }}
      onMouseLeave={() => { targetSize.current = pixelSize; cancelAnimationFrame(animRef.current); animRef.current = requestAnimationFrame(animate); }}
      style={{ width: "100%", display: "block", cursor: "pointer" }}
    />
  );
};

export default PixelatedImage;
