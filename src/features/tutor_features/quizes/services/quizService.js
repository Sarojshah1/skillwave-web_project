import { api } from '@/infrastructure/api/api';
import { ENDPOINTS } from '@/shared/constants/api.const';

export const quizService = {
  getQuizzes: () => api.get(ENDPOINTS.QUIZ.GET_ALL_QUIZZES),
  getQuizById: (id) => api.get(`${ENDPOINTS.QUIZ.GET_QUIZ_BY_ID}/${id}`),
  createQuiz: (data) => {
    console.log(data);
    return api.post(ENDPOINTS.QUIZ.CREATE_QUIZ, data);
  },
  getQuizzesByCourseId: (courseId) => api.get(`${ENDPOINTS.QUIZ.GET_QUIZZES_BY_COURSE_ID}/${courseId}`),
  updateQuiz: (id, data) => api.put(`${ENDPOINTS.QUIZ.UPDATE_QUIZ}/${id}`, data),
  deleteQuiz: (id) => api.delete(`${ENDPOINTS.QUIZ.DELETE_QUIZ}/${id}`),
}; 