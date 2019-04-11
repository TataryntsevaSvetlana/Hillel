// Гамбургер
// Сеть фастфудов предлагает несколько видов гамбургеров:
// маленький (50 тугриков, 20 калорий)
// большой (100 тугриков, 40 калорий)

// Гамбургер может быть с одним из нескольких видов начинок:
// сыром (+ 10 тугриков, + 20 калорий)
// салатом (+ 20 тугриков, + 5 калорий)
// картофелем (+ 15 тугриков, + 10 калорий)

// Можно добавить добавки:
// посыпать приправой (+ 15 тугриков, 0 калорий)
// полить майонезом (+ 20 тугриков, + 5 калорий).

// Напишите программу, расчитывающую стоимость и калорийность гамбургера. Используй ООП подход (подсказка: нужен класс Гамбургер, константы, методы для выбора опций и рассчета нужных величин).

// Пример работы кода:

// // маленький гамбургер с начинкой из сыра
// const hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// // добавка из майонеза
// hamburger.addTopping(Hamburger.TOPPING_MAYO);
// // спросим сколько там калорий
// console.log(“Calories: “ + hamburger.calculateCalories());
// // сколько стоит
// console.log("Price: “ + hamburger.calculatePrice());

// // я тут передумал и решил добавить еще приправу
// hamburger.addTopping(Hamburger.TOPPING_SAUCE);
// // А сколько теперь стоит?
// console.log("Price with sauce: “ + hamburger.calculatePrice());


Hamburger.ingridients = {
    chees: {price: 10, calories: 20, name: 'chees'},
    salad: {price: 20, calories: 5, name: 'salad'},
    potatoes: {price: 15, calories: 10, name: 'potatoes'},
    dressing: {price: 15, calories: 0, name: 'dressing'},
    souse: {price: 20, calories: 5, name: 'souse'},
};

Hamburger.sizes = {
    small: {price: 50, calories: 20, name: 'small hamburger'},
    big: {price: 100, calories: 40, name: 'big hamburger'},
}

function Hamburger(size, ingridient) {
    this._price = 0;
    this._calories = 0;
    this._ingridients = [];
    this._size;

    this._calculateCaloriesAndPriceBySize(size);
    this.addIngridient(ingridient);
}

Hamburger.prototype._calculateCaloriesAndPriceBySize = function(size) {
    this._calculationPriceAndCalories(size.price, size.calories)
    this._size = size.name;
}

Hamburger.prototype._calculationPriceAndCalories = function(price, calories) {
    this._price += price;
    this._calories += calories;
}

Hamburger.prototype.addIngridient = function(ingridient) {
   this._calculationPriceAndCalories(ingridient.price, ingridient.calories);
   this._ingridients.push(ingridient);
}

Hamburger.prototype.calculatePrice = function calculatePrice() {
    return ('Price: ' +  this._price);
};

Hamburger.prototype.calculateCalories = function calculateCalories() {
    return ('Calories: ' + this._calories);
};

const hamburger = new Hamburger(Hamburger.sizes.big, Hamburger.ingridients.chees);

console.log('Calories: ' + hamburger.calculateCalories());
console.log('Price: ' + hamburger.calculatePrice());
console.log(hamburger);

