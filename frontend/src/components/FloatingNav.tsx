export default function FloatingDesktopNav() {
  return (
    <div
      className="
      hidden
      md:flex
      fixed
      bottom-6
      left-1/2
      -translate-x-1/2
      bg-black/50
      backdrop-blur-xl
      border
      border-white/10
      rounded-full
      px-8
      py-3
      gap-8
      z-50
    "
    >
      <button className="flex flex-col items-center text-violet-400">
        <span className="material-symbols-outlined">
          map
        </span>

        <span className="text-[10px]">MAP</span>
      </button>

      <button className="flex flex-col items-center text-zinc-400 hover:text-violet-400">
        <span className="material-symbols-outlined">
          leaderboard
        </span>

        <span className="text-[10px]">RANKS</span>
      </button>

      <button className="flex flex-col items-center text-zinc-400 hover:text-violet-400">
        <span className="material-symbols-outlined">
          person
        </span>

        <span className="text-[10px]">PROFILE</span>
      </button>
    </div>
  );
}