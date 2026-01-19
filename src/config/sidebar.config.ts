import { Home, Users, Settings, BarChart, Building, Menu } from "lucide-react";

export const sidebarConfig = {
  MASTER: [
    { icon: Home, label: "Dashboard", href: "/master" },
    { icon: Users, label: "Colaboradores", href: "/master/colaboradores" },
    { icon: Building, label: "Empresas", href: "/master/empresas" },
    { icon: Building, label: "Fila de espera", href: "/master/fila" },
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
