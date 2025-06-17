import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AddLessonModal } from "./add-lesson-modal"

export function AddLessonButton({ courseId, onLessonAdded }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2">
        <Plus className="w-4 h-4" />
        Add Lesson
      </Button>

      <AddLessonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        courseId={courseId}
        onLessonAdded={() => {
          onLessonAdded()
          setIsModalOpen(false)
        }}
      />
    </>
  )
}
