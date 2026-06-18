import { request } from "../lib/axios";
import type { Tile } from "../types/tile";

export const gridApi = {
  getGrid() {
    return request<Tile[]>({
      method: "GET",
      url: "/api/v1/grid",
    });
  },
};
