import React from "react";
import { ACTIONS } from "../constants/tags";
import { useCVContext } from "../context/CVContext";

const SectionToggle = ({ tag, label }) => {
  const { state, dispatch } = useCVContext();
  const isHidden = state.hiddenTags.includes(tag);

  return (
    <span
      className="hideFromPrint sectionToggle"
      onClick={() => dispatch({ type: ACTIONS.TOGGLE_TAG, payload: tag })}
      style={{
        cursor: "pointer",
        fontSize: "10px",
        color: isHidden ? "#ccc" : "#999",
        marginLeft: "8px",
        letterSpacing: "0.5px",
        fontWeight: 300,
        textTransform: "none",
        textDecoration: isHidden ? "line-through" : "none",
      }}
    >
      {label}
    </span>
  );
};

export default SectionToggle;
