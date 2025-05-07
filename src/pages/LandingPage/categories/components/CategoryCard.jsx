import React from 'react';
import PropTypes from 'prop-types';
const CategoriesCard = ({ title, description,icon, onClick }) => {
    return (
        <div
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer flex flex-col items-center p-6"
            onClick={onClick}
        >
            <div className="mb-4">
            <img src={`http://localhost:3000/icon/${icon}`} alt={title} className="w-20 h-20 object-cover" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-700 mb-4 text-center">{description}</p>
            <a
                href="#"
                className="text-primary font-semibold hover:underline"
            >
                Learn More
            </a>
        </div>
    );
};

CategoriesCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default CategoriesCard;