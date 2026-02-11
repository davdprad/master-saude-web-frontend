import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { ExamsTableProps } from "@/src/types/exam";
import { useDownloadExame } from "@/src/features/exams/hooks/useDownload";

export default function ExamsTable({
  exams,
  currentPage,
  totalPages,
  onPageChange,
}: ExamsTableProps) {
  const { handleDownload } = useDownloadExame();

  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-indigo-700 ring-1 ring-indigo-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-5 gap-4 p-4 lg:px-5 lg:py-3 font-semibold text-sm text-white tracking-wider">
          <div className="col-span-3">Exames</div>
          <div className="col-span-1 text-center">Data</div>
          <div className="col-span-1 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {exams.map((exam, index) => (
            <div
              key={`${exam.NidAnexo}-${index}`}
              className="border-slate-200 grid grid-cols-1 lg:grid-cols-5 gap-4 p-4 lg:px-5 lg:py-3 bg-slate-50 hover:bg-slate-100 transition-all duration-300 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-800 font-bold text-sm">
                    {exam.NomExame?.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-slate-800">
                    {exam.NomExame}
                  </div>
                </div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-1 flex items-center lg:justify-center">
                <div className="text-sm text-slate-800">
                  <span className="lg:hidden font-medium text-slate-800">
                    Data:{" "}
                  </span>
                  {exam.DatASO || "Sem data"}
                </div>
              </div>

              {/* Ações */}
              <div className="lg:col-span-1 flex items-center justify-start lg:justify-center">
                <Button
                  iconSize={18}
                  icon={Download}
                  label={"Baixar"}
                  onClick={() => handleDownload(exam.NidAnexo)}
                  aria-label="Baixar"
                  className="bg-indigo-700 text-white ring-1 ring-indigo-600 text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all duration-300"
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
