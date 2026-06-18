import { memo, useCallback, useMemo } from "react";
import type { Tile as TileModel } from "../types/tile";

type TileProps = {
  tile: TileModel;
  currentUserId: string | null;
  currentUserColor: string;
  ownerColor?: string;
  onCapture: (tile: TileModel) => void;
};

function Tile({ tile, currentUserId, currentUserColor, ownerColor, onCapture }: TileProps) {
  const ownedByCurrentUser = tile.ownerId !== null && tile.ownerId === currentUserId;
  const claimed = tile.ownerId !== null;

  const backgroundColor = useMemo(() => {
    if (ownedByCurrentUser) return currentUserColor;
    if (claimed) return ownerColor ?? "#22d3ee";
    return "#1a1a1f";
  }, [claimed, currentUserColor, ownedByCurrentUser, ownerColor]);

  const handleClick = useCallback(() => {
    onCapture(tile);
  }, [onCapture, tile]);

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={claimed}
      aria-label={`Tile ${tile.id}${claimed ? " claimed" : " unclaimed"}`}
      className={`
        flex
        h-4
        w-4
        items-center
        justify-center
        rounded-[1px]
        border
        text-[8px]
        font-black
        transition-transform
        duration-150
        ${
          claimed
            ? "cursor-not-allowed border-white/10"
            : "border-transparent hover:z-10 hover:scale-150 hover:ring-1 hover:ring-violet-200"
        }
        ${ownedByCurrentUser ? "ring-1 ring-white/70" : ""}
      `}
      style={{ backgroundColor }}
    />
  );
}

export default memo(Tile);
