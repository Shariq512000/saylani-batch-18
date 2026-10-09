import express from "express";
import { db } from "./db.js"
import cors from "cors";
import bcrypt from "bcryptjs";
import { customAlphabet } from "nanoid";
import jwt from 'jsonwebtoken';
import "dotenv/config"
import cookieParser from "cookie-parser";
import path from "path";

const app = express();
const PORT = 5000;
const SECRET = process.env.JWT_SECRET

//CRUD
// UserID INT PRIMARY KEY,

app.use(cors({ origin: ["http://localhost:3000", "*"], credentials: true }))
app.use(express.json());
app.use(cookieParser());

// "/"

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


// let arr = ["1"]
// arr[0]

// jwt --> JSON Web Token




// CREATE TABLE products (
//     id SERIAL PRIMARY KEY,

//     user_id INT NOT NULL,
//     category_id INT NOT NULL,

//     name VARCHAR(255) NOT NULL,
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     stock INT DEFAULT 0,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//         FOREIGN KEY (user_id)
//         REFERENCES users(id)
//         ON DELETE CASCADE,

//         FOREIGN KEY (category_id)
//         REFERENCES categories(id)
//         ON DELETE RESTRICT
// );


// SELECT
//     p.id,
//     p.name,
//     p.price,
//     p.stock,
//     u.id AS user_id,
//     c.id AS category_id
// FROM products p
// JOIN users u ON p.user_id = u.id
// JOIN categories c ON p.category_id = c.id;

////// NON SECURE APIS ///////





