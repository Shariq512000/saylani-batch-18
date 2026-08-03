// let a = ["1", "2", "3"];
// let b = a;
// b.push("4");

// console.log(a);
// console.log(b);




// let a = 5;
// let b = a

//Block = ["1", "2", "3", "4"]

// let c = ["1", "2", "3"] // Block 3
// let d = c;  // Block 3 wali value
// d.push("4")

// let c = ["1", "2", "3"] // Block 3
// let d = [...c]; //Refference Break
// d.push("4")

// console.log(c)
// console.log(d)

// {},[],() // Reference
// true,"string",5 // primitive




//number, string, boolean, any, unknown, null, undefined

// let number: number = 5;
// let str: string = "str";
// let bool: boolean = false;

// abc = "test"

// let test: any = "Test";
// test = 5
// test.toLowerCase();

// let test: unknown = "test";
// // test = 5
// // test = true

// if(typeof test == "string"){
//     test.toLowerCase()
// }

// let empty: string | null = null

// let arr: (number | string)[] = [];

//tuples

// let tpl:[string, number] = ["abc", 5];

//Object

type Age = number



type Student = {
    name: string,
    age:Age,
    address?: string,
    rollNumber: number
}

let user1:Student = {
    name: "Student1",
    age: 20,
    rollNumber: 123,
    address: "H#275"
}

let user2:Student = {
    name: "Student1",
    age: 20,
    rollNumber: 123,
    address: "H#275"
}

let teacher: Student & {salary:number} = {
    name: "Teacher",
    age: 23,
    rollNumber: 1001564,
    salary: 5000
}


// enum CardinalDirections {
//     North = "north",
//     East= "east",
//     South= "south",
//     West= "west"
// }

// enum CardinalDirections {
//     North,
//     East,
//     South,
//     West
// }

// console.log(CardinalDirections.South)

// enum Status {
//     NotFount = 404,
//     ServerError = 500,
//     BadRequest = 400,
//     Unautorized = 401
// }

// function checkStatus(status: Status){

// }

// checkStatus(Status.NotFount)

enum Role{
    Admin = "admin",
    ShopOwner="shop owner",
    Customer="customer"
}


function checkRole(role: Role){

}

checkRole(Role.Admin)