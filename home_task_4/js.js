// Опросник v2
// Реализовать опросник для пользователя,
// Задать ему, с помощью модальных окон, несколько вопросов и оценить его ответы.
// За правильный ответ начисляется 10 очков, за неправильный - 0.
// После прохода всех вопросов вывести, с помощью alert, результ.

// При обработке ответа пользователя не забудьте про валидацию, что введенные данные адекватны по типу. По возможности сообщите пользователю, где он не прав

// Вопросы для хранятся в массиве. Нужно с помощью цикла пройтись по всем элементам массива, для каждого вызвать функцию и передать в нее этот элемент.

// Эта функция должна задать вопрос пользователю, обработать результат и вернуть true или false, в зависимости от того правильный ответ или нет.
// В зависимости от результат мы добавляем или не добавляем очки пользователю.

// По возможности реализуйте валидацию (желательно в отдельной функции), 



const POINTS_FOR_RIGHT_ANSWER = 10;
let totalPoints = 0;
let arr =   [
                { question: 'Сколько будет 2+2?',
                answer: 4,
                type: 'prompt'
                },
                {
                question: 'Солнце встает на востоке?',
                answer: true,
                type: 'confirm'
                },
                {
                question: 'Сколько будет 5 << 2 ?',
                answer: 20,
                type: 'prompt'
                }
            ];

function askQuestion (question) {

    if (question.type === 'prompt') {
        return +prompt(question.question);
    } else {
        return confirm(question.question);
    }
}    

function validate(answer, question) {
    const isCorrectAnswer = answer === question.answer;

    if (isCorrectAnswer) {
        alert('Ответ правильный!');
    } else if (answer === null) {
        alert('Вы отменили ввод!');
    } else if (answer === '') {
        alert('Вы не ввели ответ');
    } else {
        alert('Ответ неправильный!');
    }
    return isCorrectAnswer;
}

for (let i = 0; i < arr.length; i++) {

    const answerForQuestion = askQuestion(arr[i]);
    const isValidAnswer = validate(answerForQuestion, arr[i]);

    if (isValidAnswer) {
        totalPoints += POINTS_FOR_RIGHT_ANSWER;
    } 

}  

alert('Ваше колличество баллов: ' + totalPoints);
