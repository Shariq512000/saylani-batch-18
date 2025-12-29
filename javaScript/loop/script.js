//     1         2     4
// for(let i = 1; i <= 20; i++){
//     // console.log(i)        // ---> 3
//     //              2 x 1 = 2
//     //              2 x 2 = 4
//     //              2 x 3 = 6
//     console.log("2 x " + i + " = " + i * 2)
//     // i++
// }



let userCity = "Ziyarat"  /// user input

let cities = ["Karachi", "Lahore", "Islamabad", "Peshawar", "Quetta", "Hydrabad", "Larkana"]

let isMatched = false;

for(let i=0; i < cities.length; i++){

    if(cities[i] == userCity){
        isMatched = true;
        break;
    }
    
}

// console.log(5 < 6)

if(isMatched){
    alert("City Matched")
}else{
    alert("City Did Not Matched")
}

console.log("End Of Loop");




// console.log(cities.length);

// for(let i = 0; i < cities.length; i++){
//     console.log(cities[i])
//     if(userCity == cities[i]){
//         console.log("City Matched")
//         break;
//     }
// }

// if(userCity == cities[0]){
//     console.log("City Matched")
// }else if(userCity == cities[1]){
//     console.log("City Matched")
// }else if(userCity == cities[2]){
//     console.log("City Matched")
// }else if(userCity == cities[3]){
//     console.log("City Matched")
// }else if(userCity == cities[4]){
//     console.log("City Matched")
// }else{
//     console.log("City Does Not Matched")
// }

// console.log(cities[0])

// console.log("End Of Loop")



// 2018 ---> 2025   [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]

// let yearArray = []

// console.log("Start Of Loop", yearArray)
// for(let i = 2018; i <= 2025; i++){
//     yearArray.push(i)
// }
// console.log("End Of Loop", yearArray)

// for(let i=0; i < 5; i++){
//     console.log(i)
// }

// console.log("End Of Loop")