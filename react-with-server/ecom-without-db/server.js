import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

let products = [] // TODO Replace with Database

app.use(cors());
app.use(express.json());

app.get('/get-all-products', (req, res) => {
    res.send({ status: "success", products })
})

app.post('/add-product', (req, res) => {
    const productBody = req.body;
    if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
        res.send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    products.push({ id: new Date().getTime(), ...productBody });
    console.log(products)
    res.send({ status: "success", message: "Product Added Successfully" })
})

app.put('/edit-product/:id', (req, res) => {
    const productId = req.params.id;
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
    const productBody = req.body;
    if (!productBody?.title || !productBody?.price || !productBody?.description || !productBody?.image) {
        res.send({ status: "error", message: "Required Parameter Missing" })
        return;
    }
    // products = products.filter((eachProduct) => eachProduct.id != productId)
    // products.push({ id: targetedProduct.id, title: productBody?.title, price: productBody?.price, description: productBody?.description })
    products[targetedProductId].title == productBody?.title
    products[targetedProductId].price == productBody?.price
    products[targetedProductId].description == productBody?.description
    products[targetedProductId].image == productBody?.image
    res.status(200).send({ status: "success", message: "Product Update Successfully" })
})

app.delete('/delete-product/:id', (req, res) => {
    let targetedProduct = req.params.id;
    products = products.filter((eachItem) => eachItem.id != targetedProduct);
    res.send({ status: "success", message: "product deleted successfully" })
})

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})