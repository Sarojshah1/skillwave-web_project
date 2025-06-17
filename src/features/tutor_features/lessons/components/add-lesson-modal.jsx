import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Upload, FileText } from 'lucide-react'

export function AddLessonModal({ isOpen, onClose, courseId, onLessonAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    video_url: "",
    order: "",
  })
  const [contentFile, setContentFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf") {
        setContentFile(file)
        setError("")
      } else {
        setError("Please select a PDF file.")
        setContentFile(null)
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!formData.title.trim()) {
      setError("Please enter a lesson title.")
      return
    }

    if (!formData.order.trim()) {
      setError("Please specify the lesson order.")
      return
    }

    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("course_id", courseId)
      formDataToSend.append("title", formData.title)
      formDataToSend.append("video_url", formData.video_url)
      formDataToSend.append("order", formData.order)

      if (contentFile) {
        formDataToSend.append("content", contentFile)
      }

      const response = await fetch("/api/lessons", {
        method: "POST",
        body: formDataToSend,
      })

      if (response.ok) {
        const savedLesson = await response.json()
        setSuccess("Lesson created successfully!")
        console.log("Lesson created:", savedLesson)

        // Reset form after a short delay
        setTimeout(() => {
          setFormData({ title: "", video_url: "", order: "" })
          setContentFile(null)
          setSuccess("")

          // Reset file input
          const fileInput = document.getElementById("content-file")
          if (fileInput) fileInput.value = ""

          onLessonAdded()
        }, 1500)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to create lesson")
      }
    } catch (error) {
      console.error("Error creating lesson:", error)
      setError(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Add New Lesson</CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                {success}
              </div>
            )}

            {/* Lesson Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Lesson Title *</Label>
              <Input
                id="title"
                placeholder="Enter lesson title..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL (Optional)</Label>
              <Input
                id="video_url"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
              />
              <p className="text-xs text-gray-500">Add a YouTube, Vimeo, or other video URL</p>
            </div>

            {/* Lesson Order */}
            <div className="space-y-2">
              <Label htmlFor="order">Lesson Order *</Label>
              <Input
                id="order"
                type="number"
                min="1"
                placeholder="1"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                required
              />
              <p className="text-xs text-gray-500">Specify the order of this lesson in the course</p>
            </div>

            {/* Content File Upload */}
            <div className="space-y-2">
              <Label htmlFor="content-file">Lesson Content (PDF)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
                {contentFile ? (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <FileText className="h-5 w-5 text-blue-500" />
                    <span className="font-medium">{contentFile.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setContentFile(null)
                        const fileInput = document.getElementById("content-file")
                        if (fileInput) fileInput.value = ""
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                    <div className="text-sm text-muted-foreground">
                      <Label htmlFor="content-file" className="cursor-pointer hover:text-primary">
                        Click to upload PDF file
                      </Label>
                      <p className="text-xs mt-1">PDF files only, max 10MB (Optional)</p>
                    </div>
                  </div>
                )}
                <Input id="content-file" type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1" disabled={isSubmitting}>
                {isSubmitting ? "Creating Lesson..." : "Create Lesson"}
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
