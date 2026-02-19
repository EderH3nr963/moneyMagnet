import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  CategoriaApi,
  TransacaoApi,
  type CategoryResponseDTO,
  type UpdateTransactionDTO,
} from "../api";
import { apiConfig } from "../config/api";
import { NavBar, Footer, BoxMessage } from "../components";

export default function EditTransaction() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const transactionApi = new TransacaoApi(apiConfig);
  const categoryApi = new CategoriaApi(apiConfig);

  const [transaction, setTransaction] = useState<UpdateTransactionDTO | null>(null);
  const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // 🔹 Redirecionamento seguro
  useEffect(() => {
    if (!id) {
      navigate("/transactions", { replace: true });
    }
  }, [id, navigate]);

  // 🔹 Buscar transação
  useEffect(() => {
    if (!id) return;

    const loadTransaction = async () => {
      try {
        const response = await transactionApi.getById(id);

        setTransaction({
          amount: response.data.amount!,
          category_id: response.data.category!.id!,
          date: response.data.date!,
          description: response.data.description!,
        });
      } catch {
        navigate("/transactions", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    loadTransaction();
  }, [id, navigate]);

  // 🔹 Buscar categorias
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories();
        setCategories(response.data);
      } catch {
        setMessage("Erro ao carregar as categorias.");
        setIsError(true);
        setTimeout(() => setMessage(""), 3000);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Carregando transação...
      </div>
    );
  }

  if (!transaction) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsError(false);
    setMessage("");

    try {
      await transactionApi.updateTransaction(id!, transaction);

      setMessage("Transação editada com sucesso!");
      setTimeout(() => navigate("/transactions", { replace: true }), 2000);
    } catch {
      setMessage("Erro ao editar a transação.");
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex justify-center items-center p-6 bg-linear-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <section className="w-full max-w-2xl bg-white dark:bg-gray-900 dark:text-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h1 className="text-2xl font-bold">Editar Transação</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Descrição */}
            <input
              type="text"
              value={transaction.description}
              onChange={(e) =>
                setTransaction({ ...transaction, description: e.target.value })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:outline-none duration-200"
            />

            {/* Valor */}
            <input
              type="number"
              step="0.01"
              value={transaction.amount}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  amount: parseFloat(e.target.value)
                })
              }
              className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:outline-none duration-200"
            />

            {/* Categoria */}
            <select
              value={transaction.category_id}
              onChange={(e) =>
                setTransaction({
                  ...transaction,
                  category_id: String(e.target.value)
                })
              }
              className="mt-1 w-full rounded-md border border-gray-300 
                dark:border-gray-600 bg-white dark:bg-transparent
                px-3 py-2 text-sm text-gray-900 dark:text-gray-100 
                focus:border-purple-500 focus:ring-2 focus:ring-purple-400 
                focus:outline-none transition-all duration-200"
              >
              {categories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.id}
                  className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                >
                  {cat.name}
                </option>
              ))}
            </select>


            <button
              type="submit"
              disabled={loading}
              className={`
                rounded-md px-4 py-2 text-sm font-medium text-white
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-purple-400
                ${loading
                  ? "bg-purple-400 cursor-not-allowed opacity-80"
                  : "bg-purple-600 hover:bg-purple-700 hover:scale-105 cursor-pointer"
                }
  `}
            >
              {loading ? "Salvando..." : "Salvar alterações"}
            </button>

          </form>
        </section>

        {message && <BoxMessage error={isError} message={message} />}
      </main>
      <Footer />
    </>
  );
}
