"use client";

import { useState } from "react";
import { Building, CheckCircle, XCircle, Filter, Search } from "lucide-react";

import { StatsGrid } from "@/src/components/cards";
import CompaniesTable from "@/src/components/tables/CompaniesTable";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { getCols } from "@/src/utils/gridUtils";

import { STATUS_OPTIONS } from "@/src/features/companies/constants";
import { useCompanies } from "@/src/features/companies/hooks/useCompanies";

export default function CompaniesClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const {
    companies,
    total,
    totalAtivas,
    totalInativas,
    loading,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCompanies({ searchTerm, selectedStatus });

  const statsCards = [
    {
      icon: Building,
      number: total,
      label: "Total de Empresas",
      color: "blue",
    },
    {
      icon: CheckCircle,
      number: totalAtivas,
      label: "Empresas Ativas",
      color: "green",
    },
    {
      icon: XCircle,
      number: totalInativas,
      label: "Empresas Inativas",
      color: "red",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <StatsGrid stats={statsCards} cols={getCols(statsCards.length)} />

      <div className="flex flex-col lg:flex-row gap-4">
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nome..."
          icon={Search}
          debounceMs={500}
        />

        <SearchableSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={STATUS_OPTIONS}
          placeholder="Status"
          icon={Filter}
        />
      </div>

      <div
        className={`transition-all duration-300 ease-out ${
          loading
            ? "opacity-50 blur-[1px] pointer-events-none"
            : "opacity-100 blur-0"
        }`}
      >
        <CompaniesTable
          companies={companies}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
