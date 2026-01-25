import {
  Home,
  Users,
  Settings,
  BarChart,
  Building,
  Menu,
  FileText,
  Clock,
} from "lucide-react";

export const sidebarConfig = {
  MASTER: [
    { icon: Home, label: "Dashboard", href: "/master" },
    { icon: Users, label: "Colaboradores", href: "/master/colaboradores" },
    { icon: Building, label: "Empresas", href: "/master/empresas" },
    { icon: FileText, label: "Exames", href: "/master/exames" },
    { icon: Clock, label: "Fila de espera", href: "/master/fila" },
  ],
  EMPLOYEE: [
    { icon: Home, label: "Home", href: "/colab" },
    { icon: FileText, label: "Exames", href: "/colab/exames" },
  ],
  COMPANY: [
    { icon: Home, label: "Home", href: "/empresa/home" },
    { icon: Menu, label: "Perfil", href: "/empresa/profile" },
  ],
  GUEST: [
    { icon: Settings, label: "Login", href: "/login" },
    { icon: BarChart, label: "Cadastro", href: "/register" },
  ],
};
