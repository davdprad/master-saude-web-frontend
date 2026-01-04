// components/dashboard/WaitingPatientsCard.tsx
import { ArrowRight, UserCircle2 } from "lucide-react";

interface Patient {
  id: number;
  name: string;
  company: string;
  time: string;
}

interface Props {
  patients: Patient[];
}

export function WaitingPatientsCard({ patients }: Props) {
  return (
    <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Pacientes em Espera
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {patients.length} pacientes aguardando
          </p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 md:px-6 py-2.5 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold text-sm shadow-lg shadow-indigo-500/30 hover:shadow-xl hover:shadow-indigo-500/40 hover:scale-105">
          <ArrowRight size={18} />
          <span className="hidden sm:inline">Gerenciar Fila</span>
          <span className="sm:hidden">Gerenciar</span>
        </button>
      </div>

      <div className="flex-1 overflow-auto">
        {patients.map((patient, index) => (
          <div
            key={patient.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 md:p-5 border-b border-gray-50 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className="flex-shrink-0 w-12 h-12 bg-linear-to-br from-indigo-100 to-blue-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <UserCircle2
                  className="w-7 h-7 text-indigo-600"
                  strokeWidth={2}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 truncate">
                  {patient.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-gray-500 truncate">
                    {patient.company}
                  </span>
                  <span className="flex-shrink-0 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {patient.time}
                  </span>
                </div>
              </div>
            </div>
            <button className="w-full sm:w-auto px-4 md:px-6 py-2 bg-linear-to-r from-indigo-600 to-blue-600 text-white rounded-xl hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 font-semibold text-sm shadow-md hover:shadow-lg hover:scale-105">
              Atender
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
