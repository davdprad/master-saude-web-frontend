import { resolve } from "path";
import { ExamsFilters, ExamsResponse } from "../types/exam";
import { api } from "./api";

export async function getExams(filters: ExamsFilters): Promise<ExamsResponse> {
  const { nidFuncionario } = filters;

  const response = await api.get<ExamsResponse>(
    `/funcionario/${nidFuncionario}/exames`,
    {
      params: {
        nidFuncionario,
      },
    },
  );

  return response.data;
}
