import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../ui/Pagination";
import { CompaniesTableProps } from "@/src/types/company";

export default function CompaniesTable({
  companies,
  currentPage,
  totalPages,
  onPageChange,
}: CompaniesTableProps) {
  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-3 bg-indigo-50 border-b border-gray-100 font-semibold text-sm text-gray-900 tracking-wider">
          <div className="col-span-4">Empresa</div>
          <div className="col-span-3">E-mail</div>
          <div className="col-span-2">Telefones</div>
          <div className="col-span-2 text-center">Colaboradores</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {companies.map((company, index) => (
            <div
              key={`${company.NidEmpresa}-${index}`}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:px-6 lg:py-3 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">
                    {company.DesEmpresa.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-gray-900 truncate">
                    {company.DesEmpresa}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm text-gray-700">
                  {company.DesEMail || "Sem e-mail"}
                </div>
              </div>

              {/* Telefones */}
              <div className="lg:col-span-2 flex items-center">
                <div className="text-sm text-gray-700">
                  {company.DesTelefone1 || "-"}
                  <br />
                  {company.DesTelefone2 || "-"}
                </div>
              </div>

              {/* Total de funcionários - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-2 items-center lg:justify-center">
                <div className="text-sm text-gray-700 ">
                  {company.total_funcionarios || "Sem total"}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-1 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    company.FlgSituacao === "1"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {company.FlgSituacao === "1" ? "Ativo" : "Inativo"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
