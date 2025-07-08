import React from 'react';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage; 