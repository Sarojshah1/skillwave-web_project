import { useState, useEffect, useCallback } from "react";
import { CreatePost } from "../components/create-post";
import { PostCard } from "../components/post-card";
import { usePosts } from "../hooks/usePosts";
import { useGlobalAuth } from "../../../../hooks/useAuth";
import { LeftSidebar } from "../components/left-sideBar"
import { RightSidebar } from "../components/right-siddebar"

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

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;

    // Scroll position
    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    // When the user is within 300px from bottom, load more
    if (fullHeight - (scrollTop + viewportHeight) < 300) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const is400Error = errorStatus === 400;

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         <LeftSidebar />
      
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
        <RightSidebar />
        
          
      </div>
    </div>
  );
}
