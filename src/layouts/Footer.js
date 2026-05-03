import BlueskyIcon from "@/src/components/BlueskyIcon";
import siteConfig from "@/src/data/siteConfig";

const { name, social } = siteConfig;
const { instagram, bluesky } = social;

const Footer = () => {
  return (
    <footer className="footer footer-overflow-hidden">

      {/* Scrolling marquee text */}
      <div className="footer-marquee">
        <div className="marquee-track">
          <span><strong>EJUAN HENDERSON</strong> — <strong>MULTIMEDIA ARTIST</strong> — <button className="marquee-break-btn" onClick={() => window.dispatchEvent(new Event("breaksite"))}>[ DO NOT PRESS THIS BUTTON ]</button> — <strong>KANSAS CITY, MISSOURI</strong> — A CREATIVE SWISS ARMY KNIFE — <strong>ILLUSTRATION</strong> — <strong>POSTER DESIGN</strong> — <strong>CORPORATE DESIGN</strong> — <strong>SOCIAL MEDIA</strong> — <strong>2D MOTION DESIGN</strong> — <strong>TEXTILE ART</strong> — </span>
          <span><strong>EJUAN HENDERSON</strong> — <strong>MULTIMEDIA ARTIST</strong> — <button className="marquee-break-btn" onClick={() => window.dispatchEvent(new Event("breaksite"))}>[ DO NOT PRESS THIS BUTTON ]</button> — <strong>KANSAS CITY, MISSOURI</strong> — A CREATIVE SWISS ARMY KNIFE — <strong>ILLUSTRATION</strong> — <strong>POSTER DESIGN</strong> — <strong>CORPORATE DESIGN</strong> — <strong>SOCIAL MEDIA</strong> — <strong>2D MOTION DESIGN</strong> — <strong>TEXTILE ART</strong> — </span>
        </div>
      </div>

      <div className="container footer-bottom">
        <div className="row align-items-center">

          {/* Social links */}
          <div className="footer-socials">
            <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
              <i className="fab fa-instagram" />
              <span>{instagram.label}</span>
            </a>
            <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
              <BlueskyIcon size={26} />
              <span>{bluesky.label}</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="col-12 m-10px-tb text-center">
            <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;
