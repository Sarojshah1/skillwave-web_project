import { useState, useRef } from "react"

export function usePostForm(initialUser, onPostCreated) {
  const [postText, setPostText] = useState("")
  const [selectedImages, setSelectedImages] = useState([])
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([])
  const fileInputRef = useRef(null)

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return
    const newFiles = files.slice(0, 10 - selectedImages.length)
    setSelectedImages(prev => [...prev, ...newFiles])
    const newPreviews = newFiles.map(file => URL.createObjectURL(file))
    setSelectedImagePreviews(prev => [...prev, ...newPreviews])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(selectedImagePreviews[index])
    setSelectedImages(prev => prev.filter((_, i) => i !== index))
    setSelectedImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!postText.trim() && selectedImages.length === 0) return

    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        id: initialUser.id,
        name: initialUser.name,
        avatar: initialUser.avatar,
      },
      content: postText,
      images: selectedImagePreviews,
      timestamp: new Date(),
      likes: 0,
      isLikedByCurrentUser: false,
      comments: [],
    }

    onPostCreated(newPost)

    setPostText("")
    selectedImagePreviews.forEach((url) => URL.revokeObjectURL(url))
    setSelectedImages([])
    setSelectedImagePreviews([])
  }

  return {
    postText,
    setPostText,
    selectedImages,
    selectedImagePreviews,
    handleImageSelect,
    removeImage,
    handleSubmit,
    fileInputRef,
  }
}
