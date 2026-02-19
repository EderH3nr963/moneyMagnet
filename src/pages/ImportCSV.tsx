import React, { useState } from "react";
import { Footer, NavBar } from "../components";
import { TransacaoApi } from "../api";
import { apiConfig } from "../config/api";
import { AxiosError } from "axios";

export default function ImportCSV() {
  const [error, setError] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const transactionApi = new TransacaoApi(apiConfig);
      const response = await transactionApi.importXlsx(file);

      if (response.data.errors!.length > 0) {
        setError(response.data.errors!);
        throw new Error();
      }

      setSuccess(
        `Arquivo enviado com sucesso! ${response.data.validTransaction ?? ""} transações processadas.`,
      );

      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    } catch (err) {
      const message = err instanceof AxiosError && err.response!.data.message;

      if (message) setError([message]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />

      <main className="p-6 min-h-screen w-full flex justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <section className="max-w-4xl w-full">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-purple-100 dark:bg-purple-700 p-3 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  Importar Transações
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Envie um arquivo Excel (.xlsx ou .xls)
                </p>
              </div>
            </div>

            {/* Upload */}
            <div className="border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-xl p-8 text-center bg-purple-50 dark:bg-purple-900/30 hover:bg-purple-100 dark:hover:bg-purple-800/40 transition-colors">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-purple-100 dark:bg-purple-700 p-4 rounded-full">
                  <svg
                    className="w-8 h-8 text-purple-600 dark:text-purple-100"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-2">
                    {isLoading
                      ? "Enviando arquivo..."
                      : "Selecione sua planilha"}
                  </h3>

                  <p className="text-purple-700 dark:text-purple-300 mb-4">
                    Apenas arquivos .xlsx ou .xls são permitidos
                  </p>

                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                    disabled={isLoading}
                    className="block w-full text-sm text-purple-600 dark:text-purple-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 file:cursor-pointer cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {isLoading && (
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-300">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    <span>Processando...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Feedback */}
            {error && (
              <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-700 rounded-lg">
                {error.map((msg, i) => (
                  <p
                    key={i}
                    className="text-red-800 dark:text-red-200 text-sm mb-1"
                  >
                    {msg}
                  </p>
                ))}
              </div>
            )}

            {success && (
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-700 rounded-lg">
                <p className="text-green-800 dark:text-green-100 text-sm">
                  {success}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
