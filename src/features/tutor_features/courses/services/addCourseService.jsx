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
    }
}