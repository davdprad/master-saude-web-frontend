"use client";

import { useState } from "react";
import { ChevronDown, LogOut, User, Settings } from "lucide-react";
import { postLogout } from "@/src/services/auth";
import { useRouter } from "next/navigation";

interface UserDropdownProps {
  userName?: string;
  userEmail?: string;
  userRole?: string;
}

export default function UserDropdown({
  userName = "Usuário",
  userEmail = "usuario@email.com",
  userRole = "Admin",
}: UserDropdownProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await postLogout();
    router.replace("/master");
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
          <span className="text-white font-semibold text-sm">
            {userName.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-800">{userName}</p>
          <p className="text-xs text-gray-500">{userRole}</p>
        </div>
        <ChevronDown size={18} className="text-gray-600" />
      </button>

      {/* Dropdown do usuário */}
      {showUserMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowUserMenu(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
            <div className="p-3 border-b border-gray-200">
              <p className="text-sm font-medium text-gray-800">{userEmail}</p>
            </div>
            {/* <div className="py-2">
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <User size={18} />
                Meu Perfil
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings size={18} />
                Configurações
              </a>
            </div> */}
            <div className="border-t border-gray-200 py-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
