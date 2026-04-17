import sum, { minus, user } from "./app.js"
const number1 = 99;
const number2 = 44;

let total = sum(number1, number2);

let totalMinus = minus(number1, number2);

console.log("Total", total)
console.log("totalMinus", totalMinus);
console.log("user", user)