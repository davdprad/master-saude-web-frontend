"use client";

import { useState } from "react";
import { downloadExame } from "@/src/services/exams";

type NidAnexo = string;

export function useDownloadExame() {
  const [downloadingId, setDownloadingId] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function handleDownload(nidAnexo: NidAnexo) {
    try {
      setError(null);
      setDownloadingId(nidAnexo);

      await downloadExame(nidAnexo);
    } catch (err) {
      console.error("Erro ao realizar download:", err);
      setError("Não foi possível baixar o arquivo.");
    } finally {
      setDownloadingId("");
    }
  }

  // Helper para verificar se um item específico está carregando
  const isDownloading = (nidAnexo: NidAnexo) => downloadingId === nidAnexo;

  return {
    handleDownload,
    isDownloading,
    downloadingId,
    downloadError: error,
  };
}
