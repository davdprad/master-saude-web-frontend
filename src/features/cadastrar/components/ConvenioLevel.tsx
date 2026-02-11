import type { ConvenioNivel, Errors } from "../types";

export function ConvenioLevel({
  nivelConvenio,
  setNivelConvenio,
  errors,
}: {
  nivelConvenio: ConvenioNivel;
  setNivelConvenio: (n: ConvenioNivel) => void;
  errors: Errors;
}) {
  return (
    <div className="rounded-2xl ring-1 ring-black/10 bg-slate-100 p-4">
      <p className="mb-4 text-sm font-medium text-slate-900">Nível de acesso</p>

      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-3">
          {[1, 2].map((n) => (
            <label
              key={n}
              className={[
                "flex cursor-pointer items-center gap-2 rounded-xl px-3 py-2 text-sm hover:-translate-y-0.5 transition-all duration-300",
                nivelConvenio === n
                  ? "bg-indigo-600 text-white ring-1 ring-indigo-500 shadow-[0_0_15px_5px_rgba(99,102,241,0.4)]"
                  : "bg-white text-slate-900 ring-1 ring-black/10",
              ].join(" ")}
            >
              <input
                type="radio"
                name="nivel"
                value={n}
                checked={nivelConvenio === n}
                onChange={() => setNivelConvenio(n as ConvenioNivel)}
                className="accent-indigo-600 hover:accent-indigo-700"
              />
              Nível {n}
            </label>
          ))}
        </div>

        <span className="text-sm text-slate-900">
          {nivelConvenio === 1
            ? "Acesso a todos os exames (Ambulatório)"
            : "Acesso somente a ASO (RH)"}
        </span>
      </div>

      {errors.nivelConvenio && (
        <p className="mt-2 text-xs text-red-600">{errors.nivelConvenio}</p>
      )}
    </div>
  );
}
