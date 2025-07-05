// src/features/client/components/ThemeToggle.jsx
import React, { useEffect, useState } from "react";
import { getUserSettings, updateUserSettings } from "../services/userPreferencesAPI";
import { getUserIdFromToken } from "../../login/utils/auth";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchTheme = async () => {
      const userId = getUserIdFromToken();
      if (userId) {
        const settings = await getUserSettings(userId);
        if (settings?.theme) {
          setTheme(settings.theme);
          document.body.setAttribute("data-theme", settings.theme);
        }
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);

    const userId = getUserIdFromToken();
    if (userId) {
      await updateUserSettings(userId, { theme: newTheme });
    }
  };

  return (
    <div style={{ position: "absolute", top: "15px", left: "15px", zIndex: 1000 }}>
      <button
        onClick={toggleTheme}
        style={{
          fontSize: "16px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: theme === "dark" ? "#fff" : "#000"
        }}
        aria-label="Toggle Theme"
      >
        {theme === "dark" ? <FaSun /> : <FaMoon />}
      </button>
    </div>
  );
};

export default ThemeToggle;
