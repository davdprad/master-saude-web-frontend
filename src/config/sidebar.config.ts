import {
  Home,
  Users,
  Settings,
  BarChart,
  Building,
  FileText,
  Clock,
} from "lucide-react";

export const sidebarConfig = {
  MASTER: [
    { icon: Home, label: "Início", href: "/master" },
    { icon: Users, label: "Colaboradores", href: "/master/colaboradores" },
    { icon: Building, label: "Empresas", href: "/master/empresas" },
    { icon: Clock, label: "Fila de espera", href: "/master/fila" },
  ],
  EMPLOYEE: [
    { icon: Home, label: "Início", href: "/colab" },
    { icon: FileText, label: "Meus Exames", href: "/colab/exames" },
  ],
  COMPANY: [
    { icon: Home, label: "Início", href: "/empresa" },
    { icon: Users, label: "Colaboradores", href: "/empresa/colaboradores" },
  ],
  GUEST: [
    { icon: Settings, label: "Login", href: "/login" },
    { icon: BarChart, label: "Cadastro", href: "/register" },
  ],
};
