import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'

const Product = () => {
    let { state } = useContext(GlobalContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false)

    const getProducts = async () => {
        try {
            const apiRes = await axios.get(`${state.baseUrl}/products`, { withCredentials: true });
            setProducts(apiRes.data.products)
        } catch (error) {
            console.log("err", error)
        }
    }

    const getCategories = async () => {
        try {
            const apiRes = await axios.get(`${state.baseUrl}/categories`, { withCredentials: true });
            setCategories(apiRes.data.categories)
        } catch (error) {
            console.log("err", error)
        }
    }

    useEffect(() => {
        getProducts();
        getCategories();
    }, [])

    console.log("products", products)

    return (
        <div>
            {state.user.role == "admin" ?
                <button onClick={() => setShowAddForm(true)}>Add Product</button>
                :
                null
            }
            {showAddForm ?
                <form>
                    <button type='button' onClick={() => setShowAddForm(false)}>Cancel</button>
                    <label>
                        Name: <input type="text" />
                    </label>
                    <br />
                    <label htmlFor="">
                        Category:
                        <select>
                            <option value="">Select Category</option>
                            {categories.map((category) =>
                                <option key={category.id} value={category.id}>{category.name}</option>
                            )}
                        </select>
                    </label>
                </form>
                :
                null
            }
            {/* {products.map(() => {})} */}
        </div>
    )
}

export default Product