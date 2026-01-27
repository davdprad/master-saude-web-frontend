export interface Company {
  NidEmpresa: number;
  DesEmpresa: string;
  GraRisco: number;
  NidCNAE1: number;
  FlgSituacao: number;
  DesEMail: string | null;
  DesTelefone1: string | null;
  DesTelefone2: string | null;
  total_funcionarios: number;
}

export interface CompaniesTableProps {
  companies: Company[];
  action?: () => void;
  itemsPerPage?: number;
}
