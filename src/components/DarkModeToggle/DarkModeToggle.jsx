import { useEffect, useState } from "react";
import styles from "./DarkModeToggle.module.css";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleClick = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <div className={styles.wrapper}>
      <button className={styles.toggleBtn} onClick={handleClick}>
        <span className={`${styles.icon} ${darkMode ? styles.rotate : ""}`}>
          {darkMode ? "☀️" : "🌙"}
        </span>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
}
