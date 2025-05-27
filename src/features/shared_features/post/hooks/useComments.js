import { useQuery } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";

export const useComments = (postId) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postsService.getComments(postId),
  });
};
