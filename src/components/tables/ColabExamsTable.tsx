import { Download, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/Button";
import { useEffect, useMemo, useState } from "react";
import { EmployeeExamsTableProps } from "@/src/types/exam";
import { Pagination } from "../ui/Pagination";

export default function EmployeeExamsTable({
  exams,
  action,
  itemsPerPage = 5,
}: EmployeeExamsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(exams.length / itemsPerPage));
  }, [exams.length, itemsPerPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const paginatedExams = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return exams.slice(start, end);
  }, [exams, currentPage, itemsPerPage]);

  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
          <div className="col-span-6">Exame</div>
          <div className="col-span-2 text-center">Data de Realização</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {paginatedExams.map((exam) => (
            <div
              key={exam.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-6 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate">
                    {exam.exam}
                  </div>
                  <div className="text-sm text-gray-500 lg:hidden">
                    Data: {exam.realizationDate}
                  </div>
                </div>
              </div>

              {/* Data */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-between lg:justify-center">
                {exam.realizationDate}
              </div>

              {/* Status */}
              <div className="hidden lg:flex lg:col-span-2 items-center justify-between lg:justify-center">
                {exam.status}
              </div>

              {/* Ações */}
              <div className="flex lg:col-span-2 items-center justify-between lg:justify-center">
                <Button
                  label="Baixar"
                  icon={Download}
                  iconSize={18}
                  onClick={action}
                  aria-label="Ações"
                  className="bg-indigo-600 text-white text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-700 hover:text-white"
                />

                <div className="flex lg:hidden items-center rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                  {exam.status}
                </div>
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
