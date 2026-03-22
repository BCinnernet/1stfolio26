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
  {false && (
  <h2 className="reveal-up">
    I'm <TypingAnimation />
  </h2>
)}
<h1
  className="hero-heading"
  style={{
    fontSize: "16px",
    color: "#ffffff",
    textAlign: "left",
    lineHeight: "1.6",
    maxWidth: "500px",
    letterSpacing: "0px",
    fontWeight: "400",
    margin: 0
  }}
>
  <span className="hero-line delay-1">
    <span>I like pushing things forward.</span>
  </span><br />
  <span className="hero-line delay-2">
    <span>Building ideas and bringing them to life.</span>
  </span><br />
  <span className="hero-line delay-3">
    <span>That’s my whole thing.</span>
  </span>
</h1>
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
 <h4>
  <span style={{ color: "#141413" }}>I'm</span>{" "}
  <span style={{ color: "#141413",fontWeight: "800" }}>EJUAN</span>{" "}
  <span style={{ fontSize: "20px", fontStyle: "italic", color: "#83867d" }}>
    (ē·wän)
  </span>{" "}
  <span style={{ fontSize: "15px", fontStyle: "italic", color: "#83867d" }}>
    (E.J works too)
  </span>
</h4>
                <h6>
                  A Multimedia artist and creative from the Midwest! 
                </h6>
                <p>
                 A Swiss Army knife when it comes to creative work. Bouncing between different mediums to bring ideas into something tangible.
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