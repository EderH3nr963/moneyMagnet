import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";
import { DashboardControllerApi, type CategoryTotalDTO } from "../../api";
import { apiConfig } from "../../config/api";
import { DropdownTimePeriod } from "../ui";
import { useTheme } from "../../context";

export default function GraficoFonteReceita() {
  const [data, setData] = useState<CategoryTotalDTO[]>([]);
  const [timePeriod, setTimePeriod] = useState<number>(
    new Date().getFullYear(),
  );

  const isDark = useTheme().theme == "dark";

  const axisColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const tooltipBg = isDark ? "#1f2937" : "#ffffff";

  useEffect(() => {
    (async () => {
      try {
        const dashboardApi = new DashboardControllerApi(apiConfig);
        const response = await dashboardApi.getCategoryTotals(timePeriod);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    })();
  }, [timePeriod]);

  console.log(data);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="w-full lg:w-1/2">
      <div className="flex justify-between items-center">
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Gastos/Receitas por categoria
        </h3>
        <DropdownTimePeriod
          timePeriod={timePeriod}
          setTimePeriod={setTimePeriod}
        />
      </div>

      <div className="w-full h-[300px] md:h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid stroke={gridColor} strokeDasharray="3 3" />

            <XAxis
              type="number"
              stroke={axisColor}
              tick={{ fill: axisColor }}
              tickFormatter={formatCurrency}
            />

            <YAxis
              type="category"
              dataKey="name"
              stroke={axisColor}
              tick={{ fill: axisColor }}
            />

            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: tooltipBg,
                borderRadius: "8px",
                border: "none",
                color: axisColor,
              }}
              labelStyle={{ color: axisColor }}
              itemStyle={{ color: axisColor }}
            />

            <Bar dataKey="total" barSize={20} radius={[0, 0, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.type === "RECEITA" ? "#22c55e" : "#ef4444"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="flex gap-6 mt-4 text-sm font-medium">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded-sm" />
          <span className="text-gray-700 dark:text-gray-300">Receita</span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded-sm" />
          <span className="text-gray-700 dark:text-gray-300">Despesa</span>
        </div>
      </div>
    </div>
  );
}
