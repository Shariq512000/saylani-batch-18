import Link from "next/link";
import React from "react";

const ProductCard = ({ data }) => {
    return (
        <div className="max-w-sm overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            {/* Product Image */}
            <img
                src="https://picsum.photos/400/300"
                alt="Product"
                className="h-56 w-full object-cover"
            />

            {/* Card Content */}
            <div className="p-5">
                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                    Electronics
                </span>

                <h2 className="mt-4 text-2xl font-bold text-gray-800">
                    {data.title}
                </h2>

                <p className="mt-2 text-gray-600">
                    {data.body}
                </p>

                {/* Price & Rating */}
                <div className="mt-5 flex items-center justify-between">
                    <span className="text-2xl font-bold text-blue-600">${data.price}</span>

                    <div className="flex items-center gap-1 text-yellow-500">
                        ⭐⭐⭐⭐⭐
                    </div>
                </div>

                {/* View Button */}
                <Link href={`/product/${data.id}`} className="mt-6 block text-center w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700">
                    View
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;