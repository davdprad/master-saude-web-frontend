import Card from "@/src/components/cards/Card";
import { Button } from "@/src/components/ui/Button";
import {
  Building,
  Building2,
  Crown,
  LucideIcon,
  Paperclip,
  Plus,
  User,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <>
      <Card className="p-7 rounded-3xl">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex flex-col gap-3">
              <div className="flex gap-4">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 grid place-items-center ring-1 ring-black/15 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)]">
                  <Crown className="text-white" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-700">
                    Portal Master Saúde
                  </p>
                  <p className="text-slate-700 text-sm">
                    Acesso administrativo
                  </p>
                </div>
              </div>

              <div className="min-w-0">
                <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
                  Olá, seja bem-vindo(a)!
                </h1>
                <p className="mt-2 max-w-2xl text-sm  text-slate-700">
                  Aqui você acompanha os clientes, empresas parceiras e acessa o
                  histórico de exames de forma rápida e organizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex mt-6 lg:hidden flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-600">
            Dica: use o menu lateral para navegar entre os menus.
          </p>
        </div>
      </Card>

      <Card className="p-7 mt-6 rounded-3xl">
        <h2 className="text-lg font-semibold text-slate-900">
          O que você pode fazer aqui
        </h2>
        <p className="mt-1 text-sm text-slate-700">
          Acesse rapidamente as principais funções do sistema.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-6">
          <CardDescription
            icon={Users}
            title="Gestão de Colaboradores"
            content="Visualize a lista de colaboradores vinculados às empresas parceiras."
          />

          <CardDescription
            icon={Building}
            title="Gestão de empresas"
            content="Visualize a lista de empresas parceiras."
          />

          <CardDescription
            icon={Paperclip}
            title="Histórico e Exames"
            content="Acesse rapidamente o histórico de exames de cada colaborador."
          />

          <CardDescription
            icon={Plus}
            title="Criação de usuários"
            content="Crie novos usuários para acessar o sistema."
          />
        </div>

        {/* Rodapé */}
        <div className="hidden mt-6 lg:flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-600">
            Dica: use o menu lateral para navegar entre os menus.
          </p>
        </div>
      </Card>
    </>
  );
}

function CardDescription({
  title,
  content,
  icon: Icon,
}: {
  title: string;
  content: string;
  icon: LucideIcon;
}) {
  return (
    <div className="flex gap-4 rounded-2xl bg-white ring-1 ring-black/5 p-5 hover:bg-slate-50/50 transition-all duration-300">
      <div className="h-10 w-10 rounded-xl bg-slate-100 ring-1 ring-black/10 shrink-0 grid place-items-center">
        <Icon size={18} className="text-slate-700" />
      </div>
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-600">{content}</p>
      </div>
    </div>
  );
}
