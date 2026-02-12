import { Role } from "@/src/types/auth";
import { NextResponse } from "next/server";
import axios from "axios";
import { backendApi } from "@/src/services-server/api";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ role: string }> },
) {
  const body = await req.json();
  const resolvedParams = await params;
  const role = resolvedParams.role as Role;

  try {
    const { data } = await backendApi.post(`/auth/${role}/login`, body);

    const res = NextResponse.json(
      { message: "Login realizado!" },
      { status: 200 },
    );

    const expire = data.access_token_expire || 60 * 60 * 8;

    // Cookies HttpOnly (mais seguro)
    res.cookies.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    res.cookies.set("employee_id", String(data.employee_id ?? ""), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    res.cookies.set("company_id", String(data.company_id ?? ""), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    res.cookies.set("role", String(data.role ?? ""), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    res.cookies.set("username", String(data.login ?? ""), {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: expire,
    });

    return res;
  } catch (err) {
    const message = axios.isAxiosError(err)
      ? ((err.response?.data as any)?.message ?? "Login inválido")
      : "Login inválido";

    return NextResponse.json({ message }, { status: 401 });
  }
}
