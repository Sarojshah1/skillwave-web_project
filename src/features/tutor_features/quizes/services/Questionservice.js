import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const questionService = {   
    createQuestion: (data) => {
        return api.post(ENDPOINTS.QUESTION.CREATE_QUESTION, data);
    },
    getQuestionById: (id) => {
        return api.get(`${ENDPOINTS.QUESTION.GET_QUESTION_BY_ID}/${id}`);
    },
    getQuestionsByQuizId: (quizId) => {
        return api.get(`${ENDPOINTS.QUESTION.GET_QUESTIONS_BY_QUIZ_ID}/${quizId}`);
    },
    updateQuestion: (id, data) => {
        return api.put(`${ENDPOINTS.QUESTION.UPDATE_QUESTION}/${id}`, data);
    },
    deleteQuestion: (id) => {
        return api.delete(`${ENDPOINTS.QUESTION.DELETE_QUESTION}/${id}`);
    },
    bulkInsertQuestions: (quiz_id, questions) => {
        return api.post(ENDPOINTS.QUESTION.BULK_INSERT_QUESTIONS, { quiz_id, questions });
    },
}