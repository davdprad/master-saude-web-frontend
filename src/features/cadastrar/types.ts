import { Role } from "@/src/types/auth";

export type ConvenioNivel = 1 | 2;

export type CreatedUser = {
  role: Role;
  username: string;
  password: string;
  copied?: boolean;
};

export type Errors = Partial<{
  form: string;
  username: string;
  empresaId: string;
  nome: string;
  nivelConvenio: string;
}>;

export type RoleOption = { value: Role; label: string };
