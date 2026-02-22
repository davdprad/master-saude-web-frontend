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

type CompaniesSnapshot = {
  companies: Company[];
  total: number;
  totalAtivas: number;
  totalInativas: number;
};

type CompaniesCacheEntry = {
  timestamp: number;
  data: CompaniesSnapshot;
};

const COMPANIES_CACHE_TTL_MS = 60_000;
const companiesCache = new Map<string, CompaniesCacheEntry>();

function buildCacheKey({
  searchTerm,
  selectedStatus,
  currentPage,
}: {
  searchTerm: string;
  selectedStatus: string;
  currentPage: number;
}) {
  return JSON.stringify({
    searchTerm,
    selectedStatus,
    currentPage,
  });
}

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
      const cacheKey = buildCacheKey({
        searchTerm,
        selectedStatus,
        currentPage,
      });

      const cachedEntry = companiesCache.get(cacheKey);
      const hasCachedData = Boolean(cachedEntry);
      const isFreshCache =
        hasCachedData &&
        Date.now() - (cachedEntry?.timestamp ?? 0) < COMPANIES_CACHE_TTL_MS;

      if (cachedEntry?.data) {
        setCompanies(cachedEntry.data.companies);
        setTotal(cachedEntry.data.total);
        setTotalAtivas(cachedEntry.data.totalAtivas);
        setTotalInativas(cachedEntry.data.totalInativas);
      }

      if (isFreshCache) {
        setLoading(false);
        return;
      }

      try {
        if (!hasCachedData) {
          setLoading(true);
        }

        const data = await getCompanies({
          page: currentPage,
          limit: ITEMS_PER_PAGE,
          empresa: searchTerm || null,
          status: mapStatusToApi(selectedStatus),
        });

        if (cancelled) return;

        const mappedData: CompaniesSnapshot = {
          companies: mapCompaniesToUI(data.companies),
          total: data.total,
          totalAtivas: data.total_ativas ?? 0,
          totalInativas: data.total_inativas ?? 0,
        };

        setCompanies(mappedData.companies);
        setTotal(mappedData.total);
        setTotalAtivas(mappedData.totalAtivas);
        setTotalInativas(mappedData.totalInativas);

        companiesCache.set(cacheKey, {
          timestamp: Date.now(),
          data: mappedData,
        });
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar empresas:", err);

        if (!hasCachedData) {
          setCompanies([]);
          setTotal(0);
          setTotalAtivas(0);
          setTotalInativas(0);
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
