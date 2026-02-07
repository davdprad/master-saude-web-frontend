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
      <div className="bg-white rounded-2xl border border-gray-200 hover:shadow-sm transition-shadow duration-300 overflow-hidden">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-15 gap-4 px-6 py-3 bg-indigo-50 border-b border-gray-100 font-semibold text-sm text-gray-900 tracking-wider">
          <div className="col-span-3">Nome</div>
          <div className="col-span-3">Cargo</div>
          <div className="col-span-3">Empresa</div>
          <div className="col-span-2 text-center">Admissão</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Ações</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y divide-gray-100">
          {employees.map((employee, index) => (
            <div
              key={`${employee.NidFuncionario}-${index}`}
              className="grid grid-cols-1 lg:grid-cols-15 gap-4 p-4 lg:px-6 lg:py-3 hover:bg-linear-to-r hover:from-indigo-50/50 hover:to-transparent transition-all duration-200 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-600 font-bold text-sm">
                    {employee.NomFuncionario?.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-gray-900">
                    {employee.NomFuncionario}
                  </div>
                  <div className="text-sm text-gray-500 lg:hidden">
                    {employee.DesEmpresa}
                  </div>
                </div>
              </div>

              {/* Cargo */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Cargo:{" "}
                  </span>
                  {employee.DesFuncao}
                </div>
              </div>

              {/* Empresa - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-3 items-center">
                <div className="text-sm text-gray-700">
                  {employee.DesEmpresa}
                </div>
              </div>

              {/* Admissão */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <div className="text-sm text-gray-700">
                  <span className="lg:hidden font-medium text-gray-500">
                    Admissão:{" "}
                  </span>
                  {employee.DatASO || "Sem data"}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-2 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    employee.status === "Ativo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
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
                  aria-label="Exames"
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
