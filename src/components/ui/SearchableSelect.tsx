import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, Search, LucideIcon } from "lucide-react";
import InputSearch from "./InputSearch";

interface Option {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  icon?: LucideIcon;

  /**
   * Callback opcional para busca remota (API).
   * É chamado quando o usuário digita no campo de busca.
   * Geralmente usado para atualizar filtros paginados.
   */
  setQuery?: (value: string) => void;

  /**
   * Tempo de debounce em milissegundos.
   * Quando 0, o `onChange` é disparado imediatamente.
   *
   * @default 0
   */
  debounceMs?: number;
}

export default function SearchableSelect({
  value,
  onChange,
  setQuery,
  options,
  placeholder = "Selecione...",
  icon: Icon,
  debounceMs = 0,
}: SearchableSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative min-w-60">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`w-full flex items-center justify-between
                    ${Icon ? "pl-10" : "pl-4"}
                   px-4 py-2.5 rounded-xl
                   border border-gray-200 bg-white
                   text-left
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   transition`}
      >
        {Icon && (
          <Icon
            size={20}
            className={`absolute left-3 top-1/2 -translate-y-1/2 ${
              selected?.value === "" ? "text-gray-400" : "text-gray-600"
            } group-focus-within:text-indigo-500 transition`}
          />
        )}
        <span
          className={selected?.value === "" ? "text-gray-400" : "text-gray-600"}
        >
          {selected?.label || placeholder}
        </span>
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute z-50 mt-2 w-full rounded-xl
                        border border-gray-200 bg-white shadow-lg overflow-hidden"
        >
          {/* Search */}
          <div className="p-2">
            <InputSearch
              value={search}
              onChange={(v) => {
                setSearch(v);
                setQuery?.(v);
              }}
              placeholder="Buscar..."
              icon={Search}
              debounceMs={debounceMs}
            />
          </div>

          {/* Options */}
          <ul className="max-h-56 overflow-auto">
            {filteredOptions.length === 0 && (
              <li className="px-4 py-3 text-sm text-gray-500">
                Nenhum resultado
              </li>
            )}

            {filteredOptions.map((option, index) => (
              <li
                key={`${option.value}-${index}`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setSearch("");
                }}
                className="flex items-center justify-between
                           px-4 py-2 cursor-pointer
                           hover:bg-indigo-50"
              >
                <span>{option.label}</span>
                {value === option.value && (
                  <Check size={16} className="text-indigo-600" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
