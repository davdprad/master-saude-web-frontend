"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, Users, UserCheck, UserX, Filter } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import EmployeesTable from "@/src/components/tables/EmployeesTable";
import { getCols } from "@/src/utils/gridUtils";
import { getEmployees } from "@/src/services/employee";
import { NewEmployee } from "@/src/types/employee";
import { SelectOption } from "@/src/types/optionsSelect";
import { getCompanies } from "@/src/services/company";
import { mapCompaniesToOptions } from "@/src/utils/mapToOptions";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companyQuery, setCompanyQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [employees, setEmployees] = useState<NewEmployee[]>([]);
  const [loading, setLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [totalAtivos, setTotalAtivos] = useState(0);
  const [totalInativos, setTotalInativos] = useState(0);

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

        const data = await getEmployees({
          page: currentPage,
          limit: itemsPerPage,
          nome: searchTerm || null,
          empresa: selectedCompany || null,
          status: selectedStatus ? (selectedStatus === "Ativo" ? 1 : 0) : null,
        });

        const mapped: NewEmployee[] = data.employees.map((e) => ({
          NidFuncionario: String(e.NidFuncionario),
          NomFuncionario: e.NomFuncionario,
          DesCPF: e.DesCPF,
          DesSetor: e.DesSetor,
          DesFuncao: e.DesFuncao,
          DesEmpresa: e.DesEmpresa,
          NidEmpresa: String(e.NidEmpresa),
          FlgAtivo: String(e.FlgAtivo),
          status: e.status,
          DatASO: e.DatASO,
        }));

        setEmployees(mapped);
        setTotal(data.total);
        setTotalAtivos(data.total_ativos);
        setTotalInativos(data.total_inativos);
      } catch (err) {
        console.error("Erro ao buscar colaboradores:", err);
        setEmployees([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [searchTerm, selectedCompany, selectedStatus, currentPage]);

  // Options Company
  const [optionsCompany, setOptionsCompany] = useState<SelectOption[]>([
    { label: "Todas as empresas", value: "" },
  ]);

  // Options Company
  useEffect(() => {
    async function loadCompanies() {
      const data = await getCompanies({
        empresa: companyQuery || selectedCompany || null,
      });
      const options = mapCompaniesToOptions(data.companies);
      setOptionsCompany(options);
    }

    loadCompanies();
  }, [companyQuery, selectedCompany]);

  // Options Status
  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Ativos", value: "Ativo" },
    { label: "Inativos", value: "Inativo" },
  ];

  // Stats Cards
  const statsCards = [
    {
      icon: Users,
      number: total,
      label: "Total de Colaboradores",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: totalAtivos,
      label: "Colaboradores Ativos",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: totalInativos,
      label: "Colaboradores Inativos",
      color: "text-red-500",
      bgLight: "bg-red-50",
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
        />

        {/* Filtro Empresa */}
        <SearchableSelect
          value={selectedCompany}
          onChange={setSelectedCompany}
          setQuery={setCompanyQuery}
          options={optionsCompany}
          placeholder="Empresas"
          icon={Filter}
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

      <div
        className={`transition-all duration-300 ease-out ${
          loading
            ? "opacity-50 blur-[1px] pointer-events-none"
            : "opacity-100 blur-0"
        }`}
      >
        <EmployeesTable
          employees={employees}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {loading && (
        <div className="mt-2 text-sm text-gray-500 animate-pulse">
          Carregando colaboradores...
        </div>
      )}
    </div>
  );
}
