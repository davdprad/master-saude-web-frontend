import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect, useMemo, useState } from "react";
import { Pagination } from "../ui/Pagination";
import { CompaniesTableProps } from "@/src/types/company";

export default function CompaniesTable({
  companies,
  action,
  itemsPerPage = 5,
}: CompaniesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(companies.length / itemsPerPage));
  }, [companies.length, itemsPerPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedCompanies = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return companies.slice(start, end);
  }, [companies, currentPage, itemsPerPage]);

  return (
    <>
      {/* Tabela de Empresas */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-14 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
          <div className="col-span-4">Empresa</div>
          <div className="col-span-3">Email</div>
          <div className="col-span-2">Contato</div>
          <div className="col-span-2 text-center">Colaboradores</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Lista de Empresas */}
        <div className="divide-y divide-gray-100">
          {paginatedCompanies.map((company, index) => (
            <div
              key={`${company.NidEmpresa}-${index}`}
              className="grid grid-cols-1 lg:grid-cols-14 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-4 */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {company.DesEmpresa.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate">
                    {company.DesEmpresa}
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  {company.DesEMail || "-"}
                </div>
              </div>

              {/* Contato */}
              <div className="lg:col-span-2 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  {company.DesTelefone1 || "-"}
                </div>
              </div>

              {/* Colaboradores */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <div className="text-sm lg:text-base text-gray-700">
                  {company.total_funcionarios}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    company.FlgSituacao === 1
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {company.FlgSituacao === 1 ? "Ativo" : "Inativo"}
                </span>
              </div>

              {/* Ações */}
              <div className="lg:col-span-1 flex items-center justify-start lg:justify-center gap-2">
                <button
                  onClick={action}
                  className="inline-flex items-center px-2 py-1 border border-transparent text-xs font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  title="Mais informações"
                >
                  <Eye size={14} className="mr-1" />
                  Mais
                </button>
                <Button
                  icon={MoreHorizontal}
                  onClick={action}
                  aria-label="Ações"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Paginação */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </>
  );
}
