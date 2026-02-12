export interface Exam {
  NidAnexo: string;
  NomExame: string;
  DesAnexo: string;
  DesEmpresa: string;
  DatProcedimento: string | null;
}

export interface ExamsTableProps {
  exams: Exam[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ExamsFilters {
  nidFuncionario: number;
}

export type ExamsResponse = Exam[];
