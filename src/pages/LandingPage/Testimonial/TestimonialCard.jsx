
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const TestimonialCard = ({ name, role, testimonial, avatar, rating }) => {
    return (
        <motion.div
            className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300 relative"
            whileHover={{ scale: 1.05, rotate: 1 }}
            transition={{ duration: 0.3 }}
        >
            <FaQuoteLeft className="absolute top-3 left-3 text-gray-300 text-xl" />
            <div className="flex items-center mb-4">
                <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover mr-4" />
                <div>
                    <h4 className="text-lg font-semibold text-gray-900">{name}</h4>
                    <p className="text-sm text-gray-600">{role}</p>
                </div>
            </div>
            <p className="text-gray-700 mb-4">{testimonial}</p>
            <FaQuoteRight className="absolute bottom-3 right-3 text-gray-300 text-xl" />
            <div className="flex items-center">
                {[...Array(rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-500 mr-1" />
                ))}
            </div>
        </motion.div>
    );
};

TestimonialCard.propTypes = {
    name: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired,
    testimonial: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
};

export default TestimonialCard;
