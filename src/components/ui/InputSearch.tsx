import { LucideIcon } from "lucide-react";

interface InputSearch {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
}

export default function InputSearch({
  value,
  onChange,
  placeholder = "Pesquisar...",
  icon: Icon,
}: InputSearch) {
  return (
    <div className="flex-1 relative">
      {Icon && (
        <Icon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      )}
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
      />
    </div>
  );
}
