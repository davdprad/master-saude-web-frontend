import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ nidFuncionario: string }> },
) {
  const jar = await cookies();

  const access = jar.get("access_token")?.value;
  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const role = jar.get("role")?.value;
  const { nidFuncionario } = await params;

  // só define se for convênio
  const nidEmpresa =
    role === "convenio" ? jar.get("company_id")?.value : undefined;

  try {
    const { data } = await backendApi.get(
      `/funcionario/${nidFuncionario}/exames`,
      {
        headers: { Authorization: `Bearer ${access}` },
        // se for convênio, adiciona nid_empresa; senão não manda nada
        params: nidEmpresa ? { nid_empresa: nidEmpresa } : undefined,
      },
    );

    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    const status = err?.response?.status ?? 500;
    const message =
      err?.response?.data?.message ?? "Erro ao buscar exames do funcionário";
    return NextResponse.json({ message }, { status });
  }
}
