import { useMemo, useState } from "react";

type TileType = {
  id: number;
  owner: "none" | "user" | "teal" | "coral" | "emerald";
  label: string;
};

const initials = ["A", "K", "S", "P", "X", "M", "L"];

export default function Grid() {
  const [tiles, setTiles] = useState<TileType[]>(() =>
    Array.from({ length: 900 }, (_, i) => {
      const rand = Math.random();

      if (rand < 0.6) {
        return {
          id: i,
          owner: "none",
          label: "",
        };
      }

      if (rand < 0.75) {
        return {
          id: i,
          owner: "user",
          label: "P",
        };
      }

      if (rand < 0.85) {
        return {
          id: i,
          owner: "teal",
          label:
            initials[Math.floor(Math.random() * initials.length)],
        };
      }

      if (rand < 0.95) {
        return {
          id: i,
          owner: "coral",
          label:
            initials[Math.floor(Math.random() * initials.length)],
        };
      }

      return {
        id: i,
        owner: "emerald",
        label:
          initials[Math.floor(Math.random() * initials.length)],
      };
    })
  );

  const handleClick = (id: number) => {
    setTiles((prev) =>
      prev.map((tile) =>
        tile.id === id && tile.owner === "none"
          ? {
            ...tile,
            owner: "user",
            label: "P",
          }
          : tile
      )
    );
  };

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
          onClick={() => handleClick(tile.id)}
        />
      ))}
    </div>
  );
}

function Tile({
  tile,
  onClick,
}: {
  tile: TileType;
  onClick: () => void;
}) {
  const bg = useMemo(() => {
    switch (tile.owner) {
      case "user":
        return "bg-violet-600 text-white";
      case "teal":
        return "bg-cyan-500 text-black";
      case "coral":
        return "bg-pink-300 text-black";
      case "emerald":
        return "bg-emerald-500 text-black";
      default:
        return "bg-[#1a1a1f] text-transparent";
    }
  }, [tile.owner]);

  return (
    <button
      onClick={onClick}
      className={`
        w-4
        h-4
        text-[8px]
        font-black
        flex
        items-center
        justify-center
        transition-all
        duration-200
        hover:scale-150
        hover:z-10
        rounded-[1px]
        ${bg}
      `}
    >
      {tile.label}
    </button>
  );
}