"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import InputSearch from "@/src/components/ui/InputSearch";
import ExamsTable from "@/src/components/tables/ExamsTable";
import { Button } from "@/src/components/ui/Button";
import { useMyExams } from "./hooks/useMyExams";

export default function ExamsClientIndividual() {
  const [searchTerm, setSearchTerm] = useState("");

  const { exams, loading, total, currentPage, totalPages, setCurrentPage } =
    useMyExams();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* <Button
          icon={ArrowLeft}
          label="Voltar"
          onClick={() => router.back()}
          className="w-fit bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
        /> */}
      </div>

      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4">
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por exame..."
          icon={Search}
        />
      </div>

      {/* Conteúdo */}
      <div
        className={`transition-all duration-300 ease-out ${
          loading
            ? "opacity-50 blur-[1px] pointer-events-none"
            : "opacity-100 blur-0"
        }`}
      >
        {!loading && total === 0 ? (
          <div className="rounded-xl ring-1 ring-gray-200 bg-white p-4 text-md text-gray-600">
            Nenhum exame encontrado para este colaborador.
          </div>
        ) : (
          <ExamsTable
            exams={exams}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
}
