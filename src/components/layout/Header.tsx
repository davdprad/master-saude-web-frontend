"use client";

import { useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

export default function Header() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Título da página / Breadcrumb */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="text-sm text-gray-500">Bem-vindo de volta!</p>
        </div>

        {/* Ações (direita) */}
        <div className="flex items-center gap-4">
          {/* Notificações */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
            >
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Dropdown de notificações */}
            {showNotifications && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowNotifications(false)}
                />
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-20">
                  <div className="p-4 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-800">
                      Notificações
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="p-4 hover:bg-gray-50 border-b border-gray-100 cursor-pointer"
                      >
                        <p className="text-sm font-medium text-gray-800">
                          Nova notificação {i}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Há 5 minutos
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200">
                    <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                      Ver todas
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Perfil do usuário */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">U</span>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-800">Usuário</p>
                <p className="text-xs text-gray-500">Admin</p>
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
                    <p className="text-sm font-medium text-gray-800">
                      usuario@email.com
                    </p>
                  </div>
                  <div className="py-2">
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
                  </div>
                  <div className="border-t border-gray-200 py-2">
                    <button className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full">
                      <LogOut size={18} />
                      Sair
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
