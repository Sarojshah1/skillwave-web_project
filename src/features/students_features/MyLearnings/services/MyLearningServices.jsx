import { api } from "@/infrastructure/api/api"
import { ENDPOINTS } from "@/shared/constants/api.const"

export const myLearningServices = {
    getMyLearnings:async()=>{
        const response=await api.get(ENDPOINTS.ENROLL.GET_ENROLLED_COURSES);
        return response.data;
    }
}