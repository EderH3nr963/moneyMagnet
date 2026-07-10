"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ApiError,
  clearSession,
  createCategory,
  deleteCategory,
  getCategories,
  getToken,
  updateCategory,
  type CategoryPayload,
} from "@/lib/api";
import type { Category } from "@/types/api";

export function useCategories() {
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const load = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError("");

    try {
      setCategories(await getCategories(signal));
    } catch (requestError) {
      if (
        requestError instanceof DOMException &&
        requestError.name === "AbortError"
      ) {
        return;
      }

      if (requestError instanceof ApiError && requestError.status === 401) {
        clearSession();
        router.replace("/auth");
        return;
      }

      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel carregar as categorias.",
      );
    } finally {
      if (!signal?.aborted) setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();
    const loadCategories = async () => {
      await Promise.resolve();
      await load(controller.signal);
    };

    void loadCategories();

    return () => controller.abort();
  }, [load, router]);

  const filteredCategories = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return categories;

    return categories.filter((category) =>
      category.name.toLowerCase().includes(term),
    );
  }, [categories, search]);

  async function saveCategory(category: Category) {
    setLoading(true);
    setError("");

    try {
      await updateCategory(category.id, {
        name: category.name,
        color: category.color,
        icon: category.icon,
      });
      await load();
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel atualizar a categoria.",
      );
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  async function addCategory(category: CategoryPayload) {
    setLoading(true);
    setError("");

    try {
      await createCategory(category);
      await load();
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel criar a categoria.",
      );
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  async function removeCategory(categoryId: string) {
    setLoading(true);
    setError("");

    try {
      await deleteCategory(categoryId);
      await load();
    } catch (requestError) {
      setError(
        requestError instanceof ApiError
          ? requestError.message
          : "Nao foi possivel deletar a categoria.",
      );
      throw requestError;
    } finally {
      setLoading(false);
    }
  }

  return {
    categories: filteredCategories,
    totalCategories: categories.length,
    loading,
    error,
    search,
    setSearch,
    addCategory,
    saveCategory,
    removeCategory,
    refresh: () => load(),
  };
}
