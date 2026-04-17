const Footer = () => {
  return (
    <footer className="footer" style={{ overflow: "hidden" }}>
      
      {/* Scrolling Text */}
<div className="footer-marquee">
  <div className="marquee-track">
    <span>
      — EJUAN HENDERSON — MULTIMEDIA ARTIST — CREATING IN THE MIDDLE OF THE MAP — KANSAS CITY, MISSOURI — A CREATIVE SWISS ARMY KNIFE — EJUAN HENDERSON — MULTIMEDIA ARTIST — CREATING IN THE MIDDLE OF THE MAP — KANSAS CITY, MISSOURI — A RESOURCEFUL RESOURCE  
    </span>
    <span>
      — EJUAN HENDERSON — MULTIMEDIA ARTIST — CREATING IN THE MIDDLE OF THE MAP — KANSAS CITY, MISSOURI — EXPERIMENTATION AND DISCOVERY — EJUAN HENDERSON— MULTIMEDIA ARTIST — CREATING IN THE MIDDLE OF THE MAP — KANSAS CITY, MISSOURI — I JUST WANT TO MAKE COOL STUFF!
    </span>
  </div>
</div>

      <div className="container" style={{ paddingTop: "30px", paddingBottom: "20px" }}>
        <div className="row align-items-center">
          
          {/* Social Links */}
          <div className="footer-socials">
            <a href="https://www.instagram.com/ohhej" target="_blank" rel="noreferrer" aria-label="Instagram">
              <i className="fab fa-instagram" />
              <span>Instagram</span>
            </a>
            <a href="https://bsky.app/profile/becausetheinnernet.com" target="_blank" rel="noreferrer" aria-label="Bluesky">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 530" width="20" height="20" fill="currentColor">
                <path d="M300 266c0 0-92-178-208-178-62 0-92 51-92 104 0 112 162 156 162 156s-55 40-55 88c0 51 46 94 104 94 58 0 89-40 89-40s31 40 89 40c58 0 104-43 104-94 0-48-55-88-55-88s162-44 162-156c0-53-30-104-92-104-116 0-208 178-208 178z" />
              </svg>
              <span>Bluesky</span>
            </a>
          </div>

          {/* Copyright */}
          <div className="col-md-6 m-10px-tb text-center text-md-right">
            <p>© {new Date().getFullYear()} EJUAN HENDERSON. All rights reserved.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;