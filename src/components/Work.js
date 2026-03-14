import Isotope from "isotope-layout";
import { useEffect, useRef, useState } from "react";

const Work = () => {
  // Isotope
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState("*");
  useEffect(() => {
    setTimeout(() => {
      isotope.current = new Isotope(".portfolio-content", {
        itemSelector: ".grid-item",
        //    layoutMode: "fitRows",
        percentPosition: true,
        masonry: {
          columnWidth: ".grid-item",
        },
        animationOptions: {
          duration: 750,
          easing: "linear",
          queue: false,
        },
      });
    }, 1000);
    //     return () => isotope.current.destroy();
  }, []);
  return (
    <section
  id="work"
  className="section"
  style={{ paddingTop: "40px", paddingBottom: "80px", scrollMarginTop: "110px" }}
>
      <div className="container">
        <div className="row sm-m-25px-b m-35px-b">
          <div className="col-md-12">
            <div className="section-title">
              <h3 className="dark-color text-uppercase">wORK & PROJECTS</h3>
              <p className="text-uppercase small">
                Archive of Work, projects, collaborations and discoveries.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="portfolio-content lightbox-gallery">
         <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>AFUEGO51</h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Food Truck design</span>
            </div>
          </div>
          {/* grid item */}
          <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>MF DOOM - Art Print</h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Illustration</span>
            </div>
          </div>
          {/* grid item */}
          <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>CUTIE - LYRIC MUSIC VIDEO</h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Animation</span>
            </div>
          </div>
          {/* grid item */}
          <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>K.H.A.S.H Foundation</h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Design</span>
            </div>
          </div>
          {/* grid item */}
          <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>LEVEE x SWAPTOBER </h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Animation/Design
    </span>
            </div>
          </div>
          {/* grid item */}
          <div className="grid-item product branding">
  <div className="portfolio-box-01">
    <div className="portfolio-img">
      <img src="static/img/portfolio-6.jpg" alt="image" />
    </div>
    <div className="portfolio-info">
      <h5></h5>
      <span></span>
    </div>
    <a className="link-overlay" href="#" />
  </div>

  <div style={{ paddingTop: "12px", paddingBottom: "5px" }}>
    <h5 style={{ marginBottom: "4px" }}>BAR-K Event backdrop</h5>
    <span style={{ fontSize: "13px", opacity: 0.8 }}>Illustration</span>
            </div>
          </div>
          {/* grid item */}
          
        </div>
        {/* portfolio-content */}
      </div>
    </section>
  );
};
export default Work;
