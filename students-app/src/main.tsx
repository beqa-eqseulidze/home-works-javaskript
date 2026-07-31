import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// თუ გვერდი დარეფრეშდა (reload) და არ ვართ home-ზე, გადავიყვანოთ home-ზე
const navigationEntry = performance.getEntriesByType(
  "navigation"
)[0] as PerformanceNavigationTiming;

if (navigationEntry && navigationEntry.type === "reload") {
  if (window.location.pathname !== "/") {
    window.location.href = "/";
  }
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);