"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Users, UserCheck, UserX, Filter } from "lucide-react";
import { StatsGrid } from "@/src/components/dashboard";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Button } from "@/src/components/ui/Button";
import EmployeesTable from "@/src/components/tables/EmployeesTable";
import { Employee } from "@/src/types/employee";
import { getCols } from "@/src/utils/gridUtils";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statsCards = [
    {
      icon: Users,
      number: 150,
      label: "Total de Colaboradores",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: 145,
      label: "Colaboradores Ativos",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: 5,
      label: "Colaboradores Inativos",
      color: "text-red-500",
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
    {
      id: 6,
      name: "Marcos Vinícius Tavares",
      company: "Empresa Gama",
      position: "Desenvolvedor Front-end",
      admission: "05/02/2024",
      status: "ativo",
    },
    {
      id: 7,
      name: "Patrícia Alves Nogueira",
      company: "Empresa Beta",
      position: "Coordenadora Administrativa",
      admission: "22/08/2023",
      status: "ativo",
    },
    {
      id: 8,
      name: "Ricardo Henrique Lopes",
      company: "Empresa Alfa",
      position: "Analista Financeiro",
      admission: "03/07/2023",
      status: "ativo",
    },
    {
      id: 9,
      name: "Juliana Martins Pacheco",
      company: "Empresa Gama",
      position: "Product Owner",
      admission: "18/09/2023",
      status: "ativo",
    },
    {
      id: 10,
      name: "Diego Rafael Cunha",
      company: "Empresa Beta",
      position: "Suporte de TI",
      admission: "30/10/2023",
      status: "inativo",
    },
    {
      id: 11,
      name: "Larissa Fontes Araujo",
      company: "Empresa Alfa",
      position: "Analista de Qualidade",
      admission: "12/06/2024",
      status: "ativo",
    },
    {
      id: 12,
      name: "Bruno Cavalcante Silva",
      company: "Empresa Gama",
      position: "DevOps Engineer",
      admission: "02/04/2024",
      status: "ativo",
    },
    {
      id: 13,
      name: "Renata Gomes Figueiredo",
      company: "Empresa Beta",
      position: "UX Researcher",
      admission: "19/05/2024",
      status: "ativo",
    },
    {
      id: 14,
      name: "Felipe Augusto Morais",
      company: "Empresa Alfa",
      position: "Analista de Dados",
      admission: "27/02/2024",
      status: "ativo",
    },
    {
      id: 15,
      name: "Camila Rodrigues Peixoto",
      company: "Empresa Gama",
      position: "Scrum Master",
      admission: "14/03/2024",
      status: "ativo",
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

  const filteredEmployees = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    // mapeia o select para o tipo real do campo status
    const statusFilter: Employee["status"] | null =
      selectedStatus === "ativos"
        ? "ativo"
        : selectedStatus === "inativos"
        ? "inativo"
        : null; // "" ou "all" => sem filtro

    return employees.filter((employee) => {
      const matchesSearch =
        !term ||
        [employee.name].some((field) => field.toLowerCase().includes(term));

      const matchesStatus = !statusFilter || employee.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [employees, searchTerm, selectedStatus]);

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
        {/* <Button
          label="Adicionar Colaborador"
          icon={Plus}
          className="w-full sm:w-auto px-4 md:px-6
                    py-2 bg-linear-to-r from-green-500 to-emerald-500
                    text-white rounded-xl hover:from-green-600 hover:to-emerald-600
                    transition-all duration-300 font-semibold hover:text-white
                    text-sm shadow-md hover:shadow-lg"
        /> */}
      </div>

      {/* Tabela de colaboradores */}
      <EmployeesTable employees={filteredEmployees} itemsPerPage={5} />
    </div>
  );
}
