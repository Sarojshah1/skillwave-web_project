import { useQuery } from "@tanstack/react-query";
import { ReviewService } from "../services/ReviewServices";

export const useReviewsByCourseId = (courseId) => {
  return useQuery({
    queryKey: ["reviews", courseId],
    queryFn: () => ReviewService.getReviewsByCourseId(courseId),
    enabled: !!courseId, 
  });
};
