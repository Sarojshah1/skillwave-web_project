import { useState } from 'react';

export const useLoginData = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };
  const setLoginError = (errorMessage) => {
    setError(errorMessage);
  };
  const clearLoginError = () => {
    setError('');
  };

  return {
    loginData,
    setLoginData,
    error,
    handleChange,
    setLoginError,
    clearLoginError,
  };
};
