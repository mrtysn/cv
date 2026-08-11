export const CV_VERSION = "v3.5";
export const DATE = "08/2026";
export const PDF_SCALE = 0.92; // PDF generation scale (0.1-2.0). Lower = smaller content, higher = larger content

/**
 * Controls that only appear on the dev server, not on the deployed CV.
 *
 * Gated on NODE_ENV rather than the hostname because a hostname read during
 * render breaks prerendering: scripts/prerender.js runs the tree in node with
 * no `window`, and any divergence between what it renders and what the browser
 * renders makes React throw the prerendered markup away. esbuild and CRA both
 * inline NODE_ENV at build time, so the two agree by construction.
 *
 * The URL parameters these controls set (?verbose, ?hide, ?preset) keep working
 * everywhere, so hiding a control never removes the capability behind it.
 */
export const SHOW_DEV_CONTROLS = process.env.NODE_ENV !== "production";
