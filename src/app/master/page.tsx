"use client";

import { Users, FileX, Building, Clock } from "lucide-react";

import {
  StatsGrid,
  WaitingPatientsCard,
  InServiceCard,
  ExpiringExamsCard,
} from "@/src/components/dashboard";
import { getCols } from "@/src/utils/gridUtils";

export default function DashboardPage() {
  const statsCards = [
    {
      icon: Clock,
      number: 4,
      label: "Pacientes em Espera",
      color: "text-blue-500",
      bgLight: "bg-blue-50",
    },
    {
      icon: FileX,
      number: 23,
      label: "Exames Vencidos",
      color: "text-red-500",
      bgLight: "bg-red-50",
    },
    {
      icon: Users,
      number: 150,
      label: "Total Colaboradores",
      color: "text-green-500",
      bgLight: "bg-green-50",
    },
    {
      icon: Building,
      number: 39,
      label: "Empresas Ativas",
      color: "text-purple-500",
      bgLight: "bg-purple-50",
    },
  ];

  const waitingPatients = [
    {
      id: 1,
      name: "Nome do Paciente 1",
      company: "Empresa Alfa",
      time: "10min",
    },
    {
      id: 2,
      name: "Paciente 3 da Silva Sauro",
      company: "Indústrias Rex",
      time: "25min",
    },
    {
      id: 3,
      name: "Paciente Teste Scroll 2",
      company: "Empresa ABC",
      time: "35min",
    },
    { id: 4, name: "Maria Santos", company: "Tech Solutions", time: "40min" },
  ];

  const inService = [
    { id: 1, name: "Nome Paciente Atend. 1", startTime: "14:30" },
    { id: 2, name: "Paciente Atend. 2", startTime: "14:45" },
    { id: 3, name: "João Silva", startTime: "15:00" },
  ];

  const expiringExams = [
    { id: 1, name: "Carlos B Eduardo Brito", exam: "ASO", days: 3 },
    { id: 2, name: "Fernanda Rochuino", exam: "Audiometria", days: 5 },
    { id: 3, name: "Pedro Almeida", exam: "Visão", days: 7 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in">
      <StatsGrid stats={statsCards} cols={getCols(statsCards.length)} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <WaitingPatientsCard patients={waitingPatients} />
        <div className="space-y-6">
          <InServiceCard patients={inService} />
          <ExpiringExamsCard exams={expiringExams} />
        </div>
      </div>
    </div>
  );
}
