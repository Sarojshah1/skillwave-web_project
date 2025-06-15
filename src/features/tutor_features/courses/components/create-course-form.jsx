
import { useState } from "react"
import { Upload, ImageIcon, DollarSign, Clock, BarChart3, BookOpen, Tag, FileText, Save, X } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.jsx"
import { Button } from "@/components/ui/button.jsx"
import { Input } from "@/components/ui/input.jsx"
import { Label } from "@/components/ui/label.jsx"
import { Textarea } from "@/components/ui/textarea.jsx"
import { Badge } from "@/components/ui/badge.jsx"
import { Progress } from "@/components/ui/progress.jsx"
import { cn } from "@/lib/utils.js"
import useCategories from "@/pages/LandingPage/categories/hooks/useCategory"

export function CreateCourseForm({ onSubmit, onCancel }) {
      const { categories, loading, error } = useCategories();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category_id: "",
    price: "",
    duration: "",
    level: "beginner",
    thumbnail: null,
    tags: [],

  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [currentTag, setCurrentTag] = useState("")
  const [currentRequirement, setCurrentRequirement] = useState("")
  const [currentOutcome, setCurrentOutcome] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [notification, setNotification] = useState(null)

  // Simple notification system
  const showNotification = (message, type = "info") => {
    setNotification({ message, type })
    setTimeout(() => setNotification(null), 5000)
  }

  // Form validation
  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) newErrors.title = "Course title is required"
    if (!formData.description.trim()) newErrors.description = "Course description is required"
    if (!formData.category_id) newErrors.category_id = "Please select a category"
    if (!formData.duration.trim()) newErrors.duration = "Course duration is required"
    if (formData.price && isNaN(formData.price)) newErrors.price = "Price must be a valid number"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  // Handle thumbnail upload
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        showNotification("Please select an image smaller than 5MB", "error")
        return
      }

      // Validate file type
      if (!file.type.startsWith("image/")) {
        showNotification("Please select a valid image file", "error")
        return
      }

      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: reader.result,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle tag addition
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  // Remove tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  // Handle requirement addition
  const addRequirement = () => {
    if (currentRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...prev.requirements, currentRequirement.trim()],
      }))
      setCurrentRequirement("")
    }
  }

  // Remove learning outcome
  const removeOutcome = (index) => {
    setFormData((prev) => ({
      ...prev,
      learningOutcomes: prev.learningOutcomes.filter((_, i) => i !== index),
    }))
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      showNotification("Please fix the errors before submitting", "error")
      return
    }

    setIsSubmitting(true)
    setUploadProgress(0)

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 200)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      clearInterval(progressInterval)
      setUploadProgress(100)

      showNotification("Course created successfully!", "success")

      // Simulate successful response
      const result = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
      }

      setTimeout(() => {
        onSubmit?.(result)
      }, 1000)
    } catch (error) {
      console.error("Error creating course:", error)
      showNotification("Failed to create course. Please try again.", "error")
    } finally {
      setIsSubmitting(false)
      setUploadProgress(0)
    }
  }

  const levelColors = {
    beginner: "bg-green-100 text-green-800 border-green-200",
    intermediate: "bg-yellow-100 text-yellow-800 border-yellow-200",
    advanced: "bg-red-100 text-red-800 border-red-200",
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Notification */}
      {notification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300",
            notification.type === "success" && "bg-green-50 border border-green-200 text-green-900",
            notification.type === "error" && "bg-red-50 border border-red-200 text-red-900",
            notification.type === "info" && "bg-blue-50 border border-blue-200 text-blue-900",
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">{notification.message}</span>
            <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => setNotification(null)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Create New Course
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Share your knowledge and help students learn something amazing
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Course Thumbnail */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Course Thumbnail
            </CardTitle>
            <CardDescription>Upload an eye-catching thumbnail for your course</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative group">
                {formData.thumbnailPreview ? (
                  <div className="relative">
                    <img
                      src={formData.thumbnailPreview || "/placeholder.svg"}
                      alt="Course thumbnail preview"
                      className="w-64 h-36 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-700"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() => document.getElementById("thumbnail-upload").click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Change Image
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="w-64 h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition-colors"
                    onClick={() => document.getElementById("thumbnail-upload").click()}
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Click to upload thumbnail</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </div>
              <input
                id="thumbnail-upload"
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="hidden"
              />
            </div>
          </CardContent>
        </Card>

        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Basic Information
            </CardTitle>
            <CardDescription>Essential details about your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Complete Web Development Bootcamp"
                  className={cn(errors.title && "border-red-500")}
                />
                {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="category_id">Category *</Label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className={cn(
                    "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    errors.category_id && "border-red-500",
                  )}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Course Description *</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what students will learn in this course..."
                rows={4}
                className={cn(errors.description && "border-red-500")}
              />
              {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Price (NPR)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className={cn(errors.price && "border-red-500")}
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Duration *
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g., 10 hours, 5 weeks"
                  className={cn(errors.duration && "border-red-500")}
                />
                {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Difficulty Level
                </Label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
            </div>

            {/* Level Preview */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Selected level:</span>
              <Badge className={levelColors[formData.level]}>{formData.level}</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Course Tags
            </CardTitle>
            <CardDescription>Add relevant tags to help students find your course</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag (e.g., JavaScript, React, Web Development)"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add Tag
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer hover:text-red-500" onClick={() => removeTag(tag)} />
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>


        {/* Upload Progress */}
        {isSubmitting && uploadProgress > 0 && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Creating course...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Creating Course...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Course
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
