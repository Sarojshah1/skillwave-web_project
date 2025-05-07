import React from 'react';
import { FaCamera } from 'react-icons/fa';
import { useFormData } from '../hooks/useFormData';

const ProfilePictureStep = ({ onNext }) => {
  const { profilePicturePreview, handleProfilePictureChange } = useFormData();

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Upload Your Profile Picture</h2>
      <div className="flex justify-center mb-6">
        <div className="relative w-28 h-28">
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleProfilePictureChange}
            className="hidden"
          />
          <div
            className="w-28 h-28 rounded-full bg-gray-200 cursor-pointer overflow-hidden flex items-center justify-center border border-gray-300"
            onClick={() => document.getElementById('profilePictureInput').click()}
          >
            {profilePicturePreview ? (
              <img src={profilePicturePreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <FaCamera className="text-gray-600 text-2xl" />
            )}
          </div>
        </div>
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={!profilePicturePreview}
        className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default ProfilePictureStep;
