export interface Employee {
  id: string;
  name: string;
  company: string;
  companyId: string;
  position: string;
  admission: string;
  status: string;
}

export interface EmployeesTableProps {
  employees: NewEmployee[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface NewEmployee {
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

export interface EmployeesFilters {
  page?: number;
  limit?: number;
  nome?: string | null;
  empresa?: string | null;
  cpf?: string | null;
  status?: number | null;
}

export interface EmployeesResponse {
  employees: NewEmployee[];
  total: number;
  total_ativos: number;
  total_inativos: number;
}
