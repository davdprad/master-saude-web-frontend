"use client";

import { useEffect, useState } from "react";
import { ChevronDown, LogOut, User2 } from "lucide-react";
import { postLogout } from "@/src/services/auth";
import { useRouter } from "next/navigation";

function getCookie(name: string) {
  if (typeof document === "undefined") return undefined;

  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="))
    ?.split("=")[1];
}

export default function UserDropdown() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const router = useRouter();

  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const u = getCookie("username");
    setUserName(u ? decodeURIComponent(u) : null);
  }, []);

  async function handleLogout() {
    try {
      const path = await postLogout();
      router.replace(path);
    } catch (err) {}
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu(!showUserMenu)}
        className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition"
      >
        <div className="w-9 h-9 bg-linear-to-br from-indigo-600 to-indigo-800 rounded-full flex items-center justify-center">
          <User2 size={16} className="text-white" />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-800">{userName}</p>
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
          <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl ring-1 ring-black/5 z-20">
            <div className="p-3 border-b border-black/10">
              <p className="text-sm font-medium text-gray-800">{userName}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 text-sm text-red-600 hover:bg-red-50 w-full"
            >
              <LogOut size={18} />
              Sair
            </button>
          </div>
        </>
      )}
    </div>
  );
}
