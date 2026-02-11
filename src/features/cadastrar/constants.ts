import { Role } from "@/src/types/auth";
import type { RoleOption } from "./types";
import { Briefcase, ShieldCheck, UserCircle } from "lucide-react";

export const ROLES: RoleOption[] = [
  { value: "master", label: "Master" },
  { value: "convenio", label: "Convênio" },
  { value: "cliente", label: "Cliente" },
];

export const ROLE_HELPER_TEXT: Record<Role, string> = {
  master: "Acesso total ao sistema. Não vinculado a empresas específicas.",
  convenio: "Acesso para parceiros e convênios médicos.",
  cliente: "Acesso para funcionários de empresas clientes.",
};

export const ROLE_ICONS = {
  master: ShieldCheck,
  convenio: Briefcase,
  cliente: UserCircle,
};
