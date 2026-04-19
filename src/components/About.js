import PixelatedImage from "@/src/components/PixelatedImage";

const About = () => {
  return (
    <section
      id="about"
      className="section gray-bg"
      style={{ paddingTop: "180px", paddingBottom: "10px" }}
    >
      <div className="container">

        {/* Page title — offset matches the body copy column */}
        <div className="row">
          <div className="col-lg-5 offset-lg-1">
            <h2 className="about-page-title">About</h2>
          </div>
        </div>

        <div className="row align-items-center">

          {/* Bio text — shown first on mobile, left on desktop */}
          <div className="col-lg-5 offset-lg-1 about-text-col">
            <div className="about-me">
              <p>
                I'm Ejuan, or EJ, a multimedia artist whose work spans illustration, design, and motion
                with a toolkit built to take on a wide range of creative challenges. Known for my eclectic
                versatility, and ability to bring ideas to life through a balance of artistic expression
                and technical skill.
              </p>
              <p>
                Illustration, design and motion design is where I thrive, but truly, whatever I can put
                my hands on, I'll make something out of it!
              </p>
              <p>
                Outside of my craft, I focus on how things work, and how they could work better. With a
                background in marketing, I connect the bigger picture, connect dots, and try to think a
                few steps ahead. I'm a communicator, a collaborator, and a natural problem solver.
              </p>
            </div>
          </div>

          {/* Profile photo — shown second on mobile, right on desktop */}
          {/* To swap your photo: drop about-photo.jpg into /public/static/img/ */}
          <div className="col-lg-4 offset-lg-1 about-photo-col">
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
