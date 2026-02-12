import { Exam } from "@/src/types/exam";

export function mapExamsToUI(exams: any[]): Exam[] {
  return exams.map((e) => ({
    NidAnexo: String(e.NidAnexo),
    NomExame: String(e.NomExame),
    DesAnexo: String(e.DesAnexo),
    DesEmpresa: String(e.DesEmpresa),
    DatProcedimento: String(e.DatProcedimento),
  }));
}
