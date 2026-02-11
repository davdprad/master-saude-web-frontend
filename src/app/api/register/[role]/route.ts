import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { backendApi } from "@/src/services-server/api";
import { Role } from "@/src/types/auth";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ role: string }> },
) {
  const jar = await cookies();
  const access = jar.get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const resolvedParams = await params;
  const role = resolvedParams.role as Role;

  try {
    const { data } = await backendApi.post(`/register/${role}`, body, {
      headers: { Authorization: `Bearer ${access}` },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    const status = axios.isAxiosError(err) ? err.response?.status : 500;
    const message = axios.isAxiosError(err)
      ? ((err.response?.data as any)?.detail ?? `Erro ao criar ${role}`)
      : `Erro ao criar ${role}`;

    return NextResponse.json({ message }, { status: status || 500 });
  }
}
