import { useEffect, useState } from "react";
import { Accordion } from "react-bootstrap";
import { tony } from "./utils";
import { useRouter } from "next/router";

const Header = ({ headerColor, isTransparent }) => {
  const router = useRouter();
  const [activeHash, setActiveHash] = useState("");

  useEffect(() => {
    tony.stickyNav();
    tony.scrollToActiveNav();

    const updateHash = () => {
      setActiveHash(window.location.hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => {
      window.removeEventListener("hashchange", updateHash);
    };
  }, []);

  return (
    <header>
      <Accordion>
        <nav
          className={`navbar header-nav header-${
            headerColor ? headerColor : "white"
          } ${isTransparent ? "header-transparent" : ""} navbar-expand-md`}
        >
          <div className="container">
            <a className="navbar-brand" href="/">
              <img
                src="/static/img/Jumbled EJUAN logo nb [Recovered].png"
                alt="Ejuan logo"
                style={{ height: "80px", width: "auto", display: "block" }}
              />
            </a>

            <div className="header-logo-socials">
              <a
                href="https://www.instagram.com/ohhej"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram" />
                <span className="logo-social-label">IG</span>
              </a>
              <a
                href="https://bsky.app/profile/becausetheinnernet.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Bluesky"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 600 530"
                  width="16"
                  height="16"
                  fill="currentColor"
                >
                  <path d="M300 266c0 0-92-178-208-178-62 0-92 51-92 104 0 112 162 156 162 156s-55 40-55 88c0 51 46 94 104 94 58 0 89-40 89-40s31 40 89 40c58 0 104-43 104-94 0-48-55-88-55-88s162-44 162-156c0-53-30-104-92-104-116 0-208 178-208 178z" />
                </svg>
                <span className="logo-social-label">BSKY</span>
              </a>
            </div>

            <Accordion.Toggle
              as="button"
              className="navbar-toggler"
              type="button"
              eventKey="toggle"
            >
              <span />
              <span />
              <span />
            </Accordion.Toggle>
            <Accordion.Collapse
              eventKey="toggle"
              className="navbar-collapse justify-content-end"
              id="navbar-collapse-toggle"
            >
              <ul className="navbar-nav ml-auto nav-ul">
                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/" &&
                      (activeHash === "" || activeHash === "#home")
                        ? "active"
                        : ""
                    }`}
                    href="/#home"
                  >
                    Home
                  </a>
                </li>
                

                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/" && activeHash === "#work"
                        ? "active"
                        : ""
                    }`}
                    href="/#work"
                  >
                    Work
                  </a>
                </li>

                <li>
                  <a
                    className={`nav-link ${
                      router.pathname === "/about" && activeHash !== "#contact"
                        ? "active"
                        : ""
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
                      router.pathname === "/about" && activeHash === "#contact"
                        ? "active"
                        : ""
                    }`}
                    href="/about#contact"
                    onClick={() => setActiveHash("#contact")}
                  >
                    Contact
                  </a>
                </li>

                <li className="nav-socials">
                  <a
                    href="https://www.instagram.com/ohhej"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    style={{ color: "inherit", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <i className="fab fa-instagram" />
                    <span className="nav-social-label">Instagram</span>
                  </a>

                  <a
                    href="https://bsky.app/profile/becausetheinnernet.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Bluesky"
                    style={{ color: "inherit", display: "inline-flex", alignItems: "center", gap: "6px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 600 530"
                      width="18"
                      height="18"
                      fill="currentColor"
                      style={{ verticalAlign: "middle" }}
                    >
                      <path d="M300 266c0 0-92-178-208-178-62 0-92 51-92 104 0 112 162 156 162 156s-55 40-55 88c0 51 46 94 104 94 58 0 89-40 89-40s31 40 89 40c58 0 104-43 104-94 0-48-55-88-55-88s162-44 162-156c0-53-30-104-92-104-116 0-208 178-208 178z" />
                    </svg>
                    <span className="nav-social-label">Bluesky</span>
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