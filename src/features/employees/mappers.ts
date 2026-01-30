import { Employee } from "@/src/types/employee";

export function mapEmployeesToUI(employees: any[]): Employee[] {
  return employees.map((e) => ({
    NidFuncionario: String(e.NidFuncionario),
    NomFuncionario: e.NomFuncionario,
    DesCPF: e.DesCPF,
    DesSetor: e.DesSetor,
    DesFuncao: e.DesFuncao,
    DesEmpresa: e.DesEmpresa,
    NidEmpresa: String(e.NidEmpresa),
    FlgAtivo: String(e.FlgAtivo),
    status: e.status,
    DatASO: e.DatASO,
  }));
}

export function mapStatusToApi(statusValue: string): number | null {
  if (!statusValue) return null;
  return statusValue === "Ativo" ? 1 : 0;
}
