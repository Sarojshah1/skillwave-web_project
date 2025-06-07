import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/features/shared_features/blogs/services/blogService';

export const useBlogs = () => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getBlogs,
  });
};
