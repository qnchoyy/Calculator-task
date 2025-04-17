import { useState } from 'react';
import { calculate } from '../utils/calculate';

export const useCalculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNext, setWaitingForNext] = useState(false);
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [finalExpression, setFinalExpression] = useState('');

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    const handleInput = (value) => {
        if (!isNaN(value)) {
            if (waitingForNext) {
                setDisplayValue(value);
                setWaitingForNext(false);
            } else {
                setDisplayValue((prev) => (prev === '0' ? value : prev + value));
            }
        }

        else if (value === '.') {
            if (waitingForNext) {
                setDisplayValue('0.');
                setWaitingForNext(false);
            } else if (!displayValue.includes('.')) {
                setDisplayValue(displayValue + '.');
            }
        }

        else if (value === '+/-') {
            setDisplayValue((prev) => String(parseFloat(prev) * -1));
        }

        else if (value === '%') {
            setDisplayValue((prev) => String(parseFloat(prev) / 100));
        }

        else if (value === 'C') {
            clear();
        }

        else if (value === '=') {
            if (operator && previousValue !== null) {
                const result = calculate(previousValue, displayValue, operator);
                const entry = `${previousValue} ${operator} ${displayValue} =`;
                setFinalExpression(entry);

                setHistory((prev) => {
                    const updated = [`${entry} ${result}`, ...prev];
                    return updated.slice(0, 7);
                });

                setDisplayValue(String(result));
                setPreviousValue(null);
                setOperator(null);
                setWaitingForNext(true);
            }
        }

        else {
            setOperator(value);
            setPreviousValue(displayValue);
            setWaitingForNext(true);
        }
    };

    const clear = () => {
        setDisplayValue('0');
        setPreviousValue(null);
        setOperator(null);
        setWaitingForNext(false);
        setFinalExpression('');
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const liveExpression =
        operator && previousValue !== null
            ? waitingForNext
                ? `${previousValue} ${operator}`
                : `${previousValue} ${operator} ${displayValue}`
            : displayValue;

    return {
        displayValue,
        handleInput,
        history,
        clearHistory,
        showHistory,
        toggleHistory,
        expression: finalExpression || liveExpression,
        showResult: finalExpression !== '',
    };
};