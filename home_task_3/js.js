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
