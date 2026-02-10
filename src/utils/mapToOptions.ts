import { Company } from "../types/company";
import { SelectOption } from "../types/optionsSelect";

export function mapCompaniesToOptions(companies: Company[]): SelectOption[] {
  return [
    { label: "Todas as empresas", value: "" },
    ...companies.map((company) => ({
      label: company.DesEmpresa,
      value: company.DesEmpresa,
    })),
  ];
}
