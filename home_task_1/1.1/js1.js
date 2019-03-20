// Конвертор веса
// В переменной хранится какое-то число (граммы веса).
// С помощью console.log() вывести сколько это в килограммах, центнерах, тоннах.

// Пример сообщения 
// "123000g. = 123kg. = 1.23с = 0.123t"



const inputeValueGrams = 123000;

const GRAMS_PER_KG = 1000;
const GRAMS_PER_CENTNER = 100000;
const GRAMS_PER_TON = 1000000;

const kg = (inputeValueGrams / GRAMS_PER_KG);
const centner = (inputeValueGrams / GRAMS_PER_CENTNER);
const ton = (inputeValueGrams / GRAMS_PER_TON);

const result = inputeValueGrams + 'g.= ' + kg  + 'kg. = ' + centner + 'c = ' + ton + 't';

console.log(result);