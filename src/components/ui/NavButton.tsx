import { LucideIcon } from "lucide-react";

interface NavButtonProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export default function NavButton({ href, label, icon: Icon }: NavButtonProps) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
    >
      <Icon size={20} className="group-hover:scale-110 transition-transform" />
      <span className="font-medium">{label}</span>
    </a>
  );
}
