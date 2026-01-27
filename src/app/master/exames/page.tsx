"use client";

import { useMemo, useState, useEffect } from "react";
import { Search, Users, UserCheck, UserX, Filter, Eye } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { getCols } from "@/src/utils/gridUtils";
import ExamsTable from "@/src/components/tables/ExamsTable";
import { GroupedEmployee, GroupedExam, GroupedExamsResponse } from "@/src/types/exam";
import { API_BASE_URL, endpoints } from "@/src/services/api";

type ExamStatus = "valido" | "vencido" | "pendente";

type ExamRow = {
  id: number;
  pacient: string;
  company: string;
  companyId: string; // string pq seus selects usam "1", "2", ...
  exam: string;
  examId: string;
  realizationDate: string;
  status: ExamStatus;
};

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<GroupedEmployee | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [groupedEmployees, setGroupedEmployees] = useState<GroupedEmployee[]>([]);
  const [totalPages, setTotalPages] = useState(1);

  // Carregar dados da API
  const fetchGroupedExams = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
      });
      
      if (selectedCompany) params.append("empresa", selectedCompany);
      if (searchTerm) params.append("nome", searchTerm);
      
      console.log('Buscando exames com params:', params.toString());
      
      const response = await fetch(`${API_BASE_URL}${endpoints.examesAgrupados}?${params}`);
      
      if (!response.ok) {
        throw new Error(`Erro ao buscar exames: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Dados recebidos da API:', data);
      
      // Verifica se a resposta tem a estrutura esperada
      if (data && Array.isArray(data)) {
        setGroupedEmployees(data);
        setTotalPages(1);
      } else if (data && data.data && Array.isArray(data.data)) {
        setGroupedEmployees(data.data);
        setTotalPages(Math.max(1, Math.ceil(data.total / 10)));
      } else {
        console.warn('Estrutura de resposta inesperada:', data);
        setGroupedEmployees([]);
        setTotalPages(1);
      }
      
      setCurrentPage(page);
    } catch (err) {
      console.error('Erro ao buscar exames:', err);
      setError(err instanceof Error ? err.message : "Erro ao buscar exames");
    } finally {
      setLoading(false);
    }
  };

  // Carregar dados ao montar o componente e quando filtros mudarem
  useEffect(() => {
    fetchGroupedExams(1);
  }, [selectedCompany, searchTerm]);

  // Carregar página específica
  const handlePageChange = (page: number) => {
    fetchGroupedExams(page);
  };

  // Calcular estatísticas
  const stats = useMemo(() => {
    if (!groupedEmployees || groupedEmployees.length === 0) {
      return {
        totalExams: 0,
        validExams: 0,
        expiredExams: 0,
        pendingExams: 0
      };
    }

    const totalExams = groupedEmployees.reduce((acc, emp) => acc + emp.exames.length, 0);
    const validExams = groupedEmployees.reduce((acc, emp) => {
      return acc + emp.exames.filter(exam => {
        if (!exam.DatValidade) return false;
        const validade = new Date(exam.DatValidade);
        return validade > new Date();
      }).length;
    }, 0);
    const expiredExams = groupedEmployees.reduce((acc, emp) => {
      return acc + emp.exames.filter(exam => {
        if (!exam.DatValidade) return false;
        const validade = new Date(exam.DatValidade);
        return validade <= new Date();
      }).length;
    }, 0);
    const pendingExams = totalExams - validExams - expiredExams;

    return {
      totalExams,
      validExams,
      expiredExams,
      pendingExams
    };
  }, [groupedEmployees]);

  const statsCards = [
    {
      icon: Users,
      number: stats.totalExams,
      label: "Total de Exames",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: stats.validExams,
      label: "Exames Válidos",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: stats.pendingExams,
      label: "Exames Pendentes",
      color: "text-yellow-500",
      bgLight: "bg-yellow-50",
    },
    {
      icon: UserX,
      number: stats.expiredExams,
      label: "Exames Vencidos",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
  ];

  // Filtrar funcionários
  const filteredEmployees = useMemo(() => {
    if (!groupedEmployees || groupedEmployees.length === 0) {
      return [];
    }
    
    const term = searchTerm.toLowerCase().trim();
    
    return groupedEmployees.filter(emp => {
      const matchesSearch = !term || 
        emp.NomFuncionario.toLowerCase().includes(term) ||
        emp.DesEmpresa.toLowerCase().includes(term) ||
        emp.DesCPF.includes(term.replace(/\D/g, ''));
      
      const matchesCompany = !selectedCompany || 
        emp.DesEmpresa.toLowerCase().includes(selectedCompany.toLowerCase());
      
      return matchesSearch && matchesCompany;
    });
  }, [groupedEmployees, searchTerm, selectedCompany]);

  // Filtrar exames do funcionário selecionado
  const filteredExams = useMemo(() => {
    if (!selectedEmployee) return [];
    
    return selectedEmployee.exames.map(exam => ({
      id: exam.NidAnexo,
      pacient: selectedEmployee.NomFuncionario,
      company: selectedEmployee.DesEmpresa,
      companyId: selectedEmployee.NidEmpresa.toString(),
      exam: exam.NomExame,
      examId: exam.NidAnexo.toString(),
      realizationDate: exam.DatASO,
      status: exam.DatValidade ? 
        (new Date(exam.DatValidade) > new Date() ? "valido" : "vencido") : 
        "pendente",
      nidAnexo: exam.NidAnexo // Adiciona o NidAnexo original para download
    }));
  }, [selectedEmployee]);

  // Filtrar por status
  const filteredExamsByStatus = useMemo(() => {
    if (!selectedEmployee) return [];
    
    return filteredExams.filter(exam => {
      if (!selectedStatus) return true;
      return exam.status === selectedStatus;
    });
  }, [filteredExams, selectedStatus]);

  const optionsCompany = useMemo(() => {
    if (!groupedEmployees || groupedEmployees.length === 0) {
      return [{ label: "Todas as empresas", value: "" }];
    }
    
    const companies = Array.from(new Set(groupedEmployees.map(emp => emp.DesEmpresa))).sort();
    return [
      { label: "Todas as empresas", value: "" },
      ...companies.map(name => ({ label: name, value: name })),
    ];
  }, [groupedEmployees]);

  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Válidos", value: "valido" },
    { label: "Vencidos", value: "vencido" },
    { label: "Pendentes", value: "pendente" },
  ];

  // Select de funcionários
  const optionsEmployees = useMemo(() => {
    if (!groupedEmployees || groupedEmployees.length === 0) {
      return [{ label: "Selecione um funcionário", value: null }];
    }
    
    return [
      { label: "Selecione um funcionário", value: null },
      ...groupedEmployees.map(emp => ({ 
        label: `${emp.NomFuncionario} - ${emp.DesEmpresa}`, 
        value: emp 
      })),
    ];
  }, [groupedEmployees]);

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

        {/* Filtro Funcionário */}
        <SearchableSelect
          value={selectedEmployee}
          onChange={(value) => setSelectedEmployee(value as GroupedEmployee | null)}
          options={optionsEmployees}
          placeholder="Funcionário"
          icon={Filter}
        />

        {/* Filtro Empresa */}
        <SearchableSelect
          value={selectedCompany}
          onChange={(value) => setSelectedCompany(value as string)}
          options={optionsCompany}
          placeholder="Empresas"
          icon={Filter}
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

      {/* Tabela de funcionários */}
      {!selectedEmployee && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
          {/* Header da Tabela */}
          <div className="hidden lg:grid lg:grid-cols-14 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
            <div className="col-span-3">Funcionário</div>
            <div className="col-span-3">Empresa</div>
            <div className="col-span-2 text-center">CPF</div>
            <div className="col-span-2 text-center">Total de Exames</div>
            <div className="col-span-2 text-center">Válidos</div>
            <div className="col-span-2 text-center">Ações</div>
          </div>

          {/* Lista de Funcionários */}
          <div className="divide-y divide-gray-100">
            {filteredEmployees.map((emp) => {
              const totalExams = emp.exames.length;
              const validExams = emp.exames.filter(exam => {
                if (!exam.DatValidade) return false;
                const validade = new Date(exam.DatValidade);
                return validade > new Date();
              }).length;
              const expiredExams = emp.exames.filter(exam => {
                if (!exam.DatValidade) return false;
                const validade = new Date(exam.DatValidade);
                return validade <= new Date();
              }).length;

              return (
                <div
                  key={emp.NidFuncionario}
                  className="grid grid-cols-1 lg:grid-cols-14 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
                >
                  {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
                  <div className="lg:col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                      <span className="text-indigo-600 font-semibold text-sm">
                        {emp.NomFuncionario.charAt(0)}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-semibold text-gray-900 truncate">
                        {emp.NomFuncionario}
                      </div>
                      <div className="text-sm text-gray-500 lg:hidden">
                        {emp.DesEmpresa}
                      </div>
                    </div>
                  </div>

                  {/* Empresa - Escondido no mobile */}
                  <div className="hidden lg:flex lg:col-span-3 items-center">
                    <div className="text-sm lg:text-base text-gray-700">
                      {emp.DesEmpresa}
                    </div>
                  </div>

                  {/* CPF */}
                  <div className="lg:col-span-2 flex items-center lg:justify-center">
                    <div className="text-sm lg:text-base text-gray-700">
                      <span className="lg:hidden font-medium text-gray-500">
                        CPF:{" "}
                      </span>
                      {emp.DesCPF}
                    </div>
                  </div>

                  {/* Total de Exames */}
                  <div className="lg:col-span-2 flex items-center lg:justify-center">
                    <div className="text-sm lg:text-base text-gray-700 font-semibold">
                      {totalExams}
                    </div>
                  </div>

                  {/* Válidos */}
                  <div className="lg:col-span-2 flex items-center lg:justify-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        validExams > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {validExams}
                    </span>
                  </div>

                  {/* Ações */}
                  <div className="lg:col-span-2 flex items-center justify-start lg:justify-center">
                    <button
                      onClick={() => setSelectedEmployee(emp)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                      <Eye size={16} className="mr-2" />
                      Ver Exames
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Mensagem quando não há funcionários */}
          {filteredEmployees.length === 0 && !loading && (
            <div className="p-8 text-center text-gray-500">
              Nenhum funcionário encontrado
            </div>
          )}
        </div>
      )}

      {/* Tabela de exames do funcionário */}
      {selectedEmployee && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Exibindo exames de:{" "}
              <span className="font-semibold text-gray-900">
                {selectedEmployee.NomFuncionario}
              </span>
            </div>
            <button
              onClick={() => setSelectedEmployee(null)}
              className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              ← Voltar para funcionários
            </button>
          </div>

          <ExamsTable exams={filteredExamsByStatus} itemsPerPage={5} />
        </div>
      )}
    </div>
  );
}
