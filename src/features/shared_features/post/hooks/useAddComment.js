import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";
export const useAddComment = (postId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentData) => postsService.addComment(postId, commentData),
    onSuccess: () => {
      queryClient.invalidateQueries(["comments", postId]);
    },
  });
};
