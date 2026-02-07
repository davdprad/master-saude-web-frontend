"use client";

import { useState } from "react";
import { Search, Users, UserCheck, UserX, Filter } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import EmployeesTable from "@/src/components/tables/EmployeesTable";
import { getCols } from "@/src/utils/gridUtils";
import { STATUS_OPTIONS } from "@/src/features/employees/constants";
import { useCompanyEmployees } from "./hooks/useCompanyEmployees";

export default function EmployeesCompanyClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const {
    employees,
    loading,
    total,
    totalAtivos,
    totalInativos,
    currentPage,
    totalPages,
    setCurrentPage,
  } = useCompanyEmployees({ searchTerm, selectedStatus });

  const statsCards = [
    {
      icon: Users,
      number: total,
      label: "Total de Colaboradores",
      color: "blue",
    },
    {
      icon: UserCheck,
      number: totalAtivos,
      label: "Colaboradores Ativos",
      color: "green",
    },
    {
      icon: UserX,
      number: totalInativos,
      label: "Colaboradores Inativos",
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
        <EmployeesTable
          role="convenio"
          employees={employees}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
