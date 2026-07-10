"use client";

import { useEffect, useRef } from "react";
import { Pencil, Trash2 } from "lucide-react";

import type { Category } from "@/types/api";

export interface CategoryContextMenuState {
  category: Category;
  x: number;
  y: number;
}

interface CategoryContextMenuProps {
  menu: CategoryContextMenuState | null;
  onClose: () => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export default function CategoryContextMenu({
  menu,
  onClose,
  onEdit,
  onDelete,
}: CategoryContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menu) return;

    function closeOnOutsideClick(event: globalThis.MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        onClose();
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menu, onClose]);

  if (!menu) return null;

  const width = 176;
  const height = 96;
  const left = Math.min(menu.x, window.innerWidth - width - 12);
  const top = Math.min(menu.y, window.innerHeight - height - 12);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 w-44 rounded-lg border border-border bg-card p-1 shadow-xl"
      style={{ left: Math.max(12, left), top: Math.max(12, top) }}
    >
      <button
        type="button"
        onClick={() => onEdit(menu.category)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition hover:bg-muted"
      >
        <Pencil size={16} />
        Atualizar
      </button>
      <button
        type="button"
        onClick={() => onDelete(menu.category)}
        className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm text-red-400 transition hover:bg-red-500/10"
      >
        <Trash2 size={16} />
        Deletar
      </button>
    </div>
  );
}
