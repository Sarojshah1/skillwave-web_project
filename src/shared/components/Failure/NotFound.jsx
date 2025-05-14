import React from 'react';
import './NotFound.css'; // Optional for custom animations (if any)

const NotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
      <div className="text-center text-white p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-6xl font-extrabold text-red-500 animate__animated animate__fadeIn animate__delay-1s">404</h1>
        <p className="text-xl font-light mt-4 animate__animated animate__fadeIn animate__delay-1.5s">Oops! Page Not Found</p>
        <a
          href="/"
          className="mt-8 inline-block px-6 py-3 text-lg font-semibold text-gray-800 bg-yellow-400 rounded-full shadow-lg transform hover:bg-yellow-500 hover:scale-105 transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
