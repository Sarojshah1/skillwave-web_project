import { useEffect, useRef, useState } from "react";
import { socket, joinRoom, sendTyping } from "@/infrastructure/socket/socket";
import { useGlobalAuth } from "@/hooks/useAuth";
import { ChatService } from "../serivces/ChatService";

export const useChat = (contextId) => {
  const { userId } = useGlobalAuth();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!contextId || !userId) return;

    // Join room using utility
    joinRoom(contextId, userId);

    // Event handlers
    const handleNewMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    const handleUserTyping = (typingUserId) => {
      if (typingUserId === userId) return;

      setTypingUsers((prev) => {
        if (prev.includes(typingUserId)) return prev;
        return [...prev, typingUserId];
      });

      setIsTyping(true);

      setTimeout(() => {
        setTypingUsers((prev) => {
          const updated = prev.filter((id) => id !== typingUserId);
          if (updated.length === 0) setIsTyping(false);
          return updated;
        });
      }, 3000);
    };

    // Register socket listeners
    socket.on("joinedRoom", () => {
      console.log("Joined group room", contextId);
    });
    socket.on("newMessage", handleNewMessage);
    socket.on("userTyping", handleUserTyping);

    // Fetch existing messages
    ChatService.getMessagesByContextId(contextId).then(setMessages);

    // Cleanup listeners on unmount/contextId change
    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("userTyping", handleUserTyping);
    };
  }, [contextId, userId]);

  const sendMessage = async (content) => {
    if (!contextId) return;

    const newMessage = await ChatService.sendMessage({
      context_id: contextId,
      context_type: "GroupStudy",
      message_content: content,
    });

  };

  const startTyping = () => {
    if (contextId && userId) {
      sendTyping(contextId, userId);
    }
  };

  return {
    messages,
    isTyping,
    typingUsers,
    sendMessage,
    startTyping,
    messagesEndRef,
  };
};
