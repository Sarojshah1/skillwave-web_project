import { useQuery } from "@tanstack/react-query";
import { GroupStudyService } from "@/features/shared_features/study_groups/services/groupStudyService";

export const useUserGroups = () => {
  return useQuery({
    queryKey: ["user-groups"],
    queryFn: GroupStudyService.getUserGroups,
  });
};
