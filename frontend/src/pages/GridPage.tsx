import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";
import GridCanvas from "../components/GridCanvas";
import Header from "../components/Header";
import LeaderboardDrawer from "../components/LeaderboardDrawer";
import StatsBar from "../components/StatusBar";
import { useGameBootstrap } from "../hooks/useGameBootstrap";
import { useSocketEvents } from "../hooks/useSocketEvents";
import { useGameStore } from "../store/gameStore";

export default function GridPage() {
    const user = useGameStore((state) => state.user);
    const leaderboard = useGameStore((state) => state.leaderboard);
    const [leaderboardOpen, setLeaderboardOpen] = useState(false);
    const { loading, loadGame } = useGameBootstrap();

    useSocketEvents(user);

    useEffect(() => {
        void loadGame();
    }, [loadGame]);

    return (
        <div className="min-h-screen bg-[#0d0d0f] text-white">
            <Header onOpenLeaderboard={() => setLeaderboardOpen(true)} />
            <StatsBar />

            <main className="h-screen overflow-hidden">
                <div className="h-full flex items-center justify-center">
                    <GridCanvas loading={loading} />
                </div>
            </main>

            <BottomNav onOpenLeaderboard={() => setLeaderboardOpen(true)} />
            <LeaderboardDrawer
                open={leaderboardOpen}
                loading={loading}
                entries={leaderboard}
                onClose={() => setLeaderboardOpen(false)}
            />
        </div>
    );
}
