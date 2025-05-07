import React from 'react';
import { useFormData } from '../hooks/useFormData';
import { useAuth } from '../hooks/useAuth';

const ProfileSetupStep = ({ onPrev }) => {
  const { formData, handleChange } = useFormData();
  const { loading, error, handleSubmit } = useAuth();

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Profile Setup</h2>
      <form onSubmit={(e) => handleSubmit(e, formData)} className="space-y-5">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-pink-500"
          >
            <option value="student">Student</option>
            <option value="tutor">Tutor</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Bio</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
            className="w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-pink-500"
          />
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={onPrev} className="text-gray-600 hover:text-gray-800">Back</button>
          <button
            type="submit"
            className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Register'}
          </button>
        </div>
        {error && <p className="text-center text-red-600">{error}</p>}
      </form>
    </div>
  );
};

export default ProfileSetupStep;
