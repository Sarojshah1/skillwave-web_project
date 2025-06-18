import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GroupStudyService } from "../services/groupStudyService";

const GROUP_KEYS = {
  ALL: ["group-study", "all"],
  USER: ["group-study", "user"],
  ONE: (id) => ["group-study", id],
};

// 🔁 Get all groups
export const useGetAllGroups = () => {
  return useQuery({
    queryKey: GROUP_KEYS.ALL,
    queryFn: GroupStudyService.getAllGroups,
  });
};

// ➕ Create group
export const useCreateGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GroupStudyService.createGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL });
    },
  });
};

// ➕ Join group
export const useJoinGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: GroupStudyService.joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.ALL });
      queryClient.invalidateQueries({ queryKey: GROUP_KEYS.USER });
    },
  });
};
