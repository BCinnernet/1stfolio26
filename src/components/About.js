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
                I'm Ejuan Henderson (EJ is cool too), a multimedia artist working across mostly illustration, design, and motion, but don't get me wrong, I can't stick to one lane if I tried, so I don't. It's a lot of fun bringing ideas to life in whatever form they need to take, combining creative instinct with technicality.
              </p>
              <p>
                I'm naturally curious and into a lot of different things, which ends up shaping how I work. Part of that means staying intentional about keeping up with where tech and creativity intersect — knowing what's possible changes what we can reach for. I believe we are at a point where if we can dream it, we can build it, so we <em>have</em> to play and have fun!
              </p>
              <p>
                Alongside my creative work, I have a background in marketing, social media, and communication work.
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
