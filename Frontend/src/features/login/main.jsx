// src/features/login/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { getUserSettings } from "./services/userPreferencesAPI";
import { getUserIdFromToken } from "./utils/auth";
import "./styles/theme.css";

(async () => {
  const userId = getUserIdFromToken();
  if (userId) {
    try {
      const settings = await getUserSettings(userId);
      const theme = settings?.theme || "light";
      document.body.setAttribute("data-theme", theme);
    } catch (err) {
      console.error("Failed to fetch theme:", err);
    }
  }
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
})();
