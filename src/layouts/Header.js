import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import BlueskyIcon from "@/src/components/BlueskyIcon";
import SlideChars from "@/src/components/SlideChars";
import siteConfig from "@/src/data/siteConfig";

const ScatterHello = dynamic(() => import("@/src/components/ScatterHello"), { ssr: false });

const { instagram, bluesky } = siteConfig.social;

const Header = ({ headerColor, isTransparent }) => {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");
  const [menuOpen, setMenuOpen]     = useState(false);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [router.pathname]);

  const handleWorkClick = (e) => {
    if (router.pathname === "/") {
      e.preventDefault();
      document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = (e) => {
    setActiveHash("#contact");
    if (router.pathname === "/about") {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home",    href: "/",              active: router.pathname === "/" },
    { label: "Work",    href: "/?work=open",    active: false, onClick: handleWorkClick },
    { label: "About",   href: "/about",         active: router.pathname === "/about" && activeHash !== "#contact", onClick: () => setActiveHash("") },
    { label: "Contact", href: "/about#contact", active: router.pathname === "/about" && activeHash === "#contact", onClick: handleContactClick },
  ];

  return (
    <header className="site-header">

      {/* ── Top bar: nav links + social icons ── */}
      <div className="site-header-bar">
        <nav className="site-header-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`site-nav-link${link.active ? " active" : ""}`}
              onClick={link.onClick}
            >
              <SlideChars text={link.label} stagger={20} />
            </a>
          ))}
        </nav>

        <div className="site-header-socials">
          <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
            <i className="fab fa-instagram" />
          </a>
          <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
            <BlueskyIcon size={16} />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="site-header-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`ham-line${menuOpen ? " open" : ""}`} />
          <span className={`ham-line${menuOpen ? " open" : ""}`} />
          <span className={`ham-line${menuOpen ? " open" : ""}`} />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="site-header-mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`site-mobile-link${link.active ? " active" : ""}`}
              onClick={() => { link.onClick?.(); setMenuOpen(false); }}
            >
              {link.label}
            </a>
          ))}
          <div className="site-mobile-socials">
            <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
              <i className="fab fa-instagram" />
            </a>
            <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
              <BlueskyIcon size={18} />
            </a>
          </div>
        </div>
      )}

      {/* ── EJUAN.STUDIO interactive branding ── */}
      <ScatterHello inHeader />

      {/* ── Social icons under scatter ── */}
      <div className="site-header-under-socials">
        <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
          <i className="fab fa-instagram" />
        </a>
        <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
          <BlueskyIcon size={16} />
        </a>
      </div>

    </header>
  );
};

export default Header;
