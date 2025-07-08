import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { quizService } from '../services/quizService';

export const useGetQuizzes = (options = {}) => {
  return useQuery({
    queryKey: ['quizzes'],
    queryFn: quizService.getQuizzes,
    select: (res) => res.data,
    ...options,
  });
};

export const useGetQuizzesByCourseId = (courseId, options = {}) => {
  return useQuery({
    queryKey: ['quizzes', courseId],
    queryFn: () => quizService.getQuizzesByCourseId(courseId),
    select: (res) => res.data,
    ...options,
  });
};

export const useCreateQuiz = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: quizService.createQuiz,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['quizzes']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export const useUpdateQuiz = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => quizService.updateQuiz(id, data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['quizzes']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export const useDeleteQuiz = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => quizService.deleteQuiz(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['quizzes']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
}; 