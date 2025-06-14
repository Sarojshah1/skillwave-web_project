
import { useState, useMemo } from "react"
import { GraduationCap, Search, BookOpen } from "lucide-react"
import { CourseCard } from "../components/Course-card"
import { LearningStats } from "../components/Learning-stats"
import { FilterTabs } from "../components/filter-tabs"
import { useMyLearnings} from "../hooks/useMyLearnings"
import { useNavigate } from "react-router"

export default function MyLearnings() {
    const { data: enrollments = [], isLoading, error } = useMyLearnings()
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const navigate=useNavigate()

  const filteredEnrollments = useMemo(() => {
    let filtered = enrollments
    if (activeFilter !== "all") {
      filtered = filtered.filter((enrollment) => enrollment.status === activeFilter)
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (enrollment) =>
          enrollment.course_id.title.toLowerCase().includes(searchQuery.toLowerCase()) 
      )
    }

    return filtered
  }, [enrollments, activeFilter, searchQuery])

  const handleContinueLearning = (enrollment) => {
    navigate(`/content/${enrollment.course_id._id}`)
    console.log("Continue learning:", enrollment.course_id.title)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-500 rounded-xl">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Learning Journey</h1>
              <p className="text-gray-600 mt-1">Continue your path to mastery</p>
            </div>
          </div>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
        </div>
        <LearningStats enrollments={enrollments} />
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} enrollments={enrollments} />
        {filteredEnrollments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEnrollments.map((enrollment) => (
              <CourseCard key={enrollment._id} enrollment={enrollment} onContinue={handleContinueLearning} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">
              {searchQuery
                ? `No courses match "${searchQuery}"`
                : `No ${activeFilter === "all" ? "" : activeFilter} courses available`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
