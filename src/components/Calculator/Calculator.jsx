import styles from "./Calculator.module.css";
import { useCalculator } from "../../hooks/useCalculator";

export default function Calculator() {
  const { displayValue, handleInput, history, clearHistory } = useCalculator();

  const buttons = [
    "C",
    "+/-",
    "%",
    "/",
    "7",
    "8",
    "9",
    "*",
    "4",
    "5",
    "6",
    "-",
    "1",
    "2",
    "3",
    "+",
    "0",
    ".",
    "=",
  ];

  return (
    <div className={styles.calculator}>
      <div className={styles.display}>{displayValue}</div>

      <div className={styles.buttons}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleInput(btn)}
            className={btn === "0" ? styles.zero : ""}
          >
            {btn}
          </button>
        ))}
      </div>

      {history.length > 0 && (
        <div className={styles.history}>
          <h4>History</h4>
          <ul>
            {history.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          <button className={styles.clearHistoryBtn} onClick={clearHistory}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
}
