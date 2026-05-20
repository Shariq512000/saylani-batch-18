let str = "ABC"; //---> box1

let str2 = str; // ABC // string, number, boolean // ---> box3

str2 = "ABCD";

// console.log(str, str2);

let arr = ["1", "2", "3"]; // ---> box2

let arrNew = [...arr]; // ---> box4

arrNew.push("4");

console.log(arr, arrNew);

// jb me number, string, boolean assign krta hoon to value assign hota hai
// jb me object, array assign krta hoon to reference assign hota hai
