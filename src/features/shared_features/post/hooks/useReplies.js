import { useQuery } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";
export const useReplies = (postId, commentId) => {
  return useQuery({
    queryKey: ["replies", postId, commentId],
    queryFn: () => postsService.getReplies(postId, commentId),
  });
};
