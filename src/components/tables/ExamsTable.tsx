import { Download } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { ExamsTableProps } from "@/src/types/exam";

export default function ExamsTable({
  exams,
  currentPage,
  totalPages,
  onPageChange,
}: ExamsTableProps) {
  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 px-6 py-3 bg-indigo-50 border-b border-gray-100 font-semibold text-sm text-gray-900 tracking-wider">
          <div className="col-span-3">Exames</div>
          <div className="col-span-1 text-center">Data</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {exams.map((exam) => (
            <div
              key={exam.NidAnexo}
              className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">
                    {exam.NomExame?.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-gray-900">
                    {exam.NomExame}
                  </div>
                </div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-1 flex items-center lg:justify-center">
                <div className="text-sm text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Data:{" "}
                  </span>
                  {exam.DatASO || "Sem data"}
                </div>
              </div>

              {/* Ações */}
              <div className="lg:col-span-1 flex items-center justify-start lg:justify-center">
                <Button
                  icon={Download}
                  iconSize={18}
                  label="Baixar"
                  onClick={() => {}}
                  aria-label="Baixar"
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
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
