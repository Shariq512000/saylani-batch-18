let currentDate = new Date();
// let strDate = currentDate.toString()
// console.log(strDate);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
let months = ["January", "Febuary", "March", "April"]
// console.log(days[currentDate.getDay()]);

let day = currentDate.getDay();
let month = currentDate.getMonth();
let date = currentDate.getDate();
let year = currentDate.getFullYear();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let seconds = currentDate.getSeconds();
let miliseconds = currentDate.getMilliseconds();
let timeInMilliseconds = currentDate.getTime();

let formattedDate = `${days[day]} ${date} ${months[month]} ${year} ${hours}:${minutes}:${seconds}`

// console.log(formattedDate)
console.log(timeInMilliseconds);

// "Monday 19 January 2026 10:01:55"


// console.log("day", day)
// console.log("month", month)
// console.log("date", date)
// console.log("year", year)
// console.log("hours", hours)
// console.log("minutes", minutes)
// console.log("seconds", seconds)
// console.log("miliseconds", miliseconds)