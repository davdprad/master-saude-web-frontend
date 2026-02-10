import { toast } from "sonner";
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

export async function downloadExame(nid_anexo: string | number): Promise<void> {
  const toastId = toast.loading("Baixando exame...");

  try {
    const response = await api.get(`/exames/download/${nid_anexo}`, {
      responseType: "blob",
    });

    // Cria um link temporário na memória para disparar o download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;

    // Tenta extrair o nome do arquivo do header ou define um padrão
    link.setAttribute("download", `exame-${nid_anexo}.pdf`);

    document.body.appendChild(link);
    link.click();

    // Limpeza
    link.parentNode?.removeChild(link);
    window.URL.revokeObjectURL(url);

    toast.success("Exame baixado com sucesso!", { id: toastId });
  } catch (error: any) {
    toast.error("Erro ao iniciar download.", { id: toastId });
    throw error;
  }
}
