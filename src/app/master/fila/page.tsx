"use client";

import { useMemo, useState } from "react";
import {
  Clock,
  Users,
  CheckCircle2,
  XCircle,
  Filter,
  Search,
  Plus,
  ArrowRight,
  UserCircle2,
  PlayCircle,
  PauseCircle,
  Check,
  X,
} from "lucide-react";

import { StatsGrid } from "@/src/components/dashboard";
import { Button } from "@/src/components/ui/Button";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";

/**
 * ✅ TELA: Gerenciamento de Fila de Espera
 * Mesma pegada visual do seu Dashboard (cards com gradiente, bordas suaves, hover shadow, etc.)
 */

type QueueStatus = "waiting" | "called" | "in_service" | "finished" | "missed";

interface QueueItem {
  id: number;
  name: string;
  company: string;
  service: string;
  priority: "normal" | "prioridade";
  checkInTime: string; // "14:10"
  waitTime: string; // "25min"
  status: QueueStatus;
}

const statusLabel: Record<QueueStatus, string> = {
  waiting: "Aguardando",
  called: "Chamado",
  in_service: "Em atendimento",
  finished: "Finalizado",
  missed: "Ausente",
};

const statusPill: Record<QueueStatus, string> = {
  waiting: "bg-indigo-50 text-indigo-700",
  called: "bg-amber-50 text-amber-700",
  in_service: "bg-green-50 text-green-700",
  finished: "bg-gray-100 text-gray-700",
  missed: "bg-red-50 text-red-700",
};

export default function QueueManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedService, setSelectedService] = useState<string>("all");

  // mock
  const queue: QueueItem[] = [
    {
      id: 1,
      name: "Maria Santos",
      company: "Empresa Alfa",
      service: "ASO",
      priority: "normal",
      checkInTime: "14:10",
      waitTime: "35min",
      status: "waiting",
    },
    {
      id: 2,
      name: "João Silva",
      company: "Indústrias Rex",
      service: "Audiometria",
      priority: "prioridade",
      checkInTime: "14:15",
      waitTime: "30min",
      status: "called",
    },
    {
      id: 3,
      name: "Fernanda Rochuino",
      company: "Tech Solutions",
      service: "Visão",
      priority: "normal",
      checkInTime: "14:20",
      waitTime: "25min",
      status: "in_service",
    },
    {
      id: 4,
      name: "Carlos Eduardo Brito",
      company: "Empresa ABC",
      service: "ASO",
      priority: "normal",
      checkInTime: "14:25",
      waitTime: "20min",
      status: "waiting",
    },
    {
      id: 5,
      name: "Pedro Almeida",
      company: "Norte Sistemas",
      service: "Eletrocardiograma",
      priority: "prioridade",
      checkInTime: "14:30",
      waitTime: "15min",
      status: "waiting",
    },
  ];

  const optionsStatus = [
    { label: "Todos os status", value: "all" },
    { label: "Aguardando", value: "waiting" },
    { label: "Chamado", value: "called" },
    { label: "Em atendimento", value: "in_service" },
    { label: "Finalizado", value: "finished" },
    { label: "Ausente", value: "missed" },
  ];

  const optionsService = [
    { label: "Todos os serviços", value: "all" },
    { label: "ASO", value: "ASO" },
    { label: "Audiometria", value: "Audiometria" },
    { label: "Visão", value: "Visão" },
    { label: "Eletrocardiograma", value: "Eletrocardiograma" },
  ];

  const filteredQueue = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    return queue.filter((item) => {
      const matchesSearch =
        !term ||
        [item.name, item.company, item.service, item.priority]
          .join(" ")
          .toLowerCase()
          .includes(term);

      const matchesStatus =
        selectedStatus === "all" || item.status === selectedStatus;

      const matchesService =
        selectedService === "all" || item.service === selectedService;

      return matchesSearch && matchesStatus && matchesService;
    });
  }, [queue, searchTerm, selectedStatus, selectedService]);

  const statsCards = useMemo(() => {
    const waiting = queue.filter((q) => q.status === "waiting").length;
    const called = queue.filter((q) => q.status === "called").length;
    const inService = queue.filter((q) => q.status === "in_service").length;
    const total = queue.length;

    return [
      {
        icon: Clock,
        number: waiting,
        label: "Aguardando",
        color: "blue-500",
        bgLight: "bg-blue-50",
      },
      {
        icon: CheckCircle2,
        number: called,
        label: "Chamados",
        color: "yellow-500",
        bgLight: "bg-yellow-50",
      },
      {
        icon: Users,
        number: inService,
        label: "Em Atendimento",
        color: "green-500",
        bgLight: "bg-green-50",
      },
      {
        icon: XCircle,
        number: total,
        label: "Total na Fila",
        color: "purple-500",
        bgLight: "bg-purple-50",
      },
    ];
  }, [queue]);

  const nextInLine = queue.find((q) => q.status === "waiting") ?? null;
  const inServiceList = queue.filter((q) => q.status === "in_service");

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Cards topo (mesmo estilo do Dashboard) */}
      <StatsGrid stats={statsCards} cols={statsCards.length} />

      {/* Barra de filtros (mesmo estilo da sua tela de empresas) */}
      <div className="flex flex-col lg:flex-row gap-4">
        <InputSearch
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar por nome, empresa ou serviço..."
          icon={Search}
        />

        <SearchableSelect
          value={selectedService}
          onChange={setSelectedService}
          options={optionsService}
          placeholder="Serviço"
          icon={Filter}
        />

        <SearchableSelect
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={optionsStatus}
          placeholder="Status"
          icon={Filter}
        />

        <Button
          icon={Plus}
          label="Novo Check-in"
          className="w-full lg:w-auto px-4 md:px-6 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold hover:text-white text-sm shadow-md hover:shadow-lg"
        />
      </div>

      {/* Conteúdo principal */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Card principal: fila */}
        <QueueCard items={filteredQueue} />

        {/* Coluna lateral: próximo + em atendimento */}
        <div className="space-y-6">
          <NextCallCard item={nextInLine} />
          <InServiceMiniCard items={inServiceList} />
        </div>
      </div>
    </div>
  );
}

