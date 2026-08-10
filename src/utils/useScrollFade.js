import { useEffect, useState } from "react";

/**
 * Opacity for the page controls, following a 100-0-100 pattern down the page:
 * visible while the reader is arriving, hidden through the body, visible again
 * at the end. The controls are wanted before and after reading, not during.
 *
 * Lives here rather than in a component because every control fades together;
 * one listener for the strip replaces one per button, which also guarantees
 * they stay in sync.
 */
export default function useScrollFade(edge = 0.15) {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const percent = maxScroll > 0 ? window.scrollY / maxScroll : 0;

      let next;
      if (percent <= edge) {
        next = 1 - percent / edge;
      } else if (percent >= 1 - edge) {
        next = (percent - (1 - edge)) / edge;
      } else {
        next = 0;
      }

      setOpacity(Math.max(0, Math.min(1, next)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [edge]);

  return opacity;
}
