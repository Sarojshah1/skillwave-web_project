import { useState } from "react"
import { CourseCard } from "@/features/tutor_features/courses/components/course-card"
import { CourseManagementPage } from "@/features/tutor_features/courses/components/course-management-page"
import { dummyCourses} from "../components/dummy-data"
import { GraduationCap, Users, Clock, TrendingUp } from "lucide-react"

export default function CoursesPage() {
  const [selectedCourse, setSelectedCourse] = useState(null)

  if (selectedCourse) {
    return <CourseManagementPage course={selectedCourse} onBack={() => setSelectedCourse(null)} />
  }

  const totalLessons = dummyCourses.reduce((acc, course) => acc + course.lessons.length, 0)
  const totalQuizzes = dummyCourses.reduce((acc, course) => acc + course.quizzes.length, 0)
  const completedLessons = dummyCourses.reduce(
    (acc, course) => acc + course.lessons.filter((lesson) => lesson.isCompleted).length,
    0,
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto py-12 px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Course Management
              <span className="text-blue-600"> Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Create, organize, and manage your educational content with our intuitive course builder
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{dummyCourses.length}</div>
                <div className="text-sm text-gray-600">Total Courses</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{totalLessons}</div>
                <div className="text-sm text-gray-600">Total Lessons</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{totalQuizzes}</div>
                <div className="text-sm text-gray-600">Total Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{completedLessons}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="container mx-auto py-12 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Courses</h2>
          <p className="text-gray-600 text-lg">
            Click on any course card to manage its content, add lessons, and create quizzes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyCourses.map((course, index) => (
            <div
              key={course.id}
              className="transform transition-all duration-300 hover:scale-105"
              style={{
                animationDelay: `${index * 150}ms`,
                animation: "fadeInUp 0.6s ease-out forwards",
                opacity: 0,
              }}
            >
              <CourseCard course={course} onManageCourse={setSelectedCourse} />
            </div>
          ))}
        </div>

        {/* Feature Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Easy Course Creation</h3>
            <p className="text-sm text-gray-600">Build comprehensive courses with our intuitive interface</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Student Management</h3>
            <p className="text-sm text-gray-600">Track progress and engagement across all your courses</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Time Tracking</h3>
            <p className="text-sm text-gray-600">Monitor lesson duration and completion times</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">Get insights into course performance and student success</p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Click on any course above to start managing content, or explore the features by adding lessons and quizzes
            to your courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">
              Explore React Course
            </button>
            <button className="border border-white text-white font-semibold py-3 px-6 rounded-lg hover:bg-white/10 transition-colors">
              View All Features
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
