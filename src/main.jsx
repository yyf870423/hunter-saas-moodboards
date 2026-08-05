import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/tech-layouts-a.css";
import "./styles/tech-layouts-b.css";
import "./styles/tech-components-a.css";
import "./styles/tech-components-b.css";
import "./styles/tech-motion-a.css";
import "./styles/tech-motion-b.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
