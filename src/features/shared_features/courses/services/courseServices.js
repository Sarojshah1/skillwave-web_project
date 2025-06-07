import { api } from "../../../../infrastructure/api/api";
import { ENDPOINTS } from "../../../../shared/constants/api.const";

export const courseService = {
  getCourses: async(params) => {
    const data=await api.get(ENDPOINTS.COURCES.GET_COURSES, { params });
    return data.data.courses;
  },

  getCourseById: (id) => {
    const endpoint = ENDPOINTS.COURCES.GET_COURSE_BY_ID.replace(":id", id);
    return api.get(endpoint);
  },

  getCoursesByCategory: (categoryId) => {
    const endpoint = ENDPOINTS.COURCES.GET_COURSE_BY_CATEGORY.replace(":categoryId", categoryId);
    return api.get(endpoint);
  }
};
