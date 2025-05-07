import { useState } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e, formData) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
        console.log(formData);
        
        const payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              payload.append(key, value);
            }
          });
          console.log(payload);
      await authService.register(payload);
      toast.success('Registration successful!');
      navigate('/'); 
      
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin=async(e)=>{
    
  }


  return {
    loading,
    error,
    handleSubmit,
  };
};
