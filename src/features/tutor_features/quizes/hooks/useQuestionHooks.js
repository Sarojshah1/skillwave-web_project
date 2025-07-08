import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { questionService } from '../services/Questionservice';

export const useGetQuestionsByQuizId = (quizId, options = {}) => {
  return useQuery({
    queryKey: ['questions', quizId],
    queryFn: () => questionService.getQuestionsByQuizId(quizId),
    select: (res) => res.data,
    enabled: !!quizId,
    ...options,
  });
};

export const useGetQuestionById = (id, options = {}) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: () => questionService.getQuestionById(id),
    select: (res) => res.data,
    enabled: !!id,
    ...options,
  });
};

export const useCreateQuestion = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: questionService.createQuestion,
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['questions']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export const useUpdateQuestion = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => questionService.updateQuestion(id, data),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['questions']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export const useDeleteQuestion = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => questionService.deleteQuestion(id),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['questions']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export const useBulkInsertQuestions = (options = {}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ quiz_id, questions }) => questionService.bulkInsertQuestions(quiz_id, questions),
    onSuccess: (...args) => {
      queryClient.invalidateQueries(['questions']);
      options.onSuccess && options.onSuccess(...args);
    },
    ...options,
  });
};

export { questionService }; 