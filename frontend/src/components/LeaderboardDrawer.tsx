import type { LeaderboardEntry } from "../types/leaderboard";

type LeaderboardDrawerProps = {
  open: boolean;
  loading: boolean;
  entries: LeaderboardEntry[];
  onClose: () => void;
};

export default function LeaderboardDrawer({
  open,
  loading,
  entries,
  onClose,
}: LeaderboardDrawerProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close leaderboard overlay"
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed bottom-0 right-0 top-0 z-[70] flex w-full max-w-md flex-col border-l border-white/10 bg-zinc-950/75 text-white shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-out sm:w-[420px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-5">
          <div>
            <h2 className="text-lg font-bold text-violet-100">Leaderboard</h2>
            <p className="text-xs uppercase tracking-widest text-zinc-500">Top territory holders</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            aria-label="Close leaderboard"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5">
          {loading ? (
            <div className="space-y-3">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="h-16 animate-pulse rounded-lg border border-white/10 bg-white/5"
                />
              ))}
            </div>
          ) : entries.length === 0 ? (
            <div className="flex h-full items-center justify-center text-center text-sm text-zinc-400">
              No claims yet. The first tile is still waiting.
            </div>
          ) : (
            <ol className="space-y-3">
              {entries.map((entry, index) => (
                <li
                  key={entry.userId}
                  className="grid grid-cols-[3rem_1fr_auto] items-center gap-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3"
                >
                  <span className="text-sm font-black text-zinc-400">#{index + 1}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full ring-2 ring-white/20"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="truncate font-semibold text-zinc-100">{entry.username}</span>
                    </div>
                  </div>
                  <span className="rounded-full bg-black/35 px-3 py-1 text-sm font-bold text-violet-100">
                    {entry.tilesClaimed}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      </aside>
    </>
  );
}
