import { NextRequest, NextResponse } from "next/server";

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isMasterArea =
    pathname === "/master" || pathname.startsWith("/master/");
  const isConvenioArea =
    pathname === "/convenio" || pathname.startsWith("/convenio/");
  const isClienteArea =
    pathname === "/cliente" || pathname.startsWith("/cliente/");

  if (!isMasterArea && !isConvenioArea && !isClienteArea)
    return NextResponse.next();

  const isLoginPage =
    pathname === "/master" ||
    pathname === "/convenio" ||
    pathname === "/cliente";
  if (isLoginPage) return NextResponse.next();

  const token = req.cookies.get("access_token")?.value;

  if (!token) {
    const loginPath = isMasterArea
      ? "/master"
      : isConvenioArea
        ? "/convenio"
        : "/cliente";
    const url = req.nextUrl.clone();
    url.pathname = loginPath;
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

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
