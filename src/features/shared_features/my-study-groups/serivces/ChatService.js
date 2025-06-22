import { api } from "@/infrastructure/api/api";
import { ENDPOINTS } from "@/shared/constants/api.const";

export const ChatService = {
  sendMessage: async (payload) => {
    const res = await api.post(ENDPOINTS.CHATS.MESSGAE, payload);
    return res.data;
  },

  getMessagesByContextId: async (contextId) => {
    const url = ENDPOINTS.CHATS.GET_CHAT_MESSAGE.replace(":context_id", contextId);
    const res = await api.get(url);
    return res.data;
  },
};
