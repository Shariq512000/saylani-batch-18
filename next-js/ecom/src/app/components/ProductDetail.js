'use client';
import React, { useState } from "react";

const ProductDetail = ({ product }) => {
    const [selectedImage, setSelectedImage] = useState(product.thumbnail);

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="mx-auto max-w-7xl rounded-xl bg-white p-8 shadow-lg">

                <div className="grid gap-10 lg:grid-cols-2">

                    {/* LEFT SIDE */}
                    <div>

                        {/* Main Image */}
                        <div className="overflow-hidden rounded-xl border bg-gray-50">
                            <img
                                src={selectedImage}
                                alt={product.title}
                                className="h-[500px] w-full object-contain"
                            />
                        </div>

                        {/* Gallery */}
                        <div className="mt-5 flex gap-3">
                            {product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt=""
                                    onClick={() => setSelectedImage(img)}
                                    className={`h-24 w-24 cursor-pointer rounded-lg border object-cover transition
                    ${selectedImage === img
                                            ? "border-blue-600"
                                            : "border-gray-300"
                                        }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE */}
                    <div>

                        <span className="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-700">
                            {product.category}
                        </span>

                        <h1 className="mt-4 text-4xl font-bold">
                            {product.title}
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Brand:
                            <span className="font-semibold text-black">
                                {" "}
                                {product.brand}
                            </span>
                        </p>

                        {/* Rating */}
                        <div className="mt-4 flex items-center gap-2">
                            ⭐⭐⭐⭐☆
                            <span className="font-semibold">
                                {product.rating}
                            </span>
                        </div>

                        {/* Price */}
                        <div className="mt-6 flex items-center gap-4">
                            <span className="text-4xl font-bold text-blue-600">
                                ${product.price}
                            </span>

                            <span className="rounded bg-red-100 px-3 py-1 text-red-600">
                                {product.discountPercentage}% OFF
                            </span>
                        </div>

                        {/* Description */}
                        <p className="mt-6 leading-8 text-gray-600">
                            {product.description}
                        </p>

                        {/* Product Info */}
                        <div className="mt-8 grid grid-cols-2 gap-4 text-sm">

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">Availability</p>
                                <p>{product.availabilityStatus}</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">Stock</p>
                                <p>{product.stock} Items</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">SKU</p>
                                <p>{product.sku}</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">Weight</p>
                                <p>{product.weight} kg</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">Warranty</p>
                                <p>{product.warrantyInformation}</p>
                            </div>

                            <div className="rounded-lg bg-gray-50 p-4">
                                <p className="font-semibold">Shipping</p>
                                <p>{product.shippingInformation}</p>
                            </div>

                        </div>

                        {/* Tags */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            {product.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full bg-gray-200 px-4 py-1 text-sm"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="mt-10 flex gap-4">

                            <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white hover:bg-blue-700">
                                Add to Cart
                            </button>

                            <button className="rounded-lg border border-blue-600 px-8 py-3 font-semibold text-blue-600 hover:bg-blue-600 hover:text-white">
                                Buy Now
                            </button>

                        </div>

                    </div>

                </div>

                {/* Reviews */}

                <div className="mt-16">

                    <h2 className="mb-6 text-3xl font-bold">
                        Customer Reviews
                    </h2>

                    <div className="space-y-5">

                        {product.reviews.map((review, index) => (
                            <div
                                key={index}
                                className="rounded-xl border p-5"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold">
                                        {review.reviewerName}
                                    </h3>

                                    <span>
                                        ⭐ {review.rating}
                                    </span>
                                </div>

                                <p className="mt-3 text-gray-600">
                                    {review.comment}
                                </p>

                                <p className="mt-2 text-sm text-gray-400">
                                    {new Date(review.date).toLocaleDateString()}
                                </p>

                            </div>
                        ))}

                    </div>

                </div>

            </div>
        </div>
    );
};

export default ProductDetail;