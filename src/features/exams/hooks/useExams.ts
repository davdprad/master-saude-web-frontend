"use client";

import { useEffect, useMemo, useState } from "react";
import { getExams } from "@/src/services/exams";
import { Exam } from "@/src/types/exam";
import { mapExamsToUI } from "../mappers";
import { ITEMS_PER_PAGE } from "../constants";

type UseExamsParams = {
  nidFuncionario: string;
};

type ExamsSnapshot = {
  allExams: Exam[];
  total: number;
};

type ExamsCacheEntry = {
  timestamp: number;
  data: ExamsSnapshot;
};

const EXAMS_CACHE_TTL_MS = 60_000;
const examsCache = new Map<string, ExamsCacheEntry>();

export function useExams({ nidFuncionario }: UseExamsParams) {
  const [allExams, setAllExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);

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
      const cacheKey = nidFuncionario;
      const cachedEntry = examsCache.get(cacheKey);
      const hasCachedData = Boolean(cachedEntry);
      const isFreshCache =
        hasCachedData &&
        Date.now() - (cachedEntry?.timestamp ?? 0) < EXAMS_CACHE_TTL_MS;

      if (cachedEntry?.data) {
        setAllExams(cachedEntry.data.allExams);
        setTotal(cachedEntry.data.total);
      }

      if (isFreshCache) {
        setLoading(false);
        return;
      }

      try {
        if (!hasCachedData) {
          setLoading(true);
        }

        const data = await getExams({
          nidFuncionario: Number(nidFuncionario),
        });

        if (cancelled) return;

        const mappedData: ExamsSnapshot = {
          allExams: mapExamsToUI(data),
          total: data.length,
        };

        setAllExams(mappedData.allExams);
        setTotal(mappedData.total);

        examsCache.set(cacheKey, {
          timestamp: Date.now(),
          data: mappedData,
        });
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar exames:", err);

        if (!hasCachedData) {
          setAllExams([]);
          setTotal(0);
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
  }, [nidFuncionario]);

  const exams = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return allExams.slice(start, end);
  }, [allExams, currentPage]);

  return {
    exams,
    loading,
    total,
    currentPage,
    totalPages,
    setCurrentPage,
  };
}
