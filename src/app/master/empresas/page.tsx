"use client";

import { StatsGrid } from "@/src/components/cards";
import CompaniesTable from "@/src/components/tables/CompaniesTable";
import { Button } from "@/src/components/ui/Button";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { getCompanies } from "@/src/services/company";
import { Company, NewCompany } from "@/src/types/company";
import { getCols } from "@/src/utils/gridUtils";
import {
  Building,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function CompaniesPage() {
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Data
  const [companies, setCompanies] = useState<NewCompany[]>([]);
  const [total, setTotal] = useState(0);

  const [loading, setLoading] = useState(false);

  // Pages control
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(total / itemsPerPage));
  }, [total, itemsPerPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  // Employees List
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        const data = await getCompanies({
          page: currentPage,
          limit: itemsPerPage,
          empresa: searchTerm || null,
          status: selectedStatus ? (selectedStatus === "Ativo" ? 1 : 0) : null,
        });

        const mapped: NewCompany[] = data.companies.map((c) => ({
          NidEmpresa: String(c.NidEmpresa),
          DesEmpresa: c.DesEmpresa,
          GraRisco: String(c.GraRisco),
          NidCNAE1: String(c.NidCNAE1),
          FlgSituacao: String(c.FlgSituacao),
          DesEMail: c.DesEMail,
          DesTelefone1: c.DesTelefone1,
          DesTelefone2: c.DesTelefone2,
          total_funcionarios: String(c.total_funcionarios),
        }));

        setCompanies(mapped);
        setTotal(data.total);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
        setCompanies([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [searchTerm, selectedStatus, currentPage]);

  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Ativos", value: "Ativo" },
    { label: "Inativos", value: "Inativo" },
  ];

  const statsCards = [
    {
      icon: Building,
      number: total,
      label: "Total de Empresas",
      color: "blue",
    },
    {
      icon: CheckCircle,
      number: companies.filter((company) => company.FlgSituacao === "1").length,
      label: "Empresas Ativas",
      color: "green",
    },
    {
      icon: XCircle,
      number: companies.filter((company) => company.FlgSituacao === "0").length,
      label: "Empresas Inativas",
      color: "red",
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <StatsGrid stats={statsCards} cols={getCols(statsCards.length)} />

      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Busca */}
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nome..."
          icon={Search}
          debounceMs={500}
        />

        {/* Filtro Status */}
        <SearchableSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />
      </div>

      {/* Tabela de colaboradores */}
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
