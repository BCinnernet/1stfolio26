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
    I'm <TypingAnimation />
  </h2>
  <p className="reveal-up delay-1">
Ideas, visuals and experiences brought to life through curiosity, collaboration, experimentation and a love for the art.  </p>
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
  style={{ paddingTop: "80px", paddingBottom: "50" }}
>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 m-15px-tb">
              <div className="about-me-img">
                <img src="/static/img/Body_scan_01_Test.gif" />
              </div>
            </div>

            <div className="col-lg-7 m-15px-tb">
              <div className="about-me">
                <h4>HELLO!</h4>
                <h6>
                  I'm EJUAN a Multimedia artist and creative from the midwest! 
                </h6>
                <p>
                  I work across design, motion, and creative direction, with a strength in developing ideas, shaping concepts, and bringing them into a finished form that feels cohesive and intentional.
                </p>

                <div className="btn-bar">
                  <a className="m-btn m-btn-theme" href="/about">
                    Check me out!
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