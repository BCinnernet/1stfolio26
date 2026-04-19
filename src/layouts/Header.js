import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { tony } from "./utils";
import { useRouter } from "next/router";
import BlueskyIcon from "@/src/components/BlueskyIcon";
import siteConfig from "@/src/data/siteConfig";

const { instagram, bluesky } = siteConfig.social;

const Header = ({ headerColor, isTransparent }) => {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    tony.stickyNav();
    tony.scrollToActiveNav();

    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <header>
      <Accordion>
        <nav
          className={`navbar header-nav header-${headerColor ?? "white"} ${
            isTransparent ? "header-transparent" : ""
          } navbar-expand-md`}
        >
          <div className="container">

            {/* Logo */}
            <a className="navbar-brand" href="/">
              <img
                src="/static/img/Jumbled EJUAN logo nb [Recovered].png"
                alt="Ejuan logo"
                style={{ height: "80px", width: "auto", display: "block" }}
              />
            </a>

            {/* Social icons — visible on desktop next to logo */}
            <div className="header-logo-socials">
              <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}>
                <i className="fab fa-instagram" />
                <span className="logo-social-label">{instagram.label}</span>
              </a>
              <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}>
                <BlueskyIcon size={16} />
                <span className="logo-social-label">{bluesky.label}</span>
              </a>
            </div>

            {/* Hamburger toggle */}
            <Accordion.Toggle as="button" className="navbar-toggler" type="button" eventKey="toggle">
              <span />
              <span />
              <span />
            </Accordion.Toggle>

            {/* Nav links */}
            <Accordion.Collapse
              eventKey="toggle"
              className="navbar-collapse justify-content-end"
              id="navbar-collapse-toggle"
            >
              <ul className="navbar-nav ml-auto nav-ul">
                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/" && (activeHash === "" || activeHash === "#home") ? "active" : ""
                    }`}
                    href="/#home"
                  >
                    Home
                  </a>
                </li>

                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/" && activeHash === "#work" ? "active" : ""
                    }`}
                    href="/#work"
                  >
                    Work
                  </a>
                </li>

                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/about" && activeHash !== "#contact" ? "active" : ""
                    }`}
                    href="/about"
                    onClick={() => setActiveHash("")}
                  >
                    About
                  </a>
                </li>

                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/about" && activeHash === "#contact" ? "active" : ""
                    }`}
                    href="/about#contact"
                    onClick={() => setActiveHash("#contact")}
                  >
                    Contact
                  </a>
                </li>

                {/* Social icons — visible inside hamburger menu on mobile */}
                <li className="nav-socials">
                  <a href={instagram.url} target="_blank" rel="noreferrer" aria-label={instagram.label}
                    style={{ color: "inherit", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className="fab fa-instagram" />
                    <span className="nav-social-label">{instagram.label}</span>
                  </a>
                  <a href={bluesky.url} target="_blank" rel="noreferrer" aria-label={bluesky.label}
                    style={{ color: "inherit", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <BlueskyIcon size={18} />
                    <span className="nav-social-label">{bluesky.label}</span>
                  </a>
                </li>
              </ul>
            </Accordion.Collapse>

          </div>
        </nav>
      </Accordion>
    </header>
  );
};

export default Header;
