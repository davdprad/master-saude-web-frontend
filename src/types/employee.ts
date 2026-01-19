export interface Employee {
  id: number;
  name: string;
  company: string;
  position: string;
  admission: string;
  status: string;
}

export interface EmployeesTableProps {
  employees: Employee[];
  action?: () => void;
  itemsPerPage?: number;
}
