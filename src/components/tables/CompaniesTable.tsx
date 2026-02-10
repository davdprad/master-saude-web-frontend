import { Pagination } from "../ui/Pagination";
import { CompaniesTableProps } from "@/src/types/company";

export default function CompaniesTable({
  companies,
  currentPage,
  totalPages,
  onPageChange,
}: CompaniesTableProps) {
  return (
    <>
      {/* Tabela de Colaboradores */}
      <div className="bg-indigo-700 ring-1 ring-indigo-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Header da Tabela */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4 lg:px-5 lg:py-3 font-semibold text-sm text-white tracking-wider">
          <div className="col-span-4">Empresa</div>
          <div className="col-span-3">E-mail</div>
          <div className="col-span-2">Telefones</div>
          <div className="col-span-2 text-center">Colaboradores</div>
          <div className="col-span-1 text-center">Status</div>
        </div>

        {/* Lista de Colaboradores */}
        <div className="divide-y">
          {companies.map((company, index) => (
            <div
              key={`${company.NidEmpresa}-${index}`}
              className="border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:px-5 lg:py-3 bg-slate-50 hover:bg-slate-100 transition-all duration-300 group"
            >
              {/* Nome - Mobile: destaque, Desktop: col-span-3 */}
              <div className="lg:col-span-4 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                  <span className="text-indigo-800 font-bold text-sm">
                    {company.DesEmpresa.charAt(0)}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="lg:text-sm font-semibold text-slate-800 truncate">
                    {company.DesEmpresa}
                    <br />
                    <span className="text-xs font-normal text-slate-600">
                      {company.DesCNPJCEI}
                    </span>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="lg:col-span-3 flex items-center">
                <div className="text-sm text-slate-800">
                  {company.DesEMail || "Sem e-mail"}
                </div>
              </div>

              {/* Telefones */}
              <div className="lg:col-span-2 flex items-center">
                <div className="text-sm text-slate-800">
                  {company.DesTelefone1 || "-"}
                  <br />
                  {company.DesTelefone2 || "-"}
                </div>
              </div>

              {/* Total de funcionários - Escondido no mobile */}
              <div className="hidden lg:flex lg:col-span-2 items-center lg:justify-center">
                <div className="text-sm text-slate-800">
                  {company.total_funcionarios || "Sem total"}
                </div>
              </div>

              {/* Status */}
              <div className="lg:col-span-1 flex items-center lg:justify-center">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    company.FlgSituacao === "1"
                      ? "bg-teal-100 text-teal-700 ring-teal-700/30"
                      : "bg-rose-100 text-rose-700 ring-rose-600/30"
                  }`}
                >
                  {company.FlgSituacao === "1" ? "Ativo" : "Inativo"}
                </span>
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