app.post('/api/v1/signup', async (req, res) => {
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
        const dbQuery = `INSERT INTO users (first_name, last_name, email, password_hash, phone) VALUES ($1,$2,$3,$4,$5);`
        const dbValues = [reqBody.firstName, reqBody.lastName, reqBody.email, hash, reqBody.phone || ""]
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

app.post('/api/v1/login', async (req, res) => {
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
            exp: (Date.now() / 1000) + (60 * 60 * 24) // add 1 day's second
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

////// SECURE APIS //////
// localhost:5000/api/v1/me



app.use("/api/v1/*splat", (req, res, next) => {
    if (!req?.cookies?.Token) {
        res.status(401).send({
            message: "Unauthorized"
        })
        return;
    }
    jwt.verify(req.cookies.Token, SECRET, (err, decodedData) => {
        if (!err) {

            // const decodedData = {
            //     id: 12,
            //     email: "shariqsiddqui5145@gmail.com",
            //     role: "admin",
            //     created_at: "03:05:2026",
            //     updated_at: "03:05:2026",
            // }

            const nowDate = new Date().getTime() / 1000;

            if (decodedData.exp < nowDate) {

                res.status(401);
                res.cookie('Token', '', {
                    maxAge: 1,
                    httpOnly: true,
                    // sameSite: "none",
                    secure: true
                });
                res.send({ message: "token expired" })

            } else {
                let userData = decodedData
                delete userData.iat
                delete userData.exp
                // {name: "abc", description: "des"}
                // {
                //     method: get
                //     url: '/user-detail'
                //     body: {abc: 123}
                //     user: {
                //         id: 6,
                //         first_name: "Shariq",
                //         last_name: "Siddiqui",
                //         email: "shariq2@gmail.com",
                //         role: "buyer",
                //         phone: "033333333",
                //         is_active: true,
                //     }
                // }
                req.user = userData

                next();
            }
        } else {
            res.status(401).send({ message: "invalid token" })
        }
    });
})



app.get('/api/v1/me', (req, res) => {
    res.send({ status: "success", user: req.user })
})


/////////////////// TABLE QUERIES /////////////////////

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


// CREATE TABLE IF NOT EXISTS categories(
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(100) NOT NULL UNIQUE,
//   description TEXT,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE products (
//     id SERIAL PRIMARY KEY,

//     category_id INT NOT NULL,

//     name VARCHAR(255) NOT NULL,
//     images Text[],
//     description TEXT,
//     price DECIMAL(10, 2) NOT NULL,
//     stock INT DEFAULT 0,

//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

//       FOREIGN KEY (category_id)
//         REFERENCES categories(id)
//         ON DELETE RESTRICT
// );


app.get("/api/v1/categories", async (req, res) => {
    try {
        const categories = await db.query("SELECT * FROM categories");
        res.send({ status: "success", categories: categories.rows })
    } catch (error) {
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

// /api/v1/products?page=1&limit=20&search=15 pro max&category=1

// search = 15 pro max,
// category = 1,
// minPrice = 500
// maxPrice = 5000
// sort = asd_price

// SELECT * FROM products WHERE category_id = category

app.get("/api/v1/products", async (req, res) => {
    const pageNum = parseInt(req.query.page || 1); // 2
    const contentLimit = parseInt(req.query.limit || 10); // 10
    const offset = (pageNum - 1) * contentLimit // 20
    // 1 = skip 0
    // 2 = skip 10
    // 3 = skip 20

    /// FILTERS ///
    const search = req.query.search;
    const category = parseInt(req.query.category);
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    const sort = req.query.sort;

    let conditions = []
    // let conditionValues = []
    // iPhone 14 pro max, 
    // iPhone 15 pro max, 
    // iPhone 14, 
    // iPhone 13
    // product name iPhone 15 pro max
    // search 15 pro max
    // iPhone 15 pro max = iPhone
    // maxPrice = 100000

    // if(search){
    //     conditions.push(`p.name LIKE %${search}%`)
    // }

    if (category) {
        conditions.push(`p.category_id = ${category}`)
    }
    if (minPrice) {
        conditions.push(`p.price >= ${minPrice}`)
    }
    if (maxPrice) {
        conditions.push(`p.price <= ${maxPrice}`) // 5000
    }


    try {
        // const products = await db.query("SELECT * FROM products");
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM products
        `;
        const totalProducts = await db.query(countQuery);

        const total = parseInt(totalProducts.rows[0].total); // 95 / 10 = 9.5
        const totalPages = Math.ceil(total / contentLimit); // 10

        const products = await db.query(`
            SELECT
                p.id,
                p.name,
                p.description,
                p.images,
                p.price,
                p.stock,
                c.name AS category_name,
                c.description AS category_description
            FROM products p
            JOIN categories c ON p.category_id = c.id ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""} ${sort ? `ORDER BY p.price ${sort == "des_price" ? "DESC" : "ASC"}` : ""} LIMIT ${contentLimit} OFFSET ${offset}
            `)
        res.send({
            status: "success",
            products: products.rows,
            pagination: {
                page: pageNum,
                limit: contentLimit,
                total: total,
                totalPages,
                hasNextPage: pageNum < totalPages,
                hasPreviousPage: pageNum > 1
            }
        })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

// const alphabat = ["abc", "def", "ghi"];
// alphabat.join(" AND ")
//"abc AND def AND ghi"


// req = {
//     method: "POST",
//     url: "/api/v1/category",
//     body: {
//         "name": "Electronic",
//         "description": "Test Test Test"
//     }
//     user: {
//          id: 6,
//          first_name: "Shariq",
//          last_name: "Siddiqui",
//          email: "shariq2@gmail.com",
//          role: "buyer",
//          phone: "033333333",
//          is_active: true,
//    }
// }


/// ADMIN APIS ///

app.use("/api/v1/*splat", (req, res, next) => {
    if (req.user.role != "admin") {
        res.status(401).send({ status: "error", message: "You Are Not Authorized For This Action" })
    } else {
        next();
    }
})

// req = {
//     method: "Post",
//     url: "/api/v1/category",
//     body: {
//         name: "Test",
//         description: "Test Description"
//     }
//     cookies: {
//         Token: "valid token"
//     },
//     user: {
//         id: 12,
//         email: "shariqsiddqui5145@gmail.com",
//         role: "admin",
//         created_at: "03:05:2026",
//         updated_at: "03:05:2026",
//     }
// }

app.post("/api/v1/category", async (req, res) => {
    // name --> required, description --> optional
    if (!req.body.name) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    try {
        const databaseRes = await db.query("INSERT INTO categories (name, description) VALUES ($1, $2)", [req.body.name, req.body.description || ""])
        res.status(201).send({ status: "success", message: "Category Added" })
    } catch (error) {
        console.log("Err", error)
        if (error.code == '23505') {
            res.status(400).send({ status: "error", message: "Category Already Exist" })
        } else {
            res.status(500).send({ status: "error", message: "Internal Server Error" })
        }
    }
})

app.post("/api/v1/product", async (req, res) => {
    const reqBody = req.body;
    if (!reqBody.name || !reqBody?.images?.length || !reqBody.price || !reqBody.category) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" });
        return;
    }
    try {
        const dbQuery = "INSERT INTO products (category_id,name,description,images,price,stock) VALUES ($1,$2,$3,$4,$5,$6)"
        const dbValues = [reqBody.category, reqBody.name, reqBody.description || "", reqBody.images, reqBody.price, reqBody.stock || 0]
        const dbRes = await db.query(dbQuery, dbValues);
        res.status(201).send({ status: "success", message: "Product Added Successful" })
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" })
    }
})

// CREATE TABLE employees (
//     id SERIAL PRIMARY KEY,
//     name VARCHAR(100) NOT NULL,
//     salary NUMERIC(10, 2),
//     department_id INT,
//     FOREIGN KEY (department_id)
//         REFERENCES departments(id)
// );

// SELECT
//     e.name,
//     d.department_name
// FROM employees e
// INNER JOIN departments d
//     ON e.department_id = d.id;

// agar user login hai jb hi response jae wrna error aajae
// app.get('/products', (req, res) => {
//     res.send({
//         products: [
//             ...
//         ]
//     })
// })



// app.get("/api/v1/products", async (req, res) => {
//     const {
//         page = 1,
//         limit = 10,
//         category,
//         search,
//         minPrice,
//         maxPrice,
//         sort
//     } = req.query;

//     const pageNum = Math.max(parseInt(page) || 1, 1);
//     const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
//     const offset = (pageNum - 1) * limitNum;

//     try {
//         const values = [];
//         const conditions = [];

//         // Category filter
//         if (category) {
//             values.push(category);
//             conditions.push(`p.category_id = $${values.length}`);
//         }

//         // Search filter
//         if (search) {
//             values.push(`%${search}%`);

//             conditions.push(`(
//                 p.name ILIKE $${values.length}
//                 OR p.description ILIKE $${values.length}
//             )`);
//         }

//         // Minimum price
//         if (minPrice) {
//             values.push(Number(minPrice));
//             conditions.push(`p.price >= $${values.length}`);
//         }

//         // Maximum price
//         if (maxPrice) {
//             values.push(Number(maxPrice));
//             conditions.push(`p.price <= $${values.length}`);
//         }

//         // WHERE clause
//         const whereClause =
//             conditions.length > 0
//                 ? `WHERE ${conditions.join(" AND ")}`
//                 : "";

//         // Sorting
//         let orderBy = "p.created_at DESC";

//         if (sort === "price_asc") {
//             orderBy = "p.price ASC";
//         }

//         if (sort === "price_desc") {
//             orderBy = "p.price DESC";
//         }

//         // Pagination
//         values.push(limitNum);
//         const limitIndex = values.length;

//         values.push(offset);
//         const offsetIndex = values.length;

//         const query = `
//             SELECT
//                 p.id,
//                 p.name,
//                 p.description,
//                 p.images,
//                 p.price,
//                 p.stock,
//                 c.name AS category_name,
//                 c.description AS category_description
//             FROM products p
//             JOIN categories c
//                 ON p.category_id = c.id
//             ${whereClause}
//             ORDER BY ${orderBy}
//             LIMIT $${limitIndex}
//             OFFSET $${offsetIndex}
//         `;

//         const products = await db.query(query, values);

//         res.send({
//             status: "success",
//             page: pageNum,
//             limit: limitNum,
//             products: products.rows
//         });

//     } catch (error) {
//         console.log("Err", error);

//         res.status(500).send({
//             status: "error",
//             message: "Internal Server Error"
//         });
//     }
// });

const __dirname = path.resolve();//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db
const __frontend = path.join(__dirname, './web/build')//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db\web\build
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})
