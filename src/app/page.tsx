"use client";

import { useRouter } from "next/navigation";
import Card from "@/src/components/cards/Card";
import { Crown, ShieldCheck, Building2, ArrowRight } from "lucide-react";
import LogoMaster from "@/public/logo-master-white.svg";
import Image from "next/image";

type Role = "master" | "convenio" | "cliente";

const ROLES: Array<{
  role: Role;
  title: string;
  desc: string;
  icon: React.ElementType;
  href: string;
  badge: string;
}> = [
  {
    role: "master",
    title: "Master",
    desc: "Acesso administrativo para gerenciamento completo do sistema.",
    icon: Crown,
    href: "/master",
    badge: "Admin",
  },
  {
    role: "convenio",
    title: "Convênio",
    desc: "Acesso para empresas parceiras acompanharem colaboradores e exames.",
    icon: Building2,
    href: "/convenio",
    badge: "Parceiro",
  },
  {
    role: "cliente",
    title: "Cliente",
    desc: "Acesso para consulta e acompanhamento de informações autorizadas.",
    icon: ShieldCheck,
    href: "/cliente",
    badge: "Usuário",
  },
];

export default function HomeRoleSelectPage() {
  const router = useRouter();

  function goTo(href: string) {
    router.push(href);
  }

  return (
    <div className="min-h-[calc(100vh-0px)] flex items-center justify-center px-4 py-10 bg-linear-to-br from-indigo-600 to-indigo-800">
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center">
          <Image
            src={LogoMaster}
            alt="Logo"
            className="rounded-lg h-12 w-min"
          />

          <p className="mt-2 text-sm text-white">
            Selecione o tipo de acesso para continuar.
          </p>
        </div>

        {/* Cards */}
        <Card className="p-8 sm:mt-8 sm:p-1 bg-white/0 border-0 hover:shadow-none rounded-none">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ROLES.map(({ role, title, desc, icon: Icon, href, badge }) => (
              <button
                key={role}
                type="button"
                onClick={() => goTo(href)}
                className="group relative text-left rounded-3xl bg-white ring-1 ring-black/5 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
              >
                <div className="relative flex flex-col gap-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-xl bg-slate-100 ring-1 ring-black/10 grid place-items-center">
                      <Icon className="text-slate-700" size={18} />
                    </div>

                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-black/10">
                      {badge}
                    </span>
                  </div>

                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-indigo-700">
                    Entrar
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Footer hint */}
          <div className="mt-6 border-t border-white/50 pt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-white">
              Dica: se você não tiver certeza do acesso, confirme com o
              administrador.
            </p>
            <span className="text-xs text-white">
              © {new Date().getFullYear()} Master Saúde
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
