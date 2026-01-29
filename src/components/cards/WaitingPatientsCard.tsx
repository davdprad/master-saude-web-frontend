// components/dashboard/WaitingPatientsCard.tsx
import { ArrowRight, UserCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

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
    <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:px-6 border-b border-gray-100 bg-linear-to-r from-indigo-50 to-blue-50">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-gray-900">
            Pacientes em Espera
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {patients.length} pacientes aguardando
          </p>
        </div>
        <Button
          icon={ArrowRight}
          label="Gerenciar"
          className="bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm px-3 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
        />
      </div>

      <div className="flex-1 overflow-auto">
        {patients.map((patient, index) => (
          <div
            key={`${patient.id}-${index}`}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-4 md:p-5 border-b border-gray-100 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
          >
            <div className="flex items-center gap-3 md:gap-4 min-w-0 flex-1">
              <div className="w-10 h-10 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                <span className="text-indigo-600 font-bold text-md">
                  {patient.name?.charAt(0)}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold text-gray-900 truncate">
                  {patient.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-sm text-gray-500 truncate">
                    {patient.company}
                  </span>
                  <span className="shrink-0 text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">
                    {patient.time}
                  </span>
                </div>
              </div>
            </div>
            <Button
              label="Atender"
              className="bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm px-4 py-2 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
