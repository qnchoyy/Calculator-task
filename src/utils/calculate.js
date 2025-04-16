export function calculate(a, b, operator) {
    const numA = parseFloat(a);
    const numB = parseFloat(b);

    if (isNaN(numA) || isNaN(numB)) return 'Error';

    switch (operator) {
        case '+':
            return numA + numB;
        case '-':
            return numA - numB;
        case '*':
            return numA * numB;
        case '/':
            return numB !== 0 ? numA / numB : "Can't divide by 0";
        default:
            return numB;
    }
}