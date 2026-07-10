"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LoaderCircle, MailCheck } from "lucide-react";

import { ApiError, forgotPassword } from "@/lib/api";
import { AuthCard } from "@/components/auth/AuthCard";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel enviar o e-mail.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Recuperar senha"
      subtitle="Receba um link seguro no seu e-mail"
      footer={
        <Link
          className="inline-flex items-center justify-center gap-2 font-semibold text-primary"
          href="/auth/login"
        >
          <ArrowLeft size={16} />
          Voltar para login
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="voce@exemplo.com"
          />
        </div>

        {success && (
          <p
            role="status"
            className="rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            Enviamos as instrucoes para o e-mail informado.
          </p>
        )}

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <MailCheck size={20} />
          )}
          {loading ? "Enviando..." : "Enviar link"}
        </button>
      </form>
    </AuthCard>
  );
}

