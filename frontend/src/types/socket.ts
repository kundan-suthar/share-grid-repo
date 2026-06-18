import type { LeaderboardEntry } from "./leaderboard";
import type { CaptureTilePayload, Tile } from "./tile";

export type ServerToClientEvents = {
  "tile:updated": (tile: Tile) => void;
  "tile:capture_failed": (payload: { tileId: number; reason: string }) => void;
  "presence:update": (payload: { onlineUsers: number }) => void;
  "leaderboard:update": (leaderboard: LeaderboardEntry[]) => void;
};

export type ClientToServerEvents = {
  "tile:capture": (payload: CaptureTilePayload) => void;
};
