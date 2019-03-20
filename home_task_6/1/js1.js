// Задание 1
// С помощью prompt просим пользователя ввести число. Обязательно валидируем ввод.
// Затем с помощью alert выводим сколько в этом числе было четных цифр.
// Например 223344 - должен вернуть 4, 111 - должен вернуть 0.




function askNumber(question){
    const value = prompt(question,'').trim();
    const isValidValue = getIsValueValid(value);

    if (!isValidValue) {
        alert('invalid value');
        return askNumber('repeat');
    }
    return value;
}

function getIsValueValid(value) {
    const isNanValue = isNaN(value);
    const isEmptyString = value === '';
    const wasCanceled = value === null;

    return !(isNanValue || isEmptyString || wasCanceled);
}

function hasRemainder(value) {
    return value %  2 !== 0;
}


const userValue = askNumber('enter the number');
let count = 0 ;

for (let i = 0; i < userValue.length; i++){
    if (!hasRemainder(userValue[i]) ) {
        count ++;
    }
}

alert('quantity of even numbers ' + count);