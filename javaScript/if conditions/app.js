console.log("JavaScript Connected!");





// if(condition){
//     block of code
// }

// if(false){
//     alert("This code works!");
// }

// var name = "meer";

// if(name === "Meer"){
//     alert("Welcome to our Page");
// }

//  " === " ===> Strictly Equality Operator! Checks Value and DataType
//  " == " Equality Operator! check value!
// " !== " Strictly Not Equal to Operator! 
// " != " Not Equal to Operator!

// " < " ===> Less than Operator , kam ho 
// " > " ===> Greater than Operator, Zyada ho
// " <= " ==> Less than Equal to, Kam ho ya phir iske barabar
// " >= " ==> Greater than Equal to , Zyada ya bhi iske barabar.


// var num = 10;

// if(num >= 10){
//     alert("The number is Greater than 10");
// }

// if(condition){
//     block of code
// }else{
//     block of code
// }


// var num = 10;

// if(num === "10"){
//     alert("if statement is working!");
// }else{
//     alert("Does not Match!");
// }



// if(condition){
//     block of code
// }else if(condition){
//     block of code
// }else{
//     block of code
// }












// var name = "meer";


// if(name === "Hafeez"){
//     alert("Hello Hafeez");
// }else if(name === "Ali"){
//     alert("Hello Ali!");
// }else if(name === "Meer"){
//     alert("Hello Meer!");
// }else{
//     alert("Hello, Guest!");
// }


// var temp = 35;

// if(temp > 30){
//     alert("Bohot Garmi hai bhai!");
// }


// var isOnline = true;

// if(isOnline){
//     alert("User Online hai!");
// }

// var marks = 45;

// if(marks >= 50){
//     alert("Pass!")
// }else{
//     alert("Fail")
// }

// var password = "1234";

// if(password === "admin"){
//     alert("Access granted!");
// }else{
//     alert("Access denied!");    
// }

// var light = "red";


// if(light === "green"){
//     alert("You can go!");    
// }else if(light === "yellow"){
//     alert("Ready to stop!");
// }else{
//     alert("Stop!")
// }

// var marks = 75;

// if(marks >= 90){
//     alert("A Grade");
// }else if(marks >= 70){
//     alert("B Grade");
// }else if(marks >=50){
//     alert("C grade");
// }else{
//     alert("Fail");
// }

// var time = 12;


// if(time < 12){
//     alert("Good Morning!");
// }else if(time < 18){
//     alert("Good afternoon");
// }else{
//     alert("Goodnight!");
// }

// var a = 10;
// var b = 5;

// if(a > b){
//     alert("A is bigger than B");
// }


// var age = 16;

// if(age < 18){
//     alert("Underage");
// }

// var x = 5;
// var y = "5";

// if(x == y){
//     alert("Dono barabar hain");
// }

// var x = 5;
// var y = "5";

// if(x === y){
//     alert("Equal hai.");
// }else{
//     alert("Equal nahi hai");
// }


// var a = 10;
// var b = 20;

// if(a != b){
//     alert("Dono alag hai.");    
// }


// var a = 10;
// var b = "10";

// if(a !== b){
//     alert("Value ya type match nahi huwa!");
// }

// AND Gate/Operator ==> dono condition match honi chaiye! tab true return karega!
// OR Gate/Operator ==> Koi bhi ek condition match honi chaiye! tab true return karta hai!


// AND ===> && 
// OR ===> || 


// AND && Operator


// var age = 20;
// var hasCNIC = false;
// // true             true ==== > true 

// // true         false ====> false
// if(age >= 18 && hasCNIC === true){
//     alert("Ap Vote De sakhte ho!");
// }else{
//     alert("Ap Vote Nahi de sakhte!");
// }

// var username = "admin";
// var password = "1234";


// if(username === "admin" && password === "1234"){
//     alert("Login Successful!");
// }else{
//     alert("Wrong input!");
// }



// OR || Operator 



// var isAdmin = false;
// var isMod = true;


// if(isAdmin || isMod){
//     alert("Dashboard Access!");
// }else{
//     alert("No Access!");
// }




// var age = 25;
// var city = "Karachi";
// var hasTicket = false;


// if((age >= 18 && city === "Karachi") || hasTicket){
//     alert("Entry Allowed!");
// }


// var marks = prompt("Enter your marks!");


// if(marks >= 90){
//     alert("Grade A");
// }else if(marks >= 70){
//     alert("Grade B");
// }else if(marks >= 50){
//     alert("Grade C");
// }else{
//     alert("Failed!");
// }


// var username = prompt("Type your username" , "meer");
// var password = prompt("Type your password" , "1234");


// if(username === "admin" && password === "admin1234"){
//     alert("Access Granted!");
// }else{
//     alert("No Access Granted!");
// }


// alert(y);

// var y = "Hello";
// alert(y);


// // alert(x);

// let x = "Hello World!";

// alert(x)

// var x = 10;

// var x = 20;

// let x = 20;

// let x = 40;


// nested conditions


// if(condition){
//     // block of code 

//     if(condition){
//         // block of code 
//     }
// }






// let username = prompt("Type Username");
// let password = prompt("Type Password");


// if(username === "admin"){
//     if(password === "12345"){
//         alert("Logged in!")
//     }else{
//         alert("Wrong password");
//     }
// }else{
//     alert("wrong username")
// }

let username = prompt("Type Username");
let password = prompt("Type Password");


if(username === "admin" && password === "12345"){
    alert("logged in!");
}else{
    alert("Wrong username or password!");
}
