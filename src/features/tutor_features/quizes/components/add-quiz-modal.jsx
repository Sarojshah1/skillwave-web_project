import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import QuizForm from "./QuizForm"
import { useCreateQuiz } from "../hooks/useQuizHooks"

export function AddQuizModal({ isOpen, onClose, courseId, onQuizAdded }) {
  console.log("courseId in AddQuizModal:", courseId);
  const createQuiz = useCreateQuiz({
    onSuccess: () => {
      onQuizAdded && onQuizAdded();
      onClose && onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          onClick={onClose}
          disabled={createQuiz.isPending}
        >
          <span className="sr-only">Close</span>
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Quiz</h2>
        {createQuiz.isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-2">
            {createQuiz.error?.message || "Failed to create quiz. Please try again."}
          </div>
        )}
        <QuizForm
          onSubmit={(form) => {
            createQuiz.mutate({ ...form, "course_id":courseId });
          }}
          loading={createQuiz.isPending}
        />
      </div>
    </div>
  );
}
