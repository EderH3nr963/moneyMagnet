"use client";

import type { FormEvent } from "react";
import { Save, Shield } from "lucide-react";

import SettingsSectionTitle from "./SettingsSectionTitle";

interface SecuritySettingsCardProps {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  saving: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export default function SecuritySettingsCard({
  currentPassword,
  password,
  confirmPassword,
  saving,
  onCurrentPasswordChange,
  onPasswordChange,
  onConfirmPasswordChange,
  onSubmit,
}: SecuritySettingsCardProps) {
  return (
    <section className="rounded-xl border border-border bg-card p-5">
      <SettingsSectionTitle
        icon={Shield}
        title="Seguranca"
        description="Troque sua senha de acesso."
      />
      <form onSubmit={onSubmit} className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm">
          Senha atual
          <input
            value={currentPassword}
            onChange={(event) => onCurrentPasswordChange(event.target.value)}
            type="password"
            autoComplete="current-password"
            required
            disabled={saving}
            className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Nova senha
          <input
            value={password}
            onChange={(event) => onPasswordChange(event.target.value)}
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={17}
            required
            disabled={saving}
            className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary disabled:opacity-60"
          />
        </label>
        <label className="grid gap-2 text-sm">
          Confirmar nova senha
          <input
            value={confirmPassword}
            onChange={(event) => onConfirmPasswordChange(event.target.value)}
            type="password"
            autoComplete="new-password"
            minLength={8}
            maxLength={17}
            required
            disabled={saving}
            className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary disabled:opacity-60"
          />
        </label>
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Salvando..." : "Alterar senha"}
          </button>
        </div>
      </form>
    </section>
  );
}
