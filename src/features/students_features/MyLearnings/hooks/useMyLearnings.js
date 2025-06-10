import { useQuery } from "@tanstack/react-query";
import { myLearningServices } from  "../services/MyLearningServices"

export const useMyLearnings = () => {
  return useQuery({
    queryKey: ['my-learnings'],
    queryFn: myLearningServices.getMyLearnings,
  });
};