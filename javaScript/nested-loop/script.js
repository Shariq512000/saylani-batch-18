// i = 5
// j = 0

let firstNames = ["BlueRay", "Upchuck", "Lojack", "Gizmo", "Do-Rag"]
let lastNames = ["Zzz", "Burp", "Dogbone", "Droop", "last"]

// BlueRay Zzz
// BlueRay Burp
// BlueRay Dogbone
// BlueRay Droop
// Upchuck Zzz
// Upchuck Burp
// Upchuck Dogbone
// Upchuck Droop
// Lojack Zzz
// Lojack Burp
// Lojack Dogbone
// Lojack Droop

// i = 5,    j = 0
//                      5
// for(let i = 0; i < firstNames.length; i++){
// //                           5
//     for(let j=0; j < lastNames.length; j++){

//         console.log(firstNames[i], lastNames[j])

//     }

// }

// 1
// 12
// 123
// 1234

// i = 5, j = 5

// for(let i=1; i <= 4; i++){

//     ///          "1234"
//     let output = ""

//     //             5 <= 4
//     for(let j = 1; j <= i; j++){

//         output = output + j

//     }

//     console.log(output)

// }

let count = 0;

// i = 1
// j = 1
// k = 0

for(let i = 0; i < 5; i++){

    for(let j = 0; j < 5; j++){

        for(let k = 0; k < 5; k++){
            console.log(i, j, k)
            count++
        }

    }

}

console.log(count);

// for(let i=0; i < 5; i++){

//     for(let j=0; j < 5; j++){
//         console.log(i, j)
//     }
//     //i++
// }


console.log("End Of Loop")