import { Company } from "../types/company";
import { Employee } from "../types/employee";
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

export function mapNidCompaniesToOptions(companies: Company[]): SelectOption[] {
  return [
    { label: "Todas as empresas", value: "" },
    ...companies.map((company) => ({
      label: company.DesEmpresa,
      value: company.NidEmpresa,
    })),
  ];
}

export function mapNidEmployeesToOptions(
  employees: Employee[],
): SelectOption[] {
  return [
    { label: "Todos os funcionários", value: "" },
    ...employees.map((employee) => ({
      label: employee.NomFuncionario,
      value: employee.NidFuncionario,
    })),
  ];
}
