import { useEffect, useRef } from "react";
import Typed from "typed.js";
const TypingAnimation = () => {
  // Create Ref element.
  const el = useRef(null);

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["an artist.","a designer.", "a motion designer.", "an illustrator.", "a creative.", "a maker of things."], // Strings to display
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 25,
      smartBackspace: true,
      loop: true,
      showCursor: false,
    });

    // Destropying
    return () => {
      typed.destroy();
    };
  }, []);
  return <span ref={el}></span>;
};
export default TypingAnimation;
