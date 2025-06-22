import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000"; // replace with your backend URL if deployed

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
});

export const joinRoom = (context_id, userId) => {
  socket.emit("joinRoom", { context_id, userId });
};

export const sendTyping = (context_id, userId) => {
  socket.emit("typing", context_id, userId);
};
