import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postsService } from "../services/postsServices";

export const useCreatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData) => postsService.createPost(formData),
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      if (onSuccess) onSuccess(data, variables, context);
    },
    onError: (error, variables, context) => {
      if (onError) onError(error, variables, context);
    },
  });
};
