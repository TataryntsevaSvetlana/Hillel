// Реализовать опросник для пользователя,
// Задать ему, с помощью модальных окон, несколько вопросов и оценить его ответы.
// За правильный ответ начисляется 10 очков, за неправильный - 0.
// После прохода всех вопросов вывести, с помощью alert, результа.

// При обработке ответа пользователя не забудьте про валидацию, что введенные данные адекватны по типу. По возможности сообщите пользователю, где он не прав

// Вопросы:
// Сколько будет 2+2
// - ответ: 4

// Солнце встает на востоке? - это должен быть confirm
// - ответ 'OK' 

// Сколько будет 5 << 2 ?
// - ответ: 20


let totalPoints = 0;
const pointsForRightAnswer = 10;

const answerOne = prompt('Сколько будет 2+2 ?', '');
switch (answerOne) {
    case '4': {
        totalPoints += pointsForRightAnswer;
        break;
    }
    case null: {
        alert('Вы отменили ввод!');
        break;
    }
    case '': {
        alert('Вы не ввели ответ');
        break;
    }
    default: {
        alert('Ответ неправильный!');
    }
} 

const answerTwo = confirm('Солнце встает на востоке?');
if (answerTwo) {
    totalPoints += pointsForRightAnswer;
} else {
    alert('Ответ неправильный!');
}

const answerThree = prompt('Сколько будет 5 << 2 ?','');
if (answerThree === '20') {
    totalPoints += pointsForRightAnswer;
} else if (answerThree === null) {
    alert('Вы отменили ввод!');
} else if (answerThree === '') {
    alert('Вы не ввели ответ');
} else {
    alert('Ответ неправильный!');
}

alert('Ваше колличество баллов: ' + totalPoints);
