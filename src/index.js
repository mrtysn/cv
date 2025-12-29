import React from "react";
import App from "./App";
import { createRoot, hydrateRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";

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
