import React from "react";
import App from "./App";
import { createRoot, hydrateRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";
// A corner button on local pages only (localhost or file://) that switches between the window's width
// and a 390 px phone frame; it does nothing on the deployed site. A copy of web-shared's
// src/view-width.js, written by `project-lifecycle page-vendor`; refresh it with
// `project-lifecycle page-vendor --into src/vendor/web-shared`.
import "./vendor/web-shared/view-width.js";

const rootElement = document.getElementById("root");

// Use hydrate if pre-rendered by react-snap, otherwise render normally
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
} else {
  const root = createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );
}

// Hide loading indicator once app is rendered
setTimeout(() => {
  document.body.classList.add('app-loaded');
}, 100);
