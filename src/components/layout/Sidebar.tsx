"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Role } from "@/src/types/role";
import { sidebarConfig } from "@/src/config/sidebar.config";
import Image from "next/image";
import LogoMaster from "@/public/logo-master.svg";

interface SidebarProps {
  role: Role;
}

export default function Sidebar({ role }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = sidebarConfig[role];

  return (
    <>
      {/* Botão mobile - aparece apenas em telas pequenas */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay para mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static
          top-0 left-0 h-full bg-white shadow-xl z-40
          transition-transform duration-300 ease-in-out
          w-64
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Logo */}
        <div className="p-7 border-b border-gray-200">
          <div className="flex items-center">
            <Image src={LogoMaster} alt="Logo" className="rounded-lg" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <a
                key={index}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
              >
                <Icon
                  size={20}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-medium">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
