"use client";

import { usePathname } from "next/navigation";
import NotificationsDropdown from "../notifications/NotificationsDropdown";
import UserDropdown from "./UserDropdown";
import { Menu } from "lucide-react";
import getPageTitle from "@/src/utils/getPageTitle";

interface HeaderProps {
  onSidebarClick: () => void;
}

export default function Header({ onSidebarClick }: HeaderProps) {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Título da página / Breadcrumb */}
        {/* Botão menu mobile + Título */}
        <div className="flex items-center gap-4">
          {/* Botão menu - apenas mobile */}
          <button
            onClick={() => onSidebarClick()}
            className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu size={22} />
          </button>

          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800">
              {title}
            </h2>
            <p className="text-sm text-gray-500 hidden sm:block">
              Olá, seja bem-vindo(a)!
            </p>
          </div>
        </div>

        {/* Ações (direita) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notificações */}
          <NotificationsDropdown />

          {/* Perfil do usuário */}
          <UserDropdown />
        </div>
      </div>
    </header>
  );
}
