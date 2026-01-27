"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, Users, UserCheck, UserX, Filter, Eye } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { getCols } from "@/src/utils/gridUtils";
import CompaniesTable from "@/src/components/tables/CompaniesTable";
import { Company } from "@/src/types/company";
import { API_BASE_URL, endpoints } from "@/src/services/api";

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Carregar dados da API
  const fetchCompanies = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      
      if (searchTerm) params.append("empresa", searchTerm);
      if (selectedStatus) params.append("status", selectedStatus === "ativo" ? "1" : "0");
      
      console.log('URL da requisição:', `${API_BASE_URL}${endpoints.empresas}?${params}`);
      
      const response = await fetch(`${API_BASE_URL}${endpoints.empresas}?${params}`);
      
      console.log('Status da resposta:', response.status);
      console.log('Headers da resposta:', response.headers);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar empresas: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos da API:', data);
      
      // Verifica se a resposta tem a estrutura esperada
      if (data && data.companies && Array.isArray(data.companies)) {
        setCompanies(data.companies);
        setTotalPages(Math.max(1, Math.ceil(data.total / 10)));
      } else if (data && Array.isArray(data)) {
        setCompanies(data);
        setTotalPages(Math.max(1, Math.ceil(data.length / 10)));
      } else {
        console.warn('Estrutura de resposta inesperada:', data);
        setCompanies([]);
        setTotalPages(1);
      }
      
      setCurrentPage(page);
    } catch (err) {
      console.error('Erro ao buscar empresas:', err);
      setError(err instanceof Error ? err.message : "Erro ao buscar empresas");
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao montar o componente e quando filtros mudarem
  useEffect(() => {
    fetchCompanies(1);
  }, [searchTerm, selectedStatus]);

  // Calcular estatísticas
  const stats = useMemo(() => {
    if (!companies || companies.length === 0) {
      return {
        totalCompanies: 0,
        activeCompanies: 0,
        inactiveCompanies: 0,
        totalEmployees: 0
      };
    }

    const totalCompanies = companies.length;
    const activeCompanies = companies.filter(company => company.FlgSituacao === 1).length;
    const inactiveCompanies = companies.filter(company => company.FlgSituacao === 0).length;
    const totalEmployees = companies.reduce((acc, company) => acc + company.total_funcionarios, 0);

    return {
      totalCompanies,
      activeCompanies,
      inactiveCompanies,
      totalEmployees
    };
  }, [companies]);

  const statsCards = [
    {
      icon: Users,
      number: stats.totalCompanies,
      label: "Total de Empresas",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: stats.activeCompanies,
      label: "Empresas Ativas",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: stats.inactiveCompanies,
      label: "Empresas Inativas",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
    {
      icon: Users,
      number: stats.totalEmployees,
      label: "Total de Funcionários",
      color: "text-purple-500",
      bgLight: "bg-purple-50",
    },
  ];

  // Filtrar empresas
  const filteredCompanies = useMemo(() => {
    if (!companies || companies.length === 0) {
      return [];
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    return companies.filter(company => {
      const matchesSearch = !term || 
        company.DesEmpresa.toLowerCase().includes(term);
      
      const matchesStatus = !selectedStatus || 
        (selectedStatus === "ativo" && company.FlgSituacao === 1) ||
        (selectedStatus === "inativo" && company.FlgSituacao === 0);
      
      return matchesSearch && matchesStatus;
    });
  }, [companies, searchTerm, selectedStatus]);

  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Ativas", value: "ativo" },
    { label: "Inativas", value: "inativo" },
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

        {/* Filtro Status */}
        <SearchableSelect
          value={selectedStatus}
          onChange={(value) => setSelectedStatus(value as string)}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />
      </div>

      {/* Tabela de Empresas */}
      <CompaniesTable 
        companies={filteredCompanies} 
        itemsPerPage={10}
        action={() => {}}
      />
    </div>
  );
}
