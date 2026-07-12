"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle, LockKeyhole } from "lucide-react";

import { ApiError, resetPassword } from "@/lib/api";
import { AuthCard } from "@/components/auth/AuthCard";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token] = useState(() => getResetToken());
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Link invalido ou expirado. Solicite um novo link.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais.");
      return;
    }

    setLoading(true);

    try {
      await resetPassword({ token, password, confirmPassword });
      setSuccess(true);
      window.setTimeout(() => router.replace("/auth/login"), 1800);
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel redefinir sua senha.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard
      title="Nova senha"
      subtitle="Defina uma senha segura para voltar"
      footer={
        <Link className="font-semibold text-primary" href="/auth/login">
          Voltar para login
        </Link>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm font-medium" htmlFor="password">
            Nova senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={17}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="8 a 17 caracteres"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-sm font-medium"
            htmlFor="confirmPassword"
          >
            Confirmar nova senha
          </label>
          <input
            id="confirmPassword"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            maxLength={17}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Repita a nova senha"
          />
        </div>

        <p className="text-xs leading-relaxed text-muted-foreground">
          A senha precisa ter maiuscula, minuscula, numero e caractere especial.
        </p>

        {success && (
          <p
            role="status"
            className="flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-sm text-primary"
          >
            <CheckCircle2 size={18} />
            Senha alterada. Redirecionando...
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
            <LockKeyhole size={20} />
          )}
          {loading ? "Alterando..." : "Alterar senha"}
        </button>
      </form>
    </AuthCard>
  );
}

function getResetToken() {
  if (typeof window === "undefined") return "";

  const hashToken = new URLSearchParams(window.location.hash.slice(1)).get(
    "token",
  );
  const queryToken = new URLSearchParams(window.location.search).get("token");

  return hashToken || queryToken || "";
}
