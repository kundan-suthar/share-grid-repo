import { useCallback } from "react";
import { socket } from "../socket/socket";
import type { Tile } from "../types/tile";
import type { User } from "../types/user";
import { useToast } from "./useToast";

export function useTileCapture(user: User | null) {
  const { showToast } = useToast();

  return useCallback(
    (tile: Tile) => {
      if (!user) {
        showToast("Join the grid before claiming tiles.", "warning");
        return;
      }

      if (tile.ownerId) return;

      if (!socket?.connected) {
        showToast("Socket is reconnecting. Try again in a moment.", "warning");
        return;
      }

      socket.emit("tile:capture", {
        tileId: tile.id,
        userId: user.id,
      });
    },
    [showToast, user],
  );
}
