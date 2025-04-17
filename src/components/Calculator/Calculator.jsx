import styles from "./Calculator.module.css";
import { useCalculator } from "../../hooks/useCalculator";

export default function Calculator() {
  const {
    liveDisplay,
    expression,
    isFinal,
    handleInput,
    history,
    showHistory,
    toggleHistory,
    clearHistory,
  } = useCalculator();

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
      {isFinal && <div className={styles.expression}>{expression}</div>}

      <div className={styles.display}>{liveDisplay}</div>

      <button className={styles.toggleHistoryBtn} onClick={toggleHistory}>
        {showHistory ? "Hide History" : "Show History"}
      </button>

      <div className={styles.buttons}>
        {buttons.map((btn, index) => (
          <button
            key={index}
            onClick={() => handleInput(btn)}
            className={`
              ${btn === "0" ? styles.zero : ""}
              ${btn === "=" ? styles.equal : ""}
              ${btn === "C" ? styles.clear : ""}
            `}
          >
            {btn}
          </button>
        ))}
      </div>
      {showHistory && (
        <div className={styles.history}>
          {history.length === 0 ? (
            <p className={styles.noHistory}>No history available yet.</p>
          ) : (
            <>
              <h4>History</h4>
              <ul>
                {history.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <button className={styles.clearHistoryBtn} onClick={clearHistory}>
                Clear History
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
