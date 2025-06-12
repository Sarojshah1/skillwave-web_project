import { api } from "@/infrastructure/api/api"
import { ENDPOINTS } from "@/shared/constants/api.const"

export const myLearningServices = {
    getMyLearnings:async()=>{
        const response=await api.get(ENDPOINTS.ENROLL.GET_ENROLLED_COURSES);
        return response.data;
    },
    getCourseById: (id) => {
    const endpoint = ENDPOINTS.COURCES.GET_COURSE_BY_ID.replace(":id", id);
    return api.get(endpoint);
  },
}