// 30 June 2035

let currentDate = new Date();
let targetedDate = new Date("June 30, 2035")
// YYYY-MM-DD or MMMM Date, YYYY

let currentTime = currentDate.getTime();
let targetedTime = targetedDate.getTime();

let diffInMiliseconds = targetedTime - currentTime;
let diffInDays = diffInMiliseconds / (1000 * 60 * 60 * 24)
// let diffInMinutes = diffInSeconds / 60
// let diffInHours = diffInMinutes / 60
// let diffInDays = diffInHours / 24

console.log(Math.floor(diffInDays));