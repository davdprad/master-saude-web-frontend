"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreHorizontal,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

export default function EmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const statsCards = [
    {
      icon: Users,
      number: 150,
      label: "Total de Colaboradores",
      gradient: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
    },
    {
      icon: UserCheck,
      number: 145,
      label: "Colaboradores Ativos",
      gradient: "from-green-500 to-emerald-600",
      bgLight: "bg-green-50",
    },
    {
      icon: UserX,
      number: 5,
      label: "Colaboradores Inativos",
      gradient: "from-red-500 to-pink-600",
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

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Barra de Filtros */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Busca */}
        <div className="flex-1 relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Buscar por nome ou CPF..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Filtro Empresa */}
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white min-w-[200px]"
        >
          <option value="">Todas as Empresas</option>
          <option value="alfa">Empresa Alfa</option>
          <option value="beta">Empresa Beta</option>
        </select>

        {/* Filtro Status */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white min-w-[180px]"
        >
          <option value="">Todos os Status</option>
          <option value="ativo">Ativo</option>
          <option value="inativo">Inativo</option>
        </select>

        {/* Botão Adicionar */}
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-linear-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-300 font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 whitespace-nowrap">
          <Plus size={20} />
          <span className="hidden sm:inline">Adicionar Colaborador</span>
          <span className="sm:hidden">Adicionar</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={`absolute inset-0 bg-linear-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              />

              <div className="relative">
                <div
                  className={`w-12 h-12 ${stat.bgLight} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon
                    className={`w-6 h-6 bg-linear-to-br ${stat.gradient} bg-clip-text text-transparent`}
                    strokeWidth={2.5}
                  />
                </div>

                <div
                  className={`text-3xl md:text-4xl font-bold mb-2 bg-linear-to-br ${stat.gradient} bg-clip-text text-transparent`}
                >
                  {stat.number}
                </div>

                <p className="text-xs md:text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
          <div className="col-span-3">Nome</div>
          <div className="col-span-2">Cargo</div>
          <div className="col-span-2">Empresa</div>
          <div className="col-span-2">Admissão</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {employee.name.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate">
                    {employee.name}
                  </div>
                  <div className="text-sm text-gray-500 lg:hidden">
                    {employee.company}
                  </div>
                </div>
              </div>

              {/* Cargo */}
              <div className="lg:col-span-2 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Cargo:{" "}
                  </span>
                  {employee.position}
                </div>
              </div>

              {/* Empresa - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-2 items-center">
                <div className="text-sm text-gray-700">{employee.company}</div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-2 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Admissão:{" "}
                  </span>
                  {employee.admission}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                    employee.status === "ativo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {employee.status === "ativo" ? "Ativo" : "Inativo"}
                </span>
              </div>

              {/* Ações */}
              <div className="lg:col-span-1 flex items-center justify-start lg:justify-center">
                <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-indigo-100 text-gray-600 hover:text-indigo-600 transition-all duration-200">
                  <MoreHorizontal size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
