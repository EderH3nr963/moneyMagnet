import { useEffect, useState } from "react";
import { Edit, PlusCircle, Trash } from "react-feather";
import { useNavigate } from "react-router";
import { CategoriaApi, type CategoryResponseDTO } from "../api";
import { apiConfig } from "../config/api";
import {
  NavBar,
  Footer,
  ModalConfirmDeleteTransaction,
  BoxMessage,
} from "../components";
import { AxiosError } from "axios";

export default function Categories() {
  const navigate = useNavigate();

  // Estados principais
  const [categories, setCategories] = useState<CategoryResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Modal de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null,
  );

  // Mensagens de feedback
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // Função para carregar todas as categorias
  const loadCategories = async () => {
    setIsLoading(true);
    try {
      const api = new CategoriaApi(apiConfig);
      const response = await api.getAllCategories();
      setCategories(response.data);
    } catch {
      setMessage("Erro ao carregar as categorias.");
      setIsError(true);
      setTimeout(() => setMessage(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Carrega as categorias apenas uma vez
  useEffect(() => {
    loadCategories();
  }, []);

  // Exclusão de categoria
  const handleConfirmDelete = async (id: string) => {
    try {
      const api = new CategoriaApi(apiConfig);
      await api.deleteCategory(id);
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
      setMessage("Categoria excluída com sucesso!");
      setIsError(false);
    } catch (err: unknown) {
      setMessage(
        err instanceof AxiosError
          ? err.response!.data.message
          : "Erro ao excluir categoria.",
      );
      setIsError(true);
    } finally {
      setShowDeleteModal(false);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <>
      <NavBar />
      <main className="min-h-screen flex flex-col items-center p-4">
        <section className="mt-10 mb-6 w-full max-w-4xl">
          <h1 className="text-3xl font-semibold mb-4 dark:text-gray-200">
            Categorias de Transação
          </h1>

          <div className="overflow-x-auto w-full bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <table className="min-w-full">
              <thead className="bg-gray-100 dark:bg-gray-700 sticky top-0 rounded-xl">
                <tr>
                  {["Nome", "Tipo", "Cor", "Ações"].map((header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-600 rounded-xl">
                {categories.map((cat, index) => (
                  <tr
                    key={`${cat.id ?? "no-id"}-${index}`}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                      {cat.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-200">
                      {cat.type}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {/* Mostrando a cor como um círculo */}
                      <div
                        className="w-5 h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: cat.color || "#FFFFFF" }}
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/category/edit/${cat.id}`)}
                          className="text-blue-600 hover:cursor-pointer hover:text-white hover:bg-blue-600 rounded-md p-1 duration-200 hover:scale-105"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          className="text-red-600 hover:cursor-pointer hover:text-white hover:bg-red-600 rounded-md p-1 duration-200 hover:scale-105"
                          onClick={() => {
                            setCategoryIdToDelete(cat.id!);
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

            {isLoading && (
              <div className="py-6 flex items-center justify-center text-gray-500">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 dark:border-gray-300"></div>
              </div>
            )}
          </div>
        </section>

        {/* Modal de exclusão */}
        {showDeleteModal && categoryIdToDelete && (
          <ModalConfirmDeleteTransaction
            onCancel={() => setShowDeleteModal(false)}
            onConfirm={() => handleConfirmDelete(categoryIdToDelete)}
          />
        )}

        {/* Mensagens de feedback */}
        {message && <BoxMessage message={message} error={isError} />}

        <a
          href="/category/add"
          className="fixed bottom-10 right-10 bg-purple-600 px-5 py-3 rounded-2xl text-white flex flex-row items-center hover:transform hover:scale-105 duration-300 hover:cursor-pointer"
        >
          <PlusCircle className="w-5 h-5 lg:mr-2" />
          <p className="not-lg:hidden">Adicionar Categoria</p>
        </a>
      </main>
      <Footer />
    </>
  );
}
