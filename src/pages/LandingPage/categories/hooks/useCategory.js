import { useState, useEffect } from 'react';
import { api } from '../../../../infrastructure/api/api';
import { ENDPOINTS } from '../../../../shared/constants/api.const';
import { categoryServices } from '../../../../services/categoriesService';



const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data=await categoryServices.getCategories();
                console.log(data);
                setCategories(data);
            } catch (err) {
                setError(err);
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
};

export default useCategories;
