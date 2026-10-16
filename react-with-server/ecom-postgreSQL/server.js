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

// /profile

app.use("/api/v1/*splat", (req, res, next) => {
    if (!req?.cookies?.Token) {
        return res.status(401).send({
            message: "Unauthorized"
        });
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

// CREATE TABLE cart_items (
//     id SERIAL PRIMARY KEY,
//     user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
//     product_id INT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
//     quantity INT NOT NULL CHECK (quantity > 0),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     UNIQUE (user_id, product_id)   -- one row per product per user
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
    // 11 - 20
    const pageNum = parseInt(req.query.page || 1); // 2
    const contentLimit = parseInt(req.query.limit || 10); // 10
    const offset = (pageNum - 1) * contentLimit // 10
    // 1 = skip 0
    // 2 = skip 10
    // 3 = skip 20

    /// FILTERS ///
    const search = req.query.search; // iPhone
    const category = parseInt(req.query.category); // 1
    const minPrice = parseInt(req.query.minPrice); // 75000
    const maxPrice = parseInt(req.query.maxPrice); // 100000
    const sort = req.query.sort; // sort --> asc_price || des_price

    let conditions = []

    if (search) {
        conditions.push(`p.name ILIKE '%${search}%'`) // iPhone
    }

    if (category) {
        conditions.push(`p.category_id = ${category}`)
    }
    if (minPrice) {
        conditions.push(`p.price >= ${minPrice}`) //250
    }
    if (maxPrice) {
        conditions.push(`p.price <= ${maxPrice}`) // 800
    }


    try {
        // const products = await db.query("SELECT * FROM products");
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM products AS p ${conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""}
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
                page: pageNum, // 2
                limit: contentLimit, // 10
                total: total, // 95
                totalPages, // 10
                hasNextPage: pageNum < totalPages, //10 < 10 = false
                hasPreviousPage: pageNum > 1 // 1 > 1 = false
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

/// CART APIs ///

app.get("/api/v1/cart", async (req, res) => {
    try {
        // logedin user = 17
        //899.99 * 20 = 17,999.8
        const result = await db.query(
            `
            SELECT
                ci.product_id,
                ci.quantity,
                p.name,
                p.images,
                p.price,
                p.stock,
                (p.price * ci.quantity) AS subtotal
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.user_id = $1
            ORDER BY ci.created_at DESC
            `,
            [req.user.id]
        );

        // result.rows = 2 
        // [
        //     {
        //         product_id: 1,
        //         quantity: 10,
        //         name: "Test Product",
        //         images: [
        //             "http://res.cloudinary.com/dw2jrfzql/image/upload/v1790919225/zd4tyqchcpajorlgekhi.png"
        //         ],
        //         price: 250,
        //         stock: 15,
        //         subtotal: 2500
        //     },
        //     {
        //         product_id: 302, // 
        //         quantity: 20,
        //         name: "Samsung Galaxy S25",
        //         images: [
        //             "s25-front.jpg",
        //             "s25-back.jpg"
        //         ],
        //         price: 899.99,
        //         stock: 25,
        //         subtotal: 17999.8
        //     }
        // ]

        const total = result.rows.reduce((sum, item) => sum + parseFloat(item.subtotal), 0);

        // 0
        // [
        //     {name: "abc", price: 5},
        //     {name: "def", price: 15},
        //     {name: "ghi", price: 25},
        //     {name: "jkl", price: 17},
        // ].reduce((sum, item) => sum + item.price, 0)
        // 0 + 5, 5 + 15, 20 + 25, 45 + 17 = 62
        // [
        //     {name: "abc", price: 5},
        //     {name: "def", price: 15},
        //     {name: "ghi", price: 25},
        //     {name: "jkl", price: 17},
        // ].map((item) => {})

        res.send({ status: "success", items: result.rows, total: total.toFixed(2) });
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
});

// ADD to cart (increments if already in cart)
//{productId: 1, quantity: 5}

app.post("/api/v1/cart", async (req, res) => {
    const productId = parseInt(req.body.productId); // 302
    const quantity = parseInt(req.body.quantity) || 1; // 3
    // logedin user = 17

    if (isNaN(productId) || quantity < 1) {
        return res.status(400).send({ status: "error", message: "Invalid productId or quantity" });
    }

    try {
        const product = await db.query("SELECT stock FROM products WHERE id = $1", [productId]); // 25
        if (product.rows.length === 0) {
            return res.status(404).send({ status: "error", message: "Product not found" });
        }

        const existing = await db.query(
            "SELECT quantity FROM cart_items WHERE user_id = $1 AND product_id = $2",
            [req.user.id, productId]
            // 17 , 302
        );
        const currentQty = existing.rows[0]?.quantity || 0; // 20
        //      20   +  3  =  23  >    25
        if (currentQty + quantity > product.rows[0].stock) {
            return res.status(400).send({ status: "error", message: "Not enough stock" });
        }
        // {
        //     user_id: 17,
        //     product_id: 302,
        //     quantity: 20
        // }
        const result = await db.query(
            `
            INSERT INTO cart_items (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            ON CONFLICT (user_id, product_id)
            DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity
            RETURNING *
            `,
            [req.user.id, productId, quantity]
            //17            302      ,  20
        );

        // {user_id: 1, product_id: 1, quantity: 3}

        res.status(201).send({ status: "success", item: result.rows[0] });
    } catch (error) {
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    }
});

// // UPDATE quantity (sets exact value, e.g. from +/- buttons)
// app.patch("/api/v1/cart/:productId", auth, async (req, res) => {
//   const productId = parseInt(req.params.productId);
//   const quantity = parseInt(req.body.quantity);

//   if (isNaN(productId) || isNaN(quantity) || quantity < 1) {
//     return res.status(400).send({ status: "error", message: "Invalid quantity" });
//   }

//   try {
//     const product = await db.query("SELECT stock FROM products WHERE id = $1", [productId]);
//     if (product.rows.length && quantity > product.rows[0].stock) {
//       return res.status(400).send({ status: "error", message: "Not enough stock" });
//     }

//     const result = await db.query(
//       `UPDATE cart_items SET quantity = $1
//        WHERE user_id = $2 AND product_id = $3
//        RETURNING *`,
//       [quantity, req.user.id, productId]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send({ status: "error", message: "Item not in cart" });
//     }

//     res.send({ status: "success", item: result.rows[0] });
//   } catch (error) {
//     console.log("Err", error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   }
// });

// // REMOVE one item
// app.delete("/api/v1/cart/:productId", auth, async (req, res) => {
//   try {
//     await db.query("DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2", [
//       req.user.id,
//       parseInt(req.params.productId),
//     ]);
//     res.send({ status: "success" });
//   } catch (error) {
//     console.log("Err", error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   }
// });


/// ORDER APIS ///

app.post("/api/v1/orders", async (req, res) => {
    const { shippingAddress, phoneNumber, receiverName } = req.body;
    if (!shippingAddress || !phoneNumber || !receiverName) {
        return res.status(400).send({ status: "error", message: "Required Parameter Missing" });
    }

    // logedin user = 17

    try {
        await db.query("BEGIN");

        // Lock product rows so two simultaneous orders can't oversell
        const cart = await db.query(
            `
                SELECT ci.product_id, ci.quantity, p.name, p.price, p.stock
                FROM cart_items ci
                JOIN products p ON p.id = ci.product_id
                WHERE ci.user_id = $1
                FOR UPDATE OF p
            `,
            [req.user.id]
        );

        // [
        //     {
        //         product_id: 1,
        //         quantity: 10,
        //         name: "Test Product",
        //         price: 250.00,
        //         stock: 15
        //     },
        //     {
        //         product_id: 302,
        //         quantity: 20,
        //         name: "Samsung Galaxy S25",
        //         price: 899.99,
        //         stock: 25
        //     },
        //     {
        //         product_id: 1,
        //         quantity: 10,
        //         name: "Test Product",
        //         price: 250.00,
        //         stock: 15
        //     },
        //     {
        //         product_id: 1,
        //         quantity: 10,
        //         name: "Test Product",
        //         price: 250.00,
        //         stock: 15
        //     }
        // ]

        if (cart.rows.length === 0) {
            await db.query("ROLLBACK");
            return res.status(400).send({ status: "error", message: "Cart is empty" });
        }

        const outOfStock = cart.rows.filter((item) => item.quantity > item.stock);
        if (outOfStock.length) {
            await db.query("ROLLBACK");
            return res.status(400).send({
                status: "error",
                message: "Some items are out of stock",
                items: outOfStock.map((i) => ({ productId: i.product_id, name: i.name, available: i.stock })),
            });
        }

        // Calculate in cents to avoid floating-point errors
        const totalCents = cart.rows.reduce(
            (sum, item) => sum + Math.round(parseFloat(item.price) * 100) * item.quantity,
            0
        );

        const order = await db.query(
            `INSERT INTO orders (user_id, total_amount, shipping_address, receiver_name, phone_number)
            VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [req.user.id, totalCents / 100, shippingAddress.trim(), receiverName, phoneNumber]
        );
        const orderId = order.rows[0].id;

        // Copy cart into order_items (price snapshot)
        await db.query(
            `
            INSERT INTO order_items (order_id, product_id, product_name, price, quantity)
            SELECT $1, ci.product_id, p.name, p.price, ci.quantity
            FROM cart_items ci
            JOIN products p ON p.id = ci.product_id
            WHERE ci.user_id = $2
            `,
            [orderId, req.user.id]
        );

        // Reduce stock
        await db.query(
            `
            UPDATE products p
            SET stock = p.stock - ci.quantity, updated_at = CURRENT_TIMESTAMP
            FROM cart_items ci
            WHERE ci.product_id = p.id AND ci.user_id = $1
            `,
            [req.user.id]
        );

        // Empty the cart
        await db.query("DELETE FROM cart_items WHERE user_id = $1", [req.user.id]);

        await db.query("COMMIT");
        res.status(201).send({ status: "success", order: order.rows[0] });
    } catch (error) {
        await db.query("ROLLBACK");
        console.log("Err", error);
        res.status(500).send({ status: "error", message: "Internal Server Error" });
    } finally {
        db.release(); // always return the client to the pool
    }
});

// LIST my orders
// app.get("/api/v1/orders", auth, async (req, res) => {
//   try {
//     const result = await db.query(
//       `SELECT id, status, total_amount, created_at
//        FROM orders WHERE user_id = $1
//        ORDER BY created_at DESC`,
//       [req.user.id]
//     );
//     res.send({ status: "success", orders: result.rows });
//   } catch (error) {
//     console.log("Err", error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   }
// });

// GET single order with its items
// app.get("/api/v1/orders/:id", auth, async (req, res) => {
//   try {
//     const result = await db.query(
//       `
//       SELECT
//         o.*,
//         json_agg(json_build_object(
//           'product_id', oi.product_id,
//           'name', oi.product_name,
//           'price', oi.price,
//           'quantity', oi.quantity
//         )) AS items
//       FROM orders o
//       JOIN order_items oi ON oi.order_id = o.id
//       WHERE o.id = $1 AND o.user_id = $2
//       GROUP BY o.id
//       `,
//       [parseInt(req.params.id), req.user.id]
//     );

//     if (result.rows.length === 0) {
//       return res.status(404).send({ status: "error", message: "Order not found" });
//     }
//     res.send({ status: "success", order: result.rows[0] });
//   } catch (error) {
//     console.log("Err", error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   }
// });

// CANCEL order (only while pending) and restore stock
// app.patch("/api/v1/orders/:id/cancel", auth, async (req, res) => {
//   const client = await db.connect();
//   try {
//     await client.query("BEGIN");

//     const order = await client.query(
//       `UPDATE orders SET status = 'cancelled', updated_at = CURRENT_TIMESTAMP
//        WHERE id = $1 AND user_id = $2 AND status = 'pending'
//        RETURNING *`,
//       [parseInt(req.params.id), req.user.id]
//     );

//     if (order.rows.length === 0) {
//       await client.query("ROLLBACK");
//       return res.status(400).send({ status: "error", message: "Order can't be cancelled" });
//     }

//     await client.query(
//       `UPDATE products p SET stock = p.stock + oi.quantity
//        FROM order_items oi
//        WHERE oi.product_id = p.id AND oi.order_id = $1`,
//       [order.rows[0].id]
//     );

//     await client.query("COMMIT");
//     res.send({ status: "success", order: order.rows[0] });
//   } catch (error) {
//     await client.query("ROLLBACK");
//     console.log("Err", error);
//     res.status(500).send({ status: "error", message: "Internal Server Error" });
//   } finally {
//     client.release();
//   }
// });

app.use("/api/v1/*splat", (req, res, next) => {
    if (req.user.role != "admin") {
        res.status(401).send({ status: "error", message: "You Are Not Authorized For This Action" })
    } else {
        next();
    }
})

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

const __dirname = path.resolve();//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db
const __frontend = path.join(__dirname, './web/build')//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db\web\build
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`)
})
