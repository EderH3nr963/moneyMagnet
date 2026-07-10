import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  type ChartOptions,
  type ScriptableContext,
} from "chart.js";
import { Line } from "react-chartjs-2";

import type { MonthlyFinancial } from "@/types/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);

interface LineChartProps {
  history: MonthlyFinancial[];
}

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function gradient(context: ScriptableContext<"line">, color: string) {
  const { ctx, chartArea } = context.chart;
  if (!chartArea) return color;

  const fill = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
  fill.addColorStop(0, color);
  fill.addColorStop(1, "rgba(0, 0, 0, 0)");
  return fill;
}

export default function LineChart({ history }: LineChartProps) {
  const data = {
    labels: history.map((item) => item.label),
    datasets: [
      {
        label: "Receitas",
        data: history.map((item) => item.income),
        borderColor: "#22C55E",
        backgroundColor: (context: ScriptableContext<"line">) =>
          gradient(context, "rgba(34, 197, 94, 0.35)"),
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: "Despesas",
        data: history.map((item) => item.expenses),
        borderColor: "#EF4444",
        backgroundColor: (context: ScriptableContext<"line">) =>
          gradient(context, "rgba(239, 68, 68, 0.35)"),
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { intersect: false, mode: "index" },
    scales: {
      y: {
        ticks: {
          callback: (value) => currencyFormatter.format(Number(value)),
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#a1a1aa",
          boxWidth: 40,
          usePointStyle: true,
          pointStyle: "line",
          padding: 24,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.dataset.label}: ${currencyFormatter.format(context.parsed.y ?? 0)}`,
        },
      },
    },
  };

  if (!history.length) {
    return (
      <div className="flex h-80  items-center justify-center text-sm text-muted-foreground">
        Ainda não há histórico financeiro.
      </div>
    );
  }

  return (
    <div className="h-80">
      <Line data={data} options={options} />
    </div>
  );
}
