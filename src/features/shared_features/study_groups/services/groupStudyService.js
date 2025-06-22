import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";


export const GroupStudyService = {
  // Create a new study group
  createGroup: async (formData) => {
    const res = await api.post(ENDPOINTS.GROUP_STUDY.CREATE_GROUP, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  },

  // Get all groups
  getAllGroups: async () => {
    const res = await api.get(ENDPOINTS.GROUP_STUDY.GET_ALL_GROUPS);
    return res.data;
  },

  // Get group by ID
  getGroupById: async (groupId) => {
    const url = ENDPOINTS.GROUP_STUDY.GET_GROUP_BY_ID.replace(":id", groupId);
    const res = await api.get(url);
    return res.data;
  },

  // Join a group
  joinGroup: async (groupId) => {
    const url = ENDPOINTS.GROUP_STUDY.JOIN_GROUP.replace(":groupId", groupId);
    const res = await api.post(url);
    return res.data;
  },

  // Get groups for logged-in user
  getUserGroups: async () => {
    const res = await api.get(ENDPOINTS.GROUP_STUDY.GET_USER_GROUPS);
    return res.data;
  },

  // Send chat message to a group
//   sendChatMessage: async (groupId, message) => {
//     const url = `/groupstudy/${groupId}/chat`; // assuming this is the route
//     const res = await axios.post(url, { message });
//     return res.data;
//   },
};
