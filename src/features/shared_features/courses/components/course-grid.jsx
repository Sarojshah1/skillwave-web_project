
import { CourseCard } from "../components/course-card"


export function CoursesGrid({ courses }) {
  

  const handleCourseClick = (courseId) => {
    toast({
      title: "Course Details",
      description: `Viewing details for course #${courseId}`,
    })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.id} {...course}  onClick={() => handleCourseClick(course.id)} />
      ))}
    </div>
  )
}
