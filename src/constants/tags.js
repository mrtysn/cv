export const MODES = {
  SHORT: "short",
  LONG: "long",
};

export const ACTIONS = {
  SET_MODE: "SET_MODE",
  TOGGLE_TAG: "TOGGLE_TAG",
  APPLY_PRESET: "APPLY_PRESET",
  RESTORE_FROM_URL: "RESTORE_FROM_URL",
};

export const TAGS = {
  PROFESSIONAL: "professional",
  ACADEMIC: "academic",
  TEACHING: "teaching",
  INTERNSHIP: "internship",
  FREELANCE: "freelance",
  RESEARCH: "research",
  COURSEWORK: "coursework",
  HIGHSCHOOL: "highschool",
  GAMEDEV: "gamedev",
  ML: "ml",
  BACKEND: "backend",
  FRONTEND: "frontend",
  DEVOPS: "devops",
  COMPETITION: "competition",
  COMMUNITY: "community",
  PERSONAL: "personal",
};

export const PRESETS = {
  compact: {
    name: "compact",
    mode: MODES.SHORT,
    hiddenTags: [TAGS.COURSEWORK, TAGS.HIGHSCHOOL],
  },
  full: {
    name: "full",
    mode: MODES.LONG,
    hiddenTags: [],
  },
};
