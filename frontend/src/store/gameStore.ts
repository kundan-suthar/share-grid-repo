import { create } from "zustand";
import type { LeaderboardEntry } from "../types/leaderboard";
import type { Stats } from "../types/stats";
import type { Tile } from "../types/tile";
import type { User } from "../types/user";

type GameState = {
  user: User | null;
  tiles: Tile[];
  stats: Stats | null;
  leaderboard: LeaderboardEntry[];
  onlineUsers: number;
  socketConnected: boolean;
  setUser: (user: User | null) => void;
  setTiles: (tiles: Tile[]) => void;
  updateTile: (tile: Tile) => void;
  setLeaderboard: (leaderboard: LeaderboardEntry[]) => void;
  setStats: (stats: Stats | null) => void;
  setOnlineUsers: (onlineUsers: number) => void;
  setSocketConnected: (socketConnected: boolean) => void;
  reset: () => void;
};

const initialState = {
  user: null,
  tiles: [],
  stats: null,
  leaderboard: [],
  onlineUsers: 0,
  socketConnected: false,
};

export const useGameStore = create<GameState>((set) => ({
  ...initialState,
  setUser: (user) => set({ user }),
  setTiles: (tiles) => set({ tiles }),
  updateTile: (tile) =>
    set((state) => {
      const tileIndex = state.tiles.findIndex((item) => item.id === tile.id);

      if (tileIndex === -1) {
        return { tiles: state.tiles };
      }

      const nextTiles = state.tiles.slice();
      nextTiles[tileIndex] = tile;

      return {
        tiles: nextTiles,
        stats: state.stats
          ? {
              ...state.stats,
              claimedTiles:
                state.tiles[tileIndex].ownerId === null && tile.ownerId !== null
                  ? state.stats.claimedTiles + 1
                  : state.stats.claimedTiles,
              unclaimedTiles:
                state.tiles[tileIndex].ownerId === null && tile.ownerId !== null
                  ? Math.max(0, state.stats.unclaimedTiles - 1)
                  : state.stats.unclaimedTiles,
            }
          : state.stats,
      };
    }),
  setLeaderboard: (leaderboard) => set({ leaderboard }),
  setStats: (stats) => set({ stats }),
  setOnlineUsers: (onlineUsers) => set({ onlineUsers }),
  setSocketConnected: (socketConnected) => set({ socketConnected }),
  reset: () => set(initialState),
}));
