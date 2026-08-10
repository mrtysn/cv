import React from "react";
import useScrollFade from "../utils/useScrollFade";

/**
 * The single fixed anchor for every page control.
 *
 * Each control used to position itself, with a hand-tuned `right` offset keyed
 * to the pixel width of its neighbour's label ("right: 160px" for the width of
 * "Download as PDF"). Any label change or a third control broke the row. Here
 * flex does the spacing, so no control knows anything about its neighbours and
 * labels are free to change length — which the mode toggle does on every click.
 *
 * Position, spacing and the responsive rules live in App.css under
 * `.controlStrip`, so the narrow-screen layout is a media query rather than a
 * width measurement in JS.
 */
const ControlStrip = ({ children }) => {
  const opacity = useScrollFade();

  return (
    <div
      className="hideFromPrint controlStrip"
      style={{
        opacity,
        // Faded out means gone: without this the invisible controls still
        // swallow clicks over the top-right of the page while reading.
        pointerEvents: opacity < 0.05 ? "none" : "auto",
      }}
    >
      {children}
    </div>
  );
};

export default ControlStrip;
