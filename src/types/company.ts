export interface Company {
  id: number;
  name: string;
  cnpj: string;
  email: string;
  phone: string;
  employees: number;
  status: string;
}

export interface CompaniesTableProps {
  companies: Company[];
  action?: () => void;
  itemsPerPage?: number;
}

export interface NewCompany {
  NidEmpresa: string;
  DesEmpresa: string;
  GraRisco: string;
  NidCNAE1: string;
  FlgSituacao: string;
  DesEMail: string;
  DesTelefone1: string;
  DesTelefone2: string;
  total_funcionarios: string;
}

export interface CompaniesFilters {
  page?: number;
  limit?: number;
  empresa?: string | null;
  status?: number | null;
}

export interface CompaniesResponse {
  companies: NewCompany[];
  total: number;
}
