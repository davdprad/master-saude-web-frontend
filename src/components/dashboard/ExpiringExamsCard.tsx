import { FileText } from "lucide-react";

interface Exam {
  id: number;
  name: string;
  exam: string;
  days: number;
}

interface Props {
  exams: Exam[];
}

export function ExpiringExamsCard({ exams }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-amber-50 to-orange-50">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          Exames Vencendo
        </h2>
        <button className="px-3 md:px-4 py-2 border-2 border-amber-600 text-amber-600 rounded-xl hover:bg-amber-50 transition-all duration-300 font-semibold text-sm hover:scale-105">
          Ver Todos
        </button>
      </div>

      <div className="max-h-64 overflow-auto">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 border-b border-gray-50 last:border-0 hover:bg-linear-to-r hover:from-amber-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="flex-shrink-0 w-10 h-10 bg-linear-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6 text-amber-600" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 text-sm truncate">
                  {exam.name}
                </div>
                <div className="text-xs font-medium text-amber-600 mt-0.5">
                  {exam.exam} • Vence em {exam.days} dias
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 py-2 bg-linear-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105">
              Agendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
