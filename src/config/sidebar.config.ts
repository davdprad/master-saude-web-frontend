import { Home, Users, Settings, BarChart, FileText, Menu } from "lucide-react";

export const sidebarConfig = {
  MASTER: [
    { icon: Home, label: "Dashboard", href: "/master" },
    { icon: Users, label: "Colaboradores", href: "/master/colaboradores" },
    { icon: FileText, label: "Relatórios", href: "/master/reports" },
  ],
  USER: [
    { icon: Home, label: "Home", href: "/home" },
    { icon: Menu, label: "Perfil", href: "/profile" },
  ],
  GUEST: [
    { icon: Settings, label: "Login", href: "/login" },
    { icon: BarChart, label: "Cadastro", href: "/register" },
  ],
};
