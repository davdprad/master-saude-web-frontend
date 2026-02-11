import { Role } from "./auth";

export type CreateUserPayload = {
  login: string;
  senha: string;
  company_id?: string;
  access_level?: 1 | 2;
  empolyee_id?: string;
};

export type CreateUserResponse = {
  id?: string;
  role: Role;
  login: string;
  password?: string;
};
