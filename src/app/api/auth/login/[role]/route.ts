import { Role } from "@/src/types/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { backendApi } from "@/src/services-server/api";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ role: Role }> },
) {
  const body = await req.json();
  const { role } = await params;

  try {
    const { data } = await backendApi.post(`/auth/${role}/login`, body);

    const res = NextResponse.json(
      {
        role: data.role,
        company_id: data.company_id,
        employee_id: data.employee_id,
      },
      { status: 200 },
    );

    // Cookies HttpOnly (mais seguro)
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 15,
    });

    res.cookies.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/api/auth/refresh",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("employee_id", String(data.employee_id ?? ""), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("company_id", String(data.company_id ?? ""), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    res.cookies.set("role", String(data.role ?? ""), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });

    return res;
  } catch (err) {
    const message = axios.isAxiosError(err)
      ? ((err.response?.data as any)?.message ?? "Login inválido")
      : "Login inválido";

    return NextResponse.json({ message }, { status: 401 });
  }
}
