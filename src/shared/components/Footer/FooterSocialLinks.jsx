import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const FooterSocialLinks = () => {
    return (
        <div className="flex justify-center space-x-6 mb-6 animate__animated animate__fadeIn animate__delay-4s">
            <a href="https://facebook.com" className="text-gray-400 hover:text-blue-600 transition duration-300 transform hover:scale-110">
                <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" className="text-gray-400 hover:text-blue-400 transition duration-300 transform hover:scale-110">
                <FaTwitter size={24} />
            </a>
            <a href="https://linkedin.com" className="text-gray-400 hover:text-blue-700 transition duration-300 transform hover:scale-110">
                <FaLinkedinIn size={24} />
            </a>
            <a href="https://instagram.com" className="text-gray-400 hover:text-pink-600 transition duration-300 transform hover:scale-110">
                <FaInstagram size={24} />
            </a>
        </div>
    );
};

export default FooterSocialLinks;
