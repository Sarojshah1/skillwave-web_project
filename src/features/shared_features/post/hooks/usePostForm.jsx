import { useState, useRef } from "react";

export function usePostForm(initialUser, onPostCreated) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagePreviews, setSelectedImagePreviews] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    const newFiles = files.slice(0, 10 - selectedImages.length);
    setSelectedImages((prev) => [...prev, ...newFiles]);
    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setSelectedImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeImage = (index) => {
    URL.revokeObjectURL(selectedImagePreviews[index]);
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setSelectedImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTagInput = (e) => {
    const tagText = e.target.value.trim();
    if (e.key === "Enter" && tagText && !tags.includes(tagText)) {
      e.preventDefault();
      setTags((prev) => [...prev, tagText]);
      e.target.value = "";
    }
  };

  const removeTag = (index) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() && !postText.trim() && selectedImages.length === 0)
      return;

    const newPost = {
      id: `post-${Date.now()}`,
      user: {
        id: initialUser.id,
        name: initialUser.name,
        avatar: initialUser.avatar,
      },
      title,
      content: postText,
      tags,
      images: selectedImagePreviews,
      timestamp: new Date(),
      likes: 0,
      isLikedByCurrentUser: false,
      comments: [],
    };

    onPostCreated(newPost);

  };

    const resetForm = () => {
    setTitle("");
    setPostText("");
    setTags([]);
    selectedImagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setSelectedImages([]);
    setSelectedImagePreviews([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return {
    title,
    setTitle,
    postText,
    setPostText,
    tags,
    setTags,
    handleTagInput,
    removeTag,
    selectedImages,
    selectedImagePreviews,
    handleImageSelect,
    removeImage,
    handleSubmit,
    fileInputRef,
    resetForm
  };
}
