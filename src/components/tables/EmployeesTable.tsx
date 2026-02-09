import { FileText } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { EmployeesTableProps } from "@/src/types/employee";
import { useRouter } from "next/navigation";

export default function EmployeesTable({
  role,
  employees,
  currentPage,
  totalPages,
  onPageChange,
}: EmployeesTableProps) {
  const router = useRouter();

  function onOpenEmployee(nid: string) {
    router.push(`/${role}/colaboradores/${nid}/exames`);
  }

  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-indigo-700 ring-1 ring-indigo-100 rounded-2xl shadow-sm transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-15 gap-4 p-4 lg:px-5 lg:py-3 font-semibold text-sm text-white tracking-wider">
          <div className="col-span-3">Nome</div>
          <div className="col-span-3">Cargo</div>
          <div className="col-span-3">Empresa</div>
          <div className="col-span-2 text-center">Admissão</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y">
          {employees.map((employee, index) => (
            <div
              key={`${employee.NidFuncionario}-${index}`}
              className="border-slate-200 grid grid-cols-1 lg:grid-cols-15 gap-4 p-4 lg:px-5 lg:py-3 bg-slate-50 hover:bg-slate-100 transition-all duration-300 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-800 font-bold text-sm">
                    {employee.NomFuncionario?.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-slate-800">
                    {employee.NomFuncionario}
                  </div>
                  <div className="text-sm text-slate-800 lg:hidden">
                    {employee.DesEmpresa}
                  </div>
                </div>
              </div>

              {/* Cargo */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm text-slate-800">
                  <span className="lg:hidden font-medium text-slate-800">
                    Cargo:{" "}
                  </span>
                  {employee.DesFuncao}
                </div>
              </div>

              {/* Empresa - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-3 items-center">
                <div className="text-sm text-slate-800">
                  {employee.DesEmpresa}
                </div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <div className="text-sm text-slate-800">
                  <span className="lg:hidden font-medium text-slate-800">
                    Admissão:{" "}
                  </span>
                  {employee.DatASO || "Sem data"}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
                    employee.status === "Ativo"
                      ? "bg-teal-100 text-teal-700 ring-teal-700/30"
                      : "bg-rose-100 text-rose-700 ring-rose-600/30"
                  }
                  `}
                >
                  {employee.status}
                </span>
              </div>

              {/* Ações */}
              <div className="lg:col-span-2 flex items-center justify-start lg:justify-center">
                <Button
                  icon={FileText}
                  iconSize={18}
                  label="Exames"
                  onClick={() => onOpenEmployee(employee.NidFuncionario)}
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
