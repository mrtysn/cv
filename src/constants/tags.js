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
  // Backend / gamedev-focused view, reused across backend, real-time, and
  // games applications (e.g. SYBO). Short mode for scannability; hides
  // high-school trivia, coursework lists, and the alumni-community item while
  // keeping every professional role and degree. Note: the `academic` tag is
  // shared by the Wayne State teaching job AND the degree entries, so it is
  // deliberately NOT hidden here (the teaching of Deep Learning / Data Mining
  // is an asset for backend roles, and hiding `academic` would drop degrees).
  backend: {
    name: "backend",
    mode: MODES.SHORT,
    hiddenTags: [TAGS.COURSEWORK, TAGS.HIGHSCHOOL, TAGS.COMMUNITY],
  },
};
