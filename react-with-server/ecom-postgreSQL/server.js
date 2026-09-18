import express from "express";
import { db } from "./db.js"
import cors from "cors";
import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";
import jwt from 'jsonwebtoken';
import "dotenv/config"

const app = express();
const PORT = 5000;
const SECRET = process.env.JWT_SECRET

//CRUD
// UserID INT PRIMARY KEY,

app.use(cors())
app.use(express.json());

// app.get('/', (req, res) => {
//     const nanoid = customAlphabet("1234567890", 6);
//     res.send(nanoid())
// })

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


// query, url parameter

// "/api/:id" --> url
// req.params.id
// /api?category=1&name=mobile
// req.query.name


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

// app.post("/student", async (req, res) => {
//     const reqBody = req.body;
//     if (!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNumber || !reqBody.age) {
//         res.status(400).send({ status: "error", message: "Required Parameter Missing" })
//         return;
//     }

//     try {
//         const dbRes = await db.query(`INSERT INTO students (first_name, last_name, course, batch, roll_number, age) 
//         VALUES 
//         ($1, 
//         $2, 
//         $3, 
//         $4, 
//         $5, 
//         $6);`, [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNumber, reqBody.age])
//         res.status(201).send({ status: "success", message: "Student Added Successfully" })
//     } catch (error) {
//         console.log("Err", error);
//         res.status(500).send({ status: "error", message: "Internal Server Error" })
//     }
// })

// app.get("/students", async (req, res) => {
//     try {
//         const students = await db.query(`SELECT * from students;`);
//         // const students = await db.query(`SELECT id AS student_id, first_name || ' ' || last_name AS full_name from students;`);
//         // const students = await db.query(`SELECT * from students WHERE age = 'Python'`);LIMIT 20
//         // const students = await db.query(`SELECT * from students ORDER BY first_name`);
//         // const students = await db.query(`SELECT * from students LIMIT 20 OFFSET 20`);
//         // const students = await db.query(`SELECT MIN(age) FROM students;`);
//         // console.log("Students", students)
//         res.status(200).send({ status: "success", students: students.rows });
//     } catch (error) {
//         res.status(500).send({ status: "error", message: "Internal Server Error" })
//     }
// })
// // /student/6
// app.put("/student/:id", async (req, res) => {
//     const studentId = req.params.id; //6
//     // firstName, lastName, course, batch, rollNumber, age
//     const reqBody = req.body;
//     if (!reqBody.firstName || !reqBody.lastName || !reqBody.course || !reqBody.batch || !reqBody.rollNumber || !reqBody.age) {
//         res.status(400).send({ status: "error", message: "Required Parameter Missing" })
//         return;
//     }

//     try {
//         const dbRes = await db.query(
//             `UPDATE students SET first_name = $1, last_name = $2, course = $3, batch = $4, roll_number = $5, age = $6 WHERE id = ${studentId};`,
//             [reqBody.firstName, reqBody.lastName, reqBody.course, reqBody.batch, reqBody.rollNumber, reqBody.age])
//         res.status(201).send({ status: "success", message: "Student Updated Successfully" })
//     } catch (error) {
//         console.log("Err", error);
//         res.status(500).send({ status: "error", message: "Internal Server Error" })
//     }
// })
// // /student/6
// app.delete("/student/:id", async (req, res) => {
//     const studentId = req.params.id; // 6

//     try {
//         const dbRes = await db.query(`DELETE FROM students WHERE id = ${studentId};`)
//         res.status(200).send({ status: "success", message: "Student Deleted Successfully" })
//     } catch (error) {
//         console.log("Err", error);
//         res.status(500).send({ status: "error", message: "Internal Server Error" })
//     }
// })

////////// NEW CODE ///////////////

// signup --> email=abc@gmail.com
// CREATE TYPE user_role AS ENUM ('buyer', 'seller', 'admin');
// CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,

//     first_name VARCHAR(100) NOT NULL,
//     last_name VARCHAR(100) NOT NULL,

//     email VARCHAR(255) NOT NULL UNIQUE,
//     password_hash TEXT NOT NULL,

//     role user_role NOT NULL DEFAULT 'buyer',

//     phone VARCHAR(20),

//     is_active BOOLEAN NOT NULL DEFAULT TRUE,

//     created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
// );

// let arr = ["1"]
// arr[0]

// jwt --> JSON Web Token

app.post('/signup', async (req, res) => {
    const reqBody = req.body;
    // {
    //     firstName, --> required
    //     lastName, --> required
    //     email, --> required
    //     password, --> required
    //     phone --> optional
    //     isSeller --> optional true/false
    // }
    if (!reqBody.firstName || !reqBody.lastName || !reqBody.email || !reqBody.password) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    try {
        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(reqBody.password, salt);
        const dbQuery = reqBody.isSeller ?
            `INSERT INTO users (first_name, last_name, email, password_hash, phone, role) VALUES ($1,$2,$3,$4,$5,$6);` :
            `INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES ($1,$2,$3,$4,$5);`
        const dbValues = reqBody.isSeller ?
            [reqBody.firstName, reqBody.lastName, reqBody.email, hash, reqBody.phone || "", 'seller'] :
            [reqBody.firstName, reqBody.lastName, reqBody.email, hash, reqBody.phone || ""]
        const dbRes = await db.query(dbQuery, dbValues);
        // const salt = bcrypt.genSaltSync(10);
        res.status(201).send({ status: "success", message: `user created with email: ${reqBody.email}` })
    } catch (error) {
        console.log("Err", error);
        if (error.code == '23505') {
            res.status(400).send({ status: "error", message: "User Already Logedin With This Email" })
        } else {
            res.status(500).send({ status: "error", message: "Internal Server Error" })
        }
    }
})

app.post('/login', async (req, res) => {
    const reqBody = req.body;
    // {
    //     email: shariq2@gmail.com,
    //     password: 123456
    // }
    if (!reqBody.email || !reqBody.password) {
        res.status(400).send({ status: "error", message: "required parameter missing" })
        return;
    }
    try {
        const users = await db.query(`SELECT * FROM users WHERE email = $1 AND is_active = true`, [reqBody.email]);
        // users:{
        //     rows:[
        //         {
        //             id: 6,
        //             first_name: "Shariq",
        //             last_name: "Siddiqui",
        //             email: "shariq2@gmail.com",
        //             password_hash: "$2b$12$CYUVwG0WgTriEMf/mtiiZegjOGWTbSqrU3v./OCmXLYb47F4/2hFy",
        //             role: "buyer",
        //             phone: "033333333",
        //             is_active: true,
        //         }
        //     ]
        // }
        const currentUser = users.rows[0]
        if (!currentUser) {
            res.status(404).send({ status: "error", message: "User Not Found With This Email" })
            return;
        }
        const isPassMatched = await bcrypt.compare(reqBody.password, currentUser.password_hash); // true
        if (!isPassMatched) {
            res.status(401).send({ status: "error", message: "Password did not matched" })
            return;
        }
        delete currentUser.password_hash;

        let userToken = jwt.sign({
            ...currentUser,
            iat: Date.now() / 1000, // miliseconds to seconds
            exp: (Date.now() / 1000) + (60 * 60 * 24)
        }, SECRET);

        res.cookie('Token', userToken, {
            maxAge: 86400000, // 1 day
            httpOnly: true,
            secure: true
        })

        res.status(200).send({ status: "success", user: currentUser })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})


// agar user login hai jb hi response jae wrna error aajae
// app.get('/products', (req, res) => {
//     res.send({
//         products: [
//             ...
//         ]
//     })
// })

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})