
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

    addComment: async (postId, commentData) => {
    const response = await api.post(
      ENDPOINTS.POST.ADD_GET_COMMENT.replace(":id", postId),
      commentData
    );
    return response.data;
  },
  getComments: async (postId) => {
    const response = await api.get(
      ENDPOINTS.POST.ADD_GET_COMMENT.replace(":id", postId)
    );
    return response.data;
  },
  addReply: async (postId, commentId, replyData) => {
    const endpoint = ENDPOINTS.POST.REPLIES
      .replace(":postId", postId)
      .replace(":commentId", commentId);

    const response = await api.post(endpoint, replyData);
    console.log("Response from getReplies:", response.data);
    return response.data;
  },
  getReplies: async (postId, commentId) => {
    const endpoint = ENDPOINTS.POST.REPLIES
      .replace(":postId", postId)
      .replace(":commentId", commentId);

    const response = await api.get(endpoint);
    console.log("Response from getReplies:", response.data);
    return response.data;
  },
    
}