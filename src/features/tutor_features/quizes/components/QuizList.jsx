import React, { useState } from 'react';
import { useGetQuizzes, useCreateQuiz, useUpdateQuiz, useDeleteQuiz, useGetQuizzesByCourseId } from '../hooks/useQuizHooks';
import QuizForm from './QuizForm';
import { Pencil, Trash2, PlusCircle, Eye, ListPlus } from 'lucide-react';
import AddQuestionModal from './AddQuestionModal';
import AddBulkQuestionsModal from './AddBulkQuestionsModal';
import { useToast } from '@/features/tutor_features/courses/hooks/use-Toast';
import { ToastContainer } from '@/components/ui/toast';
import { useBulkInsertQuestions } from '../hooks/useQuestionHooks';
import ViewQuizDetailsModal from './ViewQuizDetailsModal';

const QuizList = ({ courseId }) => {
  const { data: quizzes, isPending, isError, error } = useGetQuizzesByCourseId(courseId);
  const createQuiz = useCreateQuiz();
  const updateQuiz = useUpdateQuiz();
  const toastApi = useToast();
  const deleteQuiz = useDeleteQuiz({
    onSuccess: () => {
      toastApi.toast({
        title: 'Quiz deleted',
        description: 'The quiz was deleted successfully.',
        variant: 'success',
      });
    },
    onError: (err) => {
      toastApi.toast({
        title: 'Delete failed',
        description: err?.message || 'Could not delete quiz.',
        variant: 'destructive',
      });
    },
  });

  const [showModal, setShowModal] = useState(false);
  const [editQuiz, setEditQuiz] = useState(null);
  const [showAddQuestionModal, setShowAddQuestionModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState(null);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkQuiz, setBulkQuiz] = useState(null);
  const bulkInsertQuestions = useBulkInsertQuestions({
    onSuccess: () => {
      toastApi.toast({
        title: 'Questions added',
        description: 'Bulk questions added successfully.',
        variant: 'success',
      });
    },
    onError: (err) => {
      toastApi.toast({
        title: 'Bulk add failed',
        description: err?.message || 'Could not add questions.',
        variant: 'destructive',
      });
    },
  });
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewQuizId, setViewQuizId] = useState(null);

  const handleAdd = () => {
    setEditQuiz(null);
    setShowModal(true);
  };

  const handleEdit = (quiz) => {
    setEditQuiz(quiz);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setQuizToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (quizToDelete) {
      deleteQuiz.mutate(quizToDelete);
    }
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setQuizToDelete(null);
  };

  const handleSubmit = (form) => {
    if (editQuiz) {
      updateQuiz.mutate({ id: editQuiz._id, data: form }, { onSuccess: () => setShowModal(false) });
    } else {
      createQuiz.mutate({ ...form, course_id: courseId }, { onSuccess: () => setShowModal(false) });
    }
  };

  // Placeholder for add question logic
  const handleAddQuestion = async (quizId, data) => {
    // TODO: Implement API call to add question to quiz
    toastApi.toast({
      title: 'Question added (demo)',
      description: `Question added to quiz ${quizId}: ${data.question}`,
      variant: 'success',
    });
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <ToastContainer toasts={toastApi.toasts} onDismiss={toastApi.dismiss} />
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Quizzes</h2>
        <button
          onClick={handleAdd}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Quiz
        </button>
      </div>
      {isPending && <div className="text-center py-8">Loading quizzes...</div>}
      {isError && <div className="text-center text-red-600 py-8">{error?.message || 'Failed to load quizzes.'}</div>}
      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4 text-left">Total Marks</th>
            <th className="py-2 px-4 text-left">Passing Marks</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {quizzes && quizzes.length > 0 ? (
            quizzes.map((quiz) => (
              <tr key={quiz._id} className="border-t">
                <td className="py-2 px-4">{quiz.title}</td>
                <td className="py-2 px-4">{quiz.total_marks}</td>
                <td className="py-2 px-4">{quiz.passing_marks}</td>
                <td className="py-2 px-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(quiz)}
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    title="Edit Quiz"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(quiz._id)}
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    title="Delete Quiz"
                  >
                    <Trash2 className="w-4 h-4 text-red font-bold" />
                  </button>
                  <button
                    onClick={() => { setViewQuizId(quiz._id); setShowViewModal(true); }}
                    className="bg-purple-500 hover:bg-purple-600 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    title="View Quiz"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setBulkQuiz(quiz); setShowBulkModal(true); }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    title="Add Bulk Questions"
                    disabled={bulkInsertQuestions.isPending}
                  >
                    <ListPlus className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setSelectedQuiz(quiz); setShowAddQuestionModal(true); }}
                    className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center shadow-md"
                    title="Add Single Question"
                  >
                    <PlusCircle className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-8 text-gray-500">No quizzes found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <QuizForm
              initialValues={editQuiz}
              onSubmit={handleSubmit}
              loading={createQuiz.isPending || updateQuiz.isPending}
            />
          </div>
        </div>
      )}
      <AddQuestionModal
        quizId={selectedQuiz?._id}
        open={showAddQuestionModal}
        onClose={() => setShowAddQuestionModal(false)}
        onSubmit={data => handleAddQuestion(selectedQuiz?._id, data)}
        quizTitle={selectedQuiz?.title || ''}
      />
      <AddBulkQuestionsModal
        open={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        onSubmit={(questions) => {
          if (bulkQuiz) {
            bulkInsertQuestions.mutate({ quiz_id: bulkQuiz._id, questions });
          }
        }}
        quizTitle={bulkQuiz?.title || ''}
      />
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm relative animate-fade-in border-t-4 border-red-500">
            <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
              <Trash2 className="w-6 h-6 text-red-500" />
              Delete Quiz
            </h3>
            <p className="mb-6 text-gray-700">Are you sure you want to delete this quiz?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="px-5 py-2 rounded-lg bg-red hover:bg-red-600 text-white font-semibold transition shadow"
              >
                Yes, Delete
              </button>
            </div>
          </div>
          <style>{`
            @keyframes fade-in {
              from { opacity: 0; transform: scale(0.95); }
              to { opacity: 1; transform: scale(1); }
            }
            .animate-fade-in { animation: fade-in 0.2s ease; }
          `}</style>
        </div>
      )}
      <ViewQuizDetailsModal
        open={showViewModal}
        onClose={() => setShowViewModal(false)}
        quizId={viewQuizId}
      />
    </div>
  );
};

export default QuizList; 