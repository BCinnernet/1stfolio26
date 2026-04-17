import { useState } from "react";

const Contact = () => {
  const [cardStyle, setCardStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
  });

  const [glossStyle, setGlossStyle] = useState({
    background:
      "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.00) 60%)",
    transform: "translateX(0px) translateY(0px)",
  });

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 6;
    const rotateX = ((centerY - y) / centerY) * 6;

    const glossX = ((x - centerX) / centerX) * 8;
    const glossY = ((y - centerY) / centerY) * 8;

    setCardStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
    });

    setGlossStyle({
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.00) 60%)",
      transform: `translateX(${glossX}px) translateY(${glossY}px)`,
    });
  };

  const handleMouseLeave = () => {
    setCardStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
    });

    setGlossStyle({
      background:
        "linear-gradient(120deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 35%, rgba(255,255,255,0.00) 60%)",
      transform: "translateX(0px) translateY(0px)",
    });
  };

  return (
    <section id="contact" className="section gray-bg">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div
              className="contact-card"
              style={cardStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="contact-card-gloss" style={glossStyle}></div>

              <div className="contact-card-inner">
                <div className="contact-card-left">
                  <p className="contact-card-label">How can I help?</p>
                  <h3 className="contact-card-title">Reach out, lets connect.</h3>
                  <p className="contact-card-text">
                    Business Hours: Open 24/7 | 7 days a week.
                  </p>
                </div>

                <div className="contact-card-right">
                  <a
                    href="mailto:ejuanhenderson@gmail.com"
                    className="contact-card-email"
                  >
                    ejuanhenderson@gmail.com
                  </a>

                  <div className="contact-card-socials">
                    <a href="https://www.instagram.com/ohhej" target="_blank" rel="noreferrer" aria-label="Instagram">
                      <i className="fab fa-instagram" />
                      <span>Instagram</span>
                    </a>
                    <a href="https://bsky.app/profile/becausetheinnernet.com" target="_blank" rel="noreferrer" aria-label="Bluesky">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 530" fill="currentColor">
                        <path d="M300 266c0 0-92-178-208-178-62 0-92 51-92 104 0 112 162 156 162 156s-55 40-55 88c0 51 46 94 104 94 58 0 89-40 89-40s31 40 89 40c58 0 104-43 104-94 0-48-55-88-55-88s162-44 162-156c0-53-30-104-92-104-116 0-208 178-208 178z" />
                      </svg>
                      <span>Bluesky</span>
                    </a>
                  </div>

                  <p className="contact-card-location">Kansas City, Missouri</p>
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