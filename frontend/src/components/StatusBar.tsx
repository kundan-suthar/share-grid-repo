export default function StatsBar() {
  return (
    <div className="fixed top-16 left-6 z-40 flex gap-4">
      <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
        <div className="text-xs text-zinc-500">
          YOUR TILES
        </div>

        <div className="text-violet-400 font-bold">
          14
        </div>
      </div>

      <div className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10">
        <div className="text-xs text-zinc-500">
          TOTAL CLAIMED
        </div>

        <div>430 / 900</div>
      </div>
    </div>
  );
}