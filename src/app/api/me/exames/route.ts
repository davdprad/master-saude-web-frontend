import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { backendApi } from "@/src/services-server/api";

export async function GET(req: Request) {
  const jar = await cookies();

  const access = jar.get("access_token")?.value;

  const employeeId = jar.get("employee_id")?.value;

  if (!access) {
    return NextResponse.json({ message: "Não autenticado" }, { status: 401 });
  }

  if (!employeeId) {
    return NextResponse.json({ message: "Sem employee_id" }, { status: 403 });
  }

  const { data } = await backendApi.get(`/funcionario/${employeeId}/exames`, {
    headers: { Authorization: `Bearer ${access}` },
  });

  return NextResponse.json(data, { status: 200 });
}
