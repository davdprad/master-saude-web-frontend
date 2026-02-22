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

type EmployeesSnapshot = {
  employees: Employee[];
  total: number;
  totalAtivos: number;
  totalInativos: number;
};

type EmployeesCacheEntry = {
  timestamp: number;
  data: EmployeesSnapshot;
};

const EMPLOYEES_CACHE_TTL_MS = 60_000;
const employeesCache = new Map<string, EmployeesCacheEntry>();

function buildEmployeesCacheKey({
  searchTerm,
  selectedCompany,
  selectedStatus,
  currentPage,
}: {
  searchTerm: string;
  selectedCompany: string;
  selectedStatus: string;
  currentPage: number;
}) {
  return JSON.stringify({
    searchTerm,
    selectedCompany,
    selectedStatus,
    currentPage,
  });
}

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
      const cacheKey = buildEmployeesCacheKey({
        searchTerm,
        selectedCompany,
        selectedStatus,
        currentPage,
      });

      const cachedEntry = employeesCache.get(cacheKey);
      const hasCachedData = Boolean(cachedEntry);
      const isFreshCache =
        hasCachedData &&
        Date.now() - (cachedEntry?.timestamp ?? 0) < EMPLOYEES_CACHE_TTL_MS;

      if (cachedEntry?.data) {
        setEmployees(cachedEntry.data.employees);
        setTotal(cachedEntry.data.total);
        setTotalAtivos(cachedEntry.data.totalAtivos);
        setTotalInativos(cachedEntry.data.totalInativos);
      }

      if (isFreshCache) {
        setLoading(false);
        return;
      }

      try {
        if (!hasCachedData) {
          setLoading(true);
        }

        const data = await getEmployees({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          nome: searchTerm || null,
          empresa: selectedCompany || null,
          status: mapStatusToApi(selectedStatus),
        });

        if (cancelled) return;

        const mappedData: EmployeesSnapshot = {
          employees: mapEmployeesToUI(data.employees),
          total: data.total,
          totalAtivos: data.total_ativos,
          totalInativos: data.total_inativos,
        };

        setEmployees(mappedData.employees);
        setTotal(mappedData.total);
        setTotalAtivos(mappedData.totalAtivos);
        setTotalInativos(mappedData.totalInativos);

        employeesCache.set(cacheKey, {
          timestamp: Date.now(),
          data: mappedData,
        });
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar colaboradores:", err);

        if (!hasCachedData) {
          setEmployees([]);
          setTotal(0);
          setTotalAtivos(0);
          setTotalInativos(0);
        }
      } finally {
        if (!cancelled && !hasCachedData) {
          setLoading(false);
        }
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
