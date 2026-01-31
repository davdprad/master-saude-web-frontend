import Image from "next/image";
import LogoMaster from "@/public/logo-master.svg";

export default function MasterLoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* LADO ESQUERDO - BOAS VINDAS */}
        <div className="relative hidden lg:flex overflow-hidden">
          {/* Fundo: gradiente + textura sutil */}
          <div className="absolute inset-0 bg-linear-to-br from-indigo-500 via-indigo-600 to-indigo-700" />

          {/* Conteúdo */}
          <div className="relative z-10 flex flex-col justify-between p-10 text-white">
            <div className="flex items-center gap-3">
              {/* LOGO SVG (substitua depois) */}
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
                  Portal Master
                </p>
                <p className="text-white/80 text-sm">Acesso administrativo</p>
              </div>
            </div>

            <div className="max-w-lg">
              <h1 className="text-4xl font-semibold tracking-tight">
                Olá, seja muito bem-vindo(a)!
              </h1>
              <p className="mt-4 text-white/85 leading-relaxed">
                Entre com suas credenciais para gerenciar empresas,
                colaboradores e configurações do sistema de forma segura.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4">
                  <p className="text-sm font-medium">Acesso rápido</p>
                  <p className="mt-1 text-xs text-white/80">
                    Interface responsiva e leve.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-4">
                  <p className="text-sm font-medium">Mais segurança</p>
                  <p className="mt-1 text-xs text-white/80">
                    Pronto para captcha e validações.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xs text-white/70">
              © {new Date().getFullYear()} Portal Master Sáude • Todos os
              direitos reservados
            </p>
          </div>
        </div>

        {/* LADO DIREITO - FORM */}
        <div className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-md">
            {/* Cabeçalho compacto no mobile */}
            

            <div className="rounded-3xl border border-gray-200 bg-white shadow-sm p-8 sm:p-10">
              <div className="flex items-center">
                <Image
                  src={LogoMaster}
                  alt="Logo"
                  className="rounded-lg h-12"
                />
              </div>
              <div className="mt-10">
                <h2 className="text-xl font-semibold text-gray-900">Entrar</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Use seu login e senha para acessar.
                </p>
              </div>

              <form className="mt-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Login
                  </label>
                  <input
                    type="text"
                    placeholder="login"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700">
                    Senha
                  </label>
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/15"
                  />
                </div>

                <div className="flex items-center justify-between gap-3">
                  <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    />
                    Lembrar de mim
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-600/20"
                >
                  Entrar
                </button>

                <p className="text-center text-xs text-gray-400">
                  Acesso restrito a usuários autorizados.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
