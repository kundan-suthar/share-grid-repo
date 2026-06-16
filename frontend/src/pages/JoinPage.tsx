import { useState } from "react";

export default function JoinPage() {
    const [username, setUsername] = useState("");

    const handleJoin = () => {
        if (!username.trim()) return;

        console.log(username);

        // socket connect
        // navigate("/grid")
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 text-white">
            <main className="relative w-full max-w-sm">

                <div
                    className="
          rounded-2xl
          border border-white/10
          bg-black/40
          backdrop-blur-xl
          p-6
          sm:p-8
          text-center
        "
                >
                    <div
                        className="
            mb-6
            mx-auto
            flex
            h-20
            w-20
            sm:h-24
            sm:w-24
            items-center
            justify-center
            rounded-full
            border
            border-violet-500/20
            bg-violet-500/10
          "
                    >
                        <span className="material-symbols-outlined text-violet-300 text-4xl sm:text-5xl">
                            grid_view
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                        Pick your identity
                    </h1>

                    <p className="text-zinc-400 mb-8">
                        Your color is auto-assigned.
                        Tiles you claim stay yours.
                    </p>

                    <div className="space-y-4">
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter a name..."
                            className="
                w-full
                rounded-full
                border
                border-zinc-700
                bg-zinc-900
                px-5
                py-3
                outline-none
                transition
                focus:border-violet-400
                focus:ring-2
                focus:ring-violet-500/20
              "
                        />

                        <button
                            onClick={handleJoin}
                            className="
                w-full
                rounded-full
                bg-violet-600
                py-4
                font-semibold
                tracking-wider
                transition
                hover:brightness-110
                active:scale-95
              "
                        >
                            ENTER THE GRID
                        </button>
                    </div>

                    <div className="mt-8 border-t border-white/5 pt-6">
                        <div className="flex justify-between text-xs uppercase tracking-widest text-cyan-400">
                            <span>Active Sector</span>
                            <span>PX-041</span>
                        </div>
                    </div>
                </div>

                <div
                    className="
          pointer-events-none
          absolute
          left-1/2
          -bottom-12
          -translate-x-1/2
          text-[32px]
          sm:text-[60px]
          md:text-[80px]
          font-black
          text-white/[0.03]
          whitespace-nowrap
          select-none
        "
                >
                    PIXEL TERRITORY
                </div>
            </main>

            <div className="fixed left-4 top-4 sm:left-8 sm:top-8 flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-xs uppercase tracking-widest text-violet-300">
                    System Ready
                </span>
            </div>
        </div>
    );
}