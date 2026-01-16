import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: LucideIcon;
}

export function Button({
  label,
  icon: Icon,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`
        relative flex items-center justify-center gap-3
        px-4 py-3 rounded-lg
        text-gray-700
        hover:bg-indigo-50 hover:text-indigo-600
        transition-all group
        disabled:opacity-50 disabled:cursor-not-allowed
        cursor-pointer hover:scale-102
        ${className}
      `}
    >
      {Icon && (
        <Icon
          size={20}
          className="group-hover:scale-110 transition-transform"
        />
      )}

      {label && <span className="font-medium">{label}</span>}
    </button>
  );
}
