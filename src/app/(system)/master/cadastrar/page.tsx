"use client";

import { Button } from "@/src/components/ui/Button";
import InputSearch from "@/src/components/ui/InputSearch";
import SearchableSelect from "@/src/components/ui/SearchableSelect";
import Select from "@/src/components/ui/Select";
import {
  Briefcase,
  Building,
  ShieldCheck,
  User,
  UserCircle,
} from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type Role = "MASTER" | "CONVENIO" | "CLIENTE";
type ConvenioNivel = 1 | 2;

type Empresa = { value: string; label: string };

const ROLES: Array<{ value: Role; label: string }> = [
  { value: "MASTER", label: "Master" },
  { value: "CONVENIO", label: "Convênio" },
  { value: "CLIENTE", label: "Cliente" },
];

const EMPRESAS_MOCK: Empresa[] = [
  { value: "1", label: "Empresa A" },
  { value: "2", label: "Empresa B" },
  { value: "3", label: "Empresa C" },
];

function generatePassword(length: number = 6): string {
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  const all = upper + lower + digits;

  const randIndex = (max: number) => {
    try {
      const arr = new Uint32Array(1);
      crypto.getRandomValues(arr);
      return arr[0] % max;
    } catch {
      return Math.floor(Math.random() * max);
    }
  };

  const pick = (chars: string) => chars[randIndex(chars.length)];

  // garante pelo menos 1 de cada
  const pwd: string[] = [pick(upper), pick(lower), pick(digits)];

  while (pwd.length < length) pwd.push(pick(all));

  // embaralha
  for (let i = pwd.length - 1; i > 0; i--) {
    const j = randIndex(i + 1);
    [pwd[i], pwd[j]] = [pwd[j], pwd[i]];
  }

  return pwd.join("");
}

type CreatedUser = {
  role: Role;
  username: string;
  password: string;
  copied?: boolean;
};

type Errors = Partial<{
  form: string;
  username: string;
  empresaId: string;
  nome: string;
  nivelConvenio: string;
}>;

