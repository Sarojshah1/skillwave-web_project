import { useState, useEffect } from "react";
import { CreatePost } from "../components/create-post";
import { PostCard } from "../components/post-card";
import { usePosts } from "../hooks/usePosts";
import { useGlobalAuth } from "../../../../hooks/useAuth";

export default function ForumPage() {
  const { profile } = useGlobalAuth();
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);

  const { data, isLoading, isError, isFetching, error } = usePosts(page, 2);

  useEffect(() => {
    if (data?.posts) {
      setPosts((prev) => {
        const existingIds = new Set(prev.map((p) => p._id));
        const newFetched = data.posts.filter((p) => !existingIds.has(p._id));
        return [...prev, ...newFetched];
      });
      setHasMore(data.hasMore ?? false);
      setErrorStatus(null);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      setErrorStatus(error?.response?.status || "unknown");
    }
  }, [isError, error]);

  const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
  };

  const handleLoadMore = () => {
    if (!isFetching && hasMore) {
      setPage((prev) => prev + 1);
    }
  };

  const is400Error = errorStatus === 400;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">📚 Categories</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
              <li>JavaScript</li>
              <li>React</li>
              <li>Algorithms</li>
              <li>System Design</li>
              <li>Career</li>
            </ul>
          </div>
          <div className="bg-gray-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">🧭 Navigation</h2>
            <ul className="space-y-1 text-sm text-blue-600">
              <li><a href="#">My Posts</a></li>
              <li><a href="#">Saved Posts</a></li>
              <li><a href="#">Top Posts</a></li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-12 lg:col-span-6">
          <CreatePost user={profile} onPostCreated={handlePostCreated} />

          {isLoading && page === 1 && (
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
            {posts.map((post) => (
              <PostCard key={post._id} post={post} currentUser={profile} />
            ))}
          </div>

          {is400Error && !isLoading && (
            <div className="text-center mt-6 text-gray-600">
              <p className="bg-gray-100 py-3 px-4 rounded-md inline-block text-sm">
                ⚠️ Bad request (400). Please check your input or try again.
              </p>
            </div>
          )}

          {!isLoading && hasMore && (
            <div className="flex justify-center mt-6">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                onClick={handleLoadMore}
                disabled={isFetching}
              >
                {isFetching ? "Loading..." : "Load More"}
              </button>
            </div>
          )}

          {isFetching && page > 1 && (
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

        {/* Right Sidebar */}
        <aside className="hidden lg:block lg:col-span-3 space-y-4">
          <div className="bg-yellow-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">🔥 Highlights</h2>
            <ul className="list-disc list-inside text-sm text-yellow-900 space-y-1">
              <li>✅ 12 problems solved this week</li>
              <li>🏆 Top contributor: @codeMaster123</li>
              <li>💡 Tip: Use memoization for repeated tasks</li>
              <li>📅 New challenge on Friday</li>
            </ul>
          </div>
          <div className="bg-green-50 p-4 rounded shadow">
            <h2 className="text-lg font-semibold text-green-800 mb-2">📈 Leaderboard</h2>
            <ol className="text-sm text-green-900 list-decimal list-inside space-y-1">
              <li>@codeMaster123</li>
              <li>@bugHunter</li>
              <li>@devQueen</li>
            </ol>
          </div>
        </aside>
      </div>
    </div>
  );
}
