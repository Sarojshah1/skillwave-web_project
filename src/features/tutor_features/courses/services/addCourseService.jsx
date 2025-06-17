import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const addCourseService = {
    addCourse: async (data) => {
        const response = await api.post(
            ENDPOINTS.COURCES.ADD_COURSE,
            data,{headers:{
                'Content-Type': 'multipart/form-data',
            }}
        );
        return response.data;
    },

    getCreatorCourses: async () => {
        const response = await api.get(ENDPOINTS.COURCES.GET_CREATOR_COURSE);
        return response.data;
    },
    createLessons: async (data) => {
        const response = await api.post(ENDPOINTS.LESSONS.CREATE_LESSONS, data);
        return response.data;
    },
}