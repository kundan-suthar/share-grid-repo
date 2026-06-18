import { useCallback, useEffect, useState } from "react";
import { gridApi } from "../api/grid.api";
import { leaderboardApi } from "../api/leaderboard.api";
import { statsApi } from "../api/stats.api";
import type { ApiError } from "../lib/axios";
import { useGameStore } from "../store/gameStore";
import { getStoredUser } from "../utils/storage";
import { useToast } from "./useToast";

export function useGameBootstrap() {
  const setUser = useGameStore((state) => state.setUser);
  const setTiles = useGameStore((state) => state.setTiles);
  const setStats = useGameStore((state) => state.setStats);
  const setLeaderboard = useGameStore((state) => state.setLeaderboard);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadGame = useCallback(async () => {
    setLoading(true);

    try {
      const [tiles, stats, leaderboard] = await Promise.all([
        gridApi.getGrid(),
        statsApi.getStats(),
        leaderboardApi.getLeaderboard(),
      ]);

      setTiles(tiles);
      setStats(stats);
      setLeaderboard(leaderboard);
    } catch (error) {
      showToast((error as ApiError).message || "Unable to load the grid", "error");
    } finally {
      setLoading(false);
    }
  }, [setLeaderboard, setStats, setTiles, showToast]);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  return { loading, loadGame };
}
