// DESC: The app's render tree, as a function, for scripts/prerender.js to call in node

/**
 * This must render exactly the tree `src/index.js` hydrates, or the prerendered
 * markup and the client's first render disagree and React throws the whole
 * thing away. Any wrapper added there has to be added here too.
 *
 * Bundled for node by scripts/prerender.js; it is never part of the browser
 * build, so react-dom/server never reaches a visitor.
 */

import React from "react";
import { renderToString } from "react-dom/server";
import App from "../src/App";
import ErrorBoundary from "../src/components/ErrorBoundary";

export function render() {
  return renderToString(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}
