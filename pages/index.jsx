import Layout from "@/src/layouts/Layout";
import TypingAnimation from "@/src/components/TypingAnimation";
import dynamic from "next/dynamic";

const Work = dynamic(() => import("@/src/components/Work"), {
  ssr: false,
});

const Index3 = () => {
  return (
    <Layout headerColor={"dark"}>
      {/* Home Banner */}
      <section
  id="home"
  className="home-banner-01 video-hero slant-bottom"
  style={{ paddingTop: "100px", paddingBottom: "120px" }}
>
        <video className="hero-video" autoPlay loop muted playsInline>
          <source src="/static/video/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay"></div>

        <div className="container">
          <div className="row align-items-center p-50px-tb">
            <div className="col-12">
              <div className="ht-text">
  <h2 className="reveal-up">
    I love <TypingAnimation />
  </h2>
  <p className="reveal-up delay-1">
    I'm a multimedia artist exploring music, culture, community,
    and visual storytelling through illustration, motion design,
    and experimental work.
  </p>
</div>
            </div>
          </div>
        </div>
      </section>

      {/* Work */}
      <Work />

      {/* About Teaser */}
      <section
  className="section gray-bg slant-top"
  style={{ paddingTop: "80px", paddingBottom: "80px" }}
>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 m-15px-tb">
              <div className="about-me-img box-shadow">
                <img src="static/img/about-us.jpg" alt="About preview" />
              </div>
            </div>

            <div className="col-lg-7 m-15px-tb">
              <div className="about-me">
                <h4>About Me</h4>
                <h6>
                  Multimedia artist exploring music, culture, and visual storytelling.
                </h6>
                <p>
                  Get a deeper look at who I am, what I make, and how I think
                  about creative work. You can also find my contact info there.
                </p>

                <div className="btn-bar">
                  <a className="m-btn m-btn-theme" href="/about">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index3;