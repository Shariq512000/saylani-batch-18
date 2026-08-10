import express from "express";

const app = express();
const PORT = 5000;

let products = [] // TODO Replace with Database

// app.get('/', (req, res) => {
//     res.send("Hello World")
// }) //url, function

// get --> get
// add --> Post
// edit --> put, patch
// delete --> delete

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
    if (!productBody?.title || !productBody?.price || !productBody?.description) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    products.push({ id: new Date().getTime(), ...productBody });
    console.log(products)
    res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

// query parameter --> optional
// url parameter   --> required

//  /edit-product

// [
//     {id: 1, ...},
//     {id: 2, ...},
//     {id: 3, ...},
//     {id: 4, ...},
//     {id: 5, ...},
// ]
// /edit-product/33
app.put('/edit-product/:id', (req, res) => {
    const productId = req.params.id;
    let targetedProduct = products.find((eachProduct) => eachProduct.id == productId)
    if (!targetedProduct) {
        res.status(404).send({ status: "error", message: `Product Not Found with id ${productId}` })
        return;
    }
    const productBody = req.body;
    if (!productBody?.title || !productBody?.price || !productBody?.description) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    products = products.filter((eachProduct) => eachProduct.id != productId)
    products.push({ id: targetedProduct.id, title: productBody?.title, price: productBody?.price, description: productBody?.description })
    res.status(200).send({ status: "success", message: "Product Update Successfully" })
})

app.get('/get-all-products', (req, res) => {
    res.status(200).send({ status: "success", products })
})

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})