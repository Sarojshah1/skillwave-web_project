import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from './ErrorMessage';
import { useLoginData } from '../hooks/useLoginData';

const LoginForm = () => {
   const { loading, error, handleLogin } = useAuth();
   const{loginData,handleChange}=useLoginData();


  return (
    <div className="w-1/2 p-8">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome Back!</h2>
      <p className="text-gray-600 mb-6">Login to your account to continue learning</p>

      <form onSubmit={(e) =>handleLogin(e,loginData)} className="space-y-6">
        <div>
          <label className="block text-gray-700">Email Address</label>
          <input
          name='email'
            type="email"
            value={loginData.email}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-gray-700">Password</label>
          <input
          name='password'
            type="password"
            value={loginData.password}
            onChange={handleChange}
            className="w-full mt-2 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-500"
            placeholder="Enter your password"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="h-4 w-4 text-teal-500 focus:ring-teal-400 border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 text-gray-700">Remember me</label>
          </div>
          <a href="#" className="text-teal-500 hover:text-teal-600 text-sm">Forgot Password?</a>
        </div>

        {error && <ErrorMessage error={error} />}

        <button
          type="submit"
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-gray-600 mt-6 text-center">Don't have an account? <a href="/signup" className="text-teal-500 hover:text-teal-600">Sign Up</a></p>
    </div>
  );
};

export default LoginForm;
