import { request } from "../lib/axios";
import type { LeaderboardEntry } from "../types/leaderboard";

export const leaderboardApi = {
  getLeaderboard() {
    return request<LeaderboardEntry[]>({
      method: "GET",
      url: "/api/v1/leaderboard",
    });
  },
};
