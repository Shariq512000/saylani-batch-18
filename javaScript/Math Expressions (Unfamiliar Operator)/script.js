
// let num1 = 5;

// alert(num1++);alert(num1)


// alert(num1++)       // Post Increment Pehle Value Return Krta hai Baad mai Update krta hai
// alert(++num1)      // Pre Increment Pehle Update Krta hai Baad mai Return krta hai



// num1++        // Agar Baad mai + laga hua hai to Post Increament
// num1--       //  Agar Baad mai - laga hua hai to Post Decreament
// ++num1      //  Agar Pehle + laga hua hai to Pre Increament
// --num1     //  Agar Pehle - laga hua hai to Pre Decrement

// num1 = num1+1
// num1 = num1+1

// alert(num1)


let num1 = 8
let num2 = -3

//      num1 = 13
//             8    +   10   -   10   +   11   +   13
// let result = num1++ + ++num1 - num1++ + num1++ + ++num1;


// num1 = 9, num2 = -4

//             7    +   7    +   9    -   -4   +  -4    +  -4
let result = --num1 + num1++ + ++num1 - --num2 + num2-- + ++num2;

alert(result)
alert(num1)

// 19       ---> Ubaid, Maaz, Zaheer
// 24       ---> Uziar, Zayan, Mosa
// 30       ---> Faizan