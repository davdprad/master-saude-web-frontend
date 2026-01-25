import Card from "./Card";
import { Clock } from "lucide-react";

export default function InQueueCard({ position }: { position: number }) {
  return (
    <Card className="relative overflow-hidden">
      <Glow />
      <div className="relative p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
              <Clock className="h-4 w-4" />
              Em atendimento
            </div>

            <h2 className="mt-3 text-xl font-semibold text-slate-900">
              Você está na fila!
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Acompanhe sua posição e aguarde ser chamado.
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
            <Clock className="h-6 w-6" />
          </div>
        </div>

        <div className="mt-6 flex items-end gap-4">
          <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
            <div className="text-3xl font-bold text-slate-900">#{position}</div>
            <div className="text-xs text-slate-500">
              Sua posição no atendimento
            </div>
          </div>

          <div className="text-xs text-slate-500">Atualizado agora</div>
        </div>
      </div>
    </Card>
  );
}

function Glow() {
  return (
    <div className="pointer-events-none absolute -top-24 right-0 h-48 w-48 rounded-full bg-[#E7E6FA] blur-3xl" />
  );
}
