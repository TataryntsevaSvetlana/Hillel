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
        street: {
            avenue: 'Y.Gagarina',
            house: 9
        }
    },
    surname: 'Jones',
    status: {
        wife: 'Jane',
        children: 3
    }
}


function copyObject(obj){
    let copy = {};

    for (let key in obj) {
   
        if (typeof(obj[key]) === 'object') {
            copy[key] = copyObject(obj[key]);
        } else {
            copy[key] = obj[key];
        }
    }
    return copy;
}

const objCopy = copyObject(obj);

console.log(objCopy);


