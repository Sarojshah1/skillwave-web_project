
import { useState, useEffect } from "react"
import { SearchBar } from "../components/search-bar"
import { FilterBar } from "../components/filter-bar"
import { SortDropdown } from "../components/sort-dropdown"
import { CoursesGrid } from "../components/course-grid"
import { EmptyCourses } from "../components/empty-grid"

const COURSES = [
  {
    id: "1",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Complete Web Development Bootcamp",
    description:
      "Learn web development from scratch. This comprehensive course covers HTML, CSS, JavaScript, React, Node.js, and more. Build real-world projects and gain the skills to become a full-stack developer.",
    price: "4,999",
    duration: "40 hours",
    level: "Beginner",
    category: "Web Development",
    creator: "John Smith",
    rating: 4.8,
    studentsCount: 1245,
    isFeatured: true,
  },
  {
    id: "2",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Advanced JavaScript Concepts",
    description:
      "Take your JavaScript skills to the next level. Learn about closures, prototypes, async/await, and other advanced concepts that will make you a better developer.",
    price: "3,499",
    duration: "15 hours",
    level: "Intermediate",
    category: "JavaScript",
    creator: "Sarah Johnson",
    rating: 4.7,
    studentsCount: 892,
  },
  {
    id: "3",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "UI/UX Design Fundamentals",
    description:
      "Learn the principles of good UI/UX design. This course covers user research, wireframing, prototyping, and user testing. Create beautiful and functional interfaces that users will love.",
    price: "2,999",
    duration: "12 hours",
    level: "Beginner",
    category: "Design",
    creator: "Michael Chen",
    rating: 4.5,
    studentsCount: 756,
  },
  {
    id: "4",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Machine Learning with Python",
    description:
      "Dive into the world of machine learning. Learn about supervised and unsupervised learning, neural networks, and how to implement ML algorithms using Python and popular libraries.",
    price: "6,999",
    duration: "30 hours",
    level: "Advanced",
    category: "Data Science",
    creator: "Dr. Emily Wong",
    rating: 4.9,
    studentsCount: 543,
    isFeatured: true,
  },
  {
    id: "5",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Mobile App Development with Flutter",
    description:
      "Build cross-platform mobile apps with Flutter. Learn Dart programming and how to create beautiful, responsive UIs that work on both iOS and Android.",
    price: "4,499",
    duration: "25 hours",
    level: "Intermediate",
    category: "Mobile Development",
    creator: "Alex Turner",
    rating: 4.6,
    studentsCount: 678,
  },
  {
    id: "6",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "DevOps Engineering Masterclass",
    description:
      "Learn how to implement DevOps practices in your organization. This course covers CI/CD, containerization with Docker, orchestration with Kubernetes, and more.",
    price: "7,999",
    duration: "35 hours",
    level: "Advanced",
    category: "DevOps",
    creator: "Robert Miller",
    rating: 4.8,
    studentsCount: 321,
  },
  {
    id: "7",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Graphic Design for Beginners",
    description:
      "Start your journey as a graphic designer. Learn about color theory, typography, layout design, and how to use industry-standard tools like Adobe Photoshop and Illustrator.",
    price: "2,499",
    duration: "18 hours",
    level: "Beginner",
    category: "Design",
    creator: "Lisa Garcia",
    rating: 4.4,
    studentsCount: 912,
  },
  {
    id: "8",
    thumbnail: "/placeholder.svg?height=300&width=400",
    title: "Blockchain Development",
    description:
      "Understand blockchain technology and learn how to build decentralized applications. This course covers Ethereum, Solidity, smart contracts, and Web3 integration.",
    price: "8,999",
    duration: "28 hours",
    level: "Advanced",
    category: "Blockchain",
    creator: "David Wilson",
    rating: 4.7,
    studentsCount: 234,
  },
]

const CATEGORIES = Array.from(new Set(COURSES.map((course) => course.category)))

const  CoursesPage=()=> {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    categories: [],
    levels: [],
    priceRange: [0, 10000],
    duration: null,
  })
  const [sortOption, setSortOption] = useState("newest")
  const [filteredCourses, setFilteredCourses] = useState(COURSES)

  useEffect(() => {
    let result = [...COURSES]

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (course) => course.title.toLowerCase().includes(query) || course.description.toLowerCase().includes(query),
      )
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((course) => filters.categories.includes(course.category))
    }

    // Apply level filter
    if (filters.levels.length > 0) {
      result = result.filter((course) => filters.levels.includes(course.level))
    }

    // Apply price range filter
    result = result.filter((course) => {
      const price = Number.parseInt(course.price.replace(/,/g, ""))
      return price >= filters.priceRange[0] && price <= filters.priceRange[1]
    })

    // Apply duration filter
    if (filters.duration) {
      result = result.filter((course) => {
        const hours = Number.parseInt(course.duration.split(" ")[0])

        switch (filters.duration) {
          case "< 1 hour":
            return hours < 1
          case "1-3 hours":
            return hours >= 1 && hours <= 3
          case "3-6 hours":
            return hours > 3 && hours <= 6
          case "6+ hours":
            return hours > 6
          default:
            return true
        }
      })
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return Number.parseInt(b.id) - Number.parseInt(a.id)
        case "popular":
          return (b.studentsCount || 0) - (a.studentsCount || 0)
        case "price-low-high":
          return Number.parseInt(a.price.replace(/,/g, "")) - Number.parseInt(b.price.replace(/,/g, ""))
        case "price-high-low":
          return Number.parseInt(b.price.replace(/,/g, "")) - Number.parseInt(a.price.replace(/,/g, ""))
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        default:
          return 0
      }
    })

    setFilteredCourses(result)
  }, [searchQuery, filters, sortOption])

  const handleSearch = (query) => {
    setSearchQuery(query)
  }

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters)
  }

  const handleSortChange = (option) => {
    setSortOption(option)
  }

  const resetFilters = () => {
    setSearchQuery("")
    setFilters({
      categories: [],
      levels: [],
      priceRange: [0, 10000],
      duration: null,
    })
    setSortOption("newest")
  }

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Courses</h1>
        <p className="text-muted-foreground">Discover our wide range of courses to enhance your skills and knowledge</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-start md:items-center justify-between">
        <SearchBar onSearch={handleSearch} />

        <div className="flex items-center gap-2 w-full md:w-auto justify-between">
          <FilterBar categories={CATEGORIES} onFilterChange={handleFilterChange} />
          <SortDropdown onSortChange={handleSortChange} currentSort={sortOption} />
        </div>
      </div>

      {filteredCourses.length > 0 ? (
        <>
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
          </p>
          <CoursesGrid courses={filteredCourses} />
        </>
      ) : (
        <EmptyCourses onReset={resetFilters} />
      )}
    </div>
  )
}

export default CoursesPage