export interface Exam {
  id: number;
  pacient: string;
  company: string;
  companyId: string;
  exam: string;
  examId: string;
  realizationDate: string;
  status: string;
  nidAnexo?: number; // Adiciona o NidAnexo para download
}

export interface ExamsTableProps {
  exams: Exam[];
  action?: () => void;
  itemsPerPage?: number;
}

// Tipos para a API de exames agrupados
export interface GroupedExam {
  NidAnexo: number;
  NomExame: string;
  DesAnexo: string;
  DatASO: string;
  DatValidade: string;
}

export interface GroupedEmployee {
  NidFuncionario: number;
  NomFuncionario: string;
  DesCPF: string;
  NidEmpresa: number;
  DesEmpresa: string;
  exames: GroupedExam[];
}

export interface GroupedExamsResponse {
  data: GroupedEmployee[];
  total: number;
  page: number;
  limit: number;
}
