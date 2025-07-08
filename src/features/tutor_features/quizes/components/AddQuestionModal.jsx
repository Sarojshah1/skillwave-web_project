import React, { useState } from 'react';
import { X, HelpCircle } from 'lucide-react';
import { useCreateQuestion } from '../hooks/useQuestionHooks';
import { useToast } from '@/features/tutor_features/courses/hooks/use-Toast';

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'short_answer', label: 'Short Answer' },
];

const AddQuestionModal = ({ open, onClose, onSubmit, quizTitle, quizId }) => {
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('multiple_choice');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [error, setError] = useState('');
  const toastApi = useToast();
  const createQuestion = useCreateQuestion({
    onSuccess: () => {
      toastApi.toast({
        title: 'Question added',
        description: 'The question was added successfully.',
        variant: 'success',
      });
      setQuestionText('');
      setQuestionType('multiple_choice');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      onClose();
    },
    onError: (err) => {
      setError(err?.message || 'Failed to add question.');
    },
  });

  const handleOptionChange = (idx, value) => {
    setOptions((prev) => prev.map((opt, i) => (i === idx ? value : opt)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!questionText.trim() || !questionType || !correctAnswer.trim()) {
      setError('Please fill all required fields.');
      return;
    }
    if (questionType === 'multiple_choice' && options.filter(Boolean).length < 2) {
      setError('Please provide at least two options for multiple choice.');
      return;
    }
    createQuestion.mutate({
      quiz_id: quizId,
      question_text: questionText,
      question_type: questionType,
      options: questionType === 'multiple_choice' ? options.filter(Boolean) : [],
      correct_answer: correctAnswer,
    });
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-2xl shadow-2xl p-0 w-full max-w-md relative animate-fade-in border border-teal-200" style={{ minWidth: 350 }}>
        {/* Top border accent */}
        <div className="h-2 rounded-t-2xl bg-gradient-to-r from-teal-400 via-teal-500 to-cyan-400" />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-teal-600 text-3xl font-bold focus:outline-none"
          aria-label="Close"
          style={{ zIndex: 2 }}
        >
          <X className="w-7 h-7" />
        </button>
        <div className="p-8 pt-6 flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2">
            <HelpCircle className="w-7 h-7 text-teal-500" />
            <h3 className="text-2xl font-bold text-teal-700">Add Question</h3>
          </div>
          <div className="text-gray-500 text-sm mb-4 text-center w-full">to <span className="font-semibold text-gray-700">"{quizTitle}"</span></div>
          <form onSubmit={handleSubmit} className="space-y-5 w-full">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Question Text</label>
              <input
                type="text"
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-teal-500 bg-gray-50 transition"
                value={questionText}
                onChange={e => setQuestionText(e.target.value)}
                required
                placeholder="Enter question text"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Question Type</label>
              <select
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 bg-gray-50 transition"
                value={questionType}
                onChange={e => setQuestionType(e.target.value)}
              >
                {QUESTION_TYPES.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            {questionType === 'multiple_choice' && (
              <div>
                <label className="block text-gray-700 font-semibold mb-1">Options</label>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <input
                      key={idx}
                      type="text"
                      className="w-full p-2 rounded border border-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-300"
                      value={opt}
                      onChange={e => handleOptionChange(idx, e.target.value)}
                      placeholder={`Option ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Correct Answer</label>
              <input
                type="text"
                className="w-full mt-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-500 bg-gray-50 transition"
                value={correctAnswer}
                onChange={e => setCorrectAnswer(e.target.value)}
                required
                placeholder="Enter correct answer"
              />
            </div>
            {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-400 hover:from-teal-600 hover:to-cyan-500 text-white font-bold py-3 rounded-lg transition duration-200 shadow-md text-lg tracking-wide disabled:opacity-60"
              disabled={createQuestion.isPending}
            >
              {createQuestion.isPending ? 'Adding...' : 'Add Question'}
            </button>
          </form>
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

export default AddQuestionModal; 