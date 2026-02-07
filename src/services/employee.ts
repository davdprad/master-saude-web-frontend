import { api } from "./api";
import { EmployeesFilters, EmployeesResponse } from "@/src/types/employee";

export async function getEmployees(
  filters: EmployeesFilters = {},
): Promise<EmployeesResponse> {
  const {
    page = 1,
    limit = 10,
    nome = null,
    empresa = null,
    cpf = null,
    status = null,
  } = filters;

  const response = await api.get<EmployeesResponse>("/colaboradores", {
    params: {
      page,
      limit,
      nome,
      empresa,
      cpf,
      status,
    },
  });

  return response.data;
}

export async function getCompanyEmployees(
  filters: EmployeesFilters = {},
): Promise<EmployeesResponse> {
  const {
    page = 1,
    limit = 10,
    nome = null,
    cpf = null,
    status = null,
  } = filters;

  const response = await api.get<EmployeesResponse>("/empresas/funcionarios", {
    params: {
      page,
      limit,
      nome,
      cpf,
      status,
    },
  });
  return response.data;
}
