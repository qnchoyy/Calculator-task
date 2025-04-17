import { useEffect, useState } from "react";
import styles from "./DarkModeToggle.module.css";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className={styles.wrapper}>
      <button
        onClick={() => setDarkMode((prev) => !prev)}
        className={styles.toggleBtn}
      >
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
    </div>
  );
}
