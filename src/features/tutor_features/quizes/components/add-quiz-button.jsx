import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddQuizModal } from "./add-quiz-modal"

export function AddQuizButton({ courseId, onQuizAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Quiz
      </Button>

      <AddQuizModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId}
        onQuizAdded={() => {
          onQuizAdded()
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
