import { request } from "../lib/axios";
import type { Stats } from "../types/stats";

export const statsApi = {
  getStats() {
    return request<Stats>({
      method: "GET",
      url: "/api/v1/stats",
    });
  },
};
