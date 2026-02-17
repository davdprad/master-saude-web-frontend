"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/src/components/ui/Input";
import Card from "@/src/components/cards/Card";
import { Button } from "@/src/components/ui/Button";
import { LeftPanel } from "./LeftPanel";
import { useLogin } from "../hooks/useLogin";
import { RoleLoginConfig } from "@/src/types/auth";

export default function LoginTemplate({ config }: { config: RoleLoginConfig }) {
  const router = useRouter();
  const { login: doLogin, loading, formError } = useLogin(config.role);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = await doLogin(login, password);
    if (result.ok) router.push(config.redirectTo);
  }

  return (
    <div className="min-h-dvh sm:min-h-screen bg-linear-to-br from-indigo-600 to-indigo-800 lg:bg-none lg:bg-gray-50">
      <div className="min-h-dvh sm:min-h-screen grid grid-cols-1 lg:grid-cols-2">
        <LeftPanel config={config} />

        <div className="min-h-dvh lg:min-h-0 flex flex-col items-center justify-center">
          <div className="lg:hidden flex items-center py-15">
            <Image
              src={config.logos.white}
              alt="Logo"
              className="rounded-lg h-15"
            />
          </div>
          <div className="w-full max-w-md flex-1 lg:flex-none">
            <Card className="h-full rounded-b-none rounded-t-3xl lg:rounded-3xl shadow-sm p-8 sm:p-10 border-0 ring-1 ring-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {config.title}
              </h2>
              <p className="mt-1 text-sm text-gray-500">{config.subtitle}</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
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
                  className="w-full bg-indigo-600 text-white text-sm px-4 py-3 gap-2 rounded-xl hover:bg-indigo-700 hover:text-white transition-all"
                />
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
