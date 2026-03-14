import About from "@/src/components/About";
import Contact from "@/src/components/Contact";
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
  className="home-banner-01 video-hero"
  style={{ paddingTop: "100px", paddingBottom: "80px" }}
>
  <video className="hero-video" autoPlay loop muted playsInline>
  <source src="/static/video/hero-video.mp4" type="video/mp4" />
</video>
<div className="hero-video-overlay"></div>
        <div className="container">
          <div className="row align-items-center p-50px-tb">
            <div className="col-12">
              <div className="ht-text">
                <h2>
                  I love <TypingAnimation />
                </h2>
                <p>
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

      {/* <About /> */}


      {/* Contact */}
      <Contact />
    </Layout>
  );
};

export default Index3;