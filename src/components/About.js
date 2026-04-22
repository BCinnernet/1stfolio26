import PixelatedImage from "@/src/components/PixelatedImage";
import useSectionReveal from "@/src/hooks/useSectionReveal";

const About = () => {
  const ref = useSectionReveal(0.08);

  return (
    <section
      ref={ref}
      id="about"
      className="section gray-bg"
      style={{ paddingTop: "180px", paddingBottom: "10px" }}
    >
      <div className="container">

        <div className="row">
          <div className="col-lg-5 offset-lg-1">
            <h2 className="about-page-title sr" style={{ "--sr-delay": "0ms" }}>About</h2>
          </div>
        </div>

        <div className="row align-items-center">

          <div className="col-lg-5 offset-lg-1 about-text-col sr" style={{ "--sr-delay": "100ms" }}>
            <div className="about-me">
              <p>
                I'm Ejuan, EJ works too. A multimedia artist working across illustration, design, motion, and whatever direction an idea wants to go. I couldn't stick to one lane if I tried, so I don't.
              </p>
              <p>
                I'm naturally curious and into a lot of things, which shows up in my work. I like bringing ideas to life in whatever form they need to take, combining creative instinct with actually building and shaping the work as it comes together.
              </p>
              <p>
                I've got a background in marketing and enjoy being part of a team just as much as working independently. I enjoy working and collaborating with people who have a vision and helping push it further.
              </p>
              <p>
                At the end of the day, I'm here to make things that people can connect with.
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
