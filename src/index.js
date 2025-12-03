import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import ErrorBoundary from "./components/ErrorBoundary";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

// Render app with error boundary
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

// Hide loading indicator once app is rendered
setTimeout(() => {
  document.body.classList.add('app-loaded');
}, 100);
