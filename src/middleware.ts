import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isMasterArea =
    pathname === "/master" || pathname.startsWith("/master/");
  const isConvenioArea =
    pathname === "/convenio" || pathname.startsWith("/convenio/");
  const isClienteArea =
    pathname === "/cliente" || pathname.startsWith("/cliente/");

  // Só aplica nas áreas
  if (!isMasterArea && !isConvenioArea && !isClienteArea)
    return NextResponse.next();

  // Login (público): /master, /convenio, /cliente
  const isLoginPage =
    pathname === "/master" ||
    pathname === "/convenio" ||
    pathname === "/cliente";
  if (isLoginPage) return NextResponse.next();

  // Daqui pra baixo: /master/*, /convenio/*, /cliente/* (protegido)
  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const loginPath = isMasterArea
      ? "/master"
      : isConvenioArea
        ? "/convenio"
        : "/cliente";
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set("next", pathname); // opcional: voltar após login
    return NextResponse.redirect(url);
  }

  // (Opcional) bloquear role errada já no middleware
  const role = req.cookies.get("role")?.value;

  if (isMasterArea && role !== "master")
    return NextResponse.redirect(new URL("/master", req.url));
  if (isConvenioArea && role !== "convenio")
    return NextResponse.redirect(new URL("/convenio", req.url));
  if (isClienteArea && role !== "cliente")
    return NextResponse.redirect(new URL("/cliente", req.url));

  return NextResponse.next();
}

export const config = {
  matcher: ["/master/:path*", "/convenio/:path*", "/cliente/:path*"],
};
