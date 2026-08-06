import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/mature-dashboards.css";
import "./styles/mature-components.css";
import "./styles/mature-responsive.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
