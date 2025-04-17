export function calculateExpression(expr) {
  const tokens = expr.trim().split(' ');
  const output = [];
  const operators = [];

  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2,
  };

  const applyOperator = (a, b, operator) => {
    a = parseFloat(a);
    b = parseFloat(b);

    switch (operator) {
      case '+': return a + b;
      case '-': return a - b;
      case '*': return a * b;
      case '/': return b !== 0 ? a / b : 'Error';
      default: return 'Error';
    }
  };

  for (let token of tokens) {
    if (!isNaN(token)) {
      output.push(token);
    } else if (['+', '-', '*', '/'].includes(token)) {
      while (
        operators.length &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
  }

  while (operators.length) {
    output.push(operators.pop());
  }

  const stack = [];

  for (let token of output) {
    if (!isNaN(token)) {
      stack.push(token);
    } else {
      const b = stack.pop();
      const a = stack.pop();
      const result = applyOperator(a, b, token);
      if (result === 'Error') return result;
      stack.push(result);
    }
  }

  return stack.length === 1 ? stack[0] : 'Error';
}