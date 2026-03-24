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
                src="/static/img/Jumbled EJUAN logo - henderson outline - 64.png"
                alt="Ejuan logo"
                style={{ height: "60px", width: "auto", display: "block" }}
              />
            </a>

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
              </ul>
            </Accordion.Collapse>
          </div>
        </nav>
      </Accordion>
    </header>
  );
};

export default Header;