import { io, type Socket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "../types/socket";

const getSocketUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL as string | undefined;
  return configuredUrl?.replace(/\/$/, "") || "http://localhost:4000";
};

export let socket: Socket<ServerToClientEvents, ClientToServerEvents> | null = null;

export function connectSocket(userId: string) {
  if (socket?.connected) {
    return socket;
  }

  if (!socket) {
    socket = io(getSocketUrl(), {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 5_000,
      transports: ["websocket", "polling"],
      auth: { userId },
    });
  } else {
    socket.auth = { userId };
  }

  socket.connect();
  return socket;
}

export function disconnectSocket() {
  if (!socket) return;
  socket.removeAllListeners();
  socket.disconnect();
  socket = null;
}
