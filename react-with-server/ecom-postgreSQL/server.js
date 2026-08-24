import express from "express";
import { db } from "./db.js"

const app = express();
const PORT = 5000;

//CRUD
// UserID INT PRIMARY KEY,

app.use(express.json());

app.get('/', (req, res) => {
    // db.query(`CREATE TABLE students (
    //     firstName VARCHAR(255),
    //     lastName VARCHAR(255),
    //     course VARCHAR(255),
    //     batch VARCHAR(255),
    //     rollNumber VARCHAR(255),
    //     age INT
    //   );`)
    res.send("Hello World");
});

app.post("/student", async (req, res) => {
    // firstName, lastName, course, batch, rollNumber, age
    const reqBody = req.body;
    if (!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNumber || !reqBody.age) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }

    try {
        const dbRes = await db.query(`INSERT INTO students (firstName, lastName, course, batch, rollNumber, age) 
        VALUES 
        ('${reqBody.firstName}', 
        '${reqBody.lastName}', 
        '${reqBody.course}', 
        '${reqBody.batch}', 
        '${reqBody.rollNumber}', 
        ${reqBody.age});`)
        res.status(201).send({ status: "success", message: "Student Added Successfully" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.get("/students", async (req, res) => {
    try {
        const students = await db.query(`SELECT * from students`);
        // console.log("Students", students.rows)
        res.status(200).send({ status: "success", students: students.rows });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})