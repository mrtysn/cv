import React from "react";
import { MODES, ACTIONS } from "../constants/tags";
import { useCVContext } from "../context/CVContext";

// Heroicons v2 outline, inlined rather than installed: two glyphs do not justify
// a dependency, and the GitHub mark in ControlStrip is carried the same way.
// MIT licensed — https://heroicons.com
const ARROWS_POINTING_OUT =
  "M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15";
const ARROWS_POINTING_IN =
  "M9 9V4.5M9 9H4.5M9 9 3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5 5.25 5.25";

/**
 * Mode control, rendered inside the ControlStrip alongside the GitHub and PDF
 * buttons. The arrows carry the action — expand out of the summary, collapse
 * back into it — which reads unambiguously where the old "SHORT | LONG" pair
 * did not: nothing there said whether the highlighted word was the current mode
 * or the one you were about to switch to.
 *
 * Icon only, at every width. The action is named in `title`/`aria-label` for
 * hover and for screen readers.
 */
const ModeToggle = () => {
  const { state, dispatch } = useCVContext();
  const isShort = state.mode === MODES.SHORT;
  const nextMode = isShort ? MODES.LONG : MODES.SHORT;
  const description = isShort ? "Show full version" : "Show summary";

  return (
    <button
      type="button"
      onClick={() => dispatch({ type: ACTIONS.SET_MODE, payload: nextMode })}
      className="stripButton stripButtonIcon"
      title={description}
      aria-label={description}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d={isShort ? ARROWS_POINTING_OUT : ARROWS_POINTING_IN} />
      </svg>
    </button>
  );
};

export default ModeToggle;
