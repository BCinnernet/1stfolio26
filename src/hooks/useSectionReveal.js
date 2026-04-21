import { useEffect, useRef } from "react";

const useSectionReveal = (threshold = 0.1) => {
  const ref = useRef(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".sr");
    if (!els?.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("sr-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return ref;
};

export default useSectionReveal;
