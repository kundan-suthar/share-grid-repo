export default function BottomNav() {
  return (
    <nav
      className="
      fixed
      bottom-0
      left-0
      right-0
      h-16
      bg-black/60
      backdrop-blur-xl
      border-t
      border-white/10
      flex
      items-center
      justify-around
      md:hidden
      z-50
    "
    >
      <button className="text-zinc-400 hover:text-violet-400">
        <span className="material-symbols-outlined">map</span>
      </button>

      <button className="text-white bg-violet-600 p-3 rounded-full">
        <span className="material-symbols-outlined">
          leaderboard
        </span>
      </button>

      <button className="text-zinc-400 hover:text-violet-400">
        <span className="material-symbols-outlined">person</span>
      </button>
    </nav>
  );
}