export type RegisteredUserRole = "master" | "convenio" | "cliente";

export interface RegisteredUser {
  id: number;
  login: string;
  role: RegisteredUserRole;
  company_id: number | null;
  employee_id: number | null;
  access_level: number;
}

export interface RegisteredUsersResponse {
  users: RegisteredUser[];
}