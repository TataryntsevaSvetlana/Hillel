// Функция calculator
// Написать функцию calculator, которую можно будет использовать следующим образом

// const value = calculator(10);

// value.add(45) // возвращает 55
// value.sub(45) // возвращает -35
// value.divide(5) // возвращает 2
// value.mult(5) // возвращает 50
// value.set(100) // устанавливает базовое значение в 100
// value.get() // возвращает базовое значение (в данный момент 100)

// value.mult(5) // возвращает 500

function calculator(number) { 
    let primaryValue = number;

    return {
        add: function(value) {
            return primaryValue + value;
        },  
        sub: function(value) {
            return primaryValue - value;
        },
        divide: function(value) {
            return primaryValue / value;
        },
        mult: function(value) {
            return primaryValue * value;
        },  
        set: function(value) {
            primaryValue = value;
        },
        get: function() {
            return primaryValue;
        }
    }
}

const value = calculator(20);


