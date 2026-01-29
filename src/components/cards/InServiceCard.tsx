import { CheckCircle, UserCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

interface Patient {
  id: number;
  name: string;
  startTime: string;
}

interface Props {
  patients: Patient[];
}

export function InServiceCard({ patients }: Props) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-green-50 to-emerald-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Em Atendimento</h2>
          <span className="flex items-center justify-center w-8 h-8 bg-green-200 text-green-700 rounded-full font-bold text-sm">
            {patients.length}
          </span>
        </div>
      </div>

      <div className="max-h-64 overflow-auto">
        {patients.map((patient) => (
          <div
            key={patient.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 md:p-5 border-b border-gray-100 last:border-0 hover:bg-linear-to-r hover:from-green-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 bg-linear-to-br from-green-100 to-green-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <span className="text-green-600 font-bold text-md">
                  {patient.name?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 text-sm truncate">
                  {patient.name}
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  Início: {patient.startTime}
                </div>
              </div>
            </div>
            <Button
              label="Atender"
              className="bg-linear-to-br from-green-500 to-green-700 text-white text-sm px-4 py-2 gap-2 rounded-xl hover:bg-green-800 hover:text-white transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
