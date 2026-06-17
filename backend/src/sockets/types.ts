import type { Tile } from '../db/schema.js';
import type { LeaderboardEntry } from '../modules/leaderboard/leaderboard.repository.js';
import type { CaptureTileInput } from '../modules/grid/tile.validation.js';

export type ServerToClientEvents = {
  'tile:updated': (tile: Tile) => void;
  'tile:capture_failed': (payload: { tileId: number; reason: string }) => void;
  'presence:update': (payload: { onlineUsers: number }) => void;
  'leaderboard:update': (leaderboard: LeaderboardEntry[]) => void;
};

export type ClientToServerEvents = {
  'tile:capture': (payload: CaptureTileInput) => void;
};

export type InterServerEvents = Record<string, never>;

export type SocketData = {
  userId?: string;
};
