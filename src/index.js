function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {

    const checkValidBrackets = ((str) => {
        if (!(str.split('').filter(item => item === '(').length === str.split('').filter(item => item === ')').length)) {
            throw new Error('ExpressionError: Brackets must be paired');
        }
    })(expr);

    const operations = (firstNumber, operator, secondNumber) => {
        switch (operator) {
            case '*':
                return firstNumber * secondNumber;
            case '/':
                if (secondNumber === 0 && operator === '/') {
                    throw new Error('TypeError: Division by zero.');
                }
                return firstNumber / secondNumber;
            case '+':
                return firstNumber + secondNumber;
            case '-':
                return firstNumber - secondNumber;
        }
    }

    expr = '(' + expr + ')';
    expr = expr.replace(/\s/g, '').replace(/[-+*/()]/g, ' $& ').split(' ').filter(item => item !== '');

    while (expr.lastIndexOf(')') !== -1) {

        let tempArr = expr.slice(expr.lastIndexOf('(') + 1, expr.indexOf(')', expr.lastIndexOf('(')));
        let lengthTemp = tempArr.length;

        while (tempArr.length !== 1) {

            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] === '*' || tempArr[i] === '/') {
                    let res = operations(Number.parseFloat(tempArr[i - 1]), tempArr[i], Number.parseFloat(tempArr[i + 1]));
                    tempArr.splice(i - 1, 3, res.toString())
                    i = 0;
                }
            }
            for (let i = 0; i < tempArr.length; i++) {
                if (tempArr[i] === '+' || tempArr[i] === '-') {
                    let res = operations(Number.parseFloat(tempArr[i - 1]), tempArr[i], Number.parseFloat(tempArr[i + 1]));
                    tempArr.splice(i - 1, 3, res.toString())
                    i = 0;
                }
            }
        }
        expr.splice(expr.lastIndexOf('('), lengthTemp + 2, tempArr[0]);
    }
    return +expr[0];
}

module.exports = {
    expressionCalculator
}

console.log(expressionCalculator(" 49 * 31 * (  20 - 83 / 63 / 46 * 29  ) / 68 "));
// console.log(expressionCalculator(" 2 + 2 "));
// console.log(expressionCalculator(" 31 * 21 + 14 / (  (  18 * 52 / (  43 - 74 / 89 - 12  ) + 8  ) + 3 / 0 + (  9 + 81 + 19 * 94 / (  0 * 71 + 53 - 20 * 94  )  )  ) "));