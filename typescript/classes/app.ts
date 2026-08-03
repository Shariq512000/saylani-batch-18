// class Student{
//     // private name: string
//     constructor(private name: string){
//         this.name = name
//     }
//     getName(){
//         return this.name
//     }
// }

// class WebStudent extends Student{
    
// }

// let student1 = new Student("Test")

// console.log(student1.getName());

// class Person {
//     private readonly name: string;
  
//     public constructor(name: string) {
//       // name cannot be changed after this initial definition, which has to be either at its declaration or in the constructor.
//       this.name = name;
//     }

//     updateName(newName: string){
//         this.name = newName
//     }
  
//     public getName(): string {
//       return this.name;
//     }
// }

// const person = new Person("Jane");
// console.log(person.getName());


interface Shape {
    getArea: () => number;
}

class Rectangle implements Shape {
    public constructor(protected readonly width: number, protected readonly height: number) {}

    public getArea(): number {
        return this.width * this.height;
    }
}