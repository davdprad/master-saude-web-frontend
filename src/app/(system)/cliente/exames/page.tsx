"use client";

import EmployeeExamsTable from "@/src/components/tables/ColabExamsTable";
import DatePicker from "@/src/components/ui/DatePicker";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Exam } from "@/src/types/exam";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [initialDate, setInitialDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);

  const exams: Exam[] = [
    {
      id: "1",
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
      employee: "Fernanda Rocha Lima",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "15/01/2024",
      status: "vencido",
    },
    {
      id: "3",
      employee: "João Paulo Mendes",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "10/02/2024",
      status: "pendente",
    },
    {
      id: "4",
      employee: "Carlos Eduardo Brito",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "05/01/2024",
      status: "vencido",
    },
    {
      id: "5",
      employee: "Mariana Alves Costa",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "22/02/2024",
      status: "valido",
    },
    {
      id: "6",
      employee: "Lucas Henrique Pereira",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "12/03/2024",
      status: "valido",
    },
    {
      id: "7",
      employee: "Patrícia Gomes Nunes",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "08/01/2024",
      status: "vencido",
    },
    {
      id: "8",
      employee: "Rafael Monteiro Silva",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "18/02/2024",
      status: "pendente",
    },
    {
      id: "9",
      employee: "Aline Beatriz Rocha",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "25/02/2024",
      status: "valido",
    },
    {
      id: "10",
      employee: "Bruno Matheus Azevedo",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "03/03/2024",
      status: "pendente",
    },
    {
      id: "11",
      employee: "Juliana Farias Lopes",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "28/01/2024",
      status: "valido",
    },
    {
      id: "12",
      employee: "Diego Santos Carvalho",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "14/01/2024",
      status: "vencido",
    },
    {
      id: "13",
      employee: "Camila Ribeiro Teixeira",
      company: "Empresa Beta",
      companyId: "2",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "19/03/2024",
      status: "valido",
    },
    {
      id: "14",
      employee: "Felipe Augusto Moraes",
      company: "Empresa Gama",
      companyId: "3",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "09/02/2024",
      status: "pendente",
    },
  ];

  const optionsStatus = [
    { label: "Todos os status", value: "" },
    { label: "Ativos", value: "ativo" },
    { label: "Inativos", value: "inativo" },
  ];

  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    // "DD/MM/YYYY" -> Date
    const parseBRDate = (value: string): Date | null => {
      const [dd, mm, yyyy] = value.split("/").map(Number);
      if (!dd || !mm || !yyyy) return null;
      return new Date(yyyy, mm - 1, dd);
    };

    return exams.filter((exam) => {
      const matchesSearch = !term || exam.exam.toLowerCase().includes(term);

      const matchesStatus = !selectedStatus || exam.status === selectedStatus;

      const examDate = parseBRDate(exam.realizationDate);

      const matchesInitialDate =
        !initialDate || (examDate && examDate >= initialDate);

      const matchesFinalDate =
        !finalDate || (examDate && examDate <= finalDate);

      return (
        matchesSearch && matchesStatus && matchesInitialDate && matchesFinalDate
      );
    });
  }, [exams, searchTerm, selectedStatus, initialDate, finalDate]);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
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
          onChange={setSelectedStatus}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />

        {/* Data Inicial */}
        <DatePicker
          placeholder="Data inicial"
          value={initialDate}
          onChange={setInitialDate}
        />

        {/* Data Final */}
        <DatePicker
          placeholder="Data final"
          value={finalDate}
          onChange={setFinalDate}
        />
      </div>

      {/* Tabela de colaboradores */}
      <EmployeeExamsTable exams={filteredExams} itemsPerPage={5} />
    </div>
  );
}
