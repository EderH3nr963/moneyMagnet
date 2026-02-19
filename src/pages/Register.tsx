import { useState } from "react";
import { useNavigate } from "react-router";
import { AutorizacaoApi } from "../api";
import { apiConfig } from "../config/api";
import { useAuth } from "../context";
import { BoxMessage } from "../components";
import { AxiosError } from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });
  const [message, setMessage] = useState<string | null>();
  const [isError, setIsError] = useState<boolean>(true);
  const { signIn } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    try {
      setMessage(null);
      setLoading(true);

      const authApi = new AutorizacaoApi(apiConfig);

      const response = await authApi.usuarioRegister({
        email: form.email,
        username: form.name,
        password: form.password,
        confirmPassword: form.confirmPass,
      });
      if (
        !response.data.token ||
        !response.data.usuario ||
        !response.data.expiration
      ) {
        throw new Error("Resposta inválida da API");
      }

      signIn(
        response.data.usuario,
        response.data.token,
        response.data.expiration,
      );

      setIsError(false);
      setMessage("Cadastro criado!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error: unknown) {
      setMessage(
        error instanceof AxiosError
          ? error.response!.data.message
          : "Erro para registrar os dados.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-linear-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <section className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-gray-100 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
        <div className="px-6 pt-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
            Criar conta
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Comece a organizar seu negócio com o MoneyMagnet.
          </p>
        </div>

        <form
          className="px-6 pb-6 space-y-4"
          onSubmit={(e) => e.preventDefault()}
        >
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
              required
              placeholder="Seu nome"
              className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 
                         focus:border-purple-500 focus:ring-purple-500 outline-0 border-b-2 py-2 duration-200"
              autoComplete="name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="voce@exemplo.com"
              className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 
                         focus:border-purple-500 focus:ring-purple-500 outline-0 border-b-2 py-2 duration-200"
              autoComplete="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 
                           focus:border-purple-500 focus:ring-purple-500 outline-0 border-b-2 py-2 duration-200"
                autoComplete="new-password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Confirmar senha
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="mt-1 w-full border-gray-300 dark:border-gray-700 dark:bg-transparent dark:text-gray-100 
                           focus:border-purple-500 focus:ring-purple-500 outline-0 border-b-2 py-2 duration-200"
                autoComplete="new-password"
                onChange={(e) =>
                  setForm({ ...form, confirmPass: e.target.value })
                }
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={() => !loading && handleSubmit()}
            className={`w-full ${
              !loading
                ? "bg-purple-600 hover:bg-purple-700 text-white"
                : "bg-gray-600 text-gray-200 cursor-not-allowed"
            } font-medium py-3 rounded-lg transition duration-200 hover:scale-[1.02] hover:cursor-pointer`}
          >
            {loading ? "Carregando..." : "Criar conta"}
          </button>

          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            Já tem conta?{" "}
            <a href="/login" className="text-purple-600 hover:underline">
              Entrar
            </a>
          </p>
        </form>
      </section>

      {message && <BoxMessage error={isError} message={message} />}
    </main>
  );
}
