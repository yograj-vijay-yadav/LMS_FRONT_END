import { useEffect } from "react";
import Lenis from "lenis";

export default function LenisScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,       // scroll speed
      smoothWheel: true,   // enable smooth wheel scrolling
      anchors: {
        offset: -100,      // offset for anchor links (useful if you have a fixed header)
      },
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null; // this component doesn't render anything
}
