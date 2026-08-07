import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import "./styles/mature-dashboards.css";
import "./styles/mature-components.css";
import "./styles/mature-responsive.css";
import "./styles/dashboard-overviews.css";
import "./styles/experiences.css";
import "./styles/experience-command.css";
import "./styles/experience-client.css";
import "./styles/experience-human.css";
import "./styles/experience-agent-research.css";
import "./styles/experience-intelligence.css";
import "./styles/experience-refinements.css";
import "./styles/official-systems.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
