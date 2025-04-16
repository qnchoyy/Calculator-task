import { useState } from 'react';
import { calculate } from '../utils/calculate';

export const useCalculator = () => {
    const [displayValue, setDisplayValue] = useState('0');
    const [previousValue, setPreviousValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNext, setWaitingForNext] = useState(false);

    const handleInput = (value) => {
        if (!isNaN(value)) {
            if (waitingForNext) {
                setDisplayValue(value);
                setWaitingForNext(false);
            } else {
                setDisplayValue((prev) => (prev === '0' ? value : prev + value));
            }
        } else if (value === '.') {
            if (waitingForNext) {
                setDisplayValue('0.');
                setWaitingForNext(false);
            } else if (!displayValue.includes('.')) {
                setDisplayValue(displayValue + '.');
            }
        } else if (value === '+/-') {
            setDisplayValue((prev) => String(parseFloat(prev) * -1));
        } else if (value === '%') {
            setDisplayValue((prev) => String(parseFloat(prev) / 100));
        } else if (value === 'C') {
            clear();
        } else if (value === '=') {
            if (operator && previousValue !== null) {
                const result = calculate(previousValue, displayValue, operator);
                setDisplayValue(String(result));
                setPreviousValue(null);
                setOperator(null);
                setWaitingForNext(true);
            }
        } else {
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
    };

    return {
        displayValue,
        handleInput,
    };
};