import { MoreHorizontal, Eye } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { useEffect, useMemo, useState } from "react";
import { ExamsTableProps } from "@/src/types/exam";
import { API_BASE_URL, endpoints } from "@/src/services/api";

export default function ExamsTable({
  exams,
  action,
  itemsPerPage = 5,
}: ExamsTableProps) {
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

  // Função para download do exame
  const handleDownload = async (examId: string) => {
    try {
      console.log('Tentando baixar exame com ID:', examId);
      console.log('URL completa:', `${API_BASE_URL}${endpoints.downloadExame}/${examId}`);
      
      // Testa se o ID é válido
      if (!examId || examId === 'undefined' || examId === 'null') {
        throw new Error('ID do exame inválido');
      }
      
      // Redireciona para a URL do download (trata como redirecionamento)
      window.open(`${API_BASE_URL}${endpoints.downloadExame}/${examId}`, '_blank');
      
      console.log('Redirecionamento para download iniciado');
    } catch (error) {
      console.error('Erro ao baixar exame:', error);
      alert('Erro ao baixar exame. Verifique o console para mais detalhes.');
    }
  };

  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-14 gap-4 px-6 py-4 bg-linear-to-r from-indigo-50 to-blue-50 border-b border-gray-100 font-semibold text-sm text-gray-700 uppercase tracking-wider">
          <div className="col-span-3">Paciente</div>
          <div className="col-span-3">Exame</div>
          <div className="col-span-2">Empresa</div>
          <div className="col-span-3 text-center">Realização</div>
          <div className="col-span-1 text-center">Download</div>
          <div className="col-span-2"></div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {paginatedExams.map((exam, index) => (
            <div
              key={`${exam.id}-${index}`}
              className="grid grid-cols-1 lg:grid-cols-14 gap-4 p-4 lg:px-6 lg:py-4 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                  <span className="text-indigo-600 font-semibold text-sm">
                    {exam.pacient.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-gray-900 truncate">
                    {exam.pacient}
                  </div>
                  <div className="text-sm text-gray-500 lg:hidden">
                    {exam.company}
                  </div>
                </div>
              </div>

              {/* Cargo */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Exame:{" "}
                  </span>
                  {exam.exam}
                </div>
              </div>

              {/* Empresa - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-2 items-center">
                <div className="text-sm lg:text-base text-gray-700">
                  {exam.company}
                </div>
              </div>

              {/* Realização */}
              <div className="lg:col-span-3 flex items-center justify-center">
                <div className="text-sm lg:text-base text-gray-700 text-center">
                  {exam.realizationDate}
                </div>
              </div>

              {/* Download */}
              <div className="lg:col-span-1 flex items-center justify-center">
                <button
                  onClick={() => handleDownload(exam.nidAnexo?.toString() || exam.examId)}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                  title="Download PDF"
                >
                  <Eye size={16} className="mr-2" />
                  PDF
                </button>
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
