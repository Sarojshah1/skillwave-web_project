import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const userProfileService = {
  getUserProfile: async () => {
    try {
      const response = await api.get(ENDPOINTS.USER.PROFILE);
      console.log("User profile data:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      throw error;
    }
  },

  updateUserProfile: async (profileData) => {
    try {
      const response = await api.put(
        ENDPOINTS.USER.UPDATE_DETAILS,
        profileData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  },
  updateUserProfilePicture: async (file) => {
    console.log("Updating profile picture with data:", file);
    try {
      const formData = new FormData();
      formData.append("profile_picture", file);
      const response = await api.put(
        ENDPOINTS.USER.UPDATE_PROFILE_PICTURE,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating profile picture:", error);
      throw error;
    }
  },
};
