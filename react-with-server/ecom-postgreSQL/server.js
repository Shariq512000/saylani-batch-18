import express from "express";
import { db } from "./db.js"

const app = express();
const PORT = 5000;

//CRUD
// UserID INT PRIMARY KEY,

app.use(express.json());

// app.get('/', async (req, res) => {
//     try {
//         await db.query(`CREATE TABLE IF NOT EXISTS students (
//             id SERIAL PRIMARY KEY,
//             first_name VARCHAR(255) NOT NULL,
//             last_name VARCHAR(255) NOT NULL,
//             course VARCHAR(255),
//             batch VARCHAR(255),
//             roll_number VARCHAR(255) UNIQUE,
//             age INT,
//             created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//           );`)
//         res.send("Hello World");

//     } catch (error) {
//         console.log("Err", error)
//     }
// });


// const imaginaryReq = {
//     method: "post",
//     url: "/student",
//     body: {
//         "firstName": "Shariq",
//         "lastName": "Siddiqui",
//         "course": "Web & App",
//         "batch": "18",
//         "rollNumber": "10011",
//         "age": 23
//     }
// }

app.post("/student", async (req, res) => {
    // firstName, lastName, course, batch, rollNumber, age
    const reqBody = req.body;
    if (!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNumber || !reqBody.age) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }

    try {
        const dbRes = await db.query(`INSERT INTO students (first_name, last_name, course, batch, roll_number, age) 
        VALUES 
        ($1, 
        $2, 
        $3, 
        $4, 
        $5, 
        $6);`, [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNumber, reqBody.age])
        res.status(201).send({ status: "success", message: "Student Added Successfully" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.get("/students", async (req, res) => {
    try {
        const students = await db.query(`SELECT * from students;`);
        // const students = await db.query(`SELECT id AS student_id, first_name || ' ' || last_name AS full_name from students;`);
        // const students = await db.query(`SELECT * from students WHERE course = 'Python'`);LIMIT 20
        // const students = await db.query(`SELECT * from students ORDER BY first_name`);
        // const students = await db.query(`SELECT * from students LIMIT 20 OFFSET 20`);
        // const students = await db.query(`SELECT MIN(age) FROM students;`);
        // console.log("Students", students)
        res.status(200).send({ status: "success", students: students.rows });
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.put("/student/:id", async (req, res) => {
    const studentId = req.params.id;
    // firstName, lastName, course, batch, rollNumber, age
    const reqBody = req.body;
    if (!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNumber || !reqBody.age) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }

    try {
        const dbRes = await db.query(`UPDATE students SET first_name = $1, last_name = $2, course = $3, batch = $4, roll_number = $5, age = $6 WHERE id = ${studentId};`,
            [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNumber, reqBody.age])
        res.status(201).send({ status: "success", message: "Student Added Successfully" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.delete("/student/:id", async (req, res) => {
    const studentId = req.params.id;

    try {
        const dbRes = await db.query(`DELETE FROM students WHERE id = ${studentId};`)
        res.status(201).send({ status: "success", message: "Student Added Successfully" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})