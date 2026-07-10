"use client";

import { useMemo, useState } from "react";
import type { MouseEvent } from "react";
import { Search, Tags } from "lucide-react";

import type { CategoryPayload } from "@/lib/api";
import type { Category } from "@/types/api";
import CategoryCard from "./CategoryCard";
import CategoryContextMenu from "./CategoryContextMenu";
import type { CategoryContextMenuState } from "./CategoryContextMenu";
import CategoryFormModal from "./CategoryFormModal";
import DeleteCategoryModal from "./DeleteCategoryModal";

interface CategoriesListProps {
  categories: Category[];
  search: string;
  loading: boolean;
  creating: boolean;
  onSearchChange: (value: string) => void;
  onCreateClose: () => void;
  onCreateCategory: (category: CategoryPayload) => Promise<void>;
  onUpdateCategory: (category: Category) => Promise<void>;
  onDeleteCategory: (categoryId: string) => Promise<void>;
}

export default function CategoriesList({
  categories,
  search,
  loading,
  creating,
  onSearchChange,
  onCreateClose,
  onCreateCategory,
  onUpdateCategory,
  onDeleteCategory,
}: CategoriesListProps) {
  const [contextMenu, setContextMenu] =
    useState<CategoryContextMenuState | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [saving, setSaving] = useState(false);

  const userCategories = useMemo(
    () => categories.filter((category) => !category.systemCategory),
    [categories],
  );
  const systemCategories = useMemo(
    () => categories.filter((category) => category.systemCategory),
    [categories],
  );

  function openContextMenu(
    event: MouseEvent<HTMLElement>,
    category: Category,
  ) {
    event.preventDefault();
    if (category.systemCategory) return;

    setContextMenu({ category, x: event.clientX, y: event.clientY });
  }

  async function createCategory(category: CategoryPayload) {
    setSaving(true);
    try {
      await onCreateCategory(category);
      onCreateClose();
    } finally {
      setSaving(false);
    }
  }

  async function updateCategory(category: CategoryPayload) {
    if (!editingCategory) return;

    setSaving(true);
    try {
      await onUpdateCategory({ ...editingCategory, ...category });
      setEditingCategory(null);
    } finally {
      setSaving(false);
    }
  }

  async function deleteCategory(categoryId: string) {
    setSaving(true);
    try {
      await onDeleteCategory(categoryId);
      setDeletingCategory(null);
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="m-3 min-w-0 rounded-xl border border-border bg-card sm:m-4 sm:rounded-2xl">
      <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-semibold">Categorias</h2>
          <p className="text-sm text-muted-foreground">
            {categories.length.toLocaleString("pt-BR")} resultado(s)
          </p>
        </div>
        <label className="relative w-full md:max-w-xs">
          <Search
            size={18}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar"
            className="h-10 w-full rounded-lg border border-border bg-background pl-10 pr-3 text-sm outline-none transition focus:border-primary"
          />
        </label>
      </div>

      {loading ? (
        <CategorySkeleton />
      ) : categories.length ? (
        <div className="space-y-6 p-3 sm:p-4">
          <CategorySection
            title="Minhas categorias"
            description="Categorias criadas por voce."
            categories={userCategories}
            emptyText="Nenhuma categoria criada por voce ainda."
            onContextMenu={openContextMenu}
          />
          <CategorySection
            title="Categorias padrao"
            description="Categorias do sistema usadas na classificacao automatica."
            categories={systemCategories}
            emptyText="Nenhuma categoria padrao encontrada."
            onContextMenu={openContextMenu}
          />
        </div>
      ) : (
        <EmptyCategories />
      )}

      <CategoryContextMenu
        menu={contextMenu}
        onClose={() => setContextMenu(null)}
        onEdit={(category) => {
          setEditingCategory(category);
          setContextMenu(null);
        }}
        onDelete={(category) => {
          setDeletingCategory(category);
          setContextMenu(null);
        }}
      />

      {creating && (
        <CategoryFormModal
          title="Criar categoria"
          description="Defina nome, icone e cor para sua nova categoria."
          submitLabel="Criar"
          saving={saving}
          onCancel={onCreateClose}
          onSubmit={createCategory}
        />
      )}

      {editingCategory && (
        <CategoryFormModal
          title="Atualizar categoria"
          description="Ajuste nome, icone e cor da categoria."
          submitLabel="Salvar"
          category={editingCategory}
          saving={saving}
          onCancel={() => setEditingCategory(null)}
          onSubmit={updateCategory}
        />
      )}

      <DeleteCategoryModal
        category={deletingCategory}
        saving={saving}
        onCancel={() => setDeletingCategory(null)}
        onConfirm={deleteCategory}
      />
    </section>
  );
}

interface CategorySectionProps {
  title: string;
  description: string;
  categories: Category[];
  emptyText: string;
  onContextMenu: (event: MouseEvent<HTMLElement>, category: Category) => void;
}

function CategorySection({
  title,
  description,
  categories,
  emptyText,
  onContextMenu,
}: CategorySectionProps) {
  return (
    <div>
      <div className="mb-3">
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {categories.length ? (
        <div className="grid gap-3 min-[460px]:grid-cols-2 sm:gap-4 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onContextMenu={onContextMenu}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-border p-5 text-sm text-muted-foreground">
          {emptyText}
        </div>
      )}
    </div>
  );
}

function CategorySkeleton() {
  return (
    <div className="grid gap-3 p-3 min-[460px]:grid-cols-2 sm:gap-4 sm:p-4 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="h-28 animate-pulse rounded-xl border border-border bg-muted/30"
        />
      ))}
    </div>
  );
}

function EmptyCategories() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-4 text-center">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Tags size={24} />
      </div>
      <h3 className="font-semibold">Nenhuma categoria encontrada</h3>
      <p className="mt-1 max-w-md text-sm text-muted-foreground">
        Suas categorias e as categorias padrao aparecem aqui.
      </p>
    </div>
  );
}
