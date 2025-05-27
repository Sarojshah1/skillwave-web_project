import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";

export const useAddReply = (postId, commentId) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (replyData) => postsService.addReply(postId, commentId, replyData),
    onSuccess: () => {
      queryClient.invalidateQueries(["replies", postId, commentId]);
    },
  });
};
