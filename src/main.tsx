import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { HashRouter as Router } from "react-router-dom";
import { GameProvider } from "./features/Game.context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <GameProvider>
    <Router>
      <App />
    </Router>
  </GameProvider>
);
