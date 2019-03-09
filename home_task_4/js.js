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
