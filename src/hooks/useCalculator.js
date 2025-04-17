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

    const handleNumberOrDecimal = (value) => {
        if (value === '.') {
            if (operatorPressed || displayValue === '0' || expression.endsWith('=')) {
                setDisplayValue('0.');
            } else if (!displayValue.includes('.')) {
                setDisplayValue((prev) => prev + '.');
            }
            return;
        }

        if (displayValue === '0' || operatorPressed || expression.endsWith('=')) {
            setDisplayValue(value);
        } else {
            setDisplayValue((prev) => prev + value);
        }

        if (expression.endsWith('=')) {
            setExpression('');
        }

        setOperatorPressed(false);
    };

    const handleOperator = (value) => {
        if (expression.endsWith('=')) {
            setExpression(`${displayValue} ${value}`);
        } else {
            setExpression((prev) => `${prev} ${displayValue} ${value}`);
        }
        setOperatorPressed(true);
    };

    const handleEquals = () => {
        if (!expression || expression.endsWith('=')) {
            return;
        }

        const fullExpr = `${expression} ${displayValue}`;
        const result = calculateExpression(fullExpr);
        const formatted = Number(result).toFixed(10).replace(/\.?0+$/, '');

        setExpression(`${fullExpr} =`);
        setDisplayValue(formatted);
        setHistory((prev) => [`${fullExpr} = ${formatted}`, ...prev].slice(0, 7));
        setOperatorPressed(false);
    };
    const handleInput = (value) => {

        if (!isNaN(value) || value === '.') {
            handleNumberOrDecimal(value);
        }

        else if (['+', '-', '*', '/'].includes(value)) {
            handleOperator(value);
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
            handleEquals();
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