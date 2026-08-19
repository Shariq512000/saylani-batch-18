import express from "express";
import cors from "cors";
import path from 'path';

const app = express();
const PORT = 5000;

let products = []; // TODO Replace with Database

// let totalRequest = 0

// app.use(() => {
//     totalRequest++
// })

app.use(cors());
app.use(express.json());


app.get('/products', (req, res) => {
    res.send({ status: "success", products })
})

// app.get('/categories', () => {})
// /get-single-product/10
app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const selectedProduct = products.find((eachProduct) => eachProduct.id == productId);
    if (!selectedProduct) {
        res.send({ status: "error", message: "product not found" })
        return;
    }
    res.send({ status: "success", product: selectedProduct })
})

app.post('/product', (req, res) => {
    const productBody = req.body;
    if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    products.push({ id: new Date().getTime(), ...productBody });
    res.status(201).send({ status: "success", message: "Product Added Successfully" })
})

app.put('/product/:id', (req, res) => {
    const productId = req.params.id;
    const productBody = req.body;
    if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
        res.status(400).send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    let targetedProductId = null;
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            targetedProductId = i
        }
    }
    // let targetedProduct = products.find((eachProduct) => eachProduct.id == productId)
    if (targetedProductId == null) {
        res.send({ status: "error", message: `Product Not Found with id ${productId}` })
        return;
    }
    // products = products.filter((eachProduct) => eachProduct.id != productId)
    // products.push({ id: targetedProduct.id, title: productBody?.title, price: productBody?.price, description: productBody?.description })
    products[targetedProductId].title = productBody?.title
    products[targetedProductId].price = productBody?.price
    products[targetedProductId].description = productBody?.description
    products[targetedProductId].image = productBody?.image
    res.status(200).send({ status: "success", message: "Product Update Successfully" })
})

app.delete('/product/:id', (req, res) => {
    let targetedProduct = req.params.id;
    products = products.filter((eachItem) => eachItem.id != targetedProduct);
    res.status(200).send({ status: "success", message: "product deleted successfully" })
})

const __dirname = path.resolve();//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db\web\build\index.html
app.use('/', express.static(path.join(__dirname, './web/build')))
app.use("/*splat", express.static(path.join(__dirname, './web/build')))

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})