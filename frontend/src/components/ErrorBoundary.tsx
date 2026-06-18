import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Application error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center bg-[#0d0d0f] px-6 text-white">
          <div className="max-w-md rounded-lg border border-white/10 bg-black/50 p-6 text-center backdrop-blur-xl">
            <h1 className="text-xl font-semibold text-red-200">Something broke</h1>
            <p className="mt-2 text-sm text-zinc-400">
              Refresh the page to reconnect to the grid.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
