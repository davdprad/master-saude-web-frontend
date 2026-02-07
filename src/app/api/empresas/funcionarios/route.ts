import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(req: Request) {
  const jar = await cookies();

  const access = jar.get("access_token")?.value; // HttpOnly
  const companyId = jar.get("company_id")?.value; // cookie público

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  if (!companyId) {
    return NextResponse.json({ message: "Sem company_id" }, { status: 403 });
  }

  const url = new URL(req.url);
  const query = url.search;

  const { data } = await backendApi.get(
    `/masteruser-colaboradores-dados${query}&nidEmpresa=${companyId}`,
    {
      headers: { Authorization: `Bearer ${access}` },
    },
  );

  return NextResponse.json(data, { status: 200 });
}
