import { Role } from "./auth";

export interface Employee {
  NidFuncionario: string;
  NomFuncionario: string;
  DesCPF: string;
  DesSetor: string;
  DesFuncao: string;
  DesEmpresa: string;
  NidEmpresa: string;
  FlgAtivo: string;
  status: string;
  DatASO: string;
}

export interface EmployeesTableProps {
  role: Role;
  employees: Employee[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EmployeesFilters {
  page?: number;
  limit?: number;
  nome?: string | null;
  nidFuncionario?: string | null;
  empresa?: string | null;
  nidEmpresa?: string | null;
  cpf?: string | null;
  status?: number | null;
}

export interface EmployeesResponse {
  employees: Employee[];
  total: number;
  total_ativos: number;
  total_inativos: number;
}
