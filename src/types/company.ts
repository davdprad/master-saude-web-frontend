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