import { useState } from 'react';
import { calculateExpression } from '../utils/calculateExpression';

export const useCalculator = () => {
    const [expression, setExpression] = useState('');
    const [displayValue, setDisplayValue] = useState('0');
    const [history, setHistory] = useState([]);
    const [showHistory, setShowHistory] = useState(false);
    const [operatorPressed, setOperatorPressed] = useState(false);

    const toggleHistory = () => {
        setShowHistory((prev) => !prev);
    };

    const handleInput = (value) => {
        if (!isNaN(value) || value === '.') {
            if (displayValue === '0' || operatorPressed || expression.endsWith('=')) {
                setDisplayValue(value);
            } else {
                setDisplayValue((prev) => prev + value);
            }

            if (expression.endsWith('=')) {
                setExpression('');
            }

            setOperatorPressed(false);
        }

        else if (['+', '-', '*', '/'].includes(value)) {
            setExpression((prev) => `${prev} ${displayValue} ${value}`);
            setOperatorPressed(true);
        }

        else if (value === '+/-') {
            setDisplayValue((prev) => String(parseFloat(prev) * -1));
        }

        else if (value === '%') {
            setDisplayValue((prev) => String(parseFloat(prev) / 100));
        }

        else if (value === 'C') {
            setExpression('');
            setDisplayValue('0');
        }

        else if (value === '=') {
            const fullExpr = `${expression} ${displayValue}`;
            const result = calculateExpression(fullExpr);

            setExpression(`${fullExpr} =`);
            setDisplayValue(String(result));
            setHistory((prev) => [`${fullExpr} = ${result}`, ...prev].slice(0, 7));
            setOperatorPressed(false);
        }
    };

    const clearHistory = () => {
        setHistory([]);
    };

    const isFinal = expression.endsWith('=');
    const waitingForNext = operatorPressed;

    const liveDisplay = isFinal
        ? displayValue
        : waitingForNext
            ? expression.trim()
            : `${expression} ${displayValue}`.trim();

    return {
        displayValue,
        expression,
        handleInput,
        history,
        clearHistory,
        toggleHistory,
        showHistory,
        liveDisplay,
        isFinal
    };
};
