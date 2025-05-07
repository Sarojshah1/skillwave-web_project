// src/pages/CategoriesPage/index.jsx
import React from 'react';
import CategoriesCard from '../components/CategoryCard';
import useCategories from '../hooks/useCategory';


const CategoriesPage = () => {
    const { categories, loading, error } = useCategories();

    if (loading) return <p className="p-8">Loading categories...</p>;
    if (error) return <p className="p-8 text-red-500">Failed to load categories.</p>;
    if (!categories || categories.length === 0) {
        return <p className="p-8 text-gray-500">No categories available at the moment.</p>;
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Explore Our Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {categories.map((category, index) => (
                    <CategoriesCard
                        key={index}
                        title={category.name}
                        icon={category.icon}
                        description={category.description}
                        onClick={category.onClick}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoriesPage;
