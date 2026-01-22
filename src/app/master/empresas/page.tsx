"use client";

import { StatsGrid } from "@/src/components/dashboard";
import CompaniesTable from "@/src/components/tables/CompaniesTable";
import { Button } from "@/src/components/ui/Button";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Company } from "@/src/types/company";
import { getCols } from "@/src/utils/gridUtils";
import {
  Building,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statsCards = [
    {
      icon: Building,
      number: 150,
      label: "Total de Empresas",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: CheckCircle,
      number: 145,
      label: "Empresas Ativas",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: XCircle,
      number: 5,
      label: "Empresas Inativas",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
  ];

  const companies = [
    {
      id: 1,
      name: "Solucoes LTDA",
      cnpj: "12.345.678/0001-99",
      email: "adm@solucoes.com",
      phone: "(92) 98456-7654",
      employees: 92,
      status: "ativo",
    },
    {
      id: 2,
      name: "Tech Amazônia SA",
      cnpj: "23.456.789/0001-10",
      email: "contato@techamazonia.com",
      phone: "(92) 99123-4567",
      employees: 150,
      status: "ativo",
    },
    {
      id: 3,
      name: "Inova Digital ME",
      cnpj: "34.567.890/0001-21",
      email: "suporte@inovadigital.com",
      phone: "(92) 98876-1122",
      employees: 18,
      status: "ativo",
    },
    {
      id: 4,
      name: "Norte Sistemas LTDA",
      cnpj: "45.678.901/0001-32",
      email: "financeiro@nortesistemas.com",
      phone: "(92) 98234-9988",
      employees: 64,
      status: "inativo",
    },
    {
      id: 5,
      name: "Amazon Cloud Services",
      cnpj: "56.789.012/0001-43",
      email: "hello@amazoncloud.com",
      phone: "(92) 99444-3322",
      employees: 210,
      status: "ativo",
    },
    {
      id: 6,
      name: "ByteCode Solutions",
      cnpj: "67.890.123/0001-54",
      email: "admin@bytecodesolutions.com",
      phone: "(92) 99001-7788",
      employees: 37,
      status: "ativo",
    },
  ];

  const optionsStatus = [
    { label: "Todos os status", value: "all" },
    { label: "Ativos", value: "ativos" },
    { label: "Inativos", value: "inativos" },
  ];

  const filteredCompanies = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    // mapeia o select para o tipo real do campo status
    const statusFilter: Company["status"] | null =
      selectedStatus === "ativos"
        ? "ativo"
        : selectedStatus === "inativos"
        ? "inativo"
        : null; // "" ou "all" => sem filtro

    return companies.filter((company) => {
      const matchesSearch =
        !term ||
        [company.name, company.cnpj, company.email].some((field) =>
          field.toLowerCase().includes(term)
        );

      const matchesStatus = !statusFilter || company.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, selectedStatus]);

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
          placeholder="Buscar por nome, email ou CNPJ..."
          icon={Search}
        />

        {/* Filtro Status */}
        <SearchableSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />

        {/* Botão Adicionar */}
        {/* <Button
          label="Adicionar Empresa"
          icon={Plus}
          className="w-full sm:w-auto px-4 md:px-6
                    py-2 bg-linear-to-r from-green-500 to-emerald-500
                    text-white rounded-xl hover:from-green-600 hover:to-emerald-600
                    transition-all duration-300 font-semibold hover:text-white
                    text-sm shadow-md hover:shadow-lg"
        /> */}
      </div>

      {/* Tabela de colaboradores */}
      <CompaniesTable companies={filteredCompanies} />
    </div>
  );
}
