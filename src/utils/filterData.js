import { MODES, TAGS } from "../constants/tags";

/**
 * Filter items by tags. An item is hidden only if ALL its tags are in hiddenTags.
 * Items with no tags are always shown.
 */
export function filterByTags(items, hiddenTags) {
  if (!hiddenTags || hiddenTags.length === 0) return items;

  return items.filter((item) => {
    if (!item.tags || item.tags.length === 0) return true;
    return item.tags.some((tag) => !hiddenTags.includes(tag));
  });
}

/**
 * Resolve short/long content for an item.
 * If mode is SHORT and item has a `short` object, merge short fields over the original.
 * A field set to null in `short` means remove that field entirely.
 */
export function resolveItem(item, mode) {
  if (mode !== MODES.SHORT || !item.short) return item;

  const resolved = { ...item };
  for (const [key, value] of Object.entries(item.short)) {
    if (value === null) {
      delete resolved[key];
    } else {
      resolved[key] = value;
    }
  }
  delete resolved.short;
  return resolved;
}

/**
 * Combined: filter by tags, then resolve short/long for remaining items.
 */
export function processData(items, state) {
  const filtered = filterByTags(items, state.hiddenTags);
  return filtered.map((item) => resolveItem(item, state.mode));
}

/**
 * Education-specific processing. Same as processData but also strips
 * relevantCourses when the "coursework" tag is hidden.
 */
export function processEducationData(items, state) {
  const filtered = filterByTags(items, state.hiddenTags);
  const hideCoursework = state.hiddenTags.includes(TAGS.COURSEWORK);

  return filtered.map((item) => {
    const resolved = resolveItem(item, state.mode);
    if (hideCoursework) {
      const { relevantCourses, ...rest } = resolved;
      return rest;
    }
    return resolved;
  });
}
