import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CategoriaApi, type CategoryResponseDTO } from "../api";
import { apiConfig } from "../config/api";
import { NavBar, Footer, BoxMessage } from "../components";
import { AxiosError } from "axios";

export default function EditCategory() {
  const categoriaApi = new CategoriaApi(apiConfig);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [category, setCategory] = useState<CategoryResponseDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!id) {
      navigate("/categories", { replace: true });
    }
  }, [id, navigate]);

  useEffect(() => {
    if (!id) return;

    const getCategory = async () => {
      try {
        const response = await categoriaApi.getCategoryById(id);
        setCategory(response.data);
      } catch (error) {
        console.error(error);
        navigate("/categories", { replace: true });
      } finally {
        setLoading(false);
      }
    };

    getCategory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    const { name, type, color } = category;

    setIsError(false);
    setMessage("");

    if (!name || !type || !color) {
      setMessage("Todos os campos são obrigatórios.");
      setIsError(true);
      return;
    }

    try {
      await categoriaApi.updateCategory(id!, { name, type, color });
      setMessage("Categoria editada com sucesso!");
      setIsError(false);

      setTimeout(() => navigate("/categories", { replace: true }), 2000);
    } catch (error: unknown) {
      setMessage(
        error instanceof AxiosError
          ? error?.response?.data?.message
          : "Erro ao editar a categoria.",
      );
      setIsError(true);
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 dark:text-gray-300 bg-linear-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        Carregando categoria...
      </div>
    );
  }

  if (!category) return null;

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex justify-center items-center p-6 bg-linear-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <section className="w-full max-w-2xl bg-white dark:bg-gray-900 dark:text-gray-100 p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Editar Categoria
          </h1>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            Atualize as informações abaixo e salve as alterações.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            {/* Nome */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Nome
              </label>
              <input
                id="name"
                type="text"
                value={category.name}
                onChange={(e) =>
                  setCategory({ ...category, name: e.target.value })
                }
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:outline-none duration-200"
                placeholder="Ex: Alimentação, Transporte..."
              />
            </div>

            {/* Tipo */}
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Tipo
              </label>
              <select
                id="type"
                value={category.type}
                onChange={(e) =>
                  setCategory({
                    ...category,
                    color: (e.target.value as "RECEITA") || "DESPESA",
                  })
                }
                className="mt-1 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm text-gray-900 dark:text-gray-100 focus:border-purple-500 focus:ring-purple-500 focus:outline-none duration-200"
              >
                <option value="RECEITA" className="bg-white dark:bg-gray-900">
                  Receita
                </option>
                <option value="DESPESA" className="bg-white dark:bg-gray-900">
                  Despesa
                </option>
              </select>
            </div>

            {/* Cor */}
            <div>
              <label
                htmlFor="color"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Cor
              </label>
              <input
                id="color"
                type="color"
                value={category.color}
                onChange={(e) =>
                  setCategory({ ...category, color: e.target.value })
                }
                className="mt-1 w-20 h-10 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
              />
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={() => navigate("/categories")}
                className="rounded-md border border-gray-300 hover:cursor-pointer dark:border-gray-600 dark:hover:border-red-600 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-red-600 hover:text-white hover:scale-105 transition duration-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`rounded-md bg-purple-600 px-4 py-2 hover:cursor-pointer text-sm font-medium text-white hover:scale-105 hover:bg-purple-700 transition duration-200 ${
                  loading ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Salvando..." : "Salvar alterações"}
              </button>
            </div>
          </form>
        </section>

        {message && <BoxMessage error={isError} message={message} />}
      </main>
      <Footer />
    </>
  );
}
