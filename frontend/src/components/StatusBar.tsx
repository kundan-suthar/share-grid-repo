import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

export default function StatsBar() {
  const stats = useGameStore((state) => state.stats);
  const tiles = useGameStore((state) => state.tiles);
  const user = useGameStore((state) => state.user);
  const onlineUsers = useGameStore((state) => state.onlineUsers);

  const myTileCount = useMemo(
    () => tiles.reduce((count, tile) => count + (tile.ownerId === user?.id ? 1 : 0), 0),
    [tiles, user?.id],
  );

  return (
    <div className="fixed left-3 top-16 z-40 grid max-w-[calc(100vw-1.5rem)] grid-cols-3 gap-2 sm:left-6 sm:flex sm:gap-4">
      <div className="rounded-lg border border-white/10 bg-black/40 p-3 backdrop-blur-xl sm:p-4">
        <div className="text-xs text-zinc-500">
          YOUR TILES
        </div>

        <div className="text-violet-400 font-bold">
          {myTileCount}
        </div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/40 p-3 backdrop-blur-xl sm:p-4">
        <div className="text-xs text-zinc-500">
          TOTAL CLAIMED
        </div>

        <div>{stats?.claimedTiles ?? 0} / {stats?.totalTiles ?? 900}</div>
      </div>

      <div className="rounded-lg border border-white/10 bg-black/40 p-3 backdrop-blur-xl sm:p-4">
        <div className="text-xs text-zinc-500">
          ONLINE
        </div>

        <div>{onlineUsers}</div>
      </div>
    </div>
  );
}
