// Componentes
import NavBar from "../components/layout/NavBar";

// Icons
import Footer from "../components/layout/Footer";

// Auth
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import FloatButtonCSV from "../components/ui/FloatButtonCSV";
import GraficoFluxoFinanceiro from "../components/dashboard/EvolutionChart";
import GraficoFonteReceita from "../components/dashboard/GraficoFonteReceita";
import {
  DashboardControllerApi,
  TransacaoApi,
  type DashboardSummaryDTO,
  type TransactionResponseDTO,
} from "../api";
import { apiConfig } from "../config/api";

export default function HomePage() {
  const { user } = useAuth();
  const [transaction, setTransaction] = useState<TransactionResponseDTO[]>([]);
  const [summaryData, setSummaryData] = useState<DashboardSummaryDTO>({
    receita: 0,
    lucro: 0,
    despesa: 0,
    margem: 0,
  });

  useEffect(() => {
    async function fetchTransaction() {
      try {
        const transacaoApi = new TransacaoApi(apiConfig);
        const response = await transacaoApi.getAllPageSortingByDate({
          size: 7,
        });
        const data = response.data?.transactions ?? [];
        setTransaction(data ?? []);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }
    fetchTransaction();
  }, []);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const dashboardApi = new DashboardControllerApi(apiConfig);
        const response = await dashboardApi.getDashboardSummary(
          new Date().getFullYear(),
          new Date().getMonth(),
        );

        if (!response.data) return;

        setSummaryData(response.data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <div>
      <NavBar />
      <main className="mt-4 md:mt-6 lg:mt-10 px-4 md:px-8 lg:px-16 xl:px-20">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold dark:text-gray-200">
              Olá, {user?.username?.split(" ")[0] || "Micro Herói"}!
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
              Acompanhe sua jornada financeira
            </p>
          </div>
        </header>

        <section
          className="flex flex-col lg:flex-row w-full justify-center items-center gap-6"
          aria-labelledby="dashboard-heading"
        >
          <div className="flex flex-col w-full lg:w-1/2 gap-4  lg:-mt-14">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              Sumário deste mês
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-purple-500 w-full dark:bg-gray-800 dark:text-gray-200">
                <h3 className="text-gray-500 text-sm font-medium dark:text-gray-300">
                  Receita Total
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-2 dark:text-gray-200">
                  R$ {summaryData.receita?.toLocaleString("pt-BR")}
                </p>
              </article>

              <article className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-blue-500 w-full dark:bg-gray-800 dark:text-gray-200">
                <h3 className="text-gray-500 text-sm font-medium dark:text-gray-300">
                  Despesas
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-2 dark:text-gray-200">
                  R$ {summaryData.despesa?.toLocaleString("pt-BR")}
                </p>
              </article>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <article className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-green-500 w-full dark:bg-gray-800 dark:text-gray-200">
                <h3 className="text-gray-500 text-sm font-medium dark:text-gray-300">
                  Lucro
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-2 dark:text-gray-200">
                  R$ {summaryData.lucro?.toLocaleString("pt-BR")}
                </p>
              </article>

              <article className="bg-white rounded-xl shadow-sm p-4 md:p-6 border-l-4 border-yellow-500 w-full dark:bg-gray-800 dark:text-gray-200">
                <h3 className="text-gray-500 text-sm font-medium dark:text-gray-300">
                  Margem
                </h3>
                <p className="text-xl md:text-2xl font-semibold text-gray-800 mt-2 dark:text-gray-200">
                  {summaryData.margem?.toLocaleString("pt-BR")}%
                </p>
              </article>
            </div>
          </div>

          <GraficoFluxoFinanceiro />
        </section>

        <section className="flex flex-col lg:flex-row w-full justify-center items-start gap-6 mt-20 mb-20">
          <GraficoFonteReceita />

          <div className="w-full lg:w-1/2 mt-6 lg:mt-0">
            <div className="flex justify-between mb-4">
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-200">
                Últimas Transações
              </h3>
              <a
                href="/transactions"
                className="text-sm text-purple-600 hover:bg-gray-200 p-2 rounded-md transition duration-300 dark:hover:bg-gray-800"
              >
                Ver todas
              </a>
            </div>
            <div className="overflow-x-auto overflow-y-auto max-h-[400px] rounded-xl shadow-sm">
              <table className="min-w-full bg-white dark:bg-gray-800 ">
                <thead className="bg-gray-100 dark:bg-gray-700 rounded-xl">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Descrição
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-600 rounded-xl">
                  {transaction.map((tx, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                        {tx.date}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                        {tx.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300">
                        {tx.category?.name || "Nenhuma"}
                      </td>
                      <td
                        className={`px-4 py-3 text-sm font-semibold text-gray-900 ${tx.category?.type === "DESPESA" ? " text-red-800" : " text-green-800"}`}
                      >
                        {tx.category?.type === "RECEITA"
                          ? tx.amount
                          : `-${tx.amount}`}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <FloatButtonCSV />
      </main>
      <Footer />
    </div>
  );
}