export default function Page() {
  const empresas = useMemo(() => EMPRESAS_MOCK, []);

  const [role, setRole] = useState<Role>("MASTER");
  const [empresaId, setEmpresaId] = useState<string>("");
  const [nivelConvenio, setNivelConvenio] = useState<ConvenioNivel>(1);
  const [username, setUsername] = useState<string>("");
  const [nome, setNome] = useState<string>("");

  const [password, setPassword] = useState<string>(() => generatePassword(6));
  const [created, setCreated] = useState<CreatedUser | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  useEffect(() => {
    setErrors({});
    setCreated(null);
    setPassword(generatePassword(6));

    if (role === "MASTER") {
      setEmpresaId("");
      setNivelConvenio(1);
      setNome("");
    }
    if (role === "CONVENIO") {
      setNome("");
    }
    if (role === "CLIENTE") {
      setNivelConvenio(1);
    }
  }, [role]);

  const empresaDisabled = role === "MASTER";

  function validate(): Errors {
    const e: Errors = {};
    if (!username.trim()) e.username = "Informe o nome de usuário.";

    if (role !== "MASTER" && !empresaId) e.empresaId = "Selecione uma empresa.";

    if (role === "CLIENTE" && !nome.trim()) e.nome = "Informe o nome.";

    if (role === "CONVENIO" && ![1, 2].includes(nivelConvenio)) {
      e.nivelConvenio = "Selecione um nível válido.";
    }

    return e;
  }

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setCreated(null);

    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    try {
      // monte seu payload aqui
      const payload = {
        role,
        username: username.trim(),
        password,
        ...(role !== "MASTER" ? { empresaId } : {}),
        ...(role === "CONVENIO" ? { nivel: nivelConvenio } : {}),
        ...(role === "CLIENTE" ? { nome: nome.trim() } : {}),
      };

      // exemplo de chamada:
      // await fetch("/api/users", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(payload),
      // });

      await new Promise((r) => setTimeout(r, 400));

      setCreated({
        role: payload.role,
        username: payload.username,
        password: payload.password,
      });
    } catch {
      setErrors((prev) => ({
        ...prev,
        form: "Não foi possível criar o usuário. Tente novamente.",
      }));
    } finally {
      setLoading(false);
    }
  }

  async function copyPassword(pwd: string) {
    try {
      await navigator.clipboard.writeText(pwd);
      setCreated((prev) =>
        prev
          ? { ...prev, copied: true }
          : { role, username, password: pwd, copied: true },
      );
      setTimeout(() => {
        setCreated((prev) => (prev ? { ...prev, copied: false } : prev));
      }, 1200);
    } catch {
      // sem permissão, ignora
    }
  }

  // Mapeamento de ícones para a Navbar
  const roleIcons = {
    MASTER: ShieldCheck,
    CONVENIO: Briefcase,
    CLIENTE: UserCircle,
  };

  return (
    <div className="mx-auto max-w-3xl pb-12">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl font-bold text-slate-900">
          Cadastro de Usuários
        </h1>
        <p className="text-sm text-slate-600">
          Gerencie e crie novos acessos para o sistema Master Saúde.
        </p>
      </div>

      {/* --- NAVBAR DE ROLES --- */}
      <nav className="mb-6 flex p-1 bg-slate-100 rounded-2xl border border-slate-200">
        {ROLES.map((item) => {
          const Icon = roleIcons[item.value];
          const isActive = role === item.value;
          return (
            <button
              key={item.value}
              onClick={() => setRole(item.value)}
              className={[
                "flex flex-1 items-center justify-center gap-2 py-3 text-sm font-medium transition-all duration-200 rounded-xl",
                isActive
                  ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5"
                  : "text-slate-500 hover:text-slate-700 hover:bg-slate-50/50",
              ].join(" ")}
            >
              <Icon
                size={18}
                className={isActive ? "text-indigo-600" : "text-slate-400"}
              />
              {item.label}
            </button>
          );
        })}
      </nav>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all"
      >
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            Configurações de {ROLES.find((r) => r.value === role)?.label}
          </h2>
          <p className="text-xs text-slate-500">
            {role === "MASTER" &&
              "Acesso total ao sistema. Não vinculado a empresas específicas."}
            {role === "CONVENIO" &&
              "Acesso para parceiros e convênios médicos."}
            {role === "CLIENTE" &&
              "Acesso para funcionários de empresas clientes."}
          </p>
        </div>

        {/* Grid de campos (Empresa só aparece se não for Master) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className={role === "MASTER" ? "md:col-span-2" : ""}>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Nome de usuário
            </label>
            <InputSearch
              value={username}
              onChange={setUsername}
              placeholder="ex: maria.jose"
              icon={User}
            />
            {errors.username && (
              <p className="mt-1.5 text-xs text-red-600 font-medium">
                {errors.username}
              </p>
            )}
          </div>

          {role !== "MASTER" && (
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">
                Empresa Vinculada
              </label>
              <SearchableSelect
                value={empresaId}
                onChange={setEmpresaId}
                options={empresas}
                placeholder="Selecione a empresa"
                icon={Building}
              />
              {errors.empresaId && (
                <p className="mt-1.5 text-xs text-red-600 font-medium">
                  {errors.empresaId}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ... (campos específicos por Role permanecem os mesmos) ... */}

        <div className="my-8 h-px bg-slate-100" />

        {/* Seção de Senha e Submit */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
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
                label="Gerar"
                onClick={() => setPassword(generatePassword(6))}
                className="bg-slate-100 text-slate-800 ring-1 ring-slate-200 text-sm px-3 py-2 gap-2 rounded-xl hover:bg-slate-200 hover:text-slate-900 transition-all duration-300"
              />
            </div>
            <button
              type="button"
              onClick={() => copyPassword(password)}
              className="mt-2 text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Copiar senha para área de transferência
            </button>

            {role === "CONVENIO" && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-800">
                  Nível de acesso
                </p>

                <div className="flex flex-wrap gap-3">
                  {[1, 2].map((n) => (
                    <label
                      key={n}
                      className={[
                        "flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm",

                        nivelConvenio === n
                          ? "border-indigo-200 bg-white text-slate-900 ring-4 ring-indigo-100"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="nivel"
                        value={n}
                        checked={nivelConvenio === n}
                        onChange={() => setNivelConvenio(n as ConvenioNivel)}
                        className="accent-indigo-600"
                      />
                      Nível {n}
                    </label>
                  ))}
                </div>

                {errors.nivelConvenio && (
                  <p className="mt-2 text-xs text-red-600">
                    {errors.nivelConvenio}
                  </p>
                )}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-11 px-8 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:bg-indigo-300 transition-all shadow-md shadow-indigo-100"
          >
            {loading ? "Processando..." : "Finalizar Cadastro"}
          </button>
        </div>
      </form>

      {/* sucesso */}
      {created && (
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
              onClick={() => copyPassword(created.password)}
              className="rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-50"
            >
              Copiar senha novamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Info({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-emerald-200 bg-white p-3">
      <p className="text-xs font-medium text-emerald-700">{label}</p>
      <p
        className={[
          "mt-1 text-sm text-slate-900",
          mono ? "font-mono" : "",
        ].join(" ")}
      >
        {value}
      </p>
    </div>
  );
}
