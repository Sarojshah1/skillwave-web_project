import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCoursesByCategory = (categoryId) => {
  return useQuery({
    queryKey: ["courses-category", categoryId],
    queryFn: () => courseService.getCoursesByCategory(categoryId),
    enabled: !!categoryId, // Only runs if categoryId is truthy
  });
};
