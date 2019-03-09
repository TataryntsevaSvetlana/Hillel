const inputValueSeconds = 567545;

const SECONDS_IN_DAY = 86400;
const SECONDS_IN_HOUR = 3600;
const SECONDS_IN_MINUTE = 60;

const quantityDays = Math.floor(inputValueSeconds / SECONDS_IN_DAY);
const remainderDays = inputValueSeconds % SECONDS_IN_DAY;

const quantityHours = Math.floor(remainderDays / SECONDS_IN_HOUR);
const remainderHours = remainderDays % SECONDS_IN_HOUR;

const quantityMinutes = Math.floor(remainderHours / SECONDS_IN_MINUTE);
const quantitySeconds = remainderHours % SECONDS_IN_MINUTE;


const result = inputValueSeconds + 's.= ' + quantityDays  + 'days ' + quantityHours + 'hrs ' + quantityMinutes + 'mins ' + quantitySeconds + 'secs'
console.log(result);
