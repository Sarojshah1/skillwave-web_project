import { useState, useMemo } from "react"
import { SearchBar } from "../components/search-bar"
import { FilterBar } from "../components/filter-bar"
import { SortDropdown } from "../components/sort-dropdown"
import { CoursesGrid } from "../components/course-grid"
import { EmptyCourses } from "../components/empty-grid"
import { useCourses } from "../hooks/useCourses"

const ITEMS_PER_PAGE = 6
const CoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 10000],
    duration: null,
  })
  const [sortOption, setSortOption] = useState("newest")
  const [currentPage, setCurrentPage] = useState(1)

  const params = useMemo(() => {
    return {
      page: currentPage,
      limit: ITEMS_PER_PAGE,
    }
  }, [searchQuery, filters, sortOption, currentPage])

  const { data, isLoading, isError, error } = useCourses(params)

  const courses = data || []
  const totalCourses = data?.total || 0
  const totalPages = Math.ceil(totalCourses / ITEMS_PER_PAGE)

  return (
    <div className="space-y-6 py-16 px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchBar value={searchQuery} onSearch={setSearchQuery} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      {isLoading ? (
        <p>Loading courses...</p>
      ) : isError ? (
        <p className="text-red-500">Error loading courses: {error.message}</p>
      ) : courses.length === 0 ? (
        <EmptyCourses />
      ) : (
        <CoursesGrid courses={courses} />
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4 mb-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CoursesPage