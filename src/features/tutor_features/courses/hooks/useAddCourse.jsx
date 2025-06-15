import { useMutation } from "@tanstack/react-query";
import { addCourseService } from "../services/addCourseService";

export const useAddCourse = () => {
  return useMutation({
    mutationFn: addCourseService.addCourse,
  });
};
