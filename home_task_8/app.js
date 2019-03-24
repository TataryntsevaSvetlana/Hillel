// С помощью prompt спросить у пользователя как его зовут, проверить что пользователь что-то ввел. В H1 записываем "Hello, <<то что ввел пользователь>>!" 
// С помощью prompt просим пользователя ввести число, от 0 до 100. Валидируем ввод.
// добавляем в body элемент UL, а в нем столько элементов LI сколько пользователь ввел.
// В LI цифрой должен быть написан его порядковый номер. 

function askQuestion(question){ 
    const answer = prompt(question,'').trim();

    const isValidAnswer = isStringValid(answer);
    
    if (!isValidAnswer) {
        alert('invalid value');
        return askQuestion('repeat');
    } 
    return answer;
}

function isStringValid(answer) {
    const isString = isNaN(answer);
    const isEmptyString = answer === '';
    const wasCanceled = answer === null;

    return isString && !isEmptyString && !wasCanceled;
}

function askNumber(question){ 
    const number = prompt(question,'');
    const isValidNumber = getIsNumberValid(number);

    if (!isValidNumber) {
        alert('invalid number');
        return askNumber('repeat');
    } 
    return number;
}

function getIsNumberValid(number) {
    return number <= 100 && number > 0;
}


const userName = askQuestion('What is your name?');

const title = document.getElementsByTagName('h1')[0];
title.innerText = 'Hello, ' + userName;

const userNumber = askNumber('Please enter the number from 0 to 100');

const unorderedList = document.createElement('ul');
document.body.appendChild(unorderedList);

for (var i = 1 ; i <= +userNumber; i++) {
    const listItem = document.createElement('li');
    listItem.innerHTML = i;
    unorderedList.appendChild(listItem);
    console.log(listItem);
}