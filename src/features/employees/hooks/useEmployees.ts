"use client";

import { useEffect, useMemo, useState } from "react";
import { getEmployees } from "@/src/services/employee";
import { Employee } from "@/src/types/employee";
import { ITEMS_PER_PAGE } from "@/src/features/employees/constants";
import {
  mapEmployeesToUI,
  mapStatusToApi,
} from "@/src/features/employees/mappers";

type UseEmployeesParams = {
  searchTerm: string;
  selectedCompany: string;
  selectedStatus: string;
};

export function useEmployees({
  searchTerm,
  selectedCompany,
  selectedStatus,
}: UseEmployeesParams) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [totalAtivos, setTotalAtivos] = useState(0);
  const [totalInativos, setTotalInativos] = useState(0);

  // paginação
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / ITEMS_PER_PAGE));
  }, [total]);

  // mantém a página dentro do limite quando total muda
  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);

        const data = await getEmployees({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          nome: searchTerm || null,
          empresa: selectedCompany || null,
          status: mapStatusToApi(selectedStatus),
        });

        if (cancelled) return;

        setEmployees(mapEmployeesToUI(data.employees));
        setTotal(data.total);
        setTotalAtivos(data.total_ativos);
        setTotalInativos(data.total_inativos);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar colaboradores:", err);
        setEmployees([]);
        setTotal(0);
        setTotalAtivos(0);
        setTotalInativos(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [searchTerm, selectedCompany, selectedStatus, currentPage]);

  return {
    employees,
    loading,
    total,
    totalAtivos,
    totalInativos,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
