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
  style={{ paddingTop: "80px", paddingBottom: "50px" }}
>
  <div className="container">
    <div className="row align-items-center">
      <div className="col-lg-5 m-15px-tb">
        <div className="about-me-img">
          <img
            className="about-gif"
            src="/static/img/Body_scan_01_Test.gif"
            alt="Ejuan animated body scan"
          />
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
    (Most call me E.J)
  </span>
</h4>
                <h6>
                  
                </h6>
                <p>
                 "Illustration, design and motion design is where I thrive, but honestly, whatever I can put my hands on, I'll make something out of it! I coded this website just to understand the process for the love of the game."
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