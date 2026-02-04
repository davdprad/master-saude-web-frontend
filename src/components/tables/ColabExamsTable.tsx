import { Download, FileText, MoreHorizontal } from "lucide-react";
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
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-10 gap-4 px-6 py-3 bg-indigo-50 border-b border-gray-100 font-semibold text-sm text-gray-900 tracking-wider">
          <div className="col-span-6">Exame</div>
          <div className="col-span-2 text-center">Data de Realização</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {paginatedExams.map((exam) => (
            <div
              key={exam.NidAnexo}
              className="grid grid-cols-1 lg:grid-cols-10 gap-1 lg:gap-4 p-4 lg:px-6 lg:py-3 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-6 flex items-center gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    <FileText
                      size={18}
                      className="text-indigo-600"
                      strokeWidth={2}
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-sm font-semibold text-gray-900 truncate">
                      {exam.NomExame}
                    </div>
                    <div className="text-sm text-gray-500 lg:hidden">
                      Data: {exam.DatASO || "Sem data"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Data */}
              <div className="hidden lg:flex lg:col-span-2 text-sm items-center justify-between lg:justify-center">
                {exam.DatASO || "Sem data"}
              </div>

              {/* Ações */}
              <div className="flex lg:col-span-2 items-center justify-end lg:justify-center">
                <Button
                  label="Baixar"
                  icon={Download}
                  iconSize={18}
                  onClick={action}
                  aria-label="Ações"
                  className="bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
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
