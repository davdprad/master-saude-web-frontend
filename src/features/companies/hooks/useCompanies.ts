"use client";

import { useEffect, useState } from "react";
import { getCompanies } from "@/src/services/company";
import { Company } from "@/src/types/company";
import { ITEMS_PER_PAGE } from "@/src/features/companies/constants";
import {
  mapCompaniesToUI,
  mapStatusToApi,
} from "@/src/features/companies/mappers";

type UseCompaniesParams = {
  searchTerm: string;
  selectedStatus: string;
};

export function useCompanies({
  searchTerm,
  selectedStatus,
}: UseCompaniesParams) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [total, setTotal] = useState(0);
  const [totalAtivas, setTotalAtivas] = useState(0);
  const [totalInativas, setTotalInativas] = useState(0);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const data = await getCompanies({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          empresa: searchTerm || null,
          status: mapStatusToApi(selectedStatus),
        });

        if (cancelled) return;

        setCompanies(mapCompaniesToUI(data.companies));
        setTotal(data.total);
        setTotalAtivas(data.total_ativas ?? 0);
        setTotalInativas(data.total_inativas ?? 0);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar empresas:", err);
        setCompanies([]);
        setTotal(0);
        setTotalAtivas(0);
        setTotalInativas(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedStatus, currentPage]);

  return {
    companies,
    total,
    totalAtivas,
    totalInativas,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
