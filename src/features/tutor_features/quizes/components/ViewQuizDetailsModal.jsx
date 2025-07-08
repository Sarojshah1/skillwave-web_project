import React from 'react';
import { X, Eye, Loader2 } from 'lucide-react';
import { useGetQuestionsByQuizId } from '../hooks/useQuestionHooks';
import { useGetQuizzes } from '../hooks/useQuizHooks';

const ViewQuizDetailsModal = ({ open, onClose, quizId }) => {
  // Fetch all quizzes and find the one with quizId
  const { data: quizzes, isPending: quizzesLoading, error: quizzesError } = useGetQuizzes();
  const quiz = quizzes?.find(q => q._id === quizId);

  // Fetch questions for this quiz
  const { data: questions, isPending: questionsLoading, error: questionsError } = useGetQuestionsByQuizId(quizId);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-0 w-full max-w-3xl relative animate-fade-in border-t-8 border-[hsl(var(--primary))] overflow-hidden font-sans" style={{ minWidth: 350, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-[#49BBBD] flex items-center justify-between px-8 py-5 shadow-md">
          <div className="flex items-center gap-3">
            <Eye className="w-8 h-8 text-white drop-shadow" />
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Quiz Details</h3>
              <div className="text-white/80 text-sm font-medium">{quiz ? quiz.title : quizzesLoading ? 'Loading...' : ''}</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-[hsl(var(--primary-foreground))] text-3xl font-bold focus:outline-none transition"
            aria-label="Close"
            style={{ zIndex: 2 }}
          >
            <X className="w-8 h-8" />
          </button>
        </div>
        {/* Quiz Details */}
        <div className="flex-1 overflow-y-auto px-8 py-6 bg-gradient-to-br from-white via-gray-50 to-[hsl(var(--primary)/0.05)]">
          {quizzesLoading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="animate-spin w-12 h-12 text-[hsl(var(--primary))] mb-4" />
              <div className="text-lg text-gray-500 font-semibold">Loading quiz details...</div>
            </div>
          ) : quizzesError ? (
            <div className="text-red-600 text-center py-8 font-semibold">Failed to load quiz details.</div>
          ) : !quiz ? (
            <div className="text-gray-500 italic text-center py-8">Quiz not found.</div>
          ) : (
            <>
              <div className="mb-6">
                <div className="text-lg font-semibold text-[hsl(var(--primary))] mb-2">Quiz Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                  <div><span className="font-semibold">Title:</span> {quiz.title}</div>
                  <div><span className="font-semibold">Total Marks:</span> {quiz.total_marks}</div>
                  <div><span className="font-semibold">Passing Marks:</span> {quiz.passing_marks}</div>
                  <div><span className="font-semibold">Description:</span> {quiz.description}</div>
                </div>
              </div>
              <div className="mb-2 text-lg font-semibold text-[hsl(var(--primary))]">Questions</div>
              {questionsLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="animate-spin w-10 h-10 text-[hsl(var(--primary))] mb-2" />
                  <div className="text-base text-gray-500 font-medium">Loading questions...</div>
                </div>
              ) : questionsError ? (
                <div className="text-red-600 text-center py-8 font-semibold">Failed to load questions.</div>
              ) : questions && questions.length > 0 ? (
                <div className="space-y-5">
                  {questions.map((q, idx) => (
                    <div key={q._id || idx} className="rounded-2xl bg-gradient-to-br from-white via-[hsl(var(--primary)/0.04)] to-[hsl(var(--primary)/0.08)] border border-[hsl(var(--primary)/0.12)] shadow p-5 transition hover:shadow-lg group relative">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-[hsl(var(--primary))] text-lg drop-shadow">Q{idx + 1}.</span>
                        <span className="font-medium text-gray-800 text-base">{q.question_text}</span>
                        <span className="ml-2 px-2 py-0.5 rounded bg-[hsl(var(--primary)/0.08)] text-xs text-[hsl(var(--primary))] font-semibold uppercase tracking-wide">{q.question_type.replace('_', ' ')}</span>
                      </div>
                      {q.question_type === 'multiple_choice' && q.options && q.options.length > 0 && (
                        <ul className="list-disc pl-7 mb-1 text-sm">
                          {q.options.map((opt, oIdx) => (
                            <li key={oIdx} className={q.correct_answer === opt ? 'font-bold text-green-700' : 'text-gray-700'}>{opt}</li>
                          ))}
                        </ul>
                      )}
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-semibold">Correct Answer:</span> <span className="text-green-700 font-bold">{q.correct_answer}</span>
                      </div>
                      {/* Decorative gradient bar */}
                      <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500 opacity-70 rounded-b-2xl group-hover:opacity-100 transition" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic text-center py-8">No questions found for this quiz.</div>
              )}
            </>
          )}
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
  );
};

export default ViewQuizDetailsModal; 