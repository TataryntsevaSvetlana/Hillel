// Написать функцию которая будет делать полную (с учетом вложенностей) копию объекта.

// Ожидаю что использовать ее можно будет так:

// const obj = {name: 'Alex', age: 33, adress: { country: 'UA', city: 'Dnipro'}}
// const objCopy = copy(obj);


const obj = {
    name: 'Piter',
    age: 53,
    address: {
        country: 'UA',
        city: 'Dnipro',
        null: [1, ,2, 3 , undefined, null, { null: undefined}]
    },
    surname: 'Jones',
    status: ['Jane', 3 ]
}


function copyObject(obj){
    let copy = Array.isArray(obj) ? [] : {};

    for (let key in obj) {
   
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            copy[key] = copyObject(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}

const objCopy = copyObject(obj);

console.log(objCopy);


