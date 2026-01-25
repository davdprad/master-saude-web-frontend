// app/colaboradores/exames/page.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Home,
  FileText,
  Info,
  LogOut,
  Search,
  Download,
  Building2,
  CalendarDays,
  FileSpreadsheet,
  FileSignature,
} from "lucide-react";

type ExamStatus = "valido" | "vencido" | "pendente";

type Exam = {
  id: number;
  name: string;
  date: string; // "YYYY-MM-DD" só para facilitar filtro; exibição fica BR
  company: string;
  companyId: string;
  fileType?: "pdf" | "xlsx";
  status: ExamStatus;
};

const companies = [
  { id: "todas", name: "Todas as Empresas" },
  { id: "alfa", name: "Empresa Alfa (Atual)" },
  { id: "beta", name: "Empresa Beta (Antiga)" },
];

const examsSeed: Exam[] = [
  {
    id: 1,
    name: "ASO Admissional",
    date: "2024-03-20",
    company: "Empresa Alfa",
    companyId: "alfa",
    fileType: "pdf",
    status: "valido",
  },
  {
    id: 2,
    name: "ASO Periódico",
    date: "2023-01-15",
    company: "Empresa Beta",
    companyId: "beta",
    fileType: "pdf",
    status: "valido",
  },
  {
    id: 3,
    name: "Audiometria",
    date: "2023-01-15",
    company: "Empresa Beta",
    companyId: "beta",
    fileType: "pdf",
    status: "valido",
  },
  {
    id: 4,
    name: "ASO Periódico",
    date: "2022-01-10",
    company: "Empresa Beta",
    companyId: "beta",
    fileType: "xlsx",
    status: "vencido",
  },
];

function formatBR(iso: string) {
  // iso = YYYY-MM-DD
  const [y, m, d] = iso.split("-").map(Number);
  return `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}/${y}`;
}

function statusStyles(status: ExamStatus) {
  switch (status) {
    case "valido":
      return {
        badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
        dot: "bg-emerald-500",
        label: "Válido",
      };
    case "pendente":
      return {
        badge: "bg-amber-50 text-amber-800 border-amber-200",
        dot: "bg-amber-500",
        label: "Pendente",
      };
    case "vencido":
      return {
        badge: "bg-rose-50 text-rose-700 border-rose-200",
        dot: "bg-rose-500",
        label: "Vencido",
      };
  }
}

