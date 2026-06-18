import { useEffect, useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ToastProvider } from "./components/ToastProvider";
import GridPage from "./pages/GridPage";
import JoinPage from "./pages/JoinPage";
import { useGameStore } from "./store/gameStore";
import type { User } from "./types/user";
import { getStoredUser } from "./utils/storage";

type Route = "join" | "grid";

function App() {
  const setUser = useGameStore((state) => state.setUser);
  const [route, setRoute] = useState<Route>(() => (getStoredUser() ? "grid" : "join"));

  useEffect(() => {
    const storedUser = getStoredUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, [setUser]);

  const handleJoined = (user: User) => {
    setUser(user);
    setRoute("grid");
  };

  return (
    <ErrorBoundary>
      <ToastProvider>
        {route === "join" ? <JoinPage onJoined={handleJoined} /> : <GridPage />}
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
