import { useEffect, useRef, useState } from "react";
import { Edit, Trash } from "react-feather";
import { useNavigate } from "react-router";
import { TransacaoApi } from "../api";
import { apiConfig } from "../config/api";
import {
  NavBar,
  Footer,
  FloatButtoCSV,
  ModalConfirmDeleteTransaction,
  BoxMessage,
} from "../components";
import { AxiosError } from "axios";
import { useTransactions } from "../hooks/useTransactions";

export default function TransactionsPage() {
  const navigate = useNavigate();
  const transactionApi = new TransacaoApi(apiConfig);

  const {
    transactions,
    setTransactions,
    fetchTransactions,
    hasMore,
    isLoading,
  } = useTransactions();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [transactionIdToDelete, setTransactionIdToDelete] = useState<
    string | null
  >(null);

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          fetchTransactions();
        }
      },
      { rootMargin: "100px" },
    );

    const currentLoader = loaderRef.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, []);

  const handleDelete = async () => {
    try {
      await transactionApi._delete(transactionIdToDelete || "");

      setMessage("Transação deletada com sucesso");
      setIsError(false);

      setTransactions(
        transactions.filter((t) => t.id !== transactionIdToDelete),
      );
      setShowDeleteModal(false);
    } catch (error: unknown) {
      setMessage(
        error instanceof AxiosError
          ? error.response!.data.message
          : "Erro ao deletar transação",
      );
      setIsError(false);
    } finally {
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 3000);
    }
  };

  return (
    <>
      <NavBar />

      <main className="min-h-screen flex flex-col items-center p-4">
        <section className="mt-10 mb-6 w-full max-w-5xl">
          <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200">
            Transações
          </h1>

          <div className="overflow-x-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0">
                <tr>
                  {["Data", "Descrição", "Categoria", "Valor", "Opções"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ),
                  )}
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                {transactions.map((tx, index) => (
                  <tr
                    key={`${tx.id ?? "no-id"}-${index}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                      {tx.date
                        ? new Date(tx.date).toLocaleDateString("pt-BR")
                        : "-"}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                      {tx.description}
                    </td>

                    <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-200">
                      {tx.category?.name || "Nenhuma"}
                    </td>

                    <td
                      className={`px-4 py-3 text-sm font-semibold ${
                        tx.category?.type === "RECEITA"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {tx.category?.type === "DESPESA"
                        ? `- ${tx.amount}`
                        : tx.amount}
                    </td>

                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/transaction/edit/${tx.id}`)}
                          className="text-blue-600 hover:cursor-pointer hover:text-white hover:bg-blue-600 rounded-md p-1 duration-200 hover:scale-105"
                        >
                          <Edit className="h-5 w-5" />
                        </button>

                        <button
                          className="text-red-600 hover:cursor-pointer hover:text-white hover:bg-red-600 rounded-md p-1 duration-200 hover:scale-105"
                          onClick={() => {
                            setTransactionIdToDelete(tx.id || "");
                            setShowDeleteModal(true);
                          }}
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 🔥 Loader */}
          <div
            ref={loaderRef}
            className="py-6 flex items-center justify-center text-gray-500"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-300"></div>
            ) : hasMore ? (
              "Deslize para carregar mais"
            ) : (
              "Fim da lista"
            )}
          </div>
        </section>

        <FloatButtoCSV />

        {showDeleteModal && transactionIdToDelete && (
          <ModalConfirmDeleteTransaction
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => handleDelete()}
          />
        )}

        {message && <BoxMessage message={message} error={isError} />}
      </main>

      <Footer />
    </>
  );
}
