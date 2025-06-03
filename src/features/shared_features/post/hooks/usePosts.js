import { useQuery } from "@tanstack/react-query";
import { postsService } from "../services/postsServices"; 


export const usePosts = (page = 1, limit = 4) => {
  return useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
      const posts = await postsService.getPosts(page, limit);
      return {
        posts,
        hasMore: posts.length === limit, 
      };
    },
    keepPreviousData: true,
  });
};
