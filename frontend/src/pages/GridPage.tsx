import BottomNav from "../components/BottomNav";
import GridCanvas from "../components/GridCanvas";
import Header from "../components/Header";
import StatsBar from "../components/StatusBar";

export default function GridPage() {
    return (
        <div className="min-h-screen bg-[#0d0d0f] text-white">
            <Header />
            <StatsBar />

            <main className="h-screen overflow-hidden">
                <div className="h-full flex items-center justify-center">
                    <GridCanvas />
                </div>
            </main>

            <BottomNav />
        </div>
    );
}