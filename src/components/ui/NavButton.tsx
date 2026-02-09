import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";

interface NavButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function NavButton({ href, label, icon: Icon }: NavButtonProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <a
      href={href}
      className={`
        ${
          isActive
            ? "bg-indigo-600 shadow-[0_0_15px_5px_rgba(99,102,241,0.4)] hover:bg-indigo-700 hover:ring-1 hover:ring-indigo-600"
            : "hover:bg-white/20 hover:ring-1 hover:ring-white/30"
        } 
        flex items-center gap-3 px-4 py-3 text-white rounded-xl transition-all group
      `}
    >
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
      <span className="font-medium">{label}</span>
    </a>
  );
}
