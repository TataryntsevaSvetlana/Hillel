// Калькулятор
// реализовать калькулятор который последовательно у пользователя спросит
// - первый операнд
// - действие (+ - / *)
// - второй операнд

// после этого выводим результат операции

// все спрашиваем у пользователя с помощью prompt, обязательно валидируем введенные значения, переспрашиваем, если введенное не валидно.

// получение/валидация операнда, получение/валидация действия, собственно вычисление, все должно быть в отдельных функциях.

function askNumber(question){ 
    const value = prompt(question,'');

    const isValidValue = getIsValueValid(value);
    
    if (!isValidValue) {
        alert('invalid value');
        return askNumber('repeat');
    } 
    return +value;
}

function getIsValueValid(value) {

    const isNanValue = isNaN(value);
    const isEmptyString = value === '';
    const wasCanceled = value === null;

    return !(isNanValue || isEmptyString || wasCanceled);
}

function askOperator(question){ 
    const operator = prompt(question,'');
    const isValidOperator = getIsOperatorValid(operator);

    if (!isValidOperator) {
        alert('invalid operator');
        return askOperator('repeat');
    } 
    return operator;
}

function getIsOperatorValid(operator) {

    const arr = ['+','-','*','/'];

    for (let i = 0; i < arr.length; i++){
        if (operator === arr[i]) { 
            return true;
        } 
    }
    return false;
}

function validateCalculation (operand, operator) {

    const isDevidedByZero = getIsDividedbyZero(operand, operator);

    if (isDevidedByZero) {
        alert('Cannot divide by zero');
        
        secondUserValue = askNumber('enter the second number');
        
        if (secondUserValue === 0) {
            validateCalculation (secondUserValue, operator);
        }
    }
}

function getIsDividedbyZero (operand, operator){
    return operand === 0 && operator === '/';
}

function calculate(operandA, operandB, operator) {

    switch (operator) {
        case '+': return operandA + operandB;
        case '-': return operandA - operandB;
        case '*': return operandA * operandB;
        case '/': return operandA / operandB; 
    }
}

const firstUserValue = askNumber('enter the first number');

let secondUserValue = askNumber('enter the second number');

const userOperator = askOperator('enter the operator, example: "+" , "-", "*", "/" ');

validateCalculation (secondUserValue, userOperator);

const result = calculate(firstUserValue, secondUserValue, userOperator);
alert(result);


