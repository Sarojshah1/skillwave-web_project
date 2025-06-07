import { useQuery } from '@tanstack/react-query';
import { blogService } from '@/features/shared_features/blogs/services/blogService';

export const useBlogById = (id, enabled = true) => {
  return useQuery({
    queryKey: ['blog', id],
    queryFn: () => blogService.getBlogById(id),
    enabled: !!id && enabled, 
  });
};
