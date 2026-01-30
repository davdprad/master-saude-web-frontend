import { SelectOption } from "@/src/types/optionsSelect";

export const ITEMS_PER_PAGE = 10;

export const STATUS_OPTIONS: SelectOption[] = [
  { label: "Todos os status", value: "" },
  { label: "Ativos", value: "Ativo" },
  { label: "Inativos", value: "Inativo" },
];
