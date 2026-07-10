"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import CategoriesHeader from "@/components/categories/CategoriesHeader";
import CategoriesList from "@/components/categories/CategoriesList";
import { useSidebar } from "@/context/SidebarContext";
import { useCategories } from "@/hooks/useCategories";

export default function CategoriesPage() {
  const { setOpen } = useSidebar();
  const [creatingCategory, setCreatingCategory] = useState(false);
  const {
    categories,
    totalCategories,
    loading,
    error,
    search,
    setSearch,
    addCategory,
    saveCategory,
    removeCategory,
    refresh,
  } = useCategories();

  return (
    <main className="w-full max-w-full overflow-x-hidden">
      <CategoriesHeader
        totalCategories={totalCategories}
        loading={loading}
        onOpenMenu={() => setOpen(true)}
        onRefresh={refresh}
      />

      {error && (
        <div
          role="alert"
          className="mx-4 mt-4 rounded-xl border border-red-500/25 bg-red-500/10 px-4 py-3 text-sm text-red-400"
        >
          {error}
        </div>
      )}

      <CategoriesList
        categories={categories}
        search={search}
        loading={loading}
        creating={creatingCategory}
        onSearchChange={setSearch}
        onCreateClose={() => setCreatingCategory(false)}
        onCreateCategory={addCategory}
        onUpdateCategory={saveCategory}
        onDeleteCategory={removeCategory}
      />

      <button
        type="button"
        onClick={() => setCreatingCategory(true)}
        className="fixed bottom-4 right-4 z-30 inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-xl shadow-black/20 transition hover:-translate-y-0.5 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background sm:bottom-5 sm:right-5 sm:w-auto sm:px-5"
      >
        <Plus size={20} />
        <span className="hidden sm:inline">Nova categoria</span>
      </button>
    </main>
  );
}
