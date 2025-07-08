import { useState, useMemo } from "react"
import { CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Clock, X } from "lucide-react"
import { Timer } from "../components/Timer"
import { useGetQuestionsByQuizId } from '../../../tutor_features/quizes/hooks/useQuestionHooks'
import Certificate from "./Certificate";

function CertificateModal({ open, onClose, studentName, quizTitle, score }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg w-full relative border-t-8 border-[#49BBBD]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#49BBBD] text-3xl font-bold focus:outline-none"
          aria-label="Close"
        >
          <X className="w-7 h-7" />
        </button>
        <div className="flex flex-col items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-[#49BBBD] flex items-center justify-center mb-2 shadow-lg">
            <CheckCircle className="w-14 h-14 text-white" />
          </div>
          <h2 className="text-3xl font-extrabold text-[#49BBBD] mb-2">Certificate of Achievement</h2>
          <p className="text-lg text-gray-700 text-center mb-2">This is to certify that</p>
          <div className="text-2xl font-bold text-gray-900 mb-2">{studentName}</div>
          <p className="text-lg text-gray-700 text-center mb-2">has successfully passed the quiz</p>
          <div className="text-xl font-semibold text-[#49BBBD] mb-2">{quizTitle}</div>
          <p className="text-lg text-gray-700 text-center mb-2">with a score of <span className="font-bold">{score}%</span></p>
          <div className="mt-6 flex gap-4">
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-[#49BBBD] text-white rounded-xl font-bold shadow hover:bg-cyan-600 transition"
            >
              Download / Print
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-bold shadow hover:bg-gray-300 transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .certificate-print, .certificate-print * { visibility: visible; }
          .certificate-print { position: absolute; left: 0; top: 0; width: 100vw; height: 100vh; background: white; z-index: 9999; }
        }
      `}</style>
    </div>
  );
}

export function QuizContent({ quizId, quizMeta, onComplete }) {
  const { data: questions, isPending, error } = useGetQuestionsByQuizId(quizId, { enabled: !!quizId });
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)

  // Timer logic based on number of questions
  const totalQuestions = questions?.length || 0;
  const timerDuration = useMemo(() => {
    if (totalQuestions < 5) return 2 * 60; // 2 min
    if (totalQuestions === 10) return 5 * 60; // 5 min
    if (totalQuestions === 20) return 15 * 60; // 15 min
    return 3 * 60; // default 3 min
  }, [totalQuestions]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-purple-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    )
  }
  if (error) {
    return <div className="text-center text-red-600 py-8">Failed to load quiz questions.</div>;
  }
  if (!questions || !Array.isArray(questions) || questions.length === 0) {
    return <div className="text-center text-gray-500 py-8">No questions found for this quiz.</div>;
  }

  const quizQuestions = questions.map(q => ({
    id: q._id || q.id,
    text: q.question_text || q.text,
    options: q.options,
    correctAnswer: q.correct_answer || q.correctAnswer,
    ...q,
  }));

  const currentQuestion = quizQuestions[currentIndex]

  const handleAnswerChange = (questionId, answer) => {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleSubmit = () => {
    const correctAnswers = quizQuestions.filter((q) => answers[q.id] === q.correctAnswer).length
    const calculatedScore = Math.round((correctAnswers / totalQuestions) * 100)
    setScore(calculatedScore)
    setSubmitted(true)
    onComplete(calculatedScore)
  }

  const allQuestionsAnswered = quizQuestions.every((q) => answers[q.id])
  const isPassing = score !== null && score >= (quizMeta?.passingScore || quizMeta?.passing_marks || 0)
  const progress = Math.round((Object.keys(answers).length / totalQuestions) * 100)

  // For demo, use a placeholder student name and instructor
  const studentName = "Student Name"
  const instructorName = quizMeta?.instructor || "Instructor Name"
  const courseName = quizMeta?.title || "Quiz"
  const courseId = quizMeta?.course_id || ""

  return (
    <div className="max-w-2xl mx-auto space-y-10 animate-fade-in">
      {/* Quiz Header */}
      <div className="bg-[#49BBBD] text-white rounded-3xl shadow-2xl p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative overflow-hidden">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2 drop-shadow-lg tracking-tight">{quizMeta?.title}</h1>
          <p className="opacity-90 text-lg font-medium mb-2">{quizMeta?.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-base font-semibold">
            <div className="bg-white/20 px-4 py-1 rounded-full shadow">{quizQuestions.length} Questions</div>
            <div className="bg-white/20 px-4 py-1 rounded-full shadow">Passing Score: {quizMeta?.passingScore || quizMeta?.passing_marks}%</div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/80">Time Remaining</span>
          <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-xl shadow-lg">
            <Clock className="w-6 h-6 text-white" />
            <Timer initialTime={timerDuration} isActive={!submitted} onTimeUp={handleSubmit} />
          </div>
        </div>
        <div className="absolute right-0 top-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-bl-3xl pointer-events-none" />
      </div>

      {/* Progress Bar */}
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-[#49BBBD]  transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Question Navigation */}
      <div className="flex items-center justify-between mb-2">
        <button
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="w-5 h-5" /> Prev
        </button>
        <div className="text-base text-gray-700 font-bold">
          Question <span className="text-[#49BBBD]">{currentIndex + 1}</span> of {totalQuestions}
        </div>
        <button
          className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold shadow disabled:opacity-50"
          onClick={() => setCurrentIndex((i) => Math.min(totalQuestions - 1, i + 1))}
          disabled={currentIndex === totalQuestions - 1}
        >
          Next <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Question Card */}
      <div
        className={`bg-white border-2 rounded-2xl shadow-xl overflow-hidden transition-all duration-200 ${
          submitted
            ? answers[currentQuestion.id] === currentQuestion.correctAnswer
              ? "border-green-300"
              : "border-red-300"
            : "border-gray-200"
        }`}
      >
        <div className="p-6 bg-gradient-to-r from-[#49BBBD]/10 to-purple-100 border-b border-gray-100 flex items-center gap-2">
          <span className="bg-[#49BBBD] text-white h-8 w-8 rounded-full inline-flex items-center justify-center text-lg font-bold shadow">
            {currentIndex + 1}
          </span>
          <span className="font-semibold text-lg text-gray-800">{currentQuestion.text}</span>
        </div>
        <div className="p-6 space-y-4">
          {currentQuestion.options.map((option, optionIndex) => {
            const isSelected = answers[currentQuestion.id] === option
            const isCorrect = option === currentQuestion.correctAnswer
            let optionClass = "border-2 border-gray-200 hover:border-[#49BBBD]"
            if (submitted) {
              if (isCorrect) {
                optionClass = "border-2 border-green-500 bg-green-50"
              } else if (isSelected) {
                optionClass = "border-2 border-red-500 bg-red-50"
              }
            } else if (isSelected) {
              optionClass = "border-2 border-[#49BBBD] bg-cyan-50"
            }
            return (
              <label
                key={optionIndex}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition-colors text-base font-medium ${optionClass}`}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  value={option}
                  checked={isSelected}
                  onChange={() => handleAnswerChange(currentQuestion.id, option)}
                  disabled={submitted}
                  className="h-5 w-5 text-[#49BBBD] focus:ring-cyan-500 border-gray-300"
                />
                <span className="ml-4">{option}</span>
                {submitted && isCorrect && <CheckCircle className="h-6 w-6 text-green-500 ml-auto" />}
              </label>
            )
          })}
          {/* Per-question feedback after submission */}
          {submitted && answers[currentQuestion.id] !== currentQuestion.correctAnswer && (
            <div className="mt-3 text-base text-green-700 bg-green-50 p-3 rounded-xl border border-green-200">
              <strong>Correct answer:</strong> {currentQuestion.correctAnswer}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {quizQuestions.map((q, idx) => (
          <button
            key={q.id}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-150 shadow ${
              idx === currentIndex
                ? "bg-[#49BBBD] border-[#49BBBD] scale-110"
                : answers[q.id]
                ? "bg-green-400 border-green-400"
                : "bg-gray-200 border-gray-300"
            }`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to question ${idx + 1}`}
            disabled={submitted}
          />
        ))}
      </div>

      {/* Submit Button & Result */}
      {!submitted && (
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSubmit}
            disabled={!allQuestionsAnswered}
            className="px-10 py-4 bg-[#49BBBD]  text-white rounded-2xl font-extrabold text-xl shadow-xl hover:from-cyan-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Quiz
          </button>
        </div>
      )}
      {submitted && score !== null && (
        <div
          className={`p-6 rounded-2xl flex items-center gap-6 mt-8 shadow-xl text-xl font-bold ${
            isPassing ? "bg-green-50 border border-green-300 text-green-800" : "bg-red-50 border border-red-300 text-red-800"
          }`}
        >
          {isPassing ? (
            <CheckCircle className="h-10 w-10 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="h-10 w-10 text-red-500 flex-shrink-0" />
          )}
          <div>
            <p>
              {isPassing ? "Congratulations! You passed the quiz." : "Not quite there yet. Try again!"}
            </p>
            <p>
              Your score: <span className="font-extrabold">{score}%</span> {isPassing ? "(Passed)" : `(${(quizMeta?.passingScore || quizMeta?.passing_marks || 0) - score}% below passing)`}
            </p>
          </div>
        </div>
      )}
      {submitted && isPassing && (
        <div className="flex justify-center mt-6">
          <button
            className="px-10 py-4 bg-green-600 text-white rounded-2xl font-extrabold text-xl hover:bg-green-700 transition-colors shadow-xl"
            onClick={() => setShowCertificate(true)}
          >
            Generate Certificate
          </button>
        </div>
      )}
      {showCertificate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in">
          <Certificate
            courseName={courseName}
            studentName={studentName}
            instructorName={instructorName}
            courseId={courseId}
          />
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.97); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.3s cubic-bezier(.4,0,.2,1); }
      `}</style>
    </div>
  )
}
