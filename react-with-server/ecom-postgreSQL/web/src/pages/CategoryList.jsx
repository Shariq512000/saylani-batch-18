import React, { useContext, useEffect, useState } from "react";
import "./CategoryList.css";
import axios from "axios";
import { GlobalContext } from "../context/Context";
import api from "../component/api";

const CategoryList = () => {
    let { state } = useContext(GlobalContext)
    const [showForm, setShowForm] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [categories, setCategories] = useState([]);

    const getCategories = async () => {
        try {
            const apiRes = await api.get(`/categories`)
            setCategories(apiRes.data.categories)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    useEffect(() => {
        getCategories()
    }, [])

    // const categories = [
    //     {
    //         id: 1,
    //         name: "Electronics",
    //         description: "Electronic devices and accessories",
    //         products: 42,
    //     },
    //     {
    //         id: 2,
    //         name: "Clothing",
    //         description: "Men's and women's clothing",
    //         products: 35,
    //     },
    //     {
    //         id: 3,
    //         name: "Home & Kitchen",
    //         description: "Home appliances and kitchen products",
    //         products: 28,
    //     },
    //     {
    //         id: 4,
    //         name: "Books",
    //         description: "Books, novels and educational materials",
    //         products: 18,
    //     },
    //     {
    //         id: 5,
    //         name: "Sports",
    //         description: "Sports equipment and accessories",
    //         products: 15,
    //     },
    // ];

    const addCategory = async (e) => {
        e.preventDefault();

        // UI only
        try {
            const apiRes = await api.post(`/category`, {
                name: name,
                description: description
            })
            alert(apiRes.data.message)
            setName("");
            setDescription("");
            setShowForm(false);
        } catch (error) {
            alert(error.response.data.message)
        }
    };

    return (
        <div className="category-page">

            <div className="category-container">

                {/* Header */}
                <div className="category-header">

                    <div>
                        <h1>Categories</h1>
                        <p>Manage your product categories</p>
                    </div>

                    <button
                        className="add-category-btn"
                        onClick={() => setShowForm(!showForm)}
                    >
                        <span>+</span>
                        Add Category
                    </button>

                </div>

                {/* Add Category Form */}
                {showForm && (
                    <div className="category-form-card">

                        <div className="form-header">
                            <div>
                                <h2>Add New Category</h2>
                                <p>Create a new product category</p>
                            </div>

                            <button
                                className="close-btn"
                                onClick={() => setShowForm(false)}
                            >
                                ×
                            </button>
                        </div>

                        <form
                            className="category-form"
                            onSubmit={addCategory}
                        >

                            <div className="input-group">

                                <label htmlFor="categoryName">
                                    Category Name
                                </label>

                                <input
                                    id="categoryName"
                                    type="text"
                                    placeholder="Enter category name"
                                    value={name}
                                    onChange={(e) =>
                                        setName(e.target.value)
                                    }
                                    required
                                />

                            </div>

                            <div className="input-group">

                                <label htmlFor="categoryDescription">
                                    Description
                                </label>

                                <textarea
                                    id="categoryDescription"
                                    placeholder="Enter category description"
                                    rows="4"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                            </div>

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-btn"
                                    onClick={() => setShowForm(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-category-btn"
                                >
                                    Save Category
                                </button>

                            </div>

                        </form>

                    </div>
                )}

                {/* Search */}
                <div className="category-toolbar">

                    <div className="search-box">

                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search categories..."
                        />

                    </div>

                    <div className="category-count">
                        {categories.length} Categories
                    </div>

                </div>

                {/* Category Table */}
                <div className="category-table-wrapper">

                    <table className="category-table">

                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Description</th>
                                {/* <th>Products</th> */}
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {categories.map((category) => (
                                <tr key={category.id}>

                                    <td className="category-id">
                                        #{category.id}
                                    </td>

                                    <td>
                                        <div className="category-name">

                                            <div className="category-icon">
                                                {category.name
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <span>
                                                {category.name}
                                            </span>

                                        </div>
                                    </td>

                                    <td className="category-description">
                                        {category.description}
                                    </td>

                                    {/* <td>
                                        <span className="product-count">
                                            {category.products}
                                        </span>
                                    </td> */}

                                    <td>

                                        <div className="action-buttons">

                                            <button className="edit-btn">
                                                Edit
                                            </button>

                                            <button className="delete-btn">
                                                Delete
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
};

export default CategoryList;