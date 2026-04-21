const SlideChars = ({ text, stagger = 30 }) => (
  <span className="slide-wrap">
    {[...text].map((char, i) => (
      <span
        key={i}
        className="slide-char"
        style={{ "--delay": `${i * stagger}ms` }}
      >
        <span className="slide-char-a">{char === " " ? "\u00A0" : char}</span>
        <span className="slide-char-b" aria-hidden="true">
          {char === " " ? "\u00A0" : char}
        </span>
      </span>
    ))}
  </span>
);

export default SlideChars;
