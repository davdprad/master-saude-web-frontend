import { SelectOption } from "@/src/types/optionsSelect";

export const ITEMS_PER_PAGE = 10;

export const ROLE_OPTIONS: SelectOption[] = [
  { label: "Todos os perfis", value: "" },
  { label: "Master", value: "master" },
  { label: "Convênio", value: "convenio" },
  { label: "Cliente", value: "cliente" },
];

export const ROLE_LABEL: Record<string, string> = {
  master: "Master",
  convenio: "Convênio",
  cliente: "Cliente",
};