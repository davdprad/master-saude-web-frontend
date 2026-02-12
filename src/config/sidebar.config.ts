import { Home, Users, Building, FileText, Plus } from "lucide-react";

export const sidebarConfig = {
  MASTER: [
    { icon: Home, label: "Início", href: "/master/inicio" },
    { icon: Users, label: "Colaboradores", href: "/master/colaboradores" },
    { icon: Building, label: "Empresas", href: "/master/empresas" },
    { icon: Plus, label: "Cadastrar", href: "/master/cadastrar" },
  ],
  EMPLOYEE: [
    { icon: Home, label: "Início", href: "/cliente/inicio" },
    { icon: FileText, label: "Meus Exames", href: "/cliente/exames" },
  ],
  COMPANY: [
    { icon: Home, label: "Início", href: "/convenio/inicio" },
    { icon: Users, label: "Colaboradores", href: "/convenio/colaboradores" },
  ],
};
