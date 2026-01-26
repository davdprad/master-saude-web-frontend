"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Users, UserCheck, UserX, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Button } from "@/src/components/ui/Button";
import EmployeesTable from "@/src/components/tables/EmployeesTable";
import { getCols } from "@/src/utils/gridUtils";
import { API_BASE_URL, endpoints } from "@/src/services/api";
import { EmployeeCounts } from "@/src/types/employee";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [companySearch, setCompanySearch] = useState("");
  const [debouncedCompanySearch, setDebouncedCompanySearch] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  
  const [employees, setEmployees] = useState([]);
  const [counts, setCounts] = useState<EmployeeCounts | null>(null);
  const [companies, setCompanies] = useState<Array<{ label: string; value: string }>>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Debounce para o termo de busca
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
      setPage(1); // Reseta para a primeira página ao buscar
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Debounce para o termo de busca de empresa
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCompanySearch(companySearch);
      setPage(1); // Reseta para a primeira página ao buscar
    }, 500);
    return () => clearTimeout(timer);
  }, [companySearch]);

  // Busca de empresas na API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const params = new URLSearchParams();
        params.append("page", "1");
        params.append("limit", "1000");
        
        // Adiciona filtro de empresa se houver termo de busca
        if (debouncedCompanySearch) {
          params.append("empresa", debouncedCompanySearch);
        }

        const response = await fetch(`${API_BASE_URL}${endpoints.colaboradores}?${params.toString()}`);
        if (!response.ok) throw new Error("Erro ao buscar empresas");
        
        const data = await response.json();
        
        // Extrai empresas únicas da lista de colaboradores
        const companySet = new Set<string>();
        data.employees.forEach((emp: any) => {
          if (emp.DesEmpresa) {
            companySet.add(emp.DesEmpresa);
          }
        });
        
        const uniqueCompanies = Array.from(companySet).map((companyName: string) => ({
          label: companyName,
          value: companyName
        }));
        
        // Adiciona a opção "Todas as empresas" no início
        setCompanies([
          { label: "Todas as empresas", value: "" },
          ...uniqueCompanies
        ]);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        // Fallback com opção padrão
        setCompanies([{ label: "Todas as empresas", value: "" }]);
      }
    };

    fetchCompanies();
  }, [debouncedCompanySearch]);

  // Busca de empresas imediata (sem debounce) para atualizar o dropdown em tempo real
  useEffect(() => {
    const fetchCompaniesImmediate = async () => {
      if (!companySearch) {
        // Se não houver termo de busca, não faz nada
        return;
      }

      try {
        const params = new URLSearchParams();
        params.append("page", "1");
        params.append("limit", "1000");
        params.append("empresa", companySearch);

        const response = await fetch(`${API_BASE_URL}${endpoints.colaboradores}?${params.toString()}`);
        if (!response.ok) throw new Error("Erro ao buscar empresas");
        
        const data = await response.json();
        
        // Extrai empresas únicas da lista de colaboradores
        const companySet = new Set<string>();
        data.employees.forEach((emp: any) => {
          if (emp.DesEmpresa) {
            companySet.add(emp.DesEmpresa);
          }
        });
        
        const uniqueCompanies = Array.from(companySet).map((companyName: string) => ({
          label: companyName,
          value: companyName
        }));
        
        // Adiciona a opção "Todas as empresas" no início
        setCompanies([
          { label: "Todas as empresas", value: "" },
          ...uniqueCompanies
        ]);
      } catch (error) {
        console.error("Erro ao buscar empresas:", error);
        // Fallback com opção padrão
        setCompanies([{ label: "Todas as empresas", value: "" }]);
      }
    };

    fetchCompaniesImmediate();
  }, [companySearch]);

  // Reseta a página ao mudar filtros
  useEffect(() => {
    setPage(1);
  }, [selectedCompany, selectedStatus]);

  // Busca de dados na API
  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("limit", limit.toString());

        if (debouncedSearchTerm) {
          const isName = /[a-zA-Z]/.test(debouncedSearchTerm);
          params.append(isName ? "nome" : "cpf", isName ? debouncedSearchTerm : debouncedSearchTerm.replace(/\D/g, ""));
        }

        if (selectedCompany && selectedCompany !== "") {
          params.append("empresa", selectedCompany);
        }
        if (selectedStatus) params.append("status", selectedStatus);

        const url = `${API_BASE_URL}${endpoints.colaboradores}?${params.toString()}`;
        console.log("Fetching URL:", url); // Para debug no console do navegador

        const response = await fetch(url);
        
        if (!response.ok) throw new Error("Erro ao buscar colaboradores");

        const data = await response.json();

        const mappedEmployees = data.employees.map((emp: any) => ({
          id: emp.NidFuncionario,
          name: emp.NomFuncionario,
          company: emp.DesEmpresa,
          companyId: emp.NidEmpresa.toString(),
          position: emp.DesFuncao,
          admission: emp.DatASO, // Campo não retornado pela API
          status: emp.status ? emp.status.toLowerCase() : "ativo",
          cpf: emp.DesCPF,
        }));

        setEmployees(mappedEmployees);
        
        // Atualiza os contadores se estiverem disponíveis na resposta
        if (data.total !== undefined || data.total_ativos !== undefined || data.total_inativos !== undefined) {
          setCounts({
            total: data.total || 0,
            total_ativos: data.total_ativos || 0,
            total_inativos: data.total_inativos || 0
          });
        }
      } catch (error) {
        console.error("Erro:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [debouncedSearchTerm, selectedCompany, selectedStatus, page]);

  const statsCards = [
    {
      icon: Users,
      number: counts?.total || 0,
      label: "Total de Colaboradores",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: counts?.total_ativos || 0,
      label: "Colaboradores Ativos",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: counts?.total_inativos || 0,
      label: "Colaboradores Inativos",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
  ];


  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Ativos", value: "1" },
    { label: "Inativos", value: "0" },
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
          placeholder="Buscar por nome ou CPF..."
          icon={Search}
        />

        {/* Filtro Empresa */}
        <SearchableSelect
          value={selectedCompany}
          onChange={setSelectedCompany}
          onSearch={setCompanySearch}
          options={companies}
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
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/50 z-10 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}
        <EmployeesTable employees={employees} itemsPerPage={limit} />
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center mt-4 px-2">
        <span className="text-sm text-gray-500">
          Mostrando {employees.length} de {counts?.total || 0} registros
        </span>
        <div className="flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || loading}
            className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Página anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-sm font-medium">
            Página {page}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={employees.length < limit || page * limit >= (counts?.total || 0) || loading}
            className="p-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Próxima página"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
