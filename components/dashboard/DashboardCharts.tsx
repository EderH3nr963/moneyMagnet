import type {
  DashboardResponse,
  FinancialHistoryPeriod,
  MonthYearFilter,
} from "@/types/api";
import LineChart from "./LineChart";
import PieChart from "./PieChart";

interface DashboardChartsProps {
  financialHistory: DashboardResponse["financialHistory"];
  expensesByCategory: DashboardResponse["expensesByCategory"];
  financialHistoryPeriod: FinancialHistoryPeriod;
  loadingFinancialHistory: boolean;
  onFinancialHistoryPeriodChange: (
    period: FinancialHistoryPeriod,
  ) => Promise<void>;
  expensesByCategoryFilter: MonthYearFilter;
  loadingExpensesByCategory: boolean;
  onExpensesByCategoryFilterChange: (filter: MonthYearFilter) => Promise<void>;
}

const HISTORY_PERIODS: FinancialHistoryPeriod[] = [6, 9, 12];
const MONTHS = [
  { value: 1, label: "Jan" },
  { value: 2, label: "Fev" },
  { value: 3, label: "Mar" },
  { value: 4, label: "Abr" },
  { value: 5, label: "Mai" },
  { value: 6, label: "Jun" },
  { value: 7, label: "Jul" },
  { value: 8, label: "Ago" },
  { value: 9, label: "Set" },
  { value: 10, label: "Out" },
  { value: 11, label: "Nov" },
  { value: 12, label: "Dez" },
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 7 }, (_, index) => currentYear - index);

export default function DashboardCharts({
  financialHistory,
  expensesByCategory,
  financialHistoryPeriod,
  loadingFinancialHistory,
  onFinancialHistoryPeriodChange,
  expensesByCategoryFilter,
  loadingExpensesByCategory,
  onExpensesByCategoryFilterChange,
}: DashboardChartsProps) {
  function changeExpensesByCategoryFilter(filter: MonthYearFilter) {
    void onExpensesByCategoryFilterChange(filter);
  }

  return (
    <section className="m-4 grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Resumo financeiro</h2>
          <div className="inline-flex rounded-lg border border-border bg-background p-1">
            {HISTORY_PERIODS.map((period) => {
              const active = financialHistoryPeriod === period;

              return (
                <button
                  key={period}
                  type="button"
                  className={`h-8 min-w-12 rounded-md px-3 text-sm font-medium transition ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                  } disabled:cursor-not-allowed disabled:opacity-60`}
                  disabled={loadingFinancialHistory || active}
                  onClick={() => void onFinancialHistoryPeriodChange(period)}
                >
                  {period}m
                </button>
              );
            })}
          </div>
        </div>
        <LineChart history={financialHistory} />
      </div>
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-semibold">Despesas por categoria</h2>
          <div className="flex items-center gap-2">
            <select
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
              value={expensesByCategoryFilter.month}
              disabled={loadingExpensesByCategory}
              onChange={(event) =>
                changeExpensesByCategoryFilter({
                  ...expensesByCategoryFilter,
                  month: Number(event.target.value),
                })
              }
            >
              {MONTHS.map((month) => (
                <option key={month.value} value={month.value}>
                  {month.label}
                </option>
              ))}
            </select>
            <select
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
              value={expensesByCategoryFilter.year}
              disabled={loadingExpensesByCategory}
              onChange={(event) =>
                changeExpensesByCategoryFilter({
                  ...expensesByCategoryFilter,
                  year: Number(event.target.value),
                })
              }
            >
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <PieChart categories={expensesByCategory} />
      </div>
    </section>
  );
}
