export interface Company {
  NidEmpresa: string;
  DesEmpresa: string;
  DesCNPJCEI: string;
  GraRisco: string;
  NidCNAE1: string;
  FlgSituacao: string;
  DesEMail: string;
  DesTelefone1: string;
  DesTelefone2: string;
  total_funcionarios: string;
}

export interface CompaniesTableProps {
  companies: Company[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface CompaniesFilters {
  page?: number;
  limit?: number;
  empresa?: string | null;
  status?: number | null;
}

export interface CompaniesResponse {
  companies: Company[];
  total: number;
  total_ativas?: number;
  total_inativas?: number;
}
