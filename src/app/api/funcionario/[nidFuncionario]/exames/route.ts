import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ nidFuncionario: number }> },
) {
  const jar = await cookies();
  const access = jar.get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const { nidFuncionario } = await params;

  // Se você quiser repassar querystring também, mantém:
  const url = new URL(req.url);
  const query = url.search; // geralmente vazio aqui, mas ok

  const { data } = await backendApi.get(
    `/funcionario/${nidFuncionario}/exames${query}`,
    { headers: { Authorization: `Bearer ${access}` } },
  );

  return NextResponse.json(data, { status: 200 });
}
