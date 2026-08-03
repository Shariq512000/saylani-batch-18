"use strict";
// class Student{
//     // private name: string
//     constructor(private name: string){
//         this.name = name
//     }
//     getName(){
//         return this.name
//     }
// }
class Rectangle {
    width;
    height;
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
}
