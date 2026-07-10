import { TrendingDown, TrendingUp } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface SummaryCardProps {
  title: string;
  value: string;
  percentage: string;
  positive: boolean;
  icon: LucideIcon;
  variant?: "default" | "income" | "expense";
}

export default function SummaryCard({
  title,
  value,
  percentage,
  positive,
  icon: Icon,
  variant = "default",
}: SummaryCardProps) {
  const iconBackground = {
    default: "bg-emerald-500/10",
    income: "bg-emerald-500/10",
    expense: "bg-red-500/10",
  };

  const iconColor = {
    default: "text-emerald-600",
    income: "text-emerald-600",
    expense: "text-red-500",
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg select-none">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              {title}
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight">
            {value}
          </h2>

          <div
            className={`mt-3 flex items-center gap-1 text-sm ${
              positive ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {positive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}

            <span>{percentage}</span>

            <span className="text-muted-foreground">
              vs mês anterior
            </span>
          </div>
        </div>

        <div
          className={`flex h-16 w-16 items-center justify-center rounded-full ${iconBackground[variant]}`}
        >
          <Icon className={iconColor[variant]} size={30} />
        </div>
      </div>
    </div>
  );
}
