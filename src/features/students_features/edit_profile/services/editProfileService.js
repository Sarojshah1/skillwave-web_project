import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const editProfileService = {
    updateUserDetails: async (userId, userDetails) => {
        const response = await api.put(
            ENDPOINTS.USER.UPDATE_DETAILS.replace(":id", userId),
            userDetails
        );
        return response.data;
    }
}