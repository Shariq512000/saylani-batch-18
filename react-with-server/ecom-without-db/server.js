import express from "express";
import cors from "cors";
import path from 'path';

const app = express();
const PORT = 5005;

let products = []; // TODO Replace with Database

app.use(cors());
app.use(express.json());

app.get('/products', (req, res) => {
    res.send({ status: "success", products })
})

app.get('/product/:id', (req, res) => {
    const productId = req.params.id;
    const selectedProduct = products.find((eachProduct) => eachProduct.id == productId);
    if (!selectedProduct) {
        res.status(404).send({ status: "error", message: "product not found" })
        return;
    }
    res.send({ status: "success", product: selectedProduct })
})

// const apiReq = {
//     method: "post",
//     url: "/product",
//     body:{
//         title: 'values.title',
//         price: values.price,
//         description: values.description,
//         image: values.productImage
//     }
// }

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
    let targetedProductId = null; // 2
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == productId) {
            targetedProductId = i // 2
            break;
        }
    }
    // let targetedProduct = products.find((eachProduct) => eachProduct.id == productId)
    if (targetedProductId == null) {
        res.status(404).send({ status: "error", message: `Product Not Found with id ${productId}` })
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

const __dirname = path.resolve();//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db
const __frontend = path.join(__dirname, './web/build')//D:\shariq\saylani-batch-18\react-with-server\ecom-without-db\web\build
app.use('/', express.static(__frontend))
app.use("/*splat", express.static(__frontend))

app.listen(PORT, () => {
    console.log(`App is Running On Port ${PORT}`)
})