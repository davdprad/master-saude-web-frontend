import { NewCompany } from "@/src/types/company";

export function mapCompaniesToUI(companies: any[]): NewCompany[] {
  return companies.map((c) => ({
    NidEmpresa: String(c.NidEmpresa),
    DesEmpresa: c.DesEmpresa,
    GraRisco: String(c.GraRisco),
    NidCNAE1: String(c.NidCNAE1),
    FlgSituacao: String(c.FlgSituacao),
    DesEMail: c.DesEMail,
    DesTelefone1: c.DesTelefone1,
    DesTelefone2: c.DesTelefone2,
    total_funcionarios: String(c.total_funcionarios),
  }));
}

export function mapStatusToApi(statusValue: string): number | null {
  if (!statusValue) return null;
  return statusValue === "Ativo" ? 1 : 0;
}
