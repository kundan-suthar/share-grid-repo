import { useMemo } from "react";
import { useGameStore } from "../store/gameStore";

type HeaderProps = {
  onOpenLeaderboard: () => void;
};

export default function Header({ onOpenLeaderboard }: HeaderProps) {
  const onlineUsers = useGameStore((state) => state.onlineUsers);
  const socketConnected = useGameStore((state) => state.socketConnected);
  const user = useGameStore((state) => state.user);
  const tiles = useGameStore((state) => state.tiles);

  const myTileCount = useMemo(
    () => tiles.reduce((count, tile) => count + (tile.ownerId === user?.id ? 1 : 0), 0),
    [tiles, user?.id],
  );

  return (
    <header
      className="
      fixed
      top-0
      left-0
      right-0
      h-12
      px-6
      flex
      items-center
      justify-between
      border-b
      border-white/10
      backdrop-blur-xl
      bg-black/40
      z-50
      "
    >
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-violet-400">
          grid_view
        </span>

        <h1 className="font-bold text-violet-300">
          Pixel Territory
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <div
          className={`h-2 w-2 rounded-full ${
            socketConnected ? "bg-green-500 animate-pulse" : "bg-red-500"
          }`}
        />

        <span className="hidden text-xs text-zinc-400 sm:inline">
          {onlineUsers} Online
        </span>

        <span className="hidden text-xs text-violet-200 sm:inline">
          {myTileCount} Mine
        </span>

        <button
          type="button"
          onClick={onOpenLeaderboard}
          className="flex h-9 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 text-xs font-semibold text-zinc-100 transition hover:bg-white/10"
        >
          <span className="material-symbols-outlined text-base">leaderboard</span>
          <span className="hidden sm:inline">Leaderboard</span>
        </button>
      </div>
    </header>
  );
}
