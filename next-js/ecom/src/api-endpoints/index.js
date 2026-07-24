// import axios from "axios";

export const getProducts = async () => {
    try {
        const apiRes = await fetch('https://dummyjson.com/products')
        const readableData = await apiRes.json();
        return readableData
    } catch (error) {
        console.log("Err", error)
    }
}

export const getSigleProduct = async (id) => {
    try {
        const apiRes = await fetch(`https://dummyjson.com/products/${id}`)
        const readableData = await apiRes.json();
        return readableData
    } catch (error) {
        console.log("Err", error)
    }
}