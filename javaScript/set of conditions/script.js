// Age 18 se 24 ho
// && AND Operator
// || OR Operator

// let age = 24;
// let nationality = "PK";
// let education = "Intermediate";
// let experience = 2;

// //     true  &&    true   &&           true      &&     false
// if(age >= 18 && age <= 24 && nationality == "PK" && ( education == "Bechelor" || experience >= 3 )){
//     alert("You Are Eligible!")
// }else{
//     alert("You Are Not Eligible!")
// }

// if(false || false || false){

// }


// let num1 = 6;
// let num2 = 12;
// let num3 = 50;
// let num4 = 48;
// let num5 = -5;
// let city = "Karachi";

// if(
//     //false || true
//     (num1 < 6 && num2 == 5 || (num5 < 0 || num4 == 40)) || 
//     (city == "Karachi" && (num3 === "50" || num5 < 0))
// ){
//     alert("IF CONDITION");
// }else{
//     alert("Else Condition")
// }

let num1 = 6;
let num2 = 12;
let num3 = 50;
let num4 = 48;
let num5 = -5;
let city = "Karachi";

if(city == "Karachi"){
    if(num2 > 5){
        if(false){
            alert("Nested2 If Condition")
        }else{
            alert("Nested2 Else");
        }
        alert("Nested If Condition")
    }else{
        alert("Nested Else");
    }
    
    alert("If Condition")
}else if(num1 == "6"){
    alert("Else If Condition")
}else if(city == "Lahore"){
    alert("Else If2 Condition")
}else{
    alert("Else");
}

alert("End Of Conditions");