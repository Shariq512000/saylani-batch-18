import express from 'express';
const app = express();
const port = 5000;


// get, post, put, patch, delete

app.get('/', (req, res) => {
    console.log("Requested Ip", req.ip);
    res.send("Hello World")
});

app.get('/products', (req, res) => {
    /// data
    const queryObj = req.query
    res.send({ status: "test", queryObj: queryObj })
})

// parameter (query / url)

// url parameter product/:id/:page/:limit
// query parameter product?id=1&limit=10&skip=10

app.get('/product/:id', (req, res) => {
    /// data

    res.send({ status: "test", id: req.params.id })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});