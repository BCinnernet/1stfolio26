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
          <div className="col-md-6 m-12px-tb">
            <div className="nav justify-content-center justify-content-md-start">

              <a href="https://instagram.com/ohhej" target="_blank" rel="noreferrer">
                <i className="fab fa-instagram" />
              </a>

              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                <i className="fab fa-twitter" />
              </a>

              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <i className="fab fa-linkedin-in" />
              </a>

            </div>
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