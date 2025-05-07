
import { api } from "../../../config/api";
import { ENDPOINTS } from "../../../shared/constants/api.const";

export const authService = {

  register: async (formData) => {
    const response = await api.post(ENDPOINTS.AUTH.REGISTER, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  login: async (credentials) => {
    const response = await api.post(ENDPOINTS.AUTH.LOGIN, credentials);
    return response.data;
  },

  fetchProfile: async () => {
    const response = await api.get(ENDPOINTS.USER.PROFILE);
    return response.data;
  },

  updateDetails: async (formData) => {
    const response = await api.put(ENDPOINTS.USER.UPDATE_DETAILS, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  changePassword: async (oldPassword, newPassword) => {
    const response = await api.put(ENDPOINTS.USER.CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
    return response.data;
  },

  updateProfilePicture: async (file) => {
    const formData = new FormData();
    formData.append("profile_picture", file);

    const response = await api.put(ENDPOINTS.USER.UPDATE_PROFILE_PICTURE, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  // Request OTP for email-based actions
  sendOtp: async (email) => {
    const response = await api.post(ENDPOINTS.OTP.SEND_OTP, { email });
    return response.data;
  },

  updatePasswordByEmail: async (email, newPassword) => {
    const response = await api.put(ENDPOINTS.USER.UPDATE_PASSWORD_BY_EMAIL, {
      email,
      newPassword,
    });
    return response.data;
  },
};

