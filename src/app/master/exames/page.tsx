"use client";

import { useMemo, useState } from "react";
import { Search, Plus, Users, UserCheck, UserX, Filter } from "lucide-react";
import { StatsGrid } from "@/src/components/cards";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import { Button } from "@/src/components/ui/Button";
import EmployeesTable from "@/src/components/tables/EmployeesTable";
import { getCols } from "@/src/utils/gridUtils";
import ExamsTable from "@/src/components/tables/ExamsTable";

export default function ExamsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statsCards = [
    {
      icon: Users,
      number: 150,
      label: "Total de Exames",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: 145,
      label: "Exames Válidos",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: 5,
      label: "Exames Pendentes",
      color: "text-yellow-500",
      bgLight: "bg-yellow-50",
    },
    {
      icon: UserX,
      number: 5,
      label: "Exames Vencidos",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
  ];

  const exams = [
    {
      id: 1,
      pacient: "Ana Cristina Souza",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "20/03/2024",
      status: "valido",
    },
    {
      id: 2,
      pacient: "Fernanda Rocha Lima",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "15/01/2024",
      status: "vencido",
    },
    {
      id: 3,
      pacient: "João Paulo Mendes",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "10/02/2024",
      status: "pendente",
    },
    {
      id: 4,
      pacient: "Carlos Eduardo Brito",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "05/01/2024",
      status: "vencido",
    },
    {
      id: 5,
      pacient: "Mariana Alves Costa",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "22/02/2024",
      status: "valido",
    },

    // novos elementos
    {
      id: 6,
      pacient: "Lucas Henrique Pereira",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "12/03/2024",
      status: "valido",
    },
    {
      id: 7,
      pacient: "Patrícia Gomes Nunes",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "08/01/2024",
      status: "vencido",
    },
    {
      id: 8,
      pacient: "Rafael Monteiro Silva",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "18/02/2024",
      status: "pendente",
    },
    {
      id: 9,
      pacient: "Aline Beatriz Rocha",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "25/02/2024",
      status: "valido",
    },
    {
      id: 10,
      pacient: "Bruno Matheus Azevedo",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "03/03/2024",
      status: "pendente",
    },
    {
      id: 11,
      pacient: "Juliana Farias Lopes",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "28/01/2024",
      status: "valido",
    },
    {
      id: 12,
      pacient: "Diego Santos Carvalho",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "14/01/2024",
      status: "vencido",
    },
    {
      id: 13,
      pacient: "Camila Ribeiro Teixeira",
      company: "Empresa Beta",
      companyId: "2",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "19/03/2024",
      status: "valido",
    },
    {
      id: 14,
      pacient: "Felipe Augusto Moraes",
      company: "Empresa Gama",
      companyId: "3",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "09/02/2024",
      status: "pendente",
    },
    {
      id: 15,
      pacient: "Renata Pacheco Lima",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "21/02/2024",
      status: "valido",
    },
    {
      id: 16,
      pacient: "Thiago Vinícius Barros",
      company: "Empresa Beta",
      companyId: "2",
      exam: "Raio-X Tórax",
      examId: "4",
      realizationDate: "07/01/2024",
      status: "vencido",
    },
    {
      id: 17,
      pacient: "Natália Cunha Freitas",
      company: "Empresa Gama",
      companyId: "3",
      exam: "Espirometria",
      examId: "5",
      realizationDate: "26/02/2024",
      status: "valido",
    },
    {
      id: 18,
      pacient: "Anderson Luiz Cardoso",
      company: "Empresa Alfa",
      companyId: "1",
      exam: "Audiometria",
      examId: "2",
      realizationDate: "11/01/2024",
      status: "vencido",
    },
    {
      id: 19,
      pacient: "Vanessa Martins Guedes",
      company: "Empresa Beta",
      companyId: "2",
      exam: "ASO Periódico",
      examId: "3",
      realizationDate: "16/02/2024",
      status: "pendente",
    },
    {
      id: 20,
      pacient: "Eduardo Henrique Rangel",
      company: "Empresa Gama",
      companyId: "3",
      exam: "ASO Admissional",
      examId: "1",
      realizationDate: "04/03/2024",
      status: "valido",
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

  const optionsExams = [
    { label: "Todos os exames", value: "" },
    { label: "ASO Admissional", value: "1" },
    { label: "Audiometria", value: "2" },
    { label: "ASO Periódico", value: "3" },
  ];

  const filteredExams = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return exams.filter((exam) => {
      const matchesSearch =
        !term ||
        [exam.pacient].some((field) => field.toLowerCase().includes(term));

      const matchesExam = !selectedExam || exam.examId === selectedExam;
      const matchesCompany =
        !selectedCompany || exam.companyId === selectedCompany;
      const matchesStatus = !selectedStatus || exam.status === selectedStatus;

      return matchesSearch && matchesExam && matchesCompany && matchesStatus;
    });
  }, [exams, searchTerm, selectedExam, selectedCompany, selectedStatus]);

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

        {/* Filtro Exames */}
        <SearchableSelect
          value={selectedExam}
          onChange={setSelectedExam}
          options={optionsExams}
          placeholder="Exames"
          icon={Filter}
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
      <ExamsTable exams={filteredExams} itemsPerPage={5} />
    </div>
  );
}
