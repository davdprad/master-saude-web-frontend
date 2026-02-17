import { LucideIcon } from "lucide-react";
import Card from "./Card";

export default function PresentationCard({
  accessText,
  description,
  icon: Icon,
}: {
  accessText: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <Card className="p-7 rounded-3xl">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex gap-4">
              <div className="h-12 w-12 rounded-2xl bg-indigo-600 grid place-items-center ring-1 ring-black/15 shadow-[0_0_10px_2px_rgba(99,102,241,0.4)]">
                <Icon className="text-white" />
              </div>
              <div>
                <p className="text-lg font-semibold text-slate-700">
                  Portal Master Saúde
                </p>
                <p className="text-slate-700 text-sm">{accessText}</p>
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="mt-1 text-2xl font-semibold text-slate-900 sm:text-3xl">
                Olá, seja bem-vindo(a)!
              </h1>
              <p className="mt-2 max-w-2xl text-sm  text-slate-700">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex mt-6 lg:hidden flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
        <p className="text-xs text-gray-600">
          Dica: use o menu lateral para navegar entre os menus.
        </p>
      </div>
    </Card>
  );
}
