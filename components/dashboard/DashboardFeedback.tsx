import { CheckCircle2, LoaderCircle, RefreshCw, XCircle } from "lucide-react";

import type { ConnectionNotice } from "@/hooks/useDashboard";

interface DashboardErrorAlertProps {
  message: string;
}

export function DashboardErrorAlert({ message }: DashboardErrorAlertProps) {
  if (!message) return null;

  return (
    <div
      role="alert"
      className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
    >
      {message}
    </div>
  );
}

interface ConnectionNoticeAlertProps {
  notice: ConnectionNotice | null;
}

export function ConnectionNoticeAlert({ notice }: ConnectionNoticeAlertProps) {
  if (!notice) return null;

  return (
    <div
      role={notice.type === "error" ? "alert" : "status"}
      className={`mx-4 mt-4 flex items-center gap-3 rounded-xl border px-4 py-3 text-sm ${
        notice.type === "success"
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
          : notice.type === "error"
            ? "border-red-500/25 bg-red-500/10 text-red-400"
            : "border-primary/25 bg-primary/10 text-primary"
      }`}
    >
      {notice.type === "loading" ? (
        <LoaderCircle className="shrink-0 animate-spin" size={18} />
      ) : notice.type === "success" ? (
        <CheckCircle2 className="shrink-0" size={18} />
      ) : (
        <XCircle className="shrink-0" size={18} />
      )}
      <span>{notice.message}</span>
    </div>
  );
}

export function DashboardLoading() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center">
      <div className="flex items-center gap-3 text-muted-foreground">
        <LoaderCircle className="animate-spin" />
        Carregando seus dados...
      </div>
    </main>
  );
}

interface DashboardLoadErrorProps {
  message: string;
  onRetry: () => void;
}

export function DashboardLoadError({
  message,
  onRetry,
}: DashboardLoadErrorProps) {
  return (
    <main className="flex min-h-screen w-full items-center justify-center px-4">
      <div className="max-w-md rounded-2xl border border-red-500/25 bg-card p-8 text-center">
        <h1 className="text-xl font-semibold">O dashboard não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 font-medium text-primary-foreground"
        >
          <RefreshCw size={18} />
          Tentar novamente
        </button>
      </div>
    </main>
  );
}
