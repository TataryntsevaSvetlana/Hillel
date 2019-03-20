// Задание 2
// генерируем два рандомных целых числа от 1000 до 2000 и выводим большее из них.

const MIN_LIMIT = 1000;
const MAX_LIMIT = 2000;

function getRandomNumberInRange(min, max){
    const range = max - min;

    return Math.round((Math.random() * range) + min);
}

function getGreaterNumber(value1, value2){
    return Math.max(value1, value2);
}

const firstValue = getRandomNumberInRange(MIN_LIMIT, MAX_LIMIT);
alert ('the first random number is '+ firstValue);

const secondValue = getRandomNumberInRange(MIN_LIMIT, MAX_LIMIT);
alert ('the second random number is '+ secondValue);

const result = getGreaterNumber(firstValue, secondValue);
alert('the greater number is '+ result);

