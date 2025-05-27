import { useQuery } from "@tanstack/react-query";
import { courseService } from "../services/courseService";

export const useCourseById = (id) => {
  return useQuery({
    queryKey: ["course", id],
    queryFn: () => courseService.getCourseById(id),
    enabled: !!id, // Only runs if id is truthy
  });
};
