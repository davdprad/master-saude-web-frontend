import { FileText } from "lucide-react";
import { Button } from "../ui/Button";

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
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-amber-50 to-orange-50">
        <h2 className="text-lg font-bold text-gray-900">Exames Vencendo</h2>
        <Button
          label="Ver todos"
          className="bg-linear-to-br from-orange-400 to-orange-600 text-white text-sm px-4 py-2 gap-2 rounded-xl hover:bg-orange-700 hover:text-white transition-all"
        />
      </div>

      <div className="max-h-64 overflow-auto">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 border-b border-gray-100 last:border-0 hover:bg-linear-to-r hover:from-amber-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="shrink-0 w-10 h-10 bg-linear-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5 text-amber-600" strokeWidth={2} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 text-sm truncate">
                  {exam.name}
                </div>
                <div className="text-xs font-medium text-orange-600 mt-0.5">
                  {exam.exam} • Vence em {exam.days} dias
                </div>
              </div>
            </div>
            <Button
              label="Agendar"
              className="bg-linear-to-br from-orange-400 to-orange-600 text-white text-sm px-4 py-2 gap-2 rounded-xl hover:bg-orange-700 hover:text-white transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
