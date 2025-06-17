import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBlogService } from '../services/create-blog-service'; 

export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (blogData) => createBlogService.createBlog(blogData),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      console.log('Blog created successfully:', data);
    },

    onError: (error) => {
      console.error('Error creating blog:', error);
    },
  });
};
