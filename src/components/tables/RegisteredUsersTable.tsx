import { Trash2 } from "lucide-react";
import { Button } from "../ui/Button";
import { Pagination } from "../ui/Pagination";
import { RegisteredUser } from "@/src/types/registeredUser";
import { ROLE_LABEL } from "@/src/features/access/constants";

interface RegisteredUsersTableProps {
  users: RegisteredUser[];
  deletingId: number | null;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete: (userId: number) => void;
}

export default function RegisteredUsersTable({
  users,
  deletingId,
  currentPage,
  totalPages,
  onPageChange,
  onDelete,
}: RegisteredUsersTableProps) {
  return (
    <div className="bg-indigo-700 ring-1 ring-indigo-100 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="hidden lg:grid lg:grid-cols-12 gap-4 p-4 lg:px-5 lg:py-3 font-semibold text-sm text-white tracking-wider">
        <div className="col-span-3">Login</div>
        <div className="col-span-2 text-center">Perfil</div>
        <div className="col-span-2 text-center">Empresa</div>
        <div className="col-span-2 text-center">Colaborador</div>
        <div className="col-span-1 text-center">Nível</div>
        <div className="col-span-2 text-center">Ações</div>
      </div>

      <div className="divide-y">
        {users.length === 0 ? (
          <div className="p-6 bg-slate-50 text-sm text-slate-700 text-center">
            Nenhum usuário encontrado.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="border-slate-200 grid grid-cols-1 lg:grid-cols-12 gap-4 p-4 lg:px-5 lg:py-3 bg-slate-50 hover:bg-slate-100 transition-all duration-300"
            >
              <div className="lg:col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 bg-linear-to-br from-indigo-100 to-indigo-300 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-indigo-800 font-bold text-sm">
                    {user.login?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <span className="text-sm font-semibold text-slate-800">
                  {user.login}
                </span>
              </div>

              <div className="lg:col-span-2 flex items-center lg:justify-center text-sm text-slate-800">
                <span className="lg:hidden font-medium">Perfil: </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ring-1 ${
                    user.role === "master"
                      ? "bg-indigo-100 text-indigo-700 ring-indigo-700/30"
                      : user.role === "convenio"
                        ? "bg-teal-100 text-teal-700 ring-teal-700/30"
                        : "bg-sky-100 text-sky-700 ring-sky-700/30"
                  }`}
                >
                  {ROLE_LABEL[user.role]}
                </span>
              </div>

              <div className="lg:col-span-2 flex items-center lg:justify-center text-sm text-slate-800">
                <span className="lg:hidden font-medium">Empresa: </span>
                {user.company_id ?? "-"}
              </div>

              <div className="lg:col-span-2 flex items-center lg:justify-center text-sm text-slate-800">
                <span className="lg:hidden font-medium">Colaborador: </span>
                {user.employee_id ?? "-"}
              </div>

              <div className="lg:col-span-1 flex items-center lg:justify-center text-sm text-slate-800">
                <span className="lg:hidden font-medium">Nível: </span>
                {user.access_level}
              </div>

              <div className="lg:col-span-2 flex items-center justify-start lg:justify-center">
                <Button
                  icon={Trash2}
                  iconSize={16}
                  label={deletingId === user.id ? "Excluindo..." : "Excluir"}
                  onClick={() => onDelete(user.id)}
                  disabled={deletingId === user.id}
                  className="bg-rose-600 text-white ring-1 ring-rose-600 text-sm px-3 py-2 gap-2 rounded-xl hover:bg-rose-700 hover:text-white transition-all duration-300"
                />
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}