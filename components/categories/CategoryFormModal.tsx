"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { X } from "lucide-react";

import type { CategoryPayload } from "@/lib/api";
import type { Category } from "@/types/api";

interface CategoryFormModalProps {
  title: string;
  description: string;
  submitLabel: string;
  category?: Category;
  saving: boolean;
  onCancel: () => void;
  onSubmit: (category: CategoryPayload) => Promise<void>;
}

export default function CategoryFormModal({
  title,
  description,
  submitLabel,
  category,
  saving,
  onCancel,
  onSubmit,
}: CategoryFormModalProps) {
  const [name, setName] = useState(category?.name || "");
  const [icon, setIcon] = useState(category?.icon || "");
  const [color, setColor] = useState(category?.color || "#10b981");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onSubmit({
      name: name.trim(),
      icon: icon.trim() || null,
      color,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <form
        onSubmit={submit}
        className="max-h-[calc(100vh-3rem)] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-card p-5 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg p-2 text-muted-foreground transition hover:bg-muted hover:text-foreground disabled:opacity-50"
            aria-label="Fechar"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-sm">
            Nome
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              maxLength={100}
              required
              className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm">
            Icone
            <input
              value={icon}
              onChange={(event) => setIcon(event.target.value)}
              maxLength={50}
              className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary"
            />
          </label>

          <label className="grid gap-2 text-sm">
            Cor
            <input
              value={color}
              onChange={(event) => setColor(event.target.value)}
              pattern="^#(?:[A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$"
              required
              className="h-10 rounded-lg border border-border bg-background px-3 outline-none transition focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={saving}
            className="rounded-lg border border-border px-4 py-2 text-sm transition hover:bg-muted disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
