import express from "express";

const app = express();
const PORT = 5000;

let products = [] // TODO Replace with Database

// add --> Post
// edit --> put, patch
// delete --> delete
// get --> get

// {}

// const apiImagination = {
//     method: "post",
//     url: "/add-product",
//     body: {
//         "title": "Smart Watch",
//         "price": 50,
//         "description": "Test Api Smart Watch"
//     }
// }

app.use(express.json());

app.post('/add-product', (req, res) => {
    const productBody = req.body;
    products.push(productBody);
    res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})