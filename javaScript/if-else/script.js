// let age = 17

// if(age >= 18){
//     alert("You are Adult")
// }else{
//     alert("You are not Adult")
// }
                    // "600"
let totalMark = prompt("Enter Your Total Marks")
                    // "450"
let obtainedMark = prompt("Enter Your Obtained Marks")
                    // 600
let totalMarkInNum = Number(totalMark)
                    // 450
let obtainedMarkInNumber = Number(obtainedMark)

let percentage = obtainedMarkInNumber / totalMarkInNum * 100;

console.log(percentage)

let grade = (percentage >= 80) ? "A+" : (percentage >= 70) ? "A" : (percentage >= 60) ? "B" : (percentage >= 50) ? "C" : (percentage >= 40) ? "D" : (percentage >= 33) ? "E" : "F"

alert(grade)

// if(percentage >= 80){
//     alert("A+")
// }else if(percentage >= 70){
//     alert("A")
// }else if(percentage >= 60){
//     alert("B")
// }else if(percentage >= 50){
//     alert("C")
// }else if(percentage >= 40){
//     alert("D")
// }else if(percentage >= 33){
//     alert("E")
// }else{
//     alert("Failed")
// }

// let num1 = "500";
// let num2 = "365";

// console.log(Number(num1) + Number(num2));



// let age = 25

// if(age <= 18){
//     alert("First Block")
// }else if(age == 25){
//     alert("Second Block")
// }else if(age <= 25){
//     alert("Third Block")
// }else{
//     alert("Else Block")
// }