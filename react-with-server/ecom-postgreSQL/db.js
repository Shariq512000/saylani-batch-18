import { Pool } from 'pg'; //postgres

export const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ecom",
    password: "123456",
    port: "5432",
})