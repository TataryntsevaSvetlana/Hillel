const minLimit = 1000;
const maxLimit = 2000;

function getRandomNumberInRange(min, max){
    const range = max - min;

    return Math.round((Math.random() * range) + min);
}

function getGreaterNumber(value1, value2){
    const result = Math.max(value1, value2);
    return result;
}

const firstValue = getRandomNumberInRange(minLimit, maxLimit);
alert ('the first random number is '+ firstValue);

const secondValue = getRandomNumberInRange(minLimit, maxLimit);
alert ('the second random number is '+ secondValue);

const result = getGreaterNumber(firstValue, secondValue);
alert('the greater number is '+ result);

