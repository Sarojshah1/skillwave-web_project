
import { useNavigate } from "react-router"
import { CourseCard } from "../components/course-card"


export function CoursesGrid({ courses }) {
  const navigate=useNavigate();
  

  const handleCourseClick = (courseId) => {
    navigate(`/course/${courseId}`);
   
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {courses.map((course) => (
        <CourseCard key={course._id} course={course}  onCourseClick={() => handleCourseClick(course._id)} />
      ))}
    </div>
  )
}
