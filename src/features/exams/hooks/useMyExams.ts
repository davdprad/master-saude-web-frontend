"use client";

import { useEffect, useMemo, useState } from "react";
import { getMyExams } from "@/src/services/exams";
import { Exam } from "@/src/types/exam";
import { mapExamsToUI } from "../mappers";
import { ITEMS_PER_PAGE } from "../constants";

export function useMyExams() {
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
      try {
        setLoading(true);

        const data = await getMyExams();

        if (cancelled) return;

        setAllExams(mapExamsToUI(data));
        setTotal(data.length);
      } catch (err) {
        if (cancelled) return;
        console.error("Erro ao buscar exames:", err);
        setAllExams([]);
        setTotal(0);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

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
