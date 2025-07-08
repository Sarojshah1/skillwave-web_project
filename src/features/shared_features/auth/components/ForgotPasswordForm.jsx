import React, { useState } from 'react';
import axios from 'axios';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      // Adjust the URL if your backend runs on a different port or path
      const res = await axios.put(
        'http://localhost:5000/api/users/update-password-by-email',
        { email, newPassword: 'temporaryPassword' } // You may want to trigger an email instead in a real app
      );
      setMessage(res.data.message || 'If this email exists, you will receive instructions to reset your password.');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700 mb-2">Email Address</label>
        <input
          type="email"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-teal-500"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 rounded-lg transition duration-200"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Send Reset Link'}
      </button>
      {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </form>
  );
};

export default ForgotPasswordForm; 