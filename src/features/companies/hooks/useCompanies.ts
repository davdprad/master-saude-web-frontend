"use client";

import { useEffect, useMemo, useState } from "react";
import { getCompanies } from "@/src/services/company";
import { NewCompany } from "@/src/types/company";
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
  const [companies, setCompanies] = useState<NewCompany[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  }, [total]);

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
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar empresas:", err);
        setCompanies([]);
        setTotal(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedStatus, currentPage]);

  const totalAtivas = useMemo(
    () => companies.filter((c) => c.FlgSituacao === "1").length,
    [companies],
  );

  const totalInativas = useMemo(
    () => companies.filter((c) => c.FlgSituacao === "0").length,
    [companies],
  );

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
