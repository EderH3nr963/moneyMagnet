"use client";

import DashboardCharts from "@/components/dashboard/DashboardCharts";
import {
  ConnectionNoticeAlert,
  DashboardErrorAlert,
  DashboardLoadError,
  DashboardLoading,
} from "@/components/dashboard/DashboardFeedback";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMainGrid from "@/components/dashboard/DashboardMainGrid";
import DashboardSummary from "@/components/dashboard/DashboardSummary";
import PluggyConnectModal from "@/components/dashboard/PluggyConnectModal";
import { useSidebar } from "../../context/SidebarContext";
import { useDashboard } from "@/hooks/useDashboard";

export default function DashboardPage() {
  const { setOpen } = useSidebar();
  const {
    dashboard,
    loading,
    loadingFinancialHistory,
    loadingExpensesByCategory,
    financialHistoryPeriod,
    expensesByCategoryFilter,
    error,
    connectToken,
    connectionNotice,
    loadDashboard,
    loadFinancialHistory,
    loadExpensesByCategory,
    openBankConnection,
    handleConnectionSuccess,
    closePluggyConnect,
    handlePluggyError,
    handlePluggyLoadError,
  } = useDashboard();

  if (loading && !dashboard) {
    return <DashboardLoading />;
  }

  if (!dashboard) {
    return (
      <DashboardLoadError
        message={error}
        onRetry={() => void loadDashboard()}
      />
    );
  }

  return (
    <main className="w-full not-lg:w-screen">
      <PluggyConnectModal
        connectToken={connectToken}
        onSuccess={handleConnectionSuccess}
        onClose={closePluggyConnect}
        onError={handlePluggyError}
        onLoadError={handlePluggyLoadError}
      />

      <DashboardHeader onOpenMenu={() => setOpen(true)} />

      <DashboardErrorAlert message={error} />
      <ConnectionNoticeAlert notice={connectionNotice} />

      <DashboardSummary summary={dashboard.summary} />

      <DashboardCharts
        financialHistory={dashboard.financialHistory}
        expensesByCategory={dashboard.expensesByCategory}
        financialHistoryPeriod={financialHistoryPeriod}
        loadingFinancialHistory={loadingFinancialHistory}
        onFinancialHistoryPeriodChange={loadFinancialHistory}
        expensesByCategoryFilter={expensesByCategoryFilter}
        loadingExpensesByCategory={loadingExpensesByCategory}
        onExpensesByCategoryFilterChange={loadExpensesByCategory}
      />

      <DashboardMainGrid
        dashboard={dashboard}
        onConnectBank={() => void openBankConnection()}
        connectingBank={
          Boolean(connectToken) || connectionNotice?.type === "loading"
        }
      />
    </main>
  );
}
