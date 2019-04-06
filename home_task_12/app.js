// Студены
// Написать функцию конструктор Student, которую я смогу использовать вот так:

// const students = [ 
//   new Student('Student 1', [10,9,8,0,10]), // имя, оценки
//   new Student('Student 12', [10,0,8,0,3,4])
//  ];
// У каждого студента должны быть методы

// averageMark() - возвращает среднюю оценку
// woksDone() - врзвращает количество сданных работ (у которых оценка больше 0)
// addMark(8) - добавляет еще одну оценку студенту
// Также написать функции

// averageMark() - которая возвращает среднюю оценку по группе
// completePercent() - процент сданных работ по группе

function Student(name, mark){
    this.name = name;
    this.mark = mark;
    this.averageMark = averageMark;
    this.worksDone = woksDone;
    this.addMark = addMark;
}

const students = [new Student('Student1', [10,0,9,7,9,8]),
                new Student('Student 2', [10,0,8,9,10,4]),
                new Student('Student 3', [7,0,9,10,5,4]),
                new Student('Student 4', [1,10,8,10,7,10]),
                new Student('Student 5', [7,0,9,10,7,9])
                ];

console.log(students);

function addMark(newMark){
    this.mark.push(newMark);
}

function averageMark(){
    const sumAllValue = this.mark.reduce((sum, current) => sum + current, 0);
    return Math.round(sumAllValue / this.mark.length);
}

function woksDone() {
    const newArr = this.mark.filter((item) => item > 0); 
    return  newArr.length;  
}

function getAverageMarkGroup(arr){
    const averageMark = arr.reduce((sum, item) => sum + item.averageMark(), 0);
    return Math.round(averageMark / arr.length);
}

function getCompletePercentGroup(arr){
    const quantityHomeWorks = arr.reduce((sum, item) => sum + item.mark.length, 0);
    const quantityHomeWorksDone = arr.reduce((sum, item) => sum + item.worksDone(), 0);
    const percentHomeWorksDone = (quantityHomeWorksDone / quantityHomeWorks) * 100;
  
    return percentHomeWorksDone.toFixed(2);
}