import { useMemo } from "react";
import { useTileCapture } from "../hooks/useTileCapture";
import { useGameStore } from "../store/gameStore";
import Tile from "./Tile";

export default function Grid() {
  const tiles = useGameStore((state) => state.tiles);
  const user = useGameStore((state) => state.user);
  const leaderboard = useGameStore((state) => state.leaderboard);
  const captureTile = useTileCapture(user);

  const playerById = useMemo(
    () => new Map(leaderboard.map((entry) => [entry.userId, entry])),
    [leaderboard],
  );

  return (
    <div
      className="
      grid
      grid-cols-[repeat(30,16px)]
      grid-rows-[repeat(30,16px)]
      gap-[1px]
      "
    >
      {tiles.map((tile) => (
        <Tile
          key={tile.id}
          tile={tile}
          currentUserId={user?.id ?? null}
          currentUserColor={user?.color ?? "#7c3aed"}
          ownerColor={tile.ownerId ? playerById.get(tile.ownerId)?.color : undefined}
          onCapture={captureTile}
        />
      ))}
    </div>
  );
}
