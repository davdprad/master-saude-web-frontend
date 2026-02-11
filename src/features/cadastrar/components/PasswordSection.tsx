"use client";

import { ShieldCheck } from "lucide-react";
import InputSearch from "@/src/components/ui/InputSearch";
import { Button } from "@/src/components/ui/Button";
import { ConvenioLevel } from "./ConvenioLevel";
import type { ConvenioNivel, Errors } from "../types";
import { Role } from "@/src/types/auth";

export function PasswordSection({
  password,
  onGenerate,
  onCopy,
  role,
  nivelConvenio,
  setNivelConvenio,
  errors,
}: {
  password: string;
  onGenerate: () => void;
  onCopy: () => void;
  role: Role;
  nivelConvenio: ConvenioNivel;
  setNivelConvenio: (n: ConvenioNivel) => void;
  errors: Errors;
}) {
  return (
    <div className="flex-1">
      <label className="mb-1.5 block text-sm font-medium text-slate-900">
        Senha de Acesso
      </label>

      <div className="flex gap-2">
        <div className="relative flex-1">
          <InputSearch
            value={password}
            onChange={() => {}}
            icon={ShieldCheck}
            readOnly
          />
        </div>

        <Button
          type="button"
          label="Gerar"
          onClick={onGenerate}
          className="bg-slate-50 text-slate-900 ring-1 ring-black/10 text-sm px-3 py-2 gap-2 rounded-xl hover:bg-slate-200 hover:text-slate-900 transition-all duration-300"
        />
      </div>

      <button
        type="button"
        onClick={onCopy}
        className="mt-2 text-xs font-semibold text-indigo-600 transition-colors"
      >
        Copiar senha para área de transferência
      </button>

      {role === "convenio" && (
        <div className="mt-4">
          <ConvenioLevel
            nivelConvenio={nivelConvenio}
            setNivelConvenio={setNivelConvenio}
            errors={errors}
          />
        </div>
      )}
    </div>
  );
}
