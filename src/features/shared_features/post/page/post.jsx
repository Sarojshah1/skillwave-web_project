import { CreatePost } from "../components/create-post";
import { PostCard } from "../components/post-card";
import { useGlobalAuth } from "../../../../hooks/useAuth";
import { LeftSidebar } from "../components/left-sideBar";
import { RightSidebar } from "../components/right-siddebar";
import { useForumPosts } from "../hooks/useForumPosts";

export default function ForumPage() {
  const { profile } = useGlobalAuth();
  const {
    posts,
    handlePostCreated,
    searchQuery,
    setSearchQuery,
    isLoading,
    isFetching,
    isError,
    is400Error,
    hasMore,
  } = useForumPosts();

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <LeftSidebar />

        <main className="col-span-12 lg:col-span-6">
          {/* Search Input */}
          <div className="mt-4 mb-8">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>

          <CreatePost user={profile} onPostCreated={handlePostCreated} />

          {isLoading && (
            <div className="space-y-4 mt-4">
              {[...Array(3)].map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse p-4 border rounded shadow bg-white"
                >
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          )}

          {isError && !isFetching && !is400Error && (
            <p className="text-red-500 text-center mt-4">
              Error loading posts. Please try again.
            </p>
          )}

          <div className="space-y-4 mt-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <PostCard key={post._id} post={post} currentUser={profile} />
              ))
            ) : (
              <p className="text-center text-gray-500 mt-4">No posts found.</p>
            )}
          </div>

          {is400Error && !isLoading && (
            <div className="text-center mt-6 text-gray-600">
              <p className="bg-gray-100 py-3 px-4 rounded-md inline-block text-sm">
                ⚠️ Bad request (400). Please check your input or try again.
              </p>
            </div>
          )}

          {isFetching && (
            <div className="space-y-4 mt-4">
              {[...Array(2)].map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse p-4 border rounded shadow bg-white"
                >
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && !isError && !hasMore && !isFetching && posts.length > 0 && (
            <div className="text-center mt-6 text-gray-600">
              <p className="bg-gray-100 py-3 px-4 rounded-md inline-block text-sm">
                🎉 You've reached the end! No more posts to show.
              </p>
            </div>
          )}
        </main>

        <RightSidebar />
      </div>
    </div>
  );
}
