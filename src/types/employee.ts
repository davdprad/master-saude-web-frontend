export interface Employee {
  id: number;
  name: string;
  company: string;
  companyId: string;
  position: string;
  admission: string;
  status: string;
}

export interface EmployeeCounts {
  total: number;
  total_ativos: number;
  total_inativos: number;
}

export interface EmployeesResponse {
  employees: Employee[];
  counts: EmployeeCounts;
}

export interface EmployeesTableProps {
  employees: Employee[];
  action?: () => void;
  itemsPerPage?: number;
}
