import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const blogService = {
    getBlogs: async () => {
        const data = await api.get(ENDPOINTS.BLOG.GET_OR_CREATE_BLOGS);
        console.log("Blogs data:", data.data);
        return data.data;
    },
    
    getBlogById: async(id) => {
        const response = await api.get(ENDPOINTS.BLOG.GET_BLOG_BY_ID.replace(":id", id));
        console.log("Blog data:", response.data);
        return response.data;
    },
    
    createOrUpdateBlog: (blogData) => {
        return api.post(ENDPOINTS.BLOG.GET_OR_CREATE_BLOGS, blogData);
    },
    
    updateBlog: (id, blogData) => {
        const endpoint = ENDPOINTS.BLOG.UPDATE_BLOG.replace(":id", id);
        return api.put(endpoint, blogData);
    },
    
    deleteBlog: (id) => {
        const endpoint = ENDPOINTS.BLOG.DELETE_BLOG.replace(":id", id);
        return api.delete(endpoint);
    }

}