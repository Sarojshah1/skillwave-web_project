import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";

export const usePostLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId) => postsService.likePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};
