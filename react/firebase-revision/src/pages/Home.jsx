import React, { useEffect, useState } from 'react'
import { getFirestore, doc, setDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import ProductCard from '../component/productCard';

const Home = () => {
    const [title, setTitle] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [products, setProducts] = useState([]);
    const [reFetch, setReFetch] = useState(false)

    const db = getFirestore();

    const addProduct = async (e) => {
        e.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "products"), {
                title,
                imageUrl,
                description
            });
            setReFetch(!reFetch)
            console.log("Document written with ID: ", docRef.id);

        } catch (error) {
            console.log("error", error)
        }
    }

    const getProduct = async() => {
        try {
            const q = query(collection(db, "products"));

            const querySnapshot = await getDocs(q);
            let productArr = []
            querySnapshot.forEach((doc) => {
                let newObj = {
                    ...doc.data(),
                    id: doc.id
                }
                productArr.push(newObj)
            });
            setProducts(productArr.reverse())

        } catch (error) {
            console.log("Err", error)
        }
    }

    console.log("Products", products)

    useEffect(() => {
        getProduct();
    }, [reFetch])

    return (
        <div>
            <form onSubmit={addProduct}>
                <label htmlFor="">
                    Title: <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </label>
                <br />
                <label htmlFor="">
                    image url: <input type="text" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
                </label>
                <br />
                <label htmlFor="">
                    Description: <textarea value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                </label>
                <br />
                <button type='submit'>Add</button>
            </form>
            <div className="" style={{display: "flex", flexDirection: "column", alignItems: "center", gap: 20}}>
                {
                    products.map((eachProduct) => {
                        return(
                            <ProductCard
                                key={eachProduct.id}
                                title={eachProduct.title}
                                imageUrl={eachProduct.imageUrl}
                                description={eachProduct.description}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home