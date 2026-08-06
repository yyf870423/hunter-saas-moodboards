import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/moodboards.css";
import "./styles/components-01-03.css";
import "./styles/components-04-07.css";
import "./styles/components-08-10.css";
import "./styles/responsive.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
