import { useQuery } from '@tanstack/react-query';
import { addCourseService } from '../services/addCourseService';

export function useGetCreatorCourses() {
  return useQuery({
    queryKey: ['creatorCourses'],
    queryFn: () => addCourseService.getCreatorCourses(),
  })
}
