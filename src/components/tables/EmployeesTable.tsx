import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { useEffect, useMemo, useState } from "react";
import { EmployeesTableProps } from "@/src/types/employee";

export default function EmployeesTable({
  employees,
  action,
  itemsPerPage = 5,
}: EmployeesTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(employees.length / itemsPerPage));
  }, [employees.length, itemsPerPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return employees.slice(start, end);
  }, [employees, currentPage, itemsPerPage]);

  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-14 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
          <div className="col-span-3">Nome</div>
          <div className="col-span-3">Cargo</div>
          <div className="col-span-3">Empresa</div>
          <div className="col-span-2 text-center">Admissão</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {paginatedEmployees.map((employee) => (
            <div
              key={employee.id}
              className="grid grid-cols-1 lg:grid-cols-14 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
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
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Cargo:{" "}
                  </span>
                  {employee.position}
                </div>
              </div>

              {/* Empresa - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-3 items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  {employee.company}
                </div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <div className="text-sm lg:text-base text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Admissão:{" "}
                  </span>
                  {employee.admission}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
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
