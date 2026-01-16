import { LucideIcon, ChevronDown } from "lucide-react";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
  icon?: LucideIcon;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Selecione...",
  icon: Icon,
}: SelectProps) {
  return (
    <div className="group relative min-w-[180px]">
      {Icon && (
        <Icon
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition"
        />
      )}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`
            w-full appearance-none
            ${Icon ? "pl-10" : "pl-4"} pr-10 py-2.5
            border border-gray-200 rounded-xl
             bg-white text-gray-900
            focus:outline-none focus:ring-2 focus:ring-indigo-500
            focus:border-transparent
            transition-all`}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={18}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
      />
    </div>
  );
}
