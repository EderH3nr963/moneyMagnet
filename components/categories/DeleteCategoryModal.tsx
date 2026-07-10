"use client";

import type { Category } from "@/types/api";

interface DeleteCategoryModalProps {
  category: Category | null;
  saving: boolean;
  onCancel: () => void;
  onConfirm: (categoryId: string) => Promise<void>;
}

export default function DeleteCategoryModal({
  category,
  saving,
  onCancel,
  onConfirm,
}: DeleteCategoryModalProps) {
  if (!category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6">
      <div className="max-h-[calc(100vh-3rem)] w-full max-w-md overflow-y-auto rounded-xl border border-border bg-card p-5 shadow-xl">
        <h3 className="text-lg font-semibold">Deletar categoria?</h3>
        <p className="mt-2 break-words text-sm text-muted-foreground">
          A categoria {category.name} sera removida. Essa acao nao pode ser desfeita.
        </p>

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
            type="button"
            onClick={() => void onConfirm(category.id)}
            disabled={saving}
            className="rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-600 disabled:opacity-50"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}
