import QrScanner from "@/src/utils/qrScanner";
import Card from "./Card";

import { QrCode, Camera } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

interface QrScannerCardProps {
  handleSuccess: (text: string) => void;
  handleError: (err: string) => void;
  error: string;
}

export default function QrScannerCard({
  handleSuccess,
  handleError,
  error,
}: QrScannerCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="relative overflow-hidden">
      <div className="relative p-6">
        {/* Card QR Code */}
        <QrScannerHeader />

        <div className="mt-6">
          <Button
            label="Escanear QR Code"
            icon={Camera}
            onClick={() => setOpen(true)}
            className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white w-full"
          />
          <p className="mt-3 text-xs text-slate-500">
            Dica: habilite a câmera quando solicitado.
          </p>
        </div>

        {/* Model QR Code */}
        {open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <button
              aria-label="Fechar"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            {/* Card */}
            <Card className="relative z-10 w-full max-w-md shadow-xl p-5">
              {/* Header */}
              <div className="flex-col items-center justify-center text-center mb-5">
                <h2 className="text-base font-semibold text-gray-900">
                  Ler QR Code
                </h2>
                <p className="text-sm text-gray-500">
                  Centralize o código no quadro
                </p>
              </div>

              {/* Scanner */}
              <QrScanner
                onScanSuccess={handleSuccess}
                onScanError={handleError}
              />

              {/* Helper + error */}
              <div className="mt-5 mb-4 text-center">
                <p className="text-sm text-gray-500">
                  Dica: aproxime a câmera e evite reflexos.
                </p>

                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              {/* Footer */}
              <Button
                label="Cancelar"
                onClick={() => setOpen(false)}
                className="bg-indigo-600 text-white hover:bg-indigo-700 hover:text-white w-full"
              />
            </Card>
          </div>
        )}
      </div>
    </Card>
  );
}

function QrScannerHeader() {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-slate-900">
          <QrCode className="h-4 w-4" />
          Check-in
        </div>

        <h2 className="mt-3 text-xl font-semibold text-slate-900">
          Bem-vindo(a)!
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Para entrar na fila, escaneie o QR Code na recepção.
        </p>
      </div>

      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-indigo-600 text-white shadow-sm hover:scale-105 transition-all">
        <QrCode size={25} />
      </div>
    </div>
  );
}
