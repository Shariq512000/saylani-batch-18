"use strict";
// let a = ["1", "2", "3"];
// let b = a;
// b.push("4");
let user1 = {
    name: "Student1",
    age: 20,
    rollNumber: 123,
    address: "H#275"
};
let user2 = {
    name: "Student1",
    age: 20,
    rollNumber: 123,
    address: "H#275"
};
let teacher = {
    name: "Teacher",
    age: 23,
    rollNumber: 1001564,
    salary: 5000
};
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
var Role;
(function (Role) {
    Role["Admin"] = "admin";
    Role["ShopOwner"] = "shop owner";
    Role["Customer"] = "customer";
})(Role || (Role = {}));
function checkRole(role) {
}
checkRole(Role.Admin);
