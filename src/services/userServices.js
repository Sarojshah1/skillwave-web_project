
import { api } from "../infrastructure/api/api";
import { ENDPOINTS } from "../shared/constants/api.const";

export const globalAuthService = {

  fetchProfile: async () => {
    const response = await api.get(ENDPOINTS.USER.PROFILE);
    return response.data;
  },

};

