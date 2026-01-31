"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Search,
  Users,
  UserCheck,
  UserX,
  Filter,
  ArrowLeft,
} from "lucide-react";

import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { getCols } from "@/src/utils/gridUtils";
import ExamsTable from "@/src/components/tables/ExamsTable";
import { Exam } from "@/src/types/exam";
import { Button } from "@/src/components/ui/Button";

export default function EmployeeExamsPage() {
  const router = useRouter();
  const params = useParams<{ nid: string }>();

  const employeeNid = params?.nid ?? "";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const exams: Exam[] = [
    {
      id: "1",
      employeeId: "1",
      employee: "Ana Cristina Souza",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "20/03/2024",
      status: "valido",
    },
    {
      id: "2",
      employeeId: "1",
      employee: "Ana Cristina Souza",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "15/01/2024",
      status: "vencido",
    },
    {
      id: "3",
      employeeId: "2",
      employee: "João Paulo Mendes",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "10/02/2024",
      status: "pendente",
    },
  ];

  const optionsCompany = [
    { label: "Todas as empresas", value: "" },
    { label: "Empresa Alfa", value: "1" },
    { label: "Empresa Beta", value: "2" },
    { label: "Empresa Gama", value: "3" },
  ];

  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Válidos", value: "valido" },
    { label: "Vencidos", value: "vencido" },
    { label: "Pendentes", value: "pendente" },
  ];

  const employeeExams = useMemo(() => {
    if (!employeeNid) return [];
    return exams.filter((e) => e.employeeId === employeeNid);
  }, [exams, employeeNid]);

  // Nome do colaborador (se existir na lista). Se você vier do backend, você pode usar o name retornado.
  const employeeName = useMemo(() => {
    return employeeExams[0]?.employee ?? "";
  }, [employeeExams]);

  // Stats do colaborador (dinâmico)
  const statsCards = useMemo(() => {
    const total = employeeExams.length;
    const validos = employeeExams.filter((e) => e.status === "valido").length;
    const pendentes = employeeExams.filter(
      (e) => e.status === "pendente",
    ).length;
    const vencidos = employeeExams.filter((e) => e.status === "vencido").length;

    return [
      {
        icon: Users,
        number: total,
        label: "Total de Exames",
        color: "text-blue-500",
        bgLight: "bg-blue-50",
      },
      {
        icon: UserCheck,
        number: validos,
        label: "Exames Válidos",
        color: "text-green-500",
        bgLight: "bg-green-50",
      },
      {
        icon: UserX,
        number: pendentes,
        label: "Exames Pendentes",
        color: "text-yellow-500",
        bgLight: "bg-yellow-50",
      },
      {
        icon: UserX,
        number: vencidos,
        label: "Exames Vencidos",
        color: "text-red-500",
        bgLight: "bg-red-50",
      },
    ];
  }, [employeeExams]);

  // Filtra os exames do colaborador
  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return employeeExams.filter((exam) => {
      const matchesSearch = !term || exam.exam.toLowerCase().includes(term);

      const matchesCompany =
        !selectedCompany || exam.companyId === selectedCompany;

      const matchesStatus = !selectedStatus || exam.status === selectedStatus;

      return matchesSearch && matchesCompany && matchesStatus;
    });
  }, [employeeExams, searchTerm, selectedCompany, selectedStatus]);

  if (!employeeNid) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-4 text-md text-gray-600">
        NID do colaborador não encontrado na rota.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Cabeçalho */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Button
          icon={ArrowLeft}
          label="Voltar"
          onClick={() => router.back()}
          className="bg-indigo-600 text-white text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-700 hover:text-white w-fit"
        />

        <div className="space-y-1">
          <div className="text-xl font-semibold text-gray-900">
            Exames do colaborador
          </div>
          <div className="text-md text-gray-600">
            {employeeName ? (
              <>
                <span className="font-semibold text-gray-900">
                  {employeeName}
                </span>{" "}
                <span className="text-gray-500">• NID {employeeNid}</span>
              </>
            ) : (
              <>NID {employeeNid}</>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsGrid stats={statsCards} cols={getCols(statsCards.length)} />

      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4">
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por exame..."
          icon={Search}
        />

        <SearchableSelect
          value={selectedCompany}
          onChange={setSelectedCompany}
          options={optionsCompany}
          placeholder="Empresas"
          icon={Filter}
        />

        <SearchableSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />
      </div>

      {/* Conteúdo */}
      {employeeExams.length > 0 ? (
        <ExamsTable exams={filteredExams} itemsPerPage={5} />
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-4 text-md text-gray-600">
          Nenhum exame encontrado para este colaborador.
        </div>
      )}
    </div>
  );
}
