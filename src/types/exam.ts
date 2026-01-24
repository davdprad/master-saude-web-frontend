export interface Exam {
  id: number;
  pacient: string;
  company: string;
  companyId: string;
  exam: string;
  examId: string;
  realizationDate: string;
  status: string;
}

export interface ExamsTableProps {
  exams: Exam[];
  action?: () => void;
  itemsPerPage?: number;
}
