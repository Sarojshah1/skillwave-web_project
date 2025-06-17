import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const createBlogService = {

    createBlog: (blogData) => {
        return api.post(ENDPOINTS.BLOG.GET_OR_CREATE_BLOGS, blogData);
    },
    

}