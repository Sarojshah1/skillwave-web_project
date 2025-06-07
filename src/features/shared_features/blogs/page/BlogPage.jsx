
import { useState } from "react"
import BlogCard from "@/features/shared_features/blogs/components/BlogCard"
import { FaSearch, FaSpinner, FaExclamationTriangle, FaBookOpen } from "react-icons/fa"
import { useBlogs } from "@/features/shared_features/blogs/hooks/useBlogs" 

const BlogPage = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const { data: blogs = [], isLoading, isError, error } = useBlogs()
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.user_id?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg">Loading amazing content...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <FaExclamationTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error?.message || "Failed to fetch blogs. Please try again later."}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="relative overflow-hidden bg-[#49BBBD] text-white">
        <div className="absolute inset-0 bg-black opacity-15"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-20 text-center">
          <FaBookOpen className="w-16 h-16 mx-auto mb-6 opacity-90" />
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Discover Amazing Stories
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Explore our collection of insightful articles, tutorials, and stories from passionate creators
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white opacity-5 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Search Section */}
        <div className="relative mb-12">
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search articles by title, tags, or author..."
              className="w-full p-6 pl-14 pr-6 text-lg border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute top-7 left-5 text-gray-400 w-5 h-5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute top-6 right-5 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="text-center mt-4 text-gray-600">
              Found {filteredBlogs.length} article{filteredBlogs.length !== 1 ? "s" : ""} matching "{searchQuery}"
            </p>
          )}
        </div>

        {/* Blog Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog) => (
              <BlogCard
                key={blog._id}
                blog={blog}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <FaSearch className="w-16 h-16 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No articles found</h3>
              <p className="text-gray-600 mb-8">
                {searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}". Try different keywords or browse all articles.`
                  : "No articles are available at the moment. Check back later for new content!"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  Show All Articles
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogPage
