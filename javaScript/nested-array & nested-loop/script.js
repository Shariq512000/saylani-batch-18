let arr = [
    ["First Array First Item", "First Array Second Item", "First Array Third Item"],
    ["Second Array First Item", "Second Array Second Item", "Second Array Third Item", "Second Array Forth Item"],
    ["Third Array First Item"],
    ["Forth Array First Item", "Forth Array Second Item"]
]

let threeDimensionalArray = [
    [
        ["Array First Then First Child And First Item", "Array First Then First Child And Second Item"],
        ["Array First Then Second Child And First Item"],
        ["Array First Then Third Child And First Item", "Array First Then Third Child And Second Item", "Array First Then Third Child And Third Item"]
    ],

    [
        ["Array Second Then First Child And First Item", "Array Second Then First Child And Second Item"],
        ["Array Second Then Second Child And First Item"]
    ],

    [
        ["Array Third Then First Child And First Item", "Array Third Then First Child And Second Item"]
    ],

    [
        ["Array Forth Then First Child And First Item", "Array Forth Then First Child And Second Item"],
        [],
        ["Array Forth Then Third Child And First Item"],
        ["Array Forth Then Forth Child And First Item", "Array Forth Then Forth Child And Second Item"]
    ]
]

for(let i = 0; i < threeDimensionalArray.length; i++){
    for(let j = 0; j < threeDimensionalArray[i].length; j++){
        for(let k = 0; k < threeDimensionalArray[i][j].length; k++){
            console.log(threeDimensionalArray[i][j][k])
        }
    }
}

// console.log(threeDimensionalArray[3][2][0])


// i = 3
// j = 3

// for(let i=0; i < arr.length; i++){
//     for(let j=0; j < arr[i].length; j++){
//         console.log(arr[i][j])
//     }
// }

// console.log(arr[1][1])