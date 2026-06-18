import { useCallback, useMemo, useState, type ReactNode } from "react";
import { ToastContext, type ToastType } from "../lib/toast";

type Toast = {
  id: number;
  message: string;
  type: ToastType;
};

const toneByType: Record<ToastType, string> = {
  error: "border-red-400/30 bg-red-950/80 text-red-100",
  success: "border-emerald-400/30 bg-emerald-950/80 text-emerald-100",
  warning: "border-amber-400/30 bg-amber-950/80 text-amber-100",
  info: "border-cyan-400/30 bg-cyan-950/80 text-cyan-100",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "info") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 4_000);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-16 z-[80] flex w-[calc(100%-2rem)] max-w-sm flex-col gap-3 sm:right-6">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`rounded-lg border px-4 py-3 text-sm shadow-2xl backdrop-blur-xl ${toneByType[toast.type]}`}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
