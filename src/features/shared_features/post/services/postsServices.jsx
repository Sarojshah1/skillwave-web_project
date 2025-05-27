
import { api } from "../../../../infrastructure/api/api";
import { ENDPOINTS } from "../../../../shared/constants/api.const";

export const postsService = {
    createPost: async (formData) => {
        const response = await api.post(ENDPOINTS.POST.CREATE_GET_POST, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    },
  getPosts: async (page = 1, limit = 2) => {
        const response = await api.get(`${ENDPOINTS.POST.CREATE_GET_POST}?page=${page}&limit=${limit}`, {
            headers: {
                "Cache-Control": "no-cache", 
            },
        });
        console.log("Response from getPosts:", response.data);
        return response.data;
    },
    
}