import type { CreatedUser } from "../types";
import { Info } from "./Info";

export function SuccessCard({
  created,
  onCopyAgain,
}: {
  created: CreatedUser;
  onCopyAgain: () => void;
}) {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-emerald-900">
          Usuário criado com sucesso
        </p>

        {created.copied && (
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
            Senha copiada!
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <Info label="Perfil" value={created.role} />
        <Info label="Usuário" value={created.username} />
        <Info label="Senha" value={created.password} mono />
      </div>

      <div className="mt-4">
        <button
          type="button"
          onClick={onCopyAgain}
          className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
        >
          Copiar senha novamente
        </button>
      </div>
    </div>
  );
}
