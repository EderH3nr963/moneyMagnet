import type { DashboardResponse } from "@/types/api";
import LinkedAccountsCard from "./LinkedAccountsCard";
import QuickActions from "./QuickActions";
import RecentTransactionsCard from "./RecentTransactionsCard";

interface DashboardMainGridProps {
  dashboard: DashboardResponse;
  connectingBank: boolean;
  onConnectBank: () => void;
}

export default function DashboardMainGrid({
  dashboard,
  connectingBank,
  onConnectBank,
}: DashboardMainGridProps) {
  return (
    <section className="m-4 gap-6 not-lg:flex not-lg:flex-col lg:grid lg:grid-cols-3">
      <LinkedAccountsCard accounts={dashboard.linkedAccounts} />
      <RecentTransactionsCard transactions={dashboard.recentTransactions} />

      <div className="rounded-2xl border border-border bg-card p-4">
        <h2 className="mb-4 font-semibold">Ações rápidas</h2>
        <QuickActions
          onConnectBank={onConnectBank}
          connectingBank={connectingBank}
        />
      </div>
    </section>
  );
}
