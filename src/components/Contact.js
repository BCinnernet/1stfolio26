import { useState } from "react";
import BlueskyIcon from "@/src/components/BlueskyIcon";
import siteConfig from "@/src/data/siteConfig";

const { email, location, social } = siteConfig;
const { instagram, bluesky } = social;

const GLOSS_DEFAULT = "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.00) 60%)";
const GLOSS_HOVER   = "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.00) 60%)";

const Contact = () => {
  const [cardStyle, setCardStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  });

  const [glossStyle, setGlossStyle] = useState({
    background: GLOSS_DEFAULT,
    transform: "translateX(0px) translateY(0px)",
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2)  / (rect.width / 2))  * 6;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 6;
    const glossX  = ((x - rect.width / 2)  / (rect.width / 2))  * 8;
    const glossY  = ((y - rect.height / 2) / (rect.height / 2)) * 8;

    setCardStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)` });
    setGlossStyle({ background: GLOSS_HOVER, transform: `translateX(${glossX}px) translateY(${glossY}px)` });
  };

  const handleMouseLeave = () => {
    setCardStyle({ transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" });
    setGlossStyle({ background: GLOSS_DEFAULT, transform: "translateX(0px) translateY(0px)" });
  };

  return (
    <section id="contact" className="section gray-bg" style={{ paddingTop: "40px" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="contact-card"
              style={cardStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="contact-card-gloss" style={glossStyle} />

              <div className="contact-card-inner">

                <div className="contact-card-left">
                  <p className="contact-card-label">How can I help?</p>
                  <h3 className="contact-card-title">Reach out, lets connect.</h3>
                  <p className="contact-card-text">Business Hours: Open 24/7 | 7 days a week.</p>
                </div>

                <div className="contact-card-right">
                  <a href={`mailto:${email}`} className="contact-card-email">{email}</a>

                  <div className="contact-card-socials">
                    <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
                      <i className="fab fa-instagram" />
                      <span>{instagram.label}</span>
                    </a>
                    <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
                      <BlueskyIcon />
                      <span>{bluesky.label}</span>
                    </a>
                  </div>

                  <p className="contact-card-location">{location}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
