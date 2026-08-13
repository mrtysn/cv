import { MODES } from "../constants/tags";

export function encodeStateToURL(state) {
  const params = new URLSearchParams();

  if (state.mode === MODES.SHORT) {
    params.set("verbose", "false");
  }
  if (state.hiddenTags.length > 0) {
    params.set("hide", state.hiddenTags.join(","));
  }
  if (state.preset) {
    params.set("preset", state.preset);
  }

  const query = params.toString();
  const newURL = query
    ? `${window.location.pathname}?${query}`
    : window.location.pathname;
  window.history.replaceState(null, "", newURL);
}

export function decodeStateFromURL() {
  // scripts/prerender.js renders the app in node, where there is no URL to
  // read. Returning null gives the same answer as a URL carrying no
  // parameters, which is the only thing a single prerendered file can assume.
  if (typeof window === "undefined") return null;

  // The live site always shows the default view: URL-driven modes are a
  // development-only capability (used by the toggles UI and by one-off PDF
  // renders via generate-pdf-local, which runs against the dev server).
  // Production builds ignore these parameters entirely.
  if (process.env.NODE_ENV === "production") return null;

  const params = new URLSearchParams(window.location.search);

  if (!params.has("verbose") && !params.has("hide") && !params.has("preset")) {
    return null;
  }

  const mode = params.get("verbose") === "false" ? MODES.SHORT : MODES.LONG;
  const hide = params.get("hide");
  const hiddenTags = hide ? hide.split(",").filter(Boolean) : [];
  const preset = params.get("preset") || null;

  return { mode, hiddenTags, preset };
}
