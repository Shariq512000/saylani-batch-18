import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/Context";
import api from "../component/api";
import "./Product.css";

const Product = () => {
    let { state } = useContext(GlobalContext);

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [files, setFiles] = useState([]);
    const [price, setPrice] = useState("0");
    const [description, setDescription] = useState("");
    const [stock, setStock] = useState("0");
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [pagination, setPagination] = useState({})

    const getProducts = async ({ page = 1, limit = 10 }) => {
        try {
            const apiRes = await api.get(`/products?page=${page}&limit=${limit}`);
            console.log("apiRes", apiRes.data)
            setProducts(apiRes.data.products);
            setPagination(apiRes.data.pagination)
        } catch (error) {
            console.log("err", error);
        }
    };

    const getCategories = async () => {
        try {
            const apiRes = await api.get(`/categories`);
            setCategories(apiRes.data.categories);
        } catch (error) {
            console.log("err", error);
        }
    };

    useEffect(() => {
        getProducts({ page: 1, limit: 10 });
        getCategories();
    }, []);

    const uploadImg = async (file) => {
        try {
            const formData = new FormData();

            formData.append("file", file);
            formData.append("upload_preset", "posts-image");

            const uploadedImg = await axios.post(
                "https://api.cloudinary.com/v1_1/dw2jrfzql/upload",
                formData
            );
            // [1.png]
            setFiles((prev) => [...prev, uploadedImg.data.url]); //
        } catch (error) {
            console.log("Err", error);
        }
    };

    const addProduct = async (e) => {
        e.preventDefault();

        try {
            const apiRes = await api.post("/product", {
                category: category,
                name: productName,
                description: description,
                images: files,
                price: price,
                stock: stock
            });

            getProducts();
            alert(apiRes.data.message);
        } catch (error) {
            console.log("Err", error);
        }
    };

    return (
        <div className="product-page">

            <div className="product-container">

                {/* Page Header */}

                <div className="product-header">

                    <div>
                        <h1>Products</h1>
                        <p>Manage your products and inventory</p>
                    </div>

                    {state.user.role == "admin" ? (
                        <button
                            className="add-product-btn"
                            onClick={() => setShowAddForm(true)}
                        >
                            <span>+</span>
                            Add Product
                        </button>
                    ) : null}

                </div>

                {/* Add Product Form */}

                {showAddForm ? (
                    <div className="product-form-card">

                        <div className="form-header">

                            <div>
                                <h2>Add New Product</h2>
                                <p>
                                    Enter the product details below
                                </p>
                            </div>

                            <button
                                type="button"
                                className="close-form-btn"
                                onClick={() => setShowAddForm(false)}
                            >
                                ×
                            </button>

                        </div>

                        <form
                            onSubmit={addProduct}
                            className="product-form"
                        >

                            {/* Product Name */}

                            <div className="form-group">

                                <label htmlFor="productName">
                                    Product Name
                                </label>

                                <input
                                    id="productName"
                                    type="text"
                                    placeholder="Enter product name"
                                    value={productName}
                                    onChange={(e) =>
                                        setProductName(e.target.value)
                                    }
                                />

                            </div>

                            {/* Category */}

                            <div className="form-group">

                                <label htmlFor="category">
                                    Category
                                </label>

                                <select
                                    id="category"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(e.target.value)
                                    }
                                >
                                    <option value="">
                                        Select Category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}

                                </select>

                            </div>

                            {/* Images */}

                            <div className="form-group">

                                <label>
                                    Product Images
                                </label>

                                <div className="upload-box">

                                    <div className="upload-icon">
                                        📷
                                    </div>

                                    <p>
                                        Upload product image
                                    </p>

                                    <span>
                                        PNG, JPG or JPEG
                                    </span>

                                    <input
                                        type="file"
                                        onChange={(e) => {

                                            uploadImg(
                                                e.target.files[0]
                                            );
                                        }}
                                    />

                                </div>

                                {/* Uploaded Images */}

                                {files.length > 0 && (
                                    <div className="uploaded-files">

                                        {files.map((file, i) => {
                                            return (
                                                <div
                                                    className="uploaded-image"
                                                    key={i}
                                                >

                                                    <img
                                                        src={file}
                                                        alt=""
                                                    />

                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const allFiles = [
                                                                ...files
                                                            ];

                                                            allFiles.splice(
                                                                i,
                                                                1
                                                            );

                                                            setFiles(
                                                                allFiles
                                                            );
                                                        }}
                                                    >
                                                        ×
                                                    </button>

                                                </div>
                                            );
                                        })}

                                    </div>
                                )}

                            </div>

                            {/* Price + Stock */}

                            <div className="form-row">

                                <div className="form-group">

                                    <label htmlFor="price">
                                        Price
                                    </label>

                                    <div className="input-with-symbol">
                                        <span>Rs.</span>

                                        <input
                                            id="price"
                                            type="number"
                                            value={price}
                                            onChange={(e) =>
                                                setPrice(e.target.value)
                                            }
                                        />
                                    </div>

                                </div>

                                <div className="form-group">

                                    <label htmlFor="stock">
                                        Stock
                                    </label>

                                    <input
                                        id="stock"
                                        type="number"
                                        value={stock}
                                        onChange={(e) =>
                                            setStock(e.target.value)
                                        }
                                    />

                                </div>

                            </div>

                            {/* Description */}

                            <div className="form-group">

                                <label htmlFor="description">
                                    Description
                                </label>

                                <textarea
                                    id="description"
                                    rows="5"
                                    placeholder="Enter product description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />

                            </div>

                            {/* Form Actions */}

                            <div className="form-actions">

                                <button
                                    type="button"
                                    className="cancel-product-btn"
                                    onClick={() =>
                                        setShowAddForm(false)
                                    }
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="save-product-btn"
                                >
                                    Add Product
                                </button>

                            </div>

                        </form>

                    </div>
                ) : null}

                {/* Products Section */}

                <div className="products-section">

                    <div className="products-section-header">

                        <div>
                            <h2>All Products</h2>
                            <p>
                                {pagination.total} products available
                            </p>
                        </div>

                    </div>

                    {products.length > 0 ? (

                        <div className="products-grid">

                            {products.map((product) => (

                                <div
                                    className="product-card"
                                    key={product.id}
                                >

                                    {/* Product Image */}

                                    <div className="product-image">

                                        {product.images &&
                                            product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                onError={(e) => {
                                                    e.target.parentElement.innerHTML = `<div class="no-image">
                                                📦
                                            </div>`
                                                }}
                                            />
                                        ) : (
                                            <div className="no-image">
                                                📦
                                            </div>
                                        )}

                                    </div>

                                    {/* Product Info */}

                                    <div className="product-info">

                                        <div className="product-category">
                                            {product.category_name}
                                        </div>

                                        <h3>
                                            {product.name}
                                        </h3>

                                        <p className="product-description">
                                            {product.description}
                                        </p>

                                        <div className="product-bottom">

                                            <div>
                                                <span className="price-label">
                                                    Price
                                                </span>

                                                <strong>
                                                    Rs. {product.price}
                                                </strong>
                                            </div>

                                            <div className="stock-info">

                                                <span className="stock-label">
                                                    Stock
                                                </span>

                                                <span
                                                    className={
                                                        product.stock > 0
                                                            ? "stock-available"
                                                            : "stock-out"
                                                    }
                                                >
                                                    {product.stock > 0
                                                        ? `${product.stock} available`
                                                        : "Out of stock"}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : (

                        <div className="empty-products">

                            <div className="empty-icon">
                                📦
                            </div>

                            <h3>No Products Found</h3>

                        </div>

                    )}

                </div>

                <div className="">
                    <div className="">
                        <button disabled={!pagination.hasPreviousPage} onClick={() => {
                            getProducts({ page: pagination.page - 1, limit: pagination.limit })
                        }}>Previous</button>
                        <p>{pagination.page}</p>
                        <button disabled={!pagination.hasNextPage} onClick={() => {
                            getProducts({ page: pagination.page + 1, limit: pagination.limit })
                        }}>Next</button>
                    </div>
                    <label htmlFor="">
                        Limit:
                        <select onChange={(e) => { getProducts({ page: 1, limit: e.target.value }) }}>
                            <option value="10" selected>10</option>
                            <option value="20">20</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                    </label>
                </div>

            </div>

        </div>
    );
};

export default Product;