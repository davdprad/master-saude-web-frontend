export interface Exam {
  NidAnexo: string;
  NomExame: string;
  DesAnexo: string;
  DatASO: string | null;
  DatValidade: string | null;
}

export interface ExamsTableProps {
  exams: Exam[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface EmployeeExamsTableProps {
  exams: Exam[];
  action?: () => void;
  itemsPerPage?: number;
}

export interface ExamsFilters {
  nidFuncionario: number;
}

export type ExamsResponse = Exam[];
