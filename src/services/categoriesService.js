import { api } from "../infrastructure/api/api"
import { ENDPOINTS } from "../shared/constants/api.const"

export const categoryServices={
    getCategories:async()=>{
        const response=await api.get(ENDPOINTS.CATEGORY.GET_CATEGORY);
        return response.data;
    }
}