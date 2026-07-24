import React from "react";

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                {/* 404 */}
                <h1 className="text-8xl md:text-9xl font-extrabold text-white tracking-wider">
                    404
                </h1>

                {/* Title */}
                <h2 className="mt-4 text-3xl md:text-4xl font-bold text-white">
                    Oops! Page Not Found
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-400 text-lg">
                    The page you are looking for might have been removed,
                    renamed, or is temporarily unavailable.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <a
                        href="/"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition duration-300 shadow-lg"
                    >
                        Go Home
                    </a>

                    <button
                        // onClick={() => window.history.back()}
                        className="px-6 py-3 border border-gray-500 text-gray-300 hover:bg-gray-800 rounded-lg font-semibold transition duration-300"
                    >
                        Go Back
                    </button>
                </div>

                {/* Decorative Element */}
                <div className="mt-12 flex justify-center">
                    <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;