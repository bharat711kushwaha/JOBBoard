// ErrorPage.jsx
import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-extrabold text-[#FF6347]">404</h1>
      <p className="text-2xl font-semibold text-gray-700 mb-6">Oops! Page not found.</p>
      <p className="text-lg text-gray-500 mb-6">Sorry, the page you are looking for does not exist.</p>
      <Link
        to="/"
        className="text-white bg-[#7209b7] px-6 py-3 rounded-md text-lg font-semibold transition-all duration-300 hover:bg-[#5a0685]"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
