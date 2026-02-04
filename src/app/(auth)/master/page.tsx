"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoMaster from "@/public/logo-master.svg";
import LogoMasterWhite from "@/public/logo-master-white.svg";
import { Input } from "@/src/components/ui/Input";
import Card from "@/src/components/cards/Card";
import { Button } from "@/src/components/ui/Button";

export default function MasterLoginPage() {
  const router = useRouter();

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(null);

    if (!login.trim() || !password.trim()) {
      setFormError("Preencha login e senha.");
      return;
    }

    setLoading(true);
    try {
      // ✅ "Finge" que já existe uma API de login:
      // Exemplo esperado: POST /api/auth/login
      // Retorno esperado: { token: string, user: {...} }
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Login ou senha inválidos.");
      }

      const data = await res.json();

      // Exemplo: salvar token (ajuste conforme seu back)
      if (data?.token) {
        localStorage.setItem("auth_token", data.token);
      }

      // Redireciona após login
      router.push("/master");
    } catch (err: any) {
      setFormError(err?.message || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-dvh sm:min-h-screen bg-gray-50">
      <div className="min-h-dvh sm:min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LADO ESQUERDO - BOAS VINDAS */}
        <LeftPage />

        {/* LADO DIREITO - FORM */}
        <div className="flex items-center justify-center px-6">
          <div className="w-full max-w-md">
            <Card className="rounded-3xl shadow-sm p-8 sm:p-10 border-0 ring-1 ring-gray-200">
              <div className="flex items-center lg:hidden">
                <Image
                  src={LogoMaster}
                  alt="Logo"
                  className="rounded-lg h-12"
                />
              </div>

              <div className="mt-10 lg:mt-0">
                <h2 className="text-xl font-semibold text-gray-900">Entrar</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Use seu login e senha para acessar
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <Input
                  label="Login"
                  type="text"
                  placeholder="Login"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  disabled={loading}
                />

                <Input
                  label="Senha"
                  type="password"
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />

                {formError ? (
                  <div className="mt-4 rounded-xl ring-1 ring-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                ) : null}

                <Button
                  type="submit"
                  label={loading ? "Entrando..." : "Entrar"}
                  disabled={loading}
                  className="w-full bg-linear-to-br from-indigo-500 to-indigo-700 text-white text-sm px-4 py-3 gap-2 rounded-xl hover:bg-indigo-800 hover:text-white transition-all"
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeftPage() {
  return (
    <div className="relative hidden lg:flex overflow-hidden shadow-2xl">
      <div className="absolute inset-0 bg-linear-to-br from-indigo-500 to-indigo-700" />

      <div className="relative z-10 flex flex-col justify-between p-10 text-white">
        <Image
          src={LogoMasterWhite}
          alt="Logo"
          className="rounded-lg h-12 w-min"
        />

        <div className="max-w-lg">
          <div className="flex gap-3 mb-6">
            <div className="h-12 w-12 rounded-2xl bg-white/15 grid place-items-center ring-1 ring-white/20">
              <svg
                viewBox="0 0 48 48"
                className="h-7 w-7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M24 6L40 16V32L24 42L8 32V16L24 6Z"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  opacity="0.95"
                />
                <path
                  d="M16 24H32"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold leading-tight">
                Portal Master Saúde
              </p>
              <p className="text-white/80 text-sm">Acesso administrativo</p>
            </div>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Olá, seja muito bem-vindo(a)!
          </h1>
          <p className="mt-4 text-white/85 leading-relaxed">
            Entre com suas credenciais para gerenciar empresas, colaboradores e
            configurações do sistema de forma segura.
          </p>
        </div>

        <p className="text-xs text-white/70">
          © {new Date().getFullYear()} Portal Master Sáude • Todos os direitos
          reservados
        </p>
      </div>
    </div>
  );
}
