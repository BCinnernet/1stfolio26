import Preloader from "@/src/layouts/Preloader";
import "@/styles/globals.css";
import { Fragment, useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    setTimeout(() => { setLoading(false); }, 1500);
    setTimeout(() => { setContent(true); }, 1000);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Fragment>
      <Component {...pageProps} />
      <button
        className={`back-to-top${showTop ? " visible" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <span className="back-to-top-arrow">
          <svg viewBox="0 0 24 24">
            <polyline points="18 15 12 9 6 15" />
          </svg>
        </span>
      </button>
    </Fragment>
  );
}
