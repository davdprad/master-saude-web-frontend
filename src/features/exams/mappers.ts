import { Exam } from "@/src/types/exam";

export function mapExamsToUI(exams: any[]): Exam[] {
  return exams.map((e) => ({
    NidAnexo: String(e.NidAnexo),
    NomExame: e.NomExame,
    DesAnexo: e.DesAnexo,
    DatASO: e.DatASO,
    DatValidade: e.DatValidade,
  }));
}
