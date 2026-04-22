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
          <span>EJUAN HENDERSON — MULTIMEDIA ARTIST — <button className="marquee-break-btn" onClick={() => window.dispatchEvent(new Event("breaksite"))}>YOUR CHEAT CODE: ↑↑↓↓←→←→BA</button> — KANSAS CITY, MISSOURI — A CREATIVE SWISS ARMY KNIFE — EXPERIMENTATION AND DISCOVERY — I JUST WANT TO MAKE COOL STUFF — A RESOURCEFUL RESOURCE — </span>
          <span>EJUAN HENDERSON — MULTIMEDIA ARTIST — <button className="marquee-break-btn" onClick={() => window.dispatchEvent(new Event("breaksite"))}>YOUR CHEAT CODE: ↑↑↓↓←→←→BA</button> — KANSAS CITY, MISSOURI — A CREATIVE SWISS ARMY KNIFE — EXPERIMENTATION AND DISCOVERY — I JUST WANT TO MAKE COOL STUFF — A RESOURCEFUL RESOURCE — </span>
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
              <BlueskyIcon size={20} />
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
