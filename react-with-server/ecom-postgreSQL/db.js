import { Pool } from 'pg'; //postgres
import "dotenv/config"

export const db = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false
    }
})

// export const db = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "ecom",
//     password: "123456",
//     port: "5432",
// })