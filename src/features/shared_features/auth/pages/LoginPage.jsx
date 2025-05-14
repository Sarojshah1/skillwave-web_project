import React from 'react';
import LoginForm from '../components/LoginForm';
import LoginImage from '../components/LoginImage';

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white flex rounded-3xl shadow-lg overflow-hidden w-full max-w-4xl">
    
        <LoginForm />
        <LoginImage />
      </div>
    </div>
  );
};

export default LoginPage;
