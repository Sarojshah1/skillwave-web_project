import { useMutation } from "@tanstack/react-query";
import { addCourseService } from "../services/addCourseService";

export function useCreateLessons() {
  return useMutation({
    mutationFn: (data) => addCourseService.createLessons(data),
  });
}
