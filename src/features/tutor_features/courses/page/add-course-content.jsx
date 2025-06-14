import { useState } from "react"
import { CreateCourseForm } from "../components/create-course-form"
import { useAddCourse } from "../hooks/useAddCourse";

export function AddCourseContent() {
    const { mutate, isLoading, isError, error } = useAddCourse();
  const [showForm, setShowForm] = useState(true)

  const handleCourseCreated = (courseData) => {
    console.log("Course created:", courseData)
    mutate(courseData, {
      onSuccess: (data) => {
        console.log("Course added successfully:", data);
        // onSubmit(data); 
      },
    });
    setShowForm(false)
  }

  const handleCancel = () => {
    setShowForm(false)
  }

  if (!showForm) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-green-600 mb-4">Course Created Successfully!</h2>
          <p className="text-gray-600 mb-6">Your course has been created and is ready for students.</p>
          <button
            onClick={() => setShowForm(true)}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium"
          >
            Create Another Course
          </button>
        </div>
      </div>
    )
  }

  return <CreateCourseForm onSubmit={handleCourseCreated} onCancel={handleCancel} />
}
