"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2, LoaderCircle, MailCheck } from "lucide-react";

import { AuthCard } from "@/components/auth/AuthCard";
import { ApiError, confirmEmailChange } from "@/lib/api";

export default function ConfirmEmailPage() {
  const [token] = useState(() => getConfirmationToken());
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Link inválido ou expirado. Solicite uma nova alteração de e-mail.");
      return;
    }

    setLoading(true);

    try {
      await confirmEmailChange({ token, password });
      setSuccess(true);
      setPassword("");
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Não foi possível confirmar a alteração de e-mail.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Confirmar novo e-mail"
      subtitle="Confirme sua identidade para concluir a alteração"
      footer={
        <Link className="font-semibold text-primary" href="/auth/login">
          Ir para o login
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium" htmlFor="password">
            Senha atual
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={loading || success}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            placeholder="Digite sua senha"
          />
        </div>

        {success && (
          <p
            role="status"
            className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            <CheckCircle2 size={18} />
            E-mail alterado com sucesso. Entre novamente com o novo endereço.
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
          disabled={loading || success}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 font-semibold text-primary-foreground transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={20} />
          ) : (
            <MailCheck size={20} />
          )}
          {loading ? "Confirmando..." : "Confirmar alteração"}
        </button>
      </form>
    </AuthCard>
  );
}

function getConfirmationToken() {
  if (typeof window === "undefined") return "";

  const hashToken = new URLSearchParams(window.location.hash.slice(1)).get(
    "token",
  );
  const queryToken = new URLSearchParams(window.location.search).get("token");

  return hashToken || queryToken || "";
}
