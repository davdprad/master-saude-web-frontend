import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios from "axios";
import { backendApi } from "@/src/services-server/api";

export async function GET() {
  const jar = await cookies();
  const access = jar.get("access_token")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  try {
    const { data } = await backendApi.get("/register/usuarios", {
      headers: { Authorization: `Bearer ${access}` },
    });

    return NextResponse.json(data, { status: 200 });
  } catch (err: unknown) {
    const status = axios.isAxiosError(err) ? (err.response?.status ?? 500) : 500;
    const data = axios.isAxiosError(err) ? err.response?.data : null;
    const message =
      typeof data === "object" && data !== null && "detail" in data
        ? String(data.detail)
        : "Erro ao buscar usuários registrados.";

    return NextResponse.json({ message }, { status });
  }
}