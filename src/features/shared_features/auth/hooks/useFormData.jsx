import { useState } from 'react';

export const useFormData = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    profile_picture: null,
    bio: '',
  });

  const [profilePicturePreview, setProfilePicturePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_picture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  



  return {
    formData,
    setFormData,
    profilePicturePreview,
    handleChange,
    handleProfilePictureChange,
  };
};
