import React from "react";
import { MODES, ACTIONS } from "../constants/tags";
import { useCVContext } from "../context/CVContext";

const ModeToggle = () => {
  const { state, dispatch } = useCVContext();
  const isShort = state.mode === MODES.SHORT;

  return (
    <div className="hideFromPrint" style={{ textAlign: "center", margin: "4px 0 8px" }}>
      <span
        onClick={() => dispatch({ type: ACTIONS.SET_MODE, payload: MODES.SHORT })}
        className="modeToggleOption"
        style={{
          cursor: "pointer",
          fontWeight: isShort ? 500 : 400,
          color: isShort ? "#2185d0" : "#999",
          fontSize: "11px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Short
      </span>
      <span style={{ margin: "0 8px", color: "#ccc", fontSize: "11px" }}>|</span>
      <span
        onClick={() => dispatch({ type: ACTIONS.SET_MODE, payload: MODES.LONG })}
        className="modeToggleOption"
        style={{
          cursor: "pointer",
          fontWeight: isShort ? 400 : 500,
          color: isShort ? "#999" : "#2185d0",
          fontSize: "11px",
          letterSpacing: "1px",
          textTransform: "uppercase",
        }}
      >
        Long
      </span>
    </div>
  );
};

export default ModeToggle;
