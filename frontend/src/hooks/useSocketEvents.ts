import { useEffect } from "react";
import { connectSocket, socket } from "../socket/socket";
import { useGameStore } from "../store/gameStore";
import type { User } from "../types/user";
import { useToast } from "./useToast";

export function useSocketEvents(user: User | null) {
  const updateTile = useGameStore((state) => state.updateTile);
  const setOnlineUsers = useGameStore((state) => state.setOnlineUsers);
  const setLeaderboard = useGameStore((state) => state.setLeaderboard);
  const setSocketConnected = useGameStore((state) => state.setSocketConnected);
  const { showToast } = useToast();

  useEffect(() => {
    if (!user) return;

    const currentSocket = connectSocket(user.id);

    const handleConnect = () => setSocketConnected(true);
    const handleDisconnect = () => {
      setSocketConnected(false);
      showToast("Socket disconnected. Reconnecting...", "warning");
    };

    currentSocket.on("connect", handleConnect);
    currentSocket.on("disconnect", handleDisconnect);
    currentSocket.on("tile:updated", updateTile);
    currentSocket.on("presence:update", ({ onlineUsers }) => setOnlineUsers(onlineUsers));
    currentSocket.on("leaderboard:update", setLeaderboard);
    currentSocket.on("tile:capture_failed", ({ reason }) => showToast(reason, "error"));

    if (currentSocket.connected) {
      setSocketConnected(true);
    }

    return () => {
      currentSocket.off("connect", handleConnect);
      currentSocket.off("disconnect", handleDisconnect);
      currentSocket.off("tile:updated", updateTile);
      currentSocket.off("presence:update");
      currentSocket.off("leaderboard:update", setLeaderboard);
      currentSocket.off("tile:capture_failed");
    };
  }, [setLeaderboard, setOnlineUsers, setSocketConnected, showToast, updateTile, user]);

  return socket;
}
