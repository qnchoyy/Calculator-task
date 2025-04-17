import { useEffect, useState } from "react";
import styles from "./DarkModeToggle.module.css";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode ? "true" : "false");
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggleBtn}
        onClick={handleClick}
        aria-label="Toggle dark mode"
      >
        <span className={`${styles.icon} ${darkMode ? styles.rotate : ""}`}>
          {darkMode ? "☀️" : "🌙"}
        </span>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
