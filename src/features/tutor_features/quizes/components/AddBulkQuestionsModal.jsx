import React, { useState } from 'react';
import { X, ListPlus, Plus, Trash2 } from 'lucide-react';

const QUESTION_TYPES = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'short_answer', label: 'Short Answer' },
  // Add more types as needed
];

const emptyQuestion = () => ({
  question_text: '',
  question_type: 'multiple_choice',
  options: ['', '', '', ''],
  correct_answer: '',
});

const AddBulkQuestionsModal = ({ open, onClose, onSubmit, quizTitle }) => {
  const [questions, setQuestions] = useState([emptyQuestion()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (idx, field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === idx
          ? field === 'options'
            ? { ...q, options: value }
            : { ...q, [field]: value }
          : q
      )
    );
  };

  const handleOptionChange = (qIdx, optIdx, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIdx
          ? { ...q, options: q.options.map((opt, j) => (j === optIdx ? value : opt)) }
          : q
      )
    );
  };

  const addRow = () => setQuestions((prev) => [...prev, emptyQuestion()]);
  const removeRow = (idx) => setQuestions((prev) => prev.length === 1 ? prev : prev.filter((_, i) => i !== idx));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    for (const q of questions) {
      if (!q.question_text.trim() || !q.question_type || !q.correct_answer.trim()) {
        setError('Please fill all required fields for each question.');
        return;
      }
      if (q.question_type === 'multiple_choice' && q.options.filter(Boolean).length < 2) {
        setError('Each multiple choice question must have at least two options.');
        return;
      }
    }
    setLoading(true);
    const payload = questions.map((q) => ({
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.question_type === 'multiple_choice' ? q.options.filter(Boolean) : [],
      correct_answer: q.correct_answer,
    }));
    await onSubmit(payload);
    setLoading(false);
    setQuestions([emptyQuestion()]);
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl p-0 w-full max-w-4xl relative animate-fade-in border-t-8 border-[hsl(var(--primary))] overflow-hidden font-sans" style={{ minWidth: 350, maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--primary))] flex items-center justify-between px-8 py-5 shadow-md">
          <div className="flex items-center gap-3">
            <ListPlus className="w-8 h-8 text-white drop-shadow" />
            <div>
              <h3 className="text-2xl font-bold text-white tracking-wide">Add Bulk Questions</h3>
              <div className="text-white/80 text-sm font-medium">to <span className="font-semibold">"{quizTitle}"</span></div>
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
        {/* Table Section */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto flex-1 bg-gradient-to-br from-white via-gray-50 to-[hsl(var(--primary)/0.05)] px-6 py-4" style={{ minHeight: 0 }}>
            <table className="w-full text-base border-separate border-spacing-y-2">
              <thead className="sticky top-0 z-5">
                <tr>
                  <th className="p-3 text-left bg-white/80 font-semibold rounded-tl-xl">Question Text</th>
                  <th className="p-3 text-left bg-white/80 font-semibold">Type</th>
                  <th className="p-3 text-left bg-white/80 font-semibold">Options</th>
                  <th className="p-3 text-left bg-white/80 font-semibold">Correct Answer</th>
                  <th className="p-3 text-left bg-white/80 font-semibold rounded-tr-xl">Remove</th>
                </tr>
              </thead>
              <tbody>
                {questions.map((q, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white/90' : 'bg-[hsl(var(--primary)/0.04)]'}>
                    <td className="p-3 min-w-[200px]">
                      <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-[hsl(var(--primary)/0.2)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-white/80 text-base transition"
                        value={q.question_text}
                        onChange={e => handleChange(idx, 'question_text', e.target.value)}
                        required
                        placeholder="Question text"
                      />
                    </td>
                    <td className="p-3 min-w-[140px]">
                      <select
                        className="w-full p-3 rounded-lg border border-[hsl(var(--primary)/0.2)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-white/80 text-base transition"
                        value={q.question_type}
                        onChange={e => handleChange(idx, 'question_type', e.target.value)}
                      >
                        {QUESTION_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>{type.label}</option>
                        ))}
                      </select>
                    </td>
                    <td className="p-3 min-w-[220px]">
                      {q.question_type === 'multiple_choice' ? (
                        <div className="flex flex-col gap-2">
                          {q.options.map((opt, oIdx) => (
                            <input
                              key={oIdx}
                              type="text"
                              className="w-full p-2 rounded-lg border border-[hsl(var(--primary)/0.2)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-white/80 text-base transition"
                              value={opt}
                              onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                              placeholder={`Option ${oIdx + 1}`}
                            />
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">N/A</span>
                      )}
                    </td>
                    <td className="p-3 min-w-[160px]">
                      <input
                        type="text"
                        className="w-full p-3 rounded-lg border border-[hsl(var(--primary)/0.2)] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] bg-white/80 text-base transition"
                        value={q.correct_answer}
                        onChange={e => handleChange(idx, 'correct_answer', e.target.value)}
                        required
                        placeholder="Correct answer"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => removeRow(idx)}
                        className="text-[hsl(var(--primary))] hover:text-red-700 p-2 rounded-full bg-[hsl(var(--primary)/0.08)] hover:bg-red-100 transition shadow-sm"
                        disabled={questions.length === 1}
                        title="Remove row"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                onClick={addRow}
                className="flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary))] to-[hsl(var(--primary))] hover:from-[hsl(var(--primary)/0.9)] hover:to-[hsl(var(--primary)/0.8)] text-white font-semibold shadow-lg transition text-base"
                style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)' }}
              >
                <Plus className="w-5 h-5" /> Add Row
              </button>
            </div>
          </div>
          <div className="border-t border-[hsl(var(--primary)/0.15)] my-0" />
          {error && <div className="text-red-600 text-base mb-2 px-8 pt-2">{error}</div>}
          <div className="flex justify-end gap-4 px-8 py-6 bg-white/90 sticky bottom-0 z-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition text-base shadow"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.9)] to-[hsl(var(--primary)/0.8)] hover:from-[hsl(var(--primary)/0.8)] hover:to-[hsl(var(--primary)/0.7)] text-white font-bold shadow-lg transition text-base disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Questions'}
            </button>
          </div>
        </form>
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

export default AddBulkQuestionsModal; 