export default function ColabExamsPage() {
  // Para ficar só UI (sem backend), deixei sem state de filtros.
  // Se quiser, eu te mando a versão com useState + filtragem real.
  const exams = examsSeed;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-[1200px] px-4 py-6 md:py-10">
        <div className="grid gap-6 md:grid-cols-[260px_1fr]">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block">
            <div className="sticky top-6 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <Image
                      src="/Logo-Master-Saude.svg"
                      alt="Master Saúde"
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <div className="leading-tight">
                    <p className="text-sm font-semibold text-slate-900">
                      Master Saúde
                    </p>
                    <p className="text-xs text-slate-500">
                      Área do Colaborador
                    </p>
                  </div>
                </div>

                <nav className="mt-6 space-y-2">
                  <SideLink
                    href="/colaboradores/dashboard"
                    icon={<Home className="h-4 w-4" />}
                  >
                    Dashboard
                  </SideLink>
                  <SideLink
                    active
                    href="/colaboradores/exames"
                    icon={<FileText className="h-4 w-4" />}
                  >
                    Meus Exames
                  </SideLink>
                  <SideLink
                    href="/colaboradores/instrucoes"
                    icon={<Info className="h-4 w-4" />}
                  >
                    Instruções
                  </SideLink>
                </nav>
              </div>

              <button className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                <span className="flex items-center justify-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sair
                </span>
              </button>
            </div>
          </aside>

          {/* Main */}
          <main className="space-y-6">
            {/* Header */}
            <header className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
              <div className="flex items-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 md:hidden">
                  <Image
                    src="/Logo-Master-Saude.svg"
                    alt="Master Saúde"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h1 className="text-base font-semibold text-slate-900 md:text-lg">
                    Meus Exames
                  </h1>
                  <p className="text-xs text-slate-500 md:text-sm">
                    Consulte seu histórico e baixe documentos quando disponíveis
                  </p>
                </div>
              </div>

              <button className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </button>
            </header>

            {/* Card principal */}
            <Card>
              <div className="border-b border-slate-200 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      Histórico de Exames
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Use os filtros para encontrar exames por nome, empresa e
                      período.
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700">
                    <FileSignature className="h-4 w-4" />
                    {exams.length} registros
                  </div>
                </div>
              </div>

              {/* Filtros */}
              <div className="p-5">
                <div className="grid gap-3 lg:grid-cols-[1.2fr_0.8fr_1fr]">
                  {/* Search */}
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Buscar por nome do exame..."
                      className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                    />
                  </div>

                  {/* Empresa */}
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      defaultValue=""
                      className="h-11 w-full appearance-none rounded-2xl border border-slate-200 bg-white pl-10 pr-10 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                    >
                      <option value="" disabled>
                        Filtrar por empresa
                      </option>
                      {companies.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                      ▾
                    </span>
                  </div>

                  {/* Datas */}
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Data Início
                      </label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">
                        Data Fim
                      </label>
                      <div className="relative">
                        <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                          type="date"
                          className="h-11 w-full rounded-2xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ações rápidas (opcional) */}
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <button className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
                    Limpar filtros
                  </button>
                  <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800">
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Lista */}
              <div className="border-t border-slate-200 p-2 md:p-4">
                <ul className="space-y-3">
                  {exams.map((exam) => {
                    const st = statusStyles(exam.status);
                    const isXlsx = exam.fileType === "xlsx";

                    return (
                      <li
                        key={exam.id}
                        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={[
                              "grid h-12 w-12 place-items-center rounded-2xl border shadow-sm",
                              exam.status === "vencido"
                                ? "border-rose-200 bg-rose-50 text-rose-700"
                                : exam.status === "pendente"
                                ? "border-amber-200 bg-amber-50 text-amber-800"
                                : "border-emerald-200 bg-emerald-50 text-emerald-700",
                            ].join(" ")}
                          >
                            {isXlsx ? (
                              <FileSpreadsheet className="h-6 w-6" />
                            ) : (
                              <FileText className="h-6 w-6" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="truncate text-sm font-semibold text-slate-900">
                                {exam.name}
                              </p>
                              <span
                                className={[
                                  "inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold",
                                  st.badge,
                                ].join(" ")}
                              >
                                <span
                                  className={[
                                    "h-2 w-2 rounded-full",
                                    st.dot,
                                  ].join(" ")}
                                />
                                {st.label}
                              </span>
                            </div>

                            <p className="mt-1 text-xs text-slate-600">
                              {formatBR(exam.date)} • {exam.company}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 sm:justify-end">
                          <Link
                            href="#"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700"
                          >
                            <Download className="h-4 w-4" />
                            Baixar
                          </Link>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Empty state (se quiser usar quando não tiver exames) */}
                {/* <EmptyState /> */}
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* Bottom Nav (Mobile) */}
      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/80 backdrop-blur md:hidden">
        <div className="mx-auto grid max-w-[600px] grid-cols-3 px-2 py-2">
          <BottomLink
            href="/colaboradores/dashboard"
            icon={<Home className="h-5 w-5" />}
          >
            Dashboard
          </BottomLink>
          <BottomLink
            active
            href="/colaboradores/exames"
            icon={<FileText className="h-5 w-5" />}
          >
            Meus Exames
          </BottomLink>
          <BottomLink
            href="/colaboradores/instrucoes"
            icon={<Info className="h-5 w-5" />}
          >
            Instruções
          </BottomLink>
        </div>
      </nav>

      <div className="h-20 md:hidden" />
    </div>
  );
}

/* ----------------- UI helpers ----------------- */

function Card({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "rounded-2xl border border-slate-200 bg-white shadow-sm",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function SideLink({
  href,
  icon,
  active,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition",
        active
          ? "bg-slate-900 text-white shadow-sm"
          : "text-slate-700 hover:bg-slate-50",
      ].join(" ")}
    >
      <span
        className={[
          "grid h-8 w-8 place-items-center rounded-lg",
          active ? "bg-white/10" : "bg-slate-100 text-slate-700",
        ].join(" ")}
      >
        {icon}
      </span>
      {children}
    </Link>
  );
}

function BottomLink({
  href,
  icon,
  active,
  children,
}: {
  href: string;
  icon: React.ReactNode;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-xs font-semibold transition",
        active ? "text-slate-900" : "text-slate-500",
      ].join(" ")}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
}

// Opcional
function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
      <p className="text-sm font-semibold text-slate-900">
        Nenhum exame encontrado
      </p>
      <p className="mt-1 text-sm text-slate-600">
        Ajuste os filtros ou tente uma busca diferente.
      </p>
    </div>
  );
}
