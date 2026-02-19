import { useRef, useState } from "react";
import { TransacaoApi, type TransactionResponseDTO } from "../api";
import { apiConfig } from "../config/api";

export function useTransactions() {
  const transactionApi = new TransacaoApi(apiConfig);

  const [transactions, setTransactions] = useState<TransactionResponseDTO[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageRef = useRef(0);

  const fetchTransactions = async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const response = await transactionApi.getAllPageSortingByDate({
        page: pageRef.current,
        size: 20,
        sort: ["date,asc"],
      });

      const pageData = response.data;

      setTransactions((prev) => [...prev, ...(pageData.transactions ?? [])]);

      if (pageData.last) {
        setHasMore(false);
      } else {
        pageRef.current += 1;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    transactions,
    isLoading,
    hasMore,
    fetchTransactions,
    setTransactions,
  };
}
