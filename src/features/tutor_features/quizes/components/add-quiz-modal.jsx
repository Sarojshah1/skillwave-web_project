import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

export function AddQuizModal({ isOpen, onClose, courseId, onQuizAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.title.trim()) {
      setError("Please enter a quiz title.")
      return
    }

    if (!formData.description.trim()) {
      setError("Please enter a quiz description.")
      return
    }

    if (!formData.duration.trim()) {
      setError("Please specify the quiz duration.")
      return
    }

    setIsSubmitting(true)

    try {
      // Here you would typically call an API to add the quiz
      console.log("Adding quiz:", { ...formData, courseId })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setSuccess("Quiz created successfully!")

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({ title: "", description: "", duration: "" })
        setSuccess("")
        onQuizAdded()
      }, 1500)
    } catch (error) {
      console.error("Error creating quiz:", error)
      setError("Failed to create quiz. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Quiz</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Message */}
            {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">{error}</div>}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">{success}</div>
            )}

            <div>
              <Label htmlFor="quiz-title">Quiz Title *</Label>
              <Input
                id="quiz-title"
                placeholder="Enter quiz title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="quiz-description">Description *</Label>
              <Input
                id="quiz-description"
                placeholder="Enter quiz description..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="quiz-duration">Duration *</Label>
              <Input
                id="quiz-duration"
                placeholder="e.g., 15 min"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating Quiz..." : "Create Quiz"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
