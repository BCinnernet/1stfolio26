import { useState, useRef } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*?";

const ScrambleText = ({ tag: Tag = "p", text, children, className, style }) => {
  const [scrambled, setScrambled] = useState(null);
  const frameRef = useRef(null);
  const iterRef = useRef(0);

  const start = () => {
    cancelAnimationFrame(frameRef.current);
    iterRef.current = 0;
    const chars = [...text];

    const tick = () => {
      iterRef.current += 0.5;
      const display = chars
        .map((ch, i) => {
          if (ch === " ") return " ";
          if (i < iterRef.current) return chars[i];
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");
      setScrambled(display);
      if (iterRef.current < chars.length) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setScrambled(null);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  };

  const stop = () => {
    cancelAnimationFrame(frameRef.current);
    setScrambled(null);
  };

  return (
    <Tag
      className={className}
      style={style}
      onMouseEnter={start}
      onMouseLeave={stop}
      onTouchStart={start}
    >
      {scrambled !== null ? scrambled : children}
    </Tag>
  );
};

export default ScrambleText;
