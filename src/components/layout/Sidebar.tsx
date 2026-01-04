import { Role } from "@/src/types/role";
import { sidebarConfig } from "@/src/config/sidebar.config";
import Image from "next/image";
import LogoMaster from "@/public/logo-master.svg";
import NavButton from "../ui/NavButton";

interface SidebarProps {
  userRole: Role;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ userRole, isOpen, onClose }: SidebarProps) {
  const navItems = sidebarConfig[userRole];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div
          onClick={onClose}
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
            return (
              <NavButton
                key={index}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            );
          })}
        </nav>
      </aside>
    </>
  );
}
