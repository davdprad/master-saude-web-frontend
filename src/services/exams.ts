import { ExamsFilters, ExamsResponse } from "../types/exam";
import { api } from "./api";

export async function getExams(filters: ExamsFilters): Promise<ExamsResponse> {
  const { nidFuncionario } = filters;

  const response = await api.get<ExamsResponse>(
    `/funcionario/${nidFuncionario}/exames`,
  );

  return response.data;
}

export async function getMyExams(): Promise<ExamsResponse> {
  const response = await api.get<ExamsResponse>("/me/exames");
  return response.data;
}
