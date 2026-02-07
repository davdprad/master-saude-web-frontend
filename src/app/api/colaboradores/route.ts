import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(req: Request) {
  console.log("teste");

  const jar = await cookies();
  const access = jar.get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const url = new URL(req.url);
  const query = url.search; // repassa ?page&limit&nome&empresa&cpf&status

  const { data } = await backendApi.get(
    `/masteruser-colaboradores-dados${query}`,
    {
      headers: { Authorization: `Bearer ${access}` },
    },
  );

  return NextResponse.json(data, { status: 200 });
}
