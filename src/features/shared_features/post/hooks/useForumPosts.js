import { useEffect, useState, useCallback } from "react";
import { usePosts } from "./usePosts";
import { postsService } from "../services/postsServices";

export const useForumPosts = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [errorStatus, setErrorStatus] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading, isError, isFetching, error } = usePosts(page, 2);

  useEffect(() => {
    if (data?.posts && Array.isArray(data.posts)) {
      setPosts((prev) => {
        const validPrev = prev.filter((p) => p && p._id);
        const existingIds = new Set(validPrev.map((p) => p._id));

        const validNewPosts = data.posts.filter((p) => p && p._id && !existingIds.has(p._id));

        return [...validPrev, ...validNewPosts];
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
  const handleScroll = useCallback(() => {
    if (isFetching || !hasMore) return;

    const scrollTop = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight;
    const fullHeight = document.documentElement.scrollHeight;

    if (fullHeight - (scrollTop + viewportHeight) < 300) {
      setPage((prev) => prev + 1);
    }

    
  }, [isFetching, hasMore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);

    
  }, [handleScroll]);
  useEffect(() => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery.length > 1) {
      postsService.addToSearchHistory(trimmedQuery).catch((err) =>
        console.error("Failed to save search history:", err)
      );
    }
  }, [searchQuery]);

  // Search filter with null safety
  const filteredPosts = posts.filter((post) => {
    if (!post || !post.title || !post.content) return false;
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handlePostCreated = (newPost) => {
    if (newPost && newPost._id) {
      setPosts((prev) => [newPost, ...prev]);
    }
  };

  const is400Error = errorStatus === 400;

  return {
    posts: filteredPosts,
    handlePostCreated,
    searchQuery,
    setSearchQuery,
    isLoading,
    isFetching,
    isError,
    is400Error,
    hasMore,
  };
};
