import { useState } from "react"
import { CreatePost } from "../components/create-post"
import { PostCard } from "../components/post-card"
import { usePosts } from "../hooks/usePosts" 
import { useGlobalAuth } from "../../../../hooks/useAuth";

export default function ForumPage() {
  const { isLoggedIn, profile, logout } = useGlobalAuth();
  const [page, setPage] = useState(1);
  const [newPosts, setNewPosts] = useState([]);

  const { data, isLoading, isError, isFetching } = usePosts(page, 5);

  const handlePostCreated = (newPost) => {
    setNewPosts((prev) => [newPost, ...prev]);
  };

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  // If `data` is { posts: Post[], hasMore: boolean }
  const fetchedPosts = data?.posts || [];
  const hasMore = data?.hasMore ?? false;
  console.log("Fetched posts:", fetchedPosts);

  const combinedPosts = [...newPosts, ...fetchedPosts];

  return (
    <div className="container max-w-2xl mx-auto py-16 px-4">
      <CreatePost user={profile} onPostCreated={handlePostCreated} />

      {isLoading && <p>Loading posts...</p>}
      {isError && <p>Error loading posts. Please try again.</p>}

      <div>
        {combinedPosts.map((post) => (
          <PostCard key={post._id || post._id} post={post} currentUser={profile} />
        ))}
      </div>

      {!isLoading && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}
