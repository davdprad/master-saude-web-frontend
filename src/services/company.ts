import { CompaniesFilters, CompaniesResponse } from "../types/company";
import { api } from "./api";

export async function getCompanies(
  filters: CompaniesFilters = {},
): Promise<CompaniesResponse> {
  const { page = 1, limit = 10, empresa = null, status = null } = filters;

  const response = await api.get<CompaniesResponse>("/empresas", {
    params: {
      page,
      limit,
      empresa,
      status,
    },
  });

  return response.data;
}
