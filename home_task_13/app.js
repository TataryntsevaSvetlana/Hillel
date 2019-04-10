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

Hamburger.CHEES = 'CHEES';
Hamburger.CHEES_COST = 10;
Hamburger.CHEES_CALORIES = 20;

Hamburger.SALAD = 'SALAD';
Hamburger.SALAD_COST = 20;
Hamburger.SALAD_CALORIES = 5;

Hamburger.POTATOES = 'POTATOES';
Hamburger.POTATOES_COST = 15;
Hamburger.POTATOES_CALORIES = 10;

Hamburger.DRESSING = 'DRESSING';
Hamburger.DRESSING_COST = 15;
Hamburger.DRESSING_CALORIES = 0;

Hamburger.SOUSE = 'SOUSE';
Hamburger.SOUSE_COST = 20;
Hamburger.SOUSE_CALORIES = 5;

Hamburger.SIZE_SMALL = 'SIZE_SMALL';
Hamburger.SIZE_SMALL_COST = 50;
Hamburger.SIZE_SMALL_CALORIES = 20;

Hamburger.SIZE_BIG = 'SIZE_BIG';
Hamburger.SIZE_BIG_COST = 100;
Hamburger.SIZE_BIG_CALORIES = 40;


function Hamburger(size, ingridient){
    this._price = 0;
    this._calories = 0;

    if (size === Hamburger.SIZE_SMALL) {
        this._price += Hamburger.SIZE_SMALL_COST;
        this._calories += Hamburger.SIZE_SMALL_CALORIES;

    } else {
        this._price += Hamburger.SIZE_BIG_COST;
        this._calories += Hamburger.SIZE_BIG_CALORIES;
    }
       
    this.addIngridient(ingridient);    
}

Hamburger.prototype._updateValues = function(price, calories) {
    this._price += price;
    this._calories += calories;
}
 
Hamburger.prototype.addIngridient = function(ingridient) {
    if (ingridient === Hamburger.CHEES) {
        this._updateValues(Hamburger.CHEES_COST, Hamburger.CHEES_CALORIES)

    } else if (ingridient === Hamburger.SALAD) {
        this._updateValues(Hamburger.SALAD_COST, Hamburger.SALAD_CALORIES)

    } else if (ingridient === Hamburger.POTATOES) {
        this._updateValues(Hamburger.POTATOES_COST, Hamburger.POTATOES_CALORIES)

    } else if (ingridient === Hamburger.DRESSING) {
        this._updateValues(Hamburger.DRESSING_COST, Hamburger.DRESSING_CALORIES)

    } else if (ingridient === Hamburger.SOUSE) {
        this._updateValues(Hamburger.SOUSE_COST, Hamburger.SOUSE_CALORIES)
    }
} 

Hamburger.prototype.calculatePrice = function calculatePrice() {
    return ('Price: ' +  this._price);
};

Hamburger.prototype.calculateCalories = function calculateCalories() {
    return ('Calories: ' + this._calories);
};

const hamburger = new Hamburger(Hamburger.SIZE_BIG, Hamburger.POTATOES);

console.log('Calories: ' + hamburger.calculateCalories());
console.log('Price: ' + hamburger.calculatePrice());

