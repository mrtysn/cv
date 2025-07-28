import React from "react";
import App from "./App";
import { createRoot, hydrateRoot } from "react-dom/client";

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  const root = hydrateRoot(rootElement, <App />);
} else {
  const root = createRoot(rootElement);
  root.render(<App />);
}
