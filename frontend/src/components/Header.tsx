export default function Header() {
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
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />

        <span className="text-xs text-zinc-400">
          1,240 Online
        </span>
      </div>
    </header>
  );
}