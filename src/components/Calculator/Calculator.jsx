import styles from "./Calculator.module.css";
import { useCalculator } from "../../hooks/useCalculator";

export default function Calculator() {
  const { displayValue, handleInput } = useCalculator();

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
    </div>
  );
}
