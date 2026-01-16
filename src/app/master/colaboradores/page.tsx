"use client";

import { useState } from "react";
import { Search, Plus, Users, UserCheck, UserX, Filter } from "lucide-react";
import { StatsGrid } from "@/src/components/dashboard";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Button } from "@/src/components/ui/Button";
import EmployeesTable from "@/src/components/master_colaboradores/EmployeesTable";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statsCards = [
    {
      icon: Users,
      number: 150,
      label: "Total de Colaboradores",
      color: "blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: 145,
      label: "Colaboradores Ativos",
      color: "green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: 5,
      label: "Colaboradores Inativos",
      color: "red-500",
      bgLight: "bg-red-50",
    },
  ];

  const employees = [
    {
      id: 1,
      name: "Ana Cristina Souza",
      company: "Empresa Alfa",
      position: "Engenheira de Produção",
      admission: "20/03/2024",
      status: "ativo",
    },
    {
      id: 2,
      name: "João Paulo Mendes",
      company: "Empresa Alfa",
      position: "Técnico de Segurança",
      admission: "15/01/2024",
      status: "ativo",
    },
    {
      id: 3,
      name: "Fernanda Rocha Lima",
      company: "Empresa Beta",
      position: "Analista de RH",
      admission: "15/01/2024",
      status: "ativo",
    },
    {
      id: 4,
      name: "Fernanda Rochuino",
      company: "Empresa Beta",
      position: "Designer Gráfico",
      admission: "11/12/2023",
      status: "ativo",
    },
    {
      id: 5,
      name: "Carlos B Eduardo Brito",
      company: "Empresa Alfa",
      position: "Sprinter de Logística",
      admission: "10/11/2023",
      status: "inativo",
    },
  ];

  const optionsCompany = [
    { label: "Todas as empresas", value: "all" },
    { label: "Empresa Alfa", value: "alfa" },
    { label: "Empresa Beta", value: "beta" },
  ];

  const optionsStatus = [
    { label: "Todos os status", value: "all" },
    { label: "Ativos", value: "ativos" },
    { label: "Inativos", value: "inativos" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <StatsGrid stats={statsCards} cols={statsCards.length} />

      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Busca */}
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nome ou CPF..."
          icon={Search}
        />

        {/* Filtro Empresa */}
        <SearchableSelect
          value={selectedCompany}
          onChange={setSelectedCompany}
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

        {/* Botão Adicionar */}
        <Button
          label="Adicionar Colaborador"
          icon={Plus}
          className="w-full sm:w-auto px-4 md:px-6
                    py-2 bg-linear-to-r from-green-500 to-emerald-500
                    text-white rounded-xl hover:from-green-600 hover:to-emerald-600
                    transition-all duration-300 font-semibold hover:text-white
                    text-sm shadow-md hover:shadow-lg"
        />
      </div>

      {/* Tabela de colaboradores */}
      <EmployeesTable employees={employees} />
    </div>
  );
}
