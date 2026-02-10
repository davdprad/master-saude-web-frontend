import { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface InputSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  icon?: LucideIcon;
  /**
   * Tempo de debounce em milissegundos.
   * Quando 0, o `onChange` é disparado imediatamente.
   *
   * @default 0
   */
  debounceMs?: number;
  readOnly?: boolean;
}

export default function InputSearch({
  value,
  onChange,
  placeholder = "Pesquisar...",
  icon: Icon,
  debounceMs = 0,
  readOnly = false,
}: InputSearchProps) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceMs <= 0) return;

    const t = setTimeout(() => {
      if (internalValue !== value) onChange(internalValue);
    }, debounceMs);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [internalValue, debounceMs]);

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
        value={internalValue}
        onChange={(e) => {
          const v = e.target.value;
          setInternalValue(v);
          if (debounceMs <= 0) onChange(v);
        }}
        readOnly={readOnly}
        className={`w-full pl-10 pr-4 py-2.5 ${readOnly ? "bg-slate-100 pointer-events-none" : "bg-white"} border border-gray-200 rounded-xl
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-transparent transition-all`}
      />
    </div>
  );
}
