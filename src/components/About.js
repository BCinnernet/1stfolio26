import { useCallback, useRef } from "react";
import PixelatedImage from "@/src/components/PixelatedImage";
import useSectionReveal from "@/src/hooks/useSectionReveal";

const About = () => {
  const ref = useSectionReveal(0.08);
  const titleRef = useRef(null);

  const handleTitleTouch = useCallback(() => {
    const el = titleRef.current;
    if (!el) return;
    el.classList.add("tapped");
    setTimeout(() => el.classList.remove("tapped"), 620);
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="section gray-bg"
      style={{ paddingTop: "20px", paddingBottom: "10px" }}
    >
      <div className="container">

        <div className="row">
          <div className="col-lg-5 offset-lg-1">
            <h2
              ref={titleRef}
              className="about-page-title sr"
              style={{ "--sr-delay": "0ms" }}
              onTouchStart={handleTitleTouch}
            >
              {"About".split("").map((char, i) => (
                <span
                  key={i}
                  className="about-title-char"
                  style={{ "--char-delay": `${i * 28}ms` }}
                >
                  {char === " " ? " " : char}
                </span>
              ))}
            </h2>
          </div>
        </div>

        <div className="row align-items-center">

          <div className="col-lg-5 offset-lg-1 about-text-col sr" style={{ "--sr-delay": "100ms" }}>
            <div className="about-me">
              <p>
                I'm Ejuan Henderson, EJ works too. I'm a multimedia artist working across illustration, design, and motion. I follow ideas into whatever form they need, blending instinct with technical skill.
              </p>
              <p>
                I'm naturally curious, and that shapes how I work. I stay intentional about where tech and creativity intersect. The only way to know what's possible is to play, experiment, and explore. Keeping that inner childlike curiosity matters to me.
              </p>
              <p>
                Outside of that, I have a background in marketing, social media, and communication. I know how that world works. I can speak <em>that</em> language too.
              </p>
            </div>
          </div>

          <div className="col-lg-4 offset-lg-1 about-photo-col sr" style={{ "--sr-delay": "220ms" }}>
            <PixelatedImage
              src="/static/img/about-photo.jpg"
              alt="Ejuan Henderson"
              pixelSize={12}
            />
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
