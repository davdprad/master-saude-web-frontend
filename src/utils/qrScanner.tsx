"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

interface QrScannerProps {
  onScanSuccess: (text: string) => void;
  onScanError: (err: string) => void;
}

const QrScanner = ({ onScanSuccess, onScanError }: QrScannerProps) => {

  const handleScan = (result: any) => {
    if (result) {
      const rawValue = result[0]?.rawValue;
      onScanSuccess(rawValue);
    }
  };

  const handleError = () => {
    onScanError("Erro ao acessar a câmera ou ler o código.");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-m">
        {/* Componente do Scanner */}
        <div className="relative aspect-square">
          <Scanner
            onScan={handleScan}
            onError={handleError}
            scanDelay={2000} // Intervalo entre leituras (ms)
            allowMultiple={false} // Permitir múltiplas leituras
            components={{
              finder: true, // Mostra a borda de mira
            }}
            sound={false}
            styles={{
              container: {
                borderRadius: "10px",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default QrScanner;
