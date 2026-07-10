import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

import type { CategoryExpense } from "@/types/api";

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  categories: CategoryExpense[];
}

const fallbackColors = [
  "#EF4444",
  "#F97316",
  "#FACC15",
  "#22C55E",
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const centerText: Plugin<"doughnut"> = {
  id: "centerText",
  afterDraw(chart) {
    const total = chart.data.datasets[0]?.data.reduce(
      (sum, value) => sum + Number(value),
      0,
    );
    const { ctx, chartArea } = chart;
    const centerX = chartArea.left + chartArea.width / 2;
    const centerY = chartArea.top + chartArea.height / 2;

    ctx.save();
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "500 14px Arial";
    ctx.fillStyle = "#A1A1AA";
    ctx.fillText("Total", centerX, centerY - 12);
    ctx.font = "600 18px Arial";
    ctx.fillStyle = "#FAFAFA";
    ctx.fillText(currencyFormatter.format(total ?? 0), centerX, centerY + 15);
    ctx.restore();
  },
};

export default function PieChart({ categories }: PieChartProps) {
  const normalizedCategories = categories.map((category, index) => ({
    ...category,
    color: category.color || fallbackColors[index % fallbackColors.length],
  }));

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) =>
            `${context.label}: ${currencyFormatter.format(context.parsed)}`,
        },
      },
    },
    borderColor: "transparent",
    cutout: "65%",
  };

  if (!normalizedCategories.length) {
    return (
      <div className="flex h-80 items-center justify-center text-sm text-muted-foreground">
        Ainda não há despesas categorizadas.
      </div>
    );
  }

  const data = {
    labels: normalizedCategories.map((category) => category.categoryName),
    datasets: [
      {
        label: "Despesas por categoria",
        data: normalizedCategories.map((category) => category.amount),
        backgroundColor: normalizedCategories.map((category) => category.color),
        hoverOffset: 12,
      },
    ],
  };

  return (
    <div className="grid h-full min-h-80 grid-cols-1 place-items-center gap-6 lg:grid-cols-2">
      <div className="h-64 w-full">
        <Doughnut data={data} options={options} plugins={[centerText]} />
      </div>
      <div className="max-h-64 w-full space-y-3 overflow-y-auto pr-4 text-sm not-lg:mb-4">
        {normalizedCategories.map((item) => (
          <div
            key={item.categoryId ?? item.categoryName}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="truncate">{item.categoryName}</span>
            </div>
            <span className="shrink-0 font-medium">
              {currencyFormatter.format(item.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
