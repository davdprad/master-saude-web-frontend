import { Crown, ShieldCheck, Building2, User2 } from "lucide-react";
import { Role } from "@/src/types/auth";

export const ROLES: Array<{
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
    desc: "Acesso para acompanhamento de exames.",
    icon: User2,
    href: "/cliente",
    badge: "Usuário",
  },
];
