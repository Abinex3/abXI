import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // keep ScrollTrigger in sync with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    // named callback so we can remove THIS one on cleanup
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // expose globally so transition/route code can call lenis.scrollTo(0)
    window.lenis = lenis;

    return () => {
      gsap.ticker.remove(update);   // ← the actual fix
      lenis.destroy();
      window.lenis = null;
    };
  }, []);
}