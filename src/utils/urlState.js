import { MODES } from "../constants/tags";

export function encodeStateToURL(state) {
  const params = new URLSearchParams();

  if (state.mode === MODES.LONG) {
    params.set("verbose", "true");
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
  const params = new URLSearchParams(window.location.search);

  if (!params.has("verbose") && !params.has("hide") && !params.has("preset")) {
    return null;
  }

  const mode = params.get("verbose") === "true" ? MODES.LONG : MODES.SHORT;
  const hide = params.get("hide");
  const hiddenTags = hide ? hide.split(",").filter(Boolean) : [];
  const preset = params.get("preset") || null;

  return { mode, hiddenTags, preset };
}
