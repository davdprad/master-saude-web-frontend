"use client";

import { Building2, Users, ArrowRight } from "lucide-react";
import Card from "@/src/components/cards/Card";
import { Button } from "@/src/components/ui/Button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CompanyWelcome() {
  const router = useRouter();

  return (
    <>
      <Card className="p-6">
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-indigo-500 to-indigo-700 text-white shadow-sm hover:scale-105 transition-all">
              <Building2 size={25} />
            </div>

            <div className="min-w-0">
              <p className="text-sm text-gray-600">Portal da Empresa</p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
                Olá, seja bem-vindo(a)!
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-gray-600">
                Aqui você acompanha seus colaboradores e acessa o histórico de
                exames de forma rápida e organizada.
              </p>
            </div>
          </div>

          <Button
            label="Ir para colaboradores"
            icon={Users}
            onClick={() => router.push("empresa/colaboradores")}
            className="bg-linear-to-br from-indigo-500 to-indigo-700 text-white w-full sm:w-auto text-md px-6 py-3 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
          />
        </div>
      </Card>

      <Card className="p-6 mt-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <CardDescription
            title="Gestão de Colaboradores"
            content="Visualize a lista de colaboradores vinculados à sua empresa."
          />

          <CardDescription
            title="Histórico e Exames"
            content="Acesse rapidamente o histórico de exames de cada colaborador."
          />
        </div>

        {/* Rodapé */}
        <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray-600">
            Dica: use o menu lateral para navegar por exames, laudos e
            relatórios.
          </p>
        </div>
      </Card>
    </>
  );
}

function CardDescription({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1 text-sm text-gray-600">{content}</p>
    </div>
  );
}
