import React, { useState } from 'react';
import { FaCamera } from 'react-icons/fa';
import { useFormData } from '../hooks/useFormData';
import { useAuth } from '../hooks/useAuth';

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const { profilePicturePreview, handleProfilePictureChange, formData, handleChange } = useFormData();
  const { loading, error, handleSubmit } = useAuth();

  const handleNext = () => {
    if (profilePicturePreview) setStep(2);
  };

  const handlePrev = () => setStep(1);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-primary w-full max-w-2xl p-10 rounded-3xl shadow-2xl transition-all duration-300">
        {step === 1 && (
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Upload Your Profile Picture</h2>
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <input
                  type="file"
                  id="profilePictureInput"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="hidden"
                />
                <div
                  className="w-32 h-32 rounded-full bg-gray-200 cursor-pointer overflow-hidden flex items-center justify-center border-4 border-pink-300 shadow-md"
                  onClick={() => document.getElementById('profilePictureInput').click()}
                >
                  {profilePicturePreview ? (
                    <img src={profilePicturePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaCamera className="text-gray-600 text-3xl" />
                  )}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleNext}
              disabled={!profilePicturePreview}
              className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create Your Account</h2>
            <form className="space-y-6" onSubmit={(e) => handleSubmit(e, formData)}>
              <div className="grid grid-cols-1 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Role</label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full py-3 px-4 border border-gray-300 rounded-xl bg-white focus:ring-pink-500 focus:border-pink-500 transition"
                  >
                    <option value="student">Student</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-pink-500 focus:border-pink-500 transition"
                    placeholder="Tell us something about yourself (optional)"
                  />
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="py-3 px-6 text-sm font-medium rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="py-3 px-6 text-sm font-medium rounded-full bg-pink-500 text-white hover:bg-pink-600 transition"
                  disabled={loading}
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
              {error && <p className="mt-4 text-center text-red-600">{error}</p>}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationForm;
