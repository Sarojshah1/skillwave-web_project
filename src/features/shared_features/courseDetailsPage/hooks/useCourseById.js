import { useQuery } from '@tanstack/react-query';
import { courseService } from '../../courses/services/courseServices';

export const useCourseById = (id) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id).then((res) => res.data),
    enabled: !!id, 
  });
};
