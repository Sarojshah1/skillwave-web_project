import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";


export const ReviewService={
    addReview: async(reviewData) => {
        const data=await api.post(ENDPOINTS.REVIEW.POST_REVIEWS, reviewData);
            return data.data;

    },
    getReviewsByCourseId: async (courseId) => {
    const response = await api.get(ENDPOINTS.REVIEW.GET_REVIEW_BY_COURSE_ID.replace(":courseId",courseId));
    return response.data;
  },

}