const SlideChars = ({ text, stagger = 30, by = "char" }) => {
  const units =
    by === "word"
      ? text.split(" ").flatMap((word, i, arr) =>
          i < arr.length - 1 ? [word, " "] : [word]
        )
      : [...text];

  return (
    <span className="slide-wrap">
      {units.map((unit, i) =>
        unit === " " ? (
          <span key={i} style={{ display: "inline-block", width: "0.35em" }} />
        ) : (
          <span
            key={i}
            className="slide-char"
            style={{ "--delay": `${i * stagger}ms` }}
          >
            <span className="slide-char-a">{unit}</span>
            <span className="slide-char-b" aria-hidden="true">{unit}</span>
          </span>
        )
      )}
    </span>
  );
};

export default SlideChars;