/* ===================== CARDS (mesma estética do seu dashboard) ===================== */

function QueueCard({ items }: { items: QueueItem[] }) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Fila de Espera
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {items.length} registros encontrados
          </p>
        </div>

        <Button
          icon={ArrowRight}
          label="Chamar Próximo"
          className="w-full sm:w-auto px-4 md:px-6 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold hover:text-white text-sm shadow-md hover:shadow-lg"
        />
      </div>

      <div className="flex-1 overflow-auto divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 lg:gap-4 p-4 md:p-5 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className="flex-shrink-0 w-12 h-12 bg-linear-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UserCircle2 className="w-7 h-7 text-indigo-600" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="font-semibold text-gray-900 truncate">
                    {item.name}
                  </div>

                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      item.priority === "prioridade"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.priority === "prioridade" ? "Prioridade" : "Normal"}
                  </span>

                  <span
                    className={`flex-shrink-0 text-xs font-semibold px-2 py-0.5 rounded-full ${
                      statusPill[item.status]
                    }`}
                  >
                    {statusLabel[item.status]}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500 truncate">
                    {item.company}
                  </span>
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.service}
                  </span>
                  <span className="text-xs text-gray-600 bg-gray-100 px-2 py-0.5 rounded-full">
                    Check-in: {item.checkInTime}
                  </span>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.waitTime}
                  </span>
                </div>
              </div>
            </div>

            {/* Ações rápidas */}
            <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
              <Button
                icon={PlayCircle}
                label="Chamar"
                className="w-full sm:w-auto px-4 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold hover:text-white text-sm shadow-md hover:shadow-lg"
              />
              <Button
                icon={PauseCircle}
                label="Pausar"
                className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold text-sm"
              />
              <Button
                icon={X}
                label="Ausente"
                className="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-300 font-semibold text-sm"
              />
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Nenhum registro encontrado com os filtros atuais.
          </div>
        )}
      </div>
    </div>
  );
}

function NextCallCard({ item }: { item: QueueItem | null }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
        <h2 className="text-lg font-bold text-gray-900">Próximo da Fila</h2>
        <p className="text-sm text-gray-500 mt-1">Chamar com 1 clique</p>
      </div>

      <div className="p-4 md:p-6">
        {item ? (
          <>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-linear-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center">
                <UserCircle2 className="w-7 h-7 text-indigo-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {item.company}
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.service}
                  </span>
                  <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.waitTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <Button
                icon={ArrowRight}
                label="Chamar agora"
                className="w-full sm:w-auto px-4 md:px-6 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold hover:text-white text-sm shadow-md hover:shadow-lg"
              />
              <Button
                icon={X}
                label="Marcar ausente"
                className="w-full sm:w-auto px-4 md:px-6 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-300 font-semibold text-sm"
              />
            </div>
          </>
        ) : (
          <div className="text-gray-500">Ninguém aguardando no momento.</div>
        )}
      </div>
    </div>
  );
}

function InServiceMiniCard({ items }: { items: QueueItem[] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
        <h2 className="text-lg font-bold text-gray-900">Em Atendimento</h2>
        <p className="text-sm text-gray-500 mt-1">
          {items.length} em andamento
        </p>
      </div>

      <div className="divide-y divide-gray-100">
        {items.map((item) => (
          <div
            key={item.id}
            className="p-4 md:p-5 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-semibold text-gray-900 truncate">
                  {item.name}
                </div>
                <div className="text-sm text-gray-500 truncate">
                  {item.company}
                </div>
                <div className="flex gap-2 mt-2">
                  <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {item.service}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      statusPill[item.status]
                    }`}
                  >
                    {statusLabel[item.status]}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  icon={Check}
                  label="Finalizar"
                  className="w-full sm:w-auto px-4 py-2 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-all duration-300 font-semibold text-sm"
                />
                <Button
                  icon={X}
                  label="Ausente"
                  className="w-full sm:w-auto px-4 py-2 bg-red-50 text-red-700 rounded-xl hover:bg-red-100 transition-all duration-300 font-semibold text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-6 text-center text-gray-500">
            Nenhum atendimento em andamento.
          </div>
        )}
      </div>
    </div>
  );
}
