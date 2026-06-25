import React, { createContext, useContext, useReducer, useEffect } from "react";
import { MODES, ACTIONS } from "../constants/tags";
import { decodeStateFromURL, encodeStateToURL } from "../utils/urlState";

const initialState = {
  mode: MODES.LONG,
  hiddenTags: [],
  preset: null,
};

function cvReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_MODE:
      return { ...state, mode: action.payload, preset: null };

    case ACTIONS.TOGGLE_TAG: {
      const isHidden = state.hiddenTags.includes(action.payload);
      return {
        ...state,
        hiddenTags: isHidden
          ? state.hiddenTags.filter((t) => t !== action.payload)
          : [...state.hiddenTags, action.payload],
        preset: null,
      };
    }

    case ACTIONS.APPLY_PRESET:
      return {
        mode: action.payload.mode,
        hiddenTags: action.payload.hiddenTags,
        preset: action.payload.name,
      };

    case ACTIONS.RESTORE_FROM_URL:
      return { ...action.payload };

    default:
      return state;
  }
}

const CVContext = createContext();

export function CVProvider({ children }) {
  const [state, dispatch] = useReducer(cvReducer, initialState, (init) => {
    const urlState = decodeStateFromURL();
    return urlState || init;
  });

  useEffect(() => {
    encodeStateToURL(state);
  }, [state]);

  return (
    <CVContext.Provider value={{ state, dispatch }}>
      {children}
    </CVContext.Provider>
  );
}

export function useCVContext() {
  return useContext(CVContext);
}